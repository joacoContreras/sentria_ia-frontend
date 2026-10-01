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
}: AppointmentHistoryCardProps) {
  return (
    <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
      <div className="flex items-start sm:items-center gap-space-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            {appointment.specialty}
          </h3>
          <p className="font-label-md text-label-md text-slate-700">
            {appointment.doctorName} • {appointment.displayDate}
          </p>
          <p className="font-label-sm text-label-sm text-primary font-semibold mt-0.5">
            {appointment.clinicalNote || "Atendido • Informe de atención disponible"}
          </p>
        </div>
      </div>
      <button
        type="button"
        disabled
        aria-disabled="true"
        title="Descarga de resúmenes clínicos disponible próximamente"
        className="px-space-md py-space-xs rounded-xl bg-surface-container text-slate-400 font-label-md text-label-md opacity-50 cursor-not-allowed shrink-0 inline-flex items-center gap-1.5 font-medium select-none"
      >
        <FileText className="h-4 w-4 text-slate-400" />
        <span>Ver resumen de atención</span>
      </button>
    </div>
  )
}
