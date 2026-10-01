"use client"

import React from "react"
import { Plus } from "lucide-react"
import { Appointment } from "@/types/appointments"
import { useAuth } from "@/features/auth/hooks/use-auth"

interface PatientHeroBannerProps {
  activeCount: number
  nextAppointment?: Appointment | null
  onNewAppointment?: () => void
}

export function PatientHeroBanner({
  activeCount,
  nextAppointment,
}: PatientHeroBannerProps) {
  const { user } = useAuth()

  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "María Florencia"
  const coverageDisplay = user?.coverageProvider
    ? `Cobertura validada: ${user.coverageProvider}${user.memberId ? ` (${user.memberId})` : ""}`
    : "Cobertura validada: OSDE 310"

  return (
    <section className="w-full bg-surface-container-low/70 py-space-xl border-b border-surface-container-high/60">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-space-xl">
          {/* Greeting and Context */}
          <div className="flex flex-col gap-space-2xs max-w-2xl">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Hola, {firstName}
            </h1>
            <p className="font-body-lg text-body-lg text-slate-700 leading-relaxed">
              Gestiona tus consultas médicas y turnos agendados.
            </p>
          </div>

          {/* Quick Booking CTA - Deshabilitado (Próximamente) */}
          <div className="shrink-0 flex items-center gap-space-sm">
            <button
              type="button"
              disabled
              aria-disabled="true"
              title="Agendamiento de nuevos turnos disponible próximamente"
              className="h-12 px-space-lg rounded-xl bg-slate-300 text-slate-600 font-label-lg text-label-lg flex items-center gap-space-xs shadow-none opacity-70 cursor-not-allowed select-none"
            >
              <Plus className="h-5 w-5 stroke-[2.5]" />
              <span className="font-semibold text-slate-600">Agendar Nuevo Turno</span>
            </button>
          </div>
        </div>

        {/* 2 Key Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-xl">
          {/* Metric 1: Next Appointment */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container-high flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-slate-700 font-semibold">
                Próximo Turno
              </span>
              <span className="font-label-sm text-label-sm text-tertiary font-bold">
                {nextAppointment ? nextAppointment.relativeTime : "Sin citas próximas"}
              </span>
            </div>
            <div className="mt-space-sm">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-md text-headline-md text-on-surface font-bold">
                  {nextAppointment
                    ? `${nextAppointment.displayDate}, ${nextAppointment.displayTime}`
                    : "No hay turnos pendientes"}
                </span>
              </div>
              <p className="font-body-md text-body-md text-slate-700 mt-1">
                {nextAppointment
                  ? `${nextAppointment.specialty} • ${nextAppointment.doctorName}`
                  : "Puede agendar un turno con nuestros especialistas en cualquier momento."}
              </p>
            </div>
            <div className="mt-space-xs pt-space-xs border-t border-surface-container flex items-center justify-between text-slate-600 font-label-sm text-[12px]">
              <span className="font-medium">
                {nextAppointment ? nextAppointment.venue.split("(")[0].trim() : "Red Asistencial Sentria"}
              </span>
              <span className="font-medium">
                {nextAppointment && nextAppointment.venue.includes("(")
                  ? nextAppointment.venue.split("(")[1].replace(")", "").trim()
                  : "Atención Digital / Presencial"}
              </span>
            </div>
          </div>

          {/* Metric 2: Confirmed Appointments */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container-high flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-slate-700 font-semibold">
                Turnos Confirmados
              </span>
              <span className="font-label-sm text-label-sm text-primary font-bold">
                Al día
              </span>
            </div>
            <div className="mt-space-sm">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-md text-headline-md text-on-surface font-bold">
                  {activeCount}
                </span>
                <span className="font-label-md text-label-md text-slate-700 font-medium">
                  {activeCount === 1 ? "cita programada" : "citas programadas"}
                </span>
              </div>
              <p className="font-body-md text-body-md text-slate-700 mt-1">
                {coverageDisplay}
              </p>
            </div>
            <div className="mt-space-xs pt-space-xs border-t border-surface-container flex items-center justify-between text-slate-600 font-label-sm text-[12px]">
              <span className="font-medium">Ambulatorio CABA</span>
              <span className="font-medium">Atención presencial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
