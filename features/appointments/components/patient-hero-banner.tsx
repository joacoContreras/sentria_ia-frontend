"use client"

import React from "react"
import { Calendar, Plus, ShieldCheck } from "lucide-react"
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
              Revisa tus citas programadas, historial de atenciones y gestiona nuevos turnos.
            </p>
          </div>

          <div className="flex items-center gap-space-sm shrink-0">
            <button
              type="button"
              onClick={onNewAppointment}
              className="h-12 px-space-lg rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-space-xs shadow-md hover:bg-primary-container transition-all cursor-pointer font-semibold active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <Plus className="h-5 w-5 stroke-[2.5]" aria-hidden="true" />
              <span>Nuevo Turno</span>
            </button>
          </div>
        </div>

        {/* Focused Context Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md mt-space-xl">
          {/* Card 1: Próximo Turno */}
          <div className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl shadow-sm flex items-start gap-space-md border border-outline-variant/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0 border border-outline-variant/20">
              <Calendar className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-outline">
                  Próximo Turno
                </span>
                {nextAppointment && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary-container text-on-secondary-container">
                    Confirmado
                  </span>
                )}
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1 truncate">
                {nextAppointment ? nextAppointment.specialty : "Sin turnos pendientes"}
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                {nextAppointment
                  ? `${nextAppointment.doctorName} • ${nextAppointment.displayDate}, ${nextAppointment.displayTime}`
                  : "No tienes consultas agendadas para los próximos días."}
              </p>
            </div>
          </div>

          {/* Card 2: Cobertura Activa */}
          <div className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl shadow-sm flex items-start gap-space-md border border-outline-variant/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0 border border-outline-variant/20">
              <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-outline">
                  Cobertura Médica
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-surface-container-high/60 text-on-surface-variant border border-outline-variant/30">
                  Verificada
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">
                {coverageDisplay}
              </span>
              <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                Afiliado N° {memberIdDisplay} • Plan Integral Sentria
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
