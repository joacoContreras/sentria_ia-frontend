"use client"

import React, { useState, useEffect, useCallback, useMemo } from "react"
import {
  CalendarSearch,
  Loader2,
  Sparkles,
} from "lucide-react"
import {
  Appointment,
  AvailableTurnoSlot,
  BookAppointmentInput,
  DoctorOption,
  DoctorSlotGroup,
  SpecialtyOption,
  TurnoSearchFilters,
  VenueOption,
} from "@/types/appointments"
import { appointmentService } from "../services/appointment.service"
import { AppointmentSearchFilters } from "./appointment-search-filters"
import { AppointmentSlotCard } from "./appointment-slot-card"
import { AppointmentSearchEmptyState } from "./appointment-search-empty-state"
import { AppointmentConfirmModal } from "./appointment-confirm-modal"

interface AppointmentSearchViewProps {
  existingAppointments?: Appointment[]
  onBookAppointment: (input: BookAppointmentInput) => Promise<void> | void
  onNavigateToMyAppointments?: () => void
}

export function AppointmentSearchView({
  existingAppointments = [],
  onBookAppointment,
  onNavigateToMyAppointments,
}: AppointmentSearchViewProps) {
  // Estados de catálogos
  const [specialties, setSpecialties] = useState<SpecialtyOption[]>([])
  const [doctors, setDoctors] = useState<DoctorOption[]>([])
  const [venues, setVenues] = useState<VenueOption[]>([])

  // Estados de filtros y búsqueda
  const [filters, setFilters] = useState<TurnoSearchFilters>({})
  const [availableSlots, setAvailableSlots] = useState<AvailableTurnoSlot[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Estado para el modal de confirmación (CA4)
  const [selectedSlotForBooking, setSelectedSlotForBooking] = useState<AvailableTurnoSlot | null>(null)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false)

  // Cargar catálogos iniciales
  useEffect(() => {
    let isMounted = true

    async function loadCatalogs() {
      try {
        const [specs, vens] = await Promise.all([
          appointmentService.getActiveSpecialties(),
          appointmentService.getVenues(),
        ])
        if (isMounted) {
          setSpecialties(specs)
          setVenues(vens)
        }
      } catch {
        // Fallback manejado internamente
      }
    }

    loadCatalogs()

    const handleCatalogUpdate = () => {
      loadCatalogs()
    }
    window.addEventListener("sentria_catalog_updated", handleCatalogUpdate)
    window.addEventListener("storage", handleCatalogUpdate)

    return () => {
      isMounted = false
      window.removeEventListener("sentria_catalog_updated", handleCatalogUpdate)
      window.removeEventListener("storage", handleCatalogUpdate)
    }
  }, [])

  // CA2: Al cambiar especialidad, actualizar la lista de médicos dependientes de forma reactiva
  useEffect(() => {
    let isMounted = true

    async function updateDoctors() {
      try {
        const docs = await appointmentService.getDoctorsBySpecialty(filters.specialty)
        if (isMounted) {
          setDoctors(docs)
        }
      } catch {
        // Fallback manejado internamente
      }
    }

    updateDoctors()
    return () => {
      isMounted = false
    }
  }, [filters.specialty])

  // Cargar turnos disponibles según los filtros (Reactivo / sin recargar página - CA2)
  const fetchTurnos = useCallback(async (currentFilters: TurnoSearchFilters) => {
    setIsLoading(true)
    try {
      const slots = await appointmentService.getAvailableTurnos(currentFilters)
      setAvailableSlots(slots)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    let isMounted = true
    appointmentService.getAvailableTurnos(filters).then((slots) => {
      if (isMounted) {
        setAvailableSlots(slots)
        setIsLoading(false)
      }
    })
    return () => {
      isMounted = false
    }
  }, [filters])

  // Actualizar filtros
  const handleFilterChange = useCallback((newFilters: Partial<TurnoSearchFilters>) => {
    setIsLoading(true)
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }))
  }, [])

  // Restablecer filtros
  const handleResetFilters = useCallback(() => {
    setIsLoading(true)
    setFilters({})
  }, [])

  // Ampliar rango de fechas (para el Empty State)
  const handleExpandDateRange = useCallback(() => {
    setIsLoading(true)
    setFilters((prev) => ({
      ...prev,
      dateFrom: undefined,
      dateTo: undefined,
    }))
  }, [])

  // Agrupar los slots por Doctor y por Fecha para renderizado cronológico limpio (CA3)
  const doctorGroups: DoctorSlotGroup[] = useMemo(() => {
    const groupMap = new Map<string, DoctorSlotGroup>()

    availableSlots.forEach((slot) => {
      const key = `${slot.doctorName}__${slot.venue}`
      if (!groupMap.has(key)) {
        groupMap.set(key, {
          doctorName: slot.doctorName,
          doctorLicense: slot.doctorLicense,
          doctorSubtitle: slot.doctorSubtitle,
          specialty: slot.specialty,
          venue: slot.venue,
          venueAddress: slot.venueAddress,
          consultorio: slot.consultorio,
          isTeleconsulta: slot.isTeleconsulta,
          dates: [],
        })
      }

      const docGroup = groupMap.get(key)!
      let dateEntry = docGroup.dates.find((d) => d.date === slot.date)
      if (!dateEntry) {
        dateEntry = {
          date: slot.date,
          dateDisplay: slot.dateDisplay,
          slots: [],
        }
        docGroup.dates.push(dateEntry)
      }

      dateEntry.slots.push(slot)
    })

    // Ordenar fechas cronológicamente
    groupMap.forEach((docGroup) => {
      docGroup.dates.sort((a, b) => a.date.localeCompare(b.date))
    })

    return Array.from(groupMap.values())
  }, [availableSlots])

  // Manejar clic en un horario libre (CA4)
  const handleSelectSlot = useCallback((slot: AvailableTurnoSlot) => {
    setSelectedSlotForBooking(slot)
    setIsConfirmModalOpen(true)
  }, [])

  const handleCloseConfirmModal = useCallback(() => {
    setIsConfirmModalOpen(false)
    setSelectedSlotForBooking(null)
  }, [])

  const handleConfirmBooking = useCallback(
    async (input: BookAppointmentInput) => {
      await onBookAppointment(input)
      // Refrescar los turnos luego de confirmar
      fetchTurnos(filters)
    },
    [onBookAppointment, fetchTurnos, filters]
  )

  return (
    <div className="w-full flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Banner de Bienvenida y Propósito */}
      <div className="w-full bg-gradient-to-r from-primary/10 via-surface-container-low to-secondary-container/20 rounded-3xl p-6 sm:p-8 border border-outline-variant/30 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-primary text-on-primary w-fit shadow-xs">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Buscador Inteligente de Turnos</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
            Encuentra y agenda tu próximo turno
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Filtra por especialidad médica, profesional, sede y rango de fechas para reservar tu
            consulta de forma autónoma e inmediata.
          </p>
        </div>

        {onNavigateToMyAppointments && (
          <button
            type="button"
            onClick={onNavigateToMyAppointments}
            className="self-start md:self-auto h-11 px-5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all border border-outline-variant/30 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Ver mis turnos agendados
          </button>
        )}
      </div>

      {/* Panel de Filtros Interactivos (CA1) */}
      <AppointmentSearchFilters
        specialties={specialties}
        doctors={doctors}
        venues={venues}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResults={availableSlots.length}
        isLoading={isLoading}
      />

      {/* Resultados de la Búsqueda (CA3) */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
            <CalendarSearch className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Horarios Disponibles por Especialista</span>
          </h2>
          <span className="text-xs text-outline font-medium">
            Ordenados cronológicamente
          </span>
        </div>

        {/* Estado de carga */}
        {isLoading ? (
          <div className="w-full bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-12 flex flex-col items-center justify-center gap-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
            <p className="text-sm font-medium text-on-surface-variant">
              Consultando agendas disponibles...
            </p>
          </div>
        ) : availableSlots.length === 0 ? (
          /* Estado Vacío (CA3) */
          <AppointmentSearchEmptyState
            onResetFilters={handleResetFilters}
            onExpandDateRange={handleExpandDateRange}
          />
        ) : (
          /* Grilla / Tarjetas de Resultados (CA3) */
          <div className="flex flex-col gap-5">
            {doctorGroups.map((docGroup) => (
              <AppointmentSlotCard
                key={`${docGroup.doctorName}-${docGroup.venue}`}
                doctorName={docGroup.doctorName}
                doctorLicense={docGroup.doctorLicense}
                doctorSubtitle={docGroup.doctorSubtitle}
                specialty={docGroup.specialty}
                venue={docGroup.venue}
                venueAddress={docGroup.venueAddress}
                consultorio={docGroup.consultorio}
                isTeleconsulta={docGroup.isTeleconsulta}
                dateGroups={docGroup.dates}
                onSelectSlot={handleSelectSlot}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal de Transición y Confirmación de Reserva con RNF-01 (CA4) */}
      <AppointmentConfirmModal
        isOpen={isConfirmModalOpen}
        slot={selectedSlotForBooking}
        existingAppointments={existingAppointments}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmBooking}
      />
    </div>
  )
}
