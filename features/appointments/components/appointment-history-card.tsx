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
    <article className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md hover:border-primary/40 transition-colors">
      <div className="flex items-start sm:items-center gap-space-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
          <CheckCircle2 className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <div>
          <div className="flex items-center gap-space-xs flex-wrap">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              {appointment.specialty}
            </h3>
            <span className="px-2 py-0.5 rounded-full text-label-sm font-label-sm bg-surface-container text-on-surface-variant font-medium">
              Atendido
            </span>
          </div>
          <p className="font-body-md text-body-md text-slate-700 mt-0.5">
            {appointment.doctorName} • {appointment.displayDate} ({appointment.displayTime})
          </p>
          <p className="font-label-sm text-label-sm text-primary font-semibold mt-0.5">
            {appointment.clinicalNote || "Atención finalizada • Informe y evolución clínica disponible"}
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => onViewSummary?.(appointment)}
        className="px-space-md py-space-xs rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md shrink-0 inline-flex items-center gap-1.5 font-semibold transition-colors focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer"
      >
        <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
        <span>Ver Resumen</span>
      </button>
    </article>
  )
}
