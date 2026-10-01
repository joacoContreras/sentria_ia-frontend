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
        "bg-surface-container-lowest p-space-lg rounded-xl border transition-all duration-200 shadow-xs relative",
        isCancelled
          ? "border-slate-300 opacity-75"
          : isBlocked24h
          ? "border-surface-container-high"
          : "border-surface-container-high hover:border-primary/40"
      )}
    >
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-space-md pb-space-md border-b border-surface-container">
        <div className="flex flex-col">
          <div className="flex items-center gap-space-xs mb-1">
            {isBlocked24h ? (
              <>
                <span className="font-label-sm text-label-sm text-amber-800 font-bold">
                  Próximo a realizarse
                </span>
                <span aria-hidden="true" className="text-slate-400">
                  •
                </span>
                <span className="font-label-sm text-label-sm text-slate-600 font-medium">
                  Menos de 24 hs
                </span>
              </>
            ) : isCancelled ? (
              <span className="font-label-sm text-label-sm text-error font-bold">
                Cancelado en sesión
              </span>
            ) : (
              <>
                <span className="font-label-sm text-label-sm text-primary font-bold">
                  Confirmado
                </span>
                <span aria-hidden="true" className="text-slate-400">
                  •
                </span>
                <span className="font-label-sm text-label-sm text-slate-600 font-medium">
                  Reprogramable online
                </span>
              </>
            )}
          </div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            {appointment.specialty}
          </h2>
          <p className="font-body-md text-body-md text-slate-700 mt-0.5">
            {appointment.doctorName}{" "}
            {appointment.doctorLicense && (
              <span className="font-label-sm text-slate-600 font-normal">
                ({appointment.doctorLicense})
              </span>
            )}
          </p>
        </div>

        <div className="flex md:flex-col items-start md:items-end justify-between">
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {appointment.displayTime}
          </span>
          <span className="font-body-md text-body-md text-slate-700 font-medium">
            {appointment.displayDate}
          </span>
          <span
            className={cn(
              "font-label-sm text-label-sm font-semibold mt-0.5",
              isBlocked24h ? "text-tertiary font-bold" : "text-slate-600"
            )}
          >
            {appointment.relativeTime}
          </span>
        </div>
      </div>

      {/* Details Grid (Venue & Coverage) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md py-space-md text-slate-700 font-body-md text-body-md">
        <div>
          <span className="font-label-sm text-[11px] text-slate-600 uppercase block font-bold mb-0.5">
            Sede
          </span>
          <p className="text-on-surface font-semibold">{appointment.venue}</p>
          <p className="font-label-sm text-label-sm text-slate-600">
            {appointment.venueAddress}
          </p>
        </div>
        <div>
          <span className="font-label-sm text-[11px] text-slate-600 uppercase block font-bold mb-0.5">
            Cobertura
          </span>
          <p className="text-on-surface font-semibold">
            {appointment.coverageProvider}
          </p>
          <p className="font-label-sm text-label-sm text-slate-600">
            {appointment.coverageStatus}
          </p>
        </div>
      </div>

      {/* Case <= 24h Warning Notice Callout */}
      {isBlocked24h && (
        <div
          className="p-space-sm rounded-lg bg-surface-container text-slate-700 font-body-md text-body-md mb-space-md"
          id={`aviso-bloqueo-${appointment.id}`}
        >
          <p className="font-label-sm text-label-sm text-slate-700">
            Por proximidad del horario (menos de 24 hs), comunícate
            telefónicamente con recepción para gestionar cambios o
            cancelaciones.
          </p>
        </div>
      )}

      {/* Actions Footer */}
      {!isCancelled && (
        <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-md border-t border-surface-container">
          {isBlocked24h ? (
            <>
              {/* Llamar a recepción - Deshabilitado */}
              <button
                type="button"
                disabled
                aria-disabled="true"
                title="Línea telefónica directa disponible próximamente"
                className="h-10 px-space-md rounded-lg bg-surface-container text-slate-500 font-label-md text-label-md font-semibold flex items-center gap-space-2xs opacity-60 cursor-not-allowed select-none"
              >
                <Phone className="h-4 w-4 text-slate-400" />
                <span>Llamar a Recepción (011 4789-2200)</span>
              </button>
              <button
                aria-describedby={`aviso-bloqueo-${appointment.id}`}
                aria-disabled="true"
                disabled
                className="h-10 px-space-md rounded-lg bg-surface-container text-slate-500 font-label-md text-label-md cursor-not-allowed opacity-60 transition-colors select-none"
                type="button"
              >
                Gestión online deshabilitada
              </button>
            </>
          ) : (
            <>
              <span className="font-label-sm text-label-sm text-slate-600 font-medium">
                {appointment.managementDeadline || "Gestión online habilitada"}
              </span>
              <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
                <button
                  type="button"
                  className="h-10 px-space-md rounded-lg text-error hover:bg-error-container/30 font-label-md text-label-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2 cursor-pointer font-semibold"
                  onClick={() => onOpenCancel(appointment)}
                >
                  Cancelar cita
                </button>
                <button
                  type="button"
                  className="h-10 px-space-md rounded-lg bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-label-md font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer"
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
            <p className="font-label-sm text-label-sm text-slate-600">
              El turno fue liberado para lista de espera.
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1 px-space-md py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-variant transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 shadow-xs cursor-pointer"
            onClick={() => onRestore(appointment.id)}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Deshacer</span>
          </button>
        </div>
      )}
    </article>
  )
}
