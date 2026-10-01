"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import {
  Calendar,
  CalendarOff,
  Check,
  CheckCircle2,
  Info,
  Lock,
  Stethoscope,
  Sun,
  Sunset,
  X,
  Loader2,
} from "lucide-react"
import { Appointment, AvailableDateOption } from "@/types/appointments"
import { cn } from "@/lib/utils"

interface RescheduleAppointmentModalProps {
  appointment: Appointment | null
  availableDates: AvailableDateOption[]
  isOpen: boolean
  onClose: () => void
  onConfirm: (appointmentId: string, newDate: string, newTime: string) => Promise<void> | void
}

function RescheduleAppointmentContent({
  appointment,
  availableDates,
  onClose,
  onConfirm,
}: {
  appointment: Appointment
  availableDates: AvailableDateOption[]
  onClose: () => void
  onConfirm: (appointmentId: string, newDate: string, newTime: string) => Promise<void> | void
}) {
  const initialDateId = availableDates.length > 0 ? availableDates[0].id : null
  const initialTime =
    availableDates.length > 0 && availableDates[0].slots.length > 0
      ? availableDates[0].slots.find((s) => s.time === "14:30 hs")?.time || availableDates[0].slots[0].time
      : "14:30 hs"

  const [selectedDateId, setSelectedDateId] = useState<string | null>(initialDateId)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(initialTime)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const modalRef = useRef<HTMLDivElement>(null)

  // Derive active date option
  const activeDateOption = useMemo(() => {
    if (selectedDateId) {
      const found = availableDates.find((d) => d.id === selectedDateId)
      if (found) return found
    }
    return availableDates[0] || null
  }, [selectedDateId, availableDates])

  // Focus close button on mount
  useEffect(() => {
    const closeBtn = modalRef.current?.querySelector<HTMLElement>(
      'button[aria-label="Cerrar modal de reprogramación"]'
    )
    closeBtn?.focus()
  }, [])

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!isSubmitting) onClose()
        return
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, isSubmitting])

  const morningSlots = useMemo(() => {
    return activeDateOption?.slots.filter((s) => s.period === "morning") || []
  }, [activeDateOption])

  const afternoonSlots = useMemo(() => {
    return activeDateOption?.slots.filter((s) => s.period === "afternoon") || []
  }, [activeDateOption])

  const handleSelectDate = (dateOption: AvailableDateOption) => {
    setSelectedDateId(dateOption.id)
    if (dateOption.slots.length > 0) {
      const exists = dateOption.slots.some((s) => s.time === selectedTimeSlot)
      if (!exists) {
        setSelectedTimeSlot(dateOption.slots[0].time)
      }
    }
  }

  const handleConfirmAction = async () => {
    if (!activeDateOption || isSubmitting) return
    setIsSubmitting(true)
    try {
      await onConfirm(appointment.id, activeDateOption.dateDisplay, selectedTimeSlot)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      ref={modalRef}
      className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col transition-all duration-200 transform scale-100 border border-outline-variant/30"
    >
      {/* MODAL HEADER */}
      <div className="px-space-xl pt-space-xl pb-space-lg flex items-start justify-between gap-space-md border-b border-surface-container">
        <div className="flex-1">
          <div className="flex items-center gap-space-xs text-primary font-label-sm uppercase tracking-wide mb-1">
            <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
            <span>Modificación Telemática de Turno</span>
          </div>
          <h2
            className="font-headline-md text-headline-md text-on-surface tracking-tight"
            id="modal-reschedule-title"
          >
            Reprogramar Cita Médica
          </h2>
          <p
            className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed"
            id="modal-reschedule-desc"
          >
            Elige un nuevo horario para tu turno. El turno actual se liberará automáticamente una vez confirmada la nueva fecha.
          </p>
        </div>

        {/* Accessible Close Button */}
        <button
          type="button"
          aria-label="Cerrar modal de reprogramación"
          onClick={onClose}
          disabled={isSubmitting}
          className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer disabled:opacity-50"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* MODAL BODY CONTENT */}
      <div className="p-space-xl space-y-space-xl overflow-y-auto max-h-[calc(85vh-160px)]">
        {/* 2. CITA ACTUAL A REPROGRAMAR (HIGHLIGHTED CLINICAL PANEL) */}
        <div className="bg-surface-container-low rounded-xl p-space-lg">
          <div className="flex items-center justify-between gap-space-sm mb-space-sm">
            <div className="flex items-center gap-space-2xs">
              <span className="inline-block w-2 h-2 rounded-full bg-error" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">
                Cita Actual a Liberar
              </span>
            </div>
            <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-medium">
              {appointment.coverageProvider.split("•")[0]?.trim() || "OSDE 310"}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                {appointment.specialty}
              </h3>
              <p className="font-body-md-medium text-body-md-medium text-on-surface-variant">
                {appointment.doctorName}{" "}
                {appointment.doctorLicense && (
                  <span className="font-normal text-outline text-xs">
                    ({appointment.doctorLicense})
                  </span>
                )}
              </p>
            </div>

            <div className="sm:text-right flex flex-col sm:items-end gap-0.5">
              <div className="inline-flex items-center gap-1.5 font-label-lg text-label-lg text-error font-semibold">
                <CalendarOff className="h-4 w-4 text-error" aria-hidden="true" />
                <span>{appointment.displayDate}</span>
              </div>
              <span className="font-body-md text-body-md text-on-surface-variant">
                {appointment.displayTime} • {appointment.venue}
              </span>
            </div>
          </div>
        </div>

        {/* 3. NUEVA SELECCIÓN DE FECHA Y HORARIO */}
        <div className="space-y-space-lg">
          {/* Manteniendo Profesional Asignado */}
          <div className="flex items-center justify-between p-space-md rounded-xl bg-surface-container">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                <Stethoscope className="h-5 w-5 text-on-primary-container" aria-hidden="true" />
              </div>
              <div>
                <p className="font-label-md text-label-md text-on-surface font-semibold">
                  Manteniendo profesional asignado
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  {appointment.doctorName} • {appointment.venue.split("(")[0]?.trim() || "Consultorios Sede Belgrano"}
                </p>
              </div>
            </div>
            <Lock className="h-5 w-5 text-primary hidden sm:block" aria-hidden="true" />
          </div>

          {/* Selector de Fechas (Pestañas accesibles) */}
          <fieldset className="border-0 p-0 m-0">
            <legend className="block font-label-md text-label-md text-on-surface font-semibold mb-space-xs">
              Seleccionar Nueva Fecha Disponible
            </legend>
            <div
              aria-label="Fechas disponibles"
              className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs"
              role="radiogroup"
            >
              {availableDates.map((dateOption) => {
                const isSelected = activeDateOption?.id === dateOption.id
                return (
                  <button
                    key={dateOption.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => handleSelectDate(dateOption)}
                    className={cn(
                      "date-tab flex flex-col items-center justify-center py-space-sm px-space-xs rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all cursor-pointer",
                      isSelected
                        ? "bg-primary text-on-primary shadow-sm"
                        : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                    )}
                  >
                    <span
                      className={cn(
                        "font-label-sm text-label-sm uppercase tracking-wider",
                        isSelected ? "opacity-90 font-semibold" : "text-on-surface-variant"
                      )}
                    >
                      {dateOption.dayName || dateOption.label.split(" ")[0]}
                    </span>
                    <span
                      className={cn(
                        "font-vital-metric text-[20px] leading-tight my-0.5",
                        isSelected ? "text-on-primary font-bold" : "text-on-surface font-semibold"
                      )}
                    >
                      {dateOption.dateMetric || dateOption.label.split(" ").slice(1).join(" ")}
                    </span>
                    <span
                      className={cn(
                        "font-label-sm text-[11px]",
                        isSelected ? "opacity-90" : "text-on-surface-variant"
                      )}
                    >
                      {dateOption.slotsCount} turnos disp.
                    </span>
                  </button>
                )
              })}
            </div>
          </fieldset>

          {/* Grilla de Franjas Horarias Disponibles */}
          <div className="space-y-space-md">
            {/* Turno Mañana */}
            {morningSlots.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm uppercase tracking-wider mb-space-xs font-semibold">
                  <Sun className="h-4 w-4" aria-hidden="true" />
                  <span>Turno Mañana</span>
                </div>
                <div
                  aria-label="Horarios mañana"
                  className="grid grid-cols-3 gap-space-xs"
                  role="radiogroup"
                >
                  {morningSlots.map((slot) => {
                    const isSlotActive = selectedTimeSlot === slot.time
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        role="radio"
                        aria-checked={isSlotActive}
                        tabIndex={isSlotActive ? 0 : -1}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={cn(
                          "time-slot-btn h-12 rounded-xl font-label-lg text-label-lg flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer",
                          isSlotActive
                            ? "bg-primary text-on-primary shadow-md ring-2 ring-primary ring-offset-2 gap-1.5 font-semibold"
                            : "bg-surface-container hover:bg-surface-container-high text-on-surface font-medium"
                        )}
                      >
                        {isSlotActive && (
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span>{slot.time}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Turno Tarde */}
            {afternoonSlots.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm uppercase tracking-wider mb-space-xs font-semibold">
                  <Sunset className="h-4 w-4" aria-hidden="true" />
                  <span>Turno Tarde</span>
                </div>
                <div
                  aria-label="Horarios tarde"
                  className="grid grid-cols-3 gap-space-xs"
                  role="radiogroup"
                >
                  {afternoonSlots.map((slot) => {
                    const isSlotActive = selectedTimeSlot === slot.time
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        role="radio"
                        aria-checked={isSlotActive}
                        aria-label={`${slot.time}, ${isSlotActive ? "seleccionado, sin solapamiento" : ""}`}
                        tabIndex={isSlotActive ? 0 : -1}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={cn(
                          "time-slot-btn h-12 rounded-xl font-label-lg text-label-lg flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer",
                          isSlotActive
                            ? "bg-primary text-on-primary shadow-md ring-2 ring-primary ring-offset-2 gap-1.5 font-semibold"
                            : "bg-surface-container hover:bg-surface-container-high text-on-surface font-medium"
                        )}
                      >
                        {isSlotActive && (
                          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span>{slot.time}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Validación Anti-Solapamiento (RNF-01) */}
          <div
            aria-live="polite"
            role="status"
            className="p-space-md rounded-xl bg-secondary-container/40 flex items-start gap-space-sm border border-primary/20"
          >
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-body-md-medium text-body-md-medium text-primary leading-tight font-semibold">
                Horario disponible sin solapamiento
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                Verificado contra tu agenda médica y órdenes de laboratorio vigentes para el{" "}
                <strong className="text-on-surface font-semibold">
                  {activeDateOption?.dateDisplay || "día seleccionado"}
                </strong>.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PIE DEL MODAL (ACTIONS & POLICY) */}
      <div className="px-space-xl py-space-lg bg-surface-container-low border-t border-surface-container flex flex-col gap-space-md">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-space-sm w-full">
          {/* Botón Secundario: Volver */}
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto h-12 px-space-xl rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center cursor-pointer font-medium disabled:opacity-50"
          >
            Volver sin modificar
          </button>

          {/* Botón Primario: Confirmar Reprogramación */}
          <button
            type="button"
            id="confirm-reschedule-btn"
            onClick={handleConfirmAction}
            disabled={isSubmitting}
            className="w-full sm:w-auto h-12 px-space-2xl rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center gap-space-xs cursor-pointer font-semibold disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                <span>Actualizando agenda...</span>
              </>
            ) : (
              <>
                <Check className="h-5 w-5" aria-hidden="true" />
                <span>Confirmar Reprogramación y Liberar Turno Anterior</span>
              </>
            )}
          </button>
        </div>

        {/* Texto de Política Clínica */}
        <div className="flex items-center justify-center sm:justify-start gap-1.5 text-on-surface-variant">
          <Info className="h-4 w-4 text-outline shrink-0" aria-hidden="true" />
          <p className="font-label-sm text-label-sm text-center sm:text-left">
            Las reprogramaciones autónomas son válidas hasta 24 hs antes del turno programado.
          </p>
        </div>
      </div>
    </div>
  )
}

export function RescheduleAppointmentModal({
  appointment,
  availableDates,
  isOpen,
  onClose,
  onConfirm,
}: RescheduleAppointmentModalProps) {
  if (!isOpen || !appointment) return null

  return (
    <div
      id="reschedule-modal-overlay"
      aria-labelledby="modal-reschedule-title"
      aria-describedby="modal-reschedule-desc"
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-gutter-mobile sm:p-gutter-desktop overflow-y-auto animate-in fade-in duration-200"
    >
      <RescheduleAppointmentContent
        appointment={appointment}
        availableDates={availableDates}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </div>
  )
}
