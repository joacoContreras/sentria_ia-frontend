"use client"

import React from "react"
import { CheckCircle2, FileText } from "lucide-react"
import { Appointment } from "@/types/appointments"

interface AppointmentHistoryCardProps {
  appointment: Appointment
  onViewSummary?: (appointment: Appointment) => void
}

export function AppointmentHistoryCard({
  appointment,
  onViewSummary,
}: AppointmentHistoryCardProps) {
  return (
    <article className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-primary/40 transition-colors">
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container text-primary shrink-0 border border-outline-variant/20">
          <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden="true" />
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              {appointment.specialty}
            </h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-container-high/60 text-on-surface-variant border border-outline-variant/30">
              Atendido
            </span>
          </div>
          <p className="text-sm text-on-surface-variant mt-0.5">
            {appointment.doctorName} • {appointment.displayDate} ({appointment.displayTime})
          </p>
          <p className="text-xs text-primary font-medium mt-0.5">
            {appointment.clinicalNote || "Atención finalizada • Informe y evolución clínica disponible"}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onViewSummary?.(appointment)}
        className="px-3.5 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold shrink-0 inline-flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer border border-outline-variant/30"
      >
        <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
        <span>Ver Resumen</span>
      </button>
    </article>
  )
}
