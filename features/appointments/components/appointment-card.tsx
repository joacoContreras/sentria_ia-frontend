"use client"

import React from "react"
import { Phone, RotateCcw } from "lucide-react"
import { Appointment } from "@/types/appointments"
import { cn } from "@/lib/utils"

interface AppointmentCardProps {
  appointment: Appointment
  onOpenCancel: (appointment: Appointment) => void
  onOpenReschedule: (appointment: Appointment) => void
  onRestore: (appointmentId: string) => void
}

export function AppointmentCard({
  appointment,
  onOpenCancel,
  onOpenReschedule,
  onRestore,
}: AppointmentCardProps) {
  const isBlocked24h = appointment.rule === "bloqueado_24h"
  const isCancelled = appointment.isCancelledInSession

  return (
    <article
      id={`card-${appointment.id}`}
      className={cn(
        "bg-surface-container-lowest p-space-lg rounded-2xl border transition-all duration-200 shadow-sm relative",
        isCancelled
          ? "border-outline-variant/50 opacity-75"
          : isBlocked24h
          ? "border-outline-variant/40"
          : "border-outline-variant/30 hover:border-primary/40"
      )}
    >
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-space-md pb-space-md border-b border-surface-container/60">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs mb-1.5">
            {isBlocked24h ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-tertiary/10 text-tertiary border border-tertiary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary" aria-hidden="true" />
                <span>Próximo a realizarse (&lt; 24 hs)</span>
              </span>
            ) : isCancelled ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-error-container/30 text-error border border-error/20">
                <span className="w-1.5 h-1.5 rounded-full bg-error" aria-hidden="true" />
                <span>Cancelado en sesión</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-container text-on-secondary-container">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                <span>Confirmado • Reprogramable online</span>
              </span>
            )}
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            {appointment.specialty}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            {appointment.doctorName}{" "}
            {appointment.doctorLicense && (
              <span className="text-xs text-outline font-normal">
                ({appointment.doctorLicense})
              </span>
            )}
          </p>
        </div>

        <div className="flex md:flex-col items-start md:items-end justify-between bg-surface-container-low/60 md:bg-transparent p-3 md:p-0 rounded-xl border border-outline-variant/20 md:border-0">
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {appointment.displayTime}
          </span>
          <span className="font-body-md text-body-md text-on-surface-variant font-medium">
            {appointment.displayDate}
          </span>
          <span
            className={cn(
              "text-xs font-semibold mt-0.5",
              isBlocked24h ? "text-tertiary font-bold" : "text-on-surface-variant"
            )}
          >
            {appointment.relativeTime}
          </span>
        </div>
      </div>

      {/* Details Grid (Venue & Coverage) in Minimalist Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm py-space-md">
        <div className="bg-surface-container-low/60 border border-outline-variant/20 rounded-xl p-3.5 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">
            Sede y Ubicación
          </span>
          <p className="text-on-surface font-semibold text-sm">{appointment.venue}</p>
          <p className="text-xs text-on-surface-variant mt-0.5">
            {appointment.venueAddress}
          </p>
        </div>
        <div className="bg-surface-container-low/60 border border-outline-variant/20 rounded-xl p-3.5 flex flex-col justify-between">
          <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block mb-1">
            Cobertura Médica
          </span>
          <p className="text-on-surface font-semibold text-sm">
            {appointment.coverageProvider}
          </p>
          <p className="text-xs text-on-surface-variant mt-0.5">
            {appointment.coverageStatus}
          </p>
        </div>
      </div>

      {/* Case <= 24h Warning Notice Callout */}
      {isBlocked24h && (
        <div
          className="p-3.5 rounded-xl bg-surface-container-low text-on-surface mb-space-md border border-outline-variant/20"
          id={`aviso-bloqueo-${appointment.id}`}
        >
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Por proximidad del horario (menos de 24 hs), la modificación online se encuentra cerrada para preservar la agenda de guardia y consultorios. Comunícate telefónicamente con recepción para gestionar cambios.
          </p>
        </div>
      )}

      {/* Actions Footer */}
      {!isCancelled && (
        <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-md border-t border-surface-container/60">
          {isBlocked24h ? (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-space-sm">
              <span className="text-xs text-outline font-medium">
                Gestión online cerrada (&lt; 24 hs)
              </span>
              <a
                href="tel:01147892200"
                className="h-10 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors border border-outline-variant/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                <span>Llamar a Recepción (011 4789-2200)</span>
              </a>
            </div>
          ) : (
            <>
              <span className="text-xs text-on-surface-variant font-medium">
                {appointment.managementDeadline || "Gestión online habilitada"}
              </span>
              <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
                <button
                  type="button"
                  className="h-10 px-4 rounded-xl text-error hover:bg-error-container/20 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 cursor-pointer font-semibold border border-transparent hover:border-error/20"
                  onClick={() => onOpenCancel(appointment)}
                >
                  Cancelar cita
                </button>
                <button
                  type="button"
                  className="h-10 px-4 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer border border-outline-variant/30"
                  onClick={() => onOpenReschedule(appointment)}
                >
                  Reprogramar cita
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Undo Banner if Cancelled in current session */}
      {isCancelled && (
        <div className="mt-space-md p-space-md rounded-xl bg-surface-container text-on-surface flex items-center justify-between border border-outline-variant/30 animate-in fade-in">
          <div>
            <p className="font-body-md-medium text-body-md-medium text-on-surface font-semibold">
              Turno Cancelado
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              El turno fue liberado para lista de espera.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-space-md py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-xs cursor-pointer border border-outline-variant/30"
            onClick={() => onRestore(appointment.id)}
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Deshacer</span>
          </button>
        </div>
      )}
    </article>
  )
}
