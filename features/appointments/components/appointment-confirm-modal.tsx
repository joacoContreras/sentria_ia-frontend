"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  MapPin,
  ShieldCheck,
  Video,
  X,
} from "lucide-react"
import { Appointment, AvailableTurnoSlot, BookAppointmentInput } from "@/types/appointments"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { cn } from "@/lib/utils"

interface AppointmentConfirmModalProps {
  isOpen: boolean
  slot: AvailableTurnoSlot | null
  existingAppointments?: Appointment[]
  onClose: () => void
  onConfirm: (input: BookAppointmentInput) => Promise<void> | void
}

const REASON_OPTIONS = [
  "Control rutinario / Chequeo anual",
  "Primera consulta / Evaluación inicial",
  "Seguimiento de tratamiento médico",
  "Revisión de resultados de laboratorio e imágenes",
  "Renovación de recetas y prescripciones",
  "Interconsulta derivada por otro especialista",
]

export function AppointmentConfirmModal({
  isOpen,
  slot,
  existingAppointments = [],
  onClose,
  onConfirm,
}: AppointmentConfirmModalProps) {
  const { user } = useAuth()
  const modalRef = useRef<HTMLDivElement>(null)

  const [reason, setReason] = useState<string>(REASON_OPTIONS[0])
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // RNF-01: Verificación de solapamiento de horarios
  const hasOverlap = Boolean(
    slot &&
      existingAppointments.some(
        (a) =>
          a.status === "confirmado" &&
          !a.isCancelledInSession &&
          (a.displayDate === slot.dateDisplay || a.appointmentDate.startsWith(slot.date)) &&
          a.displayTime === slot.time
      )
  )

  useEffect(() => {
    if (!isOpen) return
    const closeBtn = modalRef.current?.querySelector<HTMLElement>(
      'button[aria-label="Cerrar modal de confirmación"]'
    )
    closeBtn?.focus()
  }, [isOpen])

  // Accesibilidad con teclado (Escape y Tab trapping)
  useEffect(() => {
    if (!isOpen) return

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
  }, [isOpen, onClose, isSubmitting])

  if (!isOpen || !slot) return null

  const handleBooking = async () => {
    if (isSubmitting || hasOverlap) return
    setIsSubmitting(true)

    try {
      await onConfirm({
        specialty: slot.specialty,
        doctorName: slot.doctorName,
        doctorLicense: slot.doctorLicense,
        venue: slot.venue,
        venueAddress: slot.venueAddress,
        dateDisplay: slot.dateDisplay,
        timeDisplay: slot.time,
        coverageProvider: user?.coverageProvider || "OSDE 310 • Copago $0",
        reason,
      })
      onClose()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={() => {
          if (!isSubmitting) onClose()
        }}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div
        ref={modalRef}
        className="relative w-full max-w-lg bg-surface-container-lowest rounded-3xl shadow-2xl border border-outline-variant/30 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Cabecera del Modal */}
        <div className="px-6 py-5 border-b border-surface-container flex items-center justify-between gap-3 bg-surface-container-low/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
              <Calendar className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2
                id="confirm-modal-title"
                className="font-headline-sm text-headline-sm text-on-surface font-bold"
              >
                Confirmar Reserva de Turno
              </h2>
              <p className="text-xs text-on-surface-variant">
                Paso previo a la asignación definitiva del horario
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Cerrar modal de confirmación"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 flex flex-col gap-5 max-h-[75vh] overflow-y-auto">
          {/* Tarjeta de Resumen del Turno Seleccionado */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  {slot.specialty}
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-0.5">
                  {slot.doctorName}
                </span>
                <span className="text-xs text-outline font-medium">
                  {slot.doctorLicense}
                </span>
              </div>

              <div className="px-2.5 py-1 rounded-full text-xs font-semibold bg-surface-container-lowest text-on-surface border border-outline-variant/30 shrink-0">
                {slot.consultorio}
              </div>
            </div>

            {/* Fecha, Hora y Sede */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-surface-container/70">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center shrink-0">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-outline font-medium uppercase">Fecha</span>
                  <span className="text-xs font-bold text-on-surface">
                    {slot.dateDisplay}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center shrink-0">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-outline font-medium uppercase">Horario</span>
                  <span className="text-xs font-bold text-on-surface">
                    {slot.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 sm:col-span-2">
                <div className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center shrink-0">
                  {slot.isTeleconsulta ? (
                    <Video className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-outline font-medium uppercase">Ubicación</span>
                  <span className="text-xs font-bold text-on-surface">
                    {slot.venue} • {slot.venueAddress}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Verificación de Regla Anti-Solapamiento (RNF-01) */}
          <div
            role="status"
            aria-live="polite"
            className={cn(
              "p-4 rounded-xl flex items-start gap-3 border transition-colors",
              hasOverlap
                ? "bg-red-50 text-red-900 border-red-200"
                : "bg-emerald-50 text-emerald-950 border-emerald-200"
            )}
          >
            {hasOverlap ? (
              <AlertTriangle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
            )}

            <div className="flex flex-col">
              <span className="text-xs font-bold uppercase tracking-wider">
                {hasOverlap
                  ? "Solapamiento detectado (RNF-01)"
                  : "Horario verificado sin solapamiento (RNF-01)"}
              </span>
              <p className="text-xs mt-0.5 leading-relaxed">
                {hasOverlap
                  ? "Ya posees un turno médico confirmado para este mismo día y horario. Por favor selecciona otro bloque horario disponible."
                  : "Verificado contra tu agenda médica y órdenes vigentes. Este espacio se reservará de manera inmediata y exclusiva."}
              </p>
            </div>
          </div>

          {/* Datos del Paciente y Cobertura */}
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="font-semibold text-on-surface">
                  {user?.fullName || "María Florencia Gómez"}
                </span>
                <span className="text-outline">
                  {user?.coverageProvider || "OSDE 310"} • Afiliado {user?.memberId || "492-3849102-01"}
                </span>
              </div>
            </div>
            <span className="font-semibold text-primary px-2 py-0.5 rounded-md bg-primary-container text-[11px]">
              Copago $0
            </span>
          </div>

          {/* Selector de Motivo de Consulta */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="booking-reason"
              className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              <span>Motivo de Consulta</span>
            </label>
            <select
              id="booking-reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full h-11 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 appearance-none cursor-pointer pl-3.5 pr-8 transition-all hover:border-slate-300 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10"
            >
              {REASON_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pie de Acciones */}
        <div className="px-6 py-4 bg-surface-container-low border-t border-surface-container flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="w-full sm:w-auto h-11 px-5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all cursor-pointer disabled:opacity-50"
          >
            Volver
          </button>

          <button
            type="button"
            onClick={handleBooking}
            disabled={isSubmitting || hasOverlap}
            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                <span>Confirmando Reserva...</span>
              </>
            ) : (
              <span>Confirmar Reserva Definitiva</span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
