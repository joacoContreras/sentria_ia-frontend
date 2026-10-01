"use client"

import React from "react"
import { XCircle } from "lucide-react"
import { Appointment } from "@/types/appointments"

interface AppointmentCanceledCardProps {
  appointment: Appointment
}

export function AppointmentCanceledCard({
  appointment,
}: AppointmentCanceledCardProps) {
  return (
    <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex items-start sm:items-center gap-3.5">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error-container/20 text-error shrink-0 border border-error/20">
          <XCircle className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            {appointment.specialty}
          </h3>
          <p className="text-sm text-on-surface-variant mt-0.5">
            {appointment.doctorName} • {appointment.displayDate}
          </p>
          <p className="text-xs text-error font-medium mt-0.5">
            {appointment.cancellationReason || "Cancelado con aviso previo"}
          </p>
        </div>
      </div>
      <span className="text-xs font-medium text-on-surface-variant bg-surface-container-high/60 border border-outline-variant/30 px-3 py-1 rounded-full self-start sm:self-auto">
        Cancelado online
      </span>
    </div>
  )
}
