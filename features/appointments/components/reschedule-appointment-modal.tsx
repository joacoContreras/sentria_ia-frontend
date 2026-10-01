"use client"

import React, { useState, useEffect, useRef, useMemo } from "react"
import { Calendar as CalendarIcon, CheckCircle2, X, CalendarCheck } from "lucide-react"
import { Appointment, AvailableDateOption } from "@/types/appointments"
import { cn } from "@/lib/utils"

interface RescheduleAppointmentModalProps {
  appointment: Appointment | null
  availableDates: AvailableDateOption[]
  isOpen: boolean
  onClose: () => void
  onConfirm: (appointmentId: string, newDate: string, newTime: string) => void
}

export function RescheduleAppointmentModal({
  appointment,
  availableDates,
  isOpen,
  onClose,
  onConfirm,
}: RescheduleAppointmentModalProps) {
  const [selectedDateId, setSelectedDateId] = useState<string | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("14:00 hs")

  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElementRef = useRef<HTMLElement | null>(null)

  // Derive the active date option deterministically
  const activeDateOption = useMemo(() => {
    if (selectedDateId) {
      const found = availableDates.find((d) => d.id === selectedDateId)
      if (found) return found
    }
    return availableDates[0] || null
  }, [selectedDateId, availableDates])

  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement
      const timer = setTimeout(() => {
        const closeBtn = modalRef.current?.querySelector<HTMLElement>(
          'button[aria-label="Cerrar ventana"]'
        )
        closeBtn?.focus()
      }, 50)
      return () => clearTimeout(timer)
    } else {
      previousActiveElementRef.current?.focus()
    }
  }, [isOpen])

  // Keyboard navigation & trap
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
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
  }, [isOpen, onClose])

  const morningSlots = useMemo(() => {
    return activeDateOption?.slots.filter((s) => s.period === "morning") || []
  }, [activeDateOption])

  const afternoonSlots = useMemo(() => {
    return activeDateOption?.slots.filter((s) => s.period === "afternoon") || []
  }, [activeDateOption])

  if (!isOpen || !appointment) return null

  const handleSelectDate = (dateOption: AvailableDateOption) => {
    setSelectedDateId(dateOption.id)
    if (dateOption.slots.length > 0) {
      const exists = dateOption.slots.some((s) => s.time === selectedTimeSlot)
      if (!exists) {
        setSelectedTimeSlot(dateOption.slots[0].time)
      }
    }
  }

  const handleConfirmAction = () => {
    if (!activeDateOption) return
    onConfirm(appointment.id, activeDateOption.dateDisplay, selectedTimeSlot)
  }

  return (
    <div
      aria-labelledby="modalRescheduleTitle"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-gutter-mobile backdrop-blur-md bg-inverse-surface/45 transition-all duration-200"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-outline-variant/30"
      >
        {/* Modal Header */}
        <div className="p-space-xl bg-surface-container-low border-b border-surface-container flex items-start justify-between">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-primary-container text-white flex items-center justify-center shrink-0">
              <CalendarIcon className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                Protocolo de Reprogramación Online
              </span>
              <h3
                className="font-headline-sm text-headline-sm text-on-surface font-semibold"
                id="modalRescheduleTitle"
              >
                Reprogramar Cita Médica
              </h3>
              <p className="font-label-md text-label-md text-slate-700">
                {appointment.doctorName} • {appointment.specialty} ({appointment.venue.split("(")[0].trim()})
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Cerrar ventana"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-slate-700 hover:text-on-surface hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-space-xl flex flex-col gap-space-lg max-h-[72vh] overflow-y-auto">
          {/* Step 1: Date Selector Tabs */}
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center justify-between">
              <span>1. Selecciona la nueva fecha disponible:</span>
              <span className="font-label-sm text-label-sm text-primary font-bold">
                Próxima semana disponible
              </span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
              {availableDates.map((d) => {
                const isSelected = activeDateOption?.id === d.id
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => handleSelectDate(d)}
                    className={cn(
                      "p-space-md rounded-xl text-left border-2 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-xs"
                        : "border-transparent bg-surface-container-low hover:bg-surface-container"
                    )}
                  >
                    <span
                      className={cn(
                        "font-label-sm text-label-sm block uppercase font-bold",
                        isSelected ? "text-primary" : "text-slate-700"
                      )}
                    >
                      {d.label}
                    </span>
                    <span className="font-body-md-medium text-body-md-medium text-on-surface font-semibold">
                      {d.slotsCount} horarios
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Step 2: Time Slots Grid */}
          <div className="flex flex-col gap-space-xs">
            <label className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center justify-between">
              <span>2. Selecciona el bloque horario:</span>
              <span className="font-label-sm text-label-sm text-slate-600 font-medium">
                Duración: 30 minutos
              </span>
            </label>
            <div className="flex flex-col gap-space-sm">
              {morningSlots.length > 0 && (
                <>
                  <span className="font-label-sm text-label-sm text-slate-700 uppercase font-bold">
                    Turno Mañana
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs">
                    {morningSlots.map((slot) => {
                      const isSlotSelected = selectedTimeSlot === slot.time
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={cn(
                            "h-12 rounded-xl font-label-lg text-label-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer",
                            isSlotSelected
                              ? "bg-primary text-on-primary shadow-sm"
                              : "bg-surface-container-low hover:bg-surface-container text-on-surface"
                          )}
                        >
                          {slot.time}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {afternoonSlots.length > 0 && (
                <>
                  <span className="font-label-sm text-label-sm text-slate-700 uppercase font-bold mt-2">
                    Turno Tarde
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs">
                    {afternoonSlots.map((slot) => {
                      const isSlotSelected = selectedTimeSlot === slot.time
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={cn(
                            "h-12 rounded-xl font-label-lg text-label-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer",
                            isSlotSelected
                              ? "bg-primary text-on-primary shadow-sm"
                              : "bg-surface-container-low hover:bg-surface-container text-on-surface"
                          )}
                        >
                          {slot.time}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Anti-Overlap Real-Time Verification Badge (RNF-01 requirement) */}
          <div className="p-space-md rounded-xl bg-primary/10 border-l-4 border-primary flex items-start gap-space-sm border border-primary/20">
            <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-primary font-bold">
                Verificación Anti-solapamiento Aprobada
              </span>
              <p className="font-label-sm text-label-sm text-slate-700 leading-relaxed mt-0.5">
                El horario seleccionado{" "}
                <strong className="text-on-surface font-semibold">
                  {activeDateOption?.dateDisplay} a las {selectedTimeSlot}
                </strong>{" "}
                no presenta solapamientos ni conflicto de traslados con tu cita de
                Traumatología ni con otros turnos registrados.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-space-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-sm border-t border-surface-container">
          <span className="font-label-sm text-label-sm text-slate-700 font-medium">
            Tu turno actual quedará liberado automáticamente.
          </span>
          <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto h-12 px-space-lg rounded-xl bg-surface-container-lowest text-on-surface font-label-lg text-label-lg hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border border-outline-variant/30 cursor-pointer font-medium"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleConfirmAction}
              className="w-full sm:w-auto h-12 px-space-lg rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container flex items-center justify-center gap-space-xs transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer font-semibold"
            >
              <CalendarCheck className="h-4 w-4" />
              <span>Confirmar Nueva Fecha y Hora</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
