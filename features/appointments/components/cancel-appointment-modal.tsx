"use client"

import React, { useState, useEffect, useRef } from "react"
import { AlertTriangle, Calendar, Clock, Users, Check } from "lucide-react"
import { Appointment } from "@/types/appointments"

interface CancelAppointmentModalProps {
  appointment: Appointment | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (appointmentId: string, reason: string) => void
}

export function CancelAppointmentModal({
  appointment,
  isOpen,
  onClose,
  onConfirm,
}: CancelAppointmentModalProps) {
  const [reason, setReason] = useState("schedule")
  const modalRef = useRef<HTMLDivElement>(null)
  const previousActiveElementRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement
      // Focus first interactive element in modal
      const timer = setTimeout(() => {
        const focusable = modalRef.current?.querySelector<HTMLElement>(
          'button, [href], select, input, textarea, [tabindex]:not([tabindex="-1"])'
        )
        focusable?.focus()
      }, 50)
      return () => clearTimeout(timer)
    } else {
      previousActiveElementRef.current?.focus()
    }
  }, [isOpen])

  // Keyboard navigation (Escape & focus trap)
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

  if (!isOpen || !appointment) return null

  const handleConfirmAction = () => {
    onConfirm(appointment.id, reason)
  }

  return (
    <div
      aria-labelledby="modalCancelTitle"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-gutter-mobile backdrop-blur-md bg-inverse-surface/45 transition-all duration-200"
      role="dialog"
    >
      <div
        ref={modalRef}
        className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-outline-variant/30"
      >
        {/* Modal Header */}
        <div className="p-space-xl bg-error-container/30 border-b border-error-container/50 flex items-start gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0">
            <AlertTriangle className="h-6 w-6 text-error" />
          </div>
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-error uppercase font-bold tracking-wider">
              Acción Clínica Reversible hasta confirmación
            </span>
            <h3
              className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-0.5"
              id="modalCancelTitle"
            >
              ¿Confirmas la cancelación de tu turno?
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-space-xl flex flex-col gap-space-lg">
          {/* Appointment Summary */}
          <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col gap-space-xs border border-surface-container">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-slate-700 uppercase font-bold">
                Resumen de la cita médica
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-[11px] font-bold">
                Ventana &gt; 24 hs
              </span>
            </div>
            <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {appointment.doctorName} • {appointment.specialty}
            </p>
            <div className="flex flex-wrap items-center gap-space-md text-slate-700 font-body-md text-body-md mt-1">
              <span className="flex items-center gap-1.5 font-medium">
                <Calendar className="h-4 w-4 text-primary" /> {appointment.displayDate}
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="h-4 w-4 text-primary" /> {appointment.displayTime}
              </span>
            </div>
          </div>

          {/* Social / Clinical Impact Notice */}
          <div className="p-space-md rounded-xl bg-secondary-container/60 text-slate-700 flex items-start gap-space-sm border border-secondary-container">
            <Users className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <p className="font-label-sm text-label-sm leading-relaxed">
              <strong className="text-on-surface font-semibold">
                Impacto asistencial responsable:
              </strong>{" "}
              Al cancelar, liberarás inmediatamente este bloque para otros pacientes
              en lista de espera y tu médico de cabecera será notificado
              automáticamente.
            </p>
          </div>

          {/* Cancellation Reason */}
          <div className="flex flex-col gap-space-2xs">
            <label
              className="font-label-md text-label-md text-on-surface font-semibold"
              htmlFor="cancelReason"
            >
              Motivo de cancelación (opcional)
            </label>
            <select
              id="cancelReason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="h-12 px-space-md rounded-xl border border-outline-variant/50 bg-surface-container-low text-on-surface font-body-md text-body-md focus:ring-2 focus:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
            >
              <option value="Superposición de horarios laborales / personales">
                Superposición de horarios laborales / personales
              </option>
              <option value="Mejoría de síntomas o alta médica previa">
                Mejoría de síntomas o alta médica previa
              </option>
              <option value="Dificultad de traslado hacia la sede Belgrano">
                Dificultad de traslado hacia la sede Belgrano
              </option>
              <option value="Necesito reprogramar para el mes siguiente">
                Necesito reprogramar para el mes siguiente
              </option>
              <option value="Otro motivo">Otro motivo</option>
            </select>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-space-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-end gap-space-sm border-t border-surface-container">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto h-12 px-space-lg rounded-xl bg-surface-container-lowest text-on-surface font-label-lg text-label-lg hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 border border-outline-variant/30 cursor-pointer font-medium"
          >
            No cancelar, conservar turno
          </button>
          <button
            type="button"
            onClick={handleConfirmAction}
            className="w-full sm:w-auto h-12 px-space-lg rounded-xl bg-error text-on-error font-label-lg text-label-lg hover:opacity-90 flex items-center justify-center gap-space-xs transition-opacity shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 cursor-pointer font-semibold"
          >
            <Check className="h-4 w-4 stroke-[3]" />
            <span>Confirmar Cancelación y Liberar Turno</span>
          </button>
        </div>
      </div>
    </div>
  )
}
