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
    <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-xs border border-surface-container-high flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
      <div className="flex items-start sm:items-center gap-space-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-error-container/20 text-error shrink-0">
          <XCircle className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            {appointment.specialty}
          </h3>
          <p className="font-label-md text-label-md text-slate-700">
            {appointment.doctorName} • {appointment.displayDate}
          </p>
          <p className="font-label-sm text-label-sm text-error font-medium mt-0.5">
            {appointment.cancellationReason || "Cancelado con aviso previo"}
          </p>
        </div>
      </div>
      <span className="font-label-sm text-label-sm text-slate-600 bg-surface-container px-3 py-1 rounded-lg self-start sm:self-auto font-medium">
        Cancelado online
      </span>
    </div>
  )
}
