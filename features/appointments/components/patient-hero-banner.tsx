"use client"

import React from "react"
import { Calendar, History, Plus, ShieldCheck } from "lucide-react"
import { Appointment } from "@/types/appointments"
import { useAuth } from "@/features/auth/hooks/use-auth"

interface PatientHeroBannerProps {
  activeCount: number
  nextAppointment?: Appointment | null
  onNewAppointment?: () => void
}

export function PatientHeroBanner({
  nextAppointment,
  onNewAppointment,
}: PatientHeroBannerProps) {
  const { user } = useAuth()

  const firstName = user?.fullName ? user.fullName.split(" ")[0] : "María Florencia"
  const coverageDisplay = user?.coverageProvider || "OSDE 310"
  const memberIdDisplay = user?.memberId || "29-450912-01"

  return (
    <section className="w-full bg-surface-container-low/70 py-space-xl border-b border-surface-container-high/60">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-md">
          <div className="flex flex-col gap-space-2xs">
            <div className="flex items-center gap-space-xs">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-container text-on-secondary-container font-semibold">
                Gestión Ambulatoria
              </span>
              <span className="font-label-sm text-label-sm text-outline font-medium">
                • Portal de Pacientes
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              Hola, {firstName}
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Próximas consultas programadas, historial ambulatorio y seguimiento telemétrico.
            </p>
          </div>

          <div className="flex items-center gap-space-sm shrink-0">
            <button
              type="button"
              onClick={onNewAppointment}
              className="h-12 px-space-lg rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-space-xs shadow-md hover:bg-primary-container transition-all cursor-pointer font-semibold active:scale-[0.98]"
            >
              <Plus className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
              <span>Nuevo Turno</span>
            </button>
          </div>
        </div>

        {/* 3 Metric Cards matching design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mt-space-xl">
          {/* Card 1: Próximo Turno */}
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex items-start gap-space-md border border-outline-variant/30">
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <Calendar className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                Próximo Turno
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {nextAppointment ? nextAppointment.specialty : "Sin citas próximas"}
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                {nextAppointment
                  ? `${nextAppointment.doctorName} • ${nextAppointment.displayDate}, ${nextAppointment.displayTime}`
                  : "No tienes turnos pendientes"}
              </span>
            </div>
          </div>

          {/* Card 2: Cobertura Activa */}
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex items-start gap-space-md border border-outline-variant/30">
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <ShieldCheck className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                Cobertura Activa
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {coverageDisplay}
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                Afiliado N° {memberIdDisplay} • Vigente
              </span>
            </div>
          </div>

          {/* Card 3: Consultas 2024 */}
          <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex items-start gap-space-md border border-outline-variant/30">
            <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <History className="h-6 w-6 text-primary" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                Consultas 2024
              </span>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                6 Asistidas
              </span>
              <span className="font-body-md text-body-md text-on-surface-variant">
                Sin ausencias registradas
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
