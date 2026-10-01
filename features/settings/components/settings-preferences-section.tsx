"use client"

import React from "react"
import { Sliders, MessageSquare, MailCheck, CalendarClock } from "lucide-react"

interface SettingsPreferencesSectionProps {
  whatsappReminders: boolean
  emailResults: boolean
  fastSlotAlerts: boolean
  onToggle?: (field: "whatsappReminders" | "emailResults" | "fastSlotAlerts", value: boolean) => void
}

export function SettingsPreferencesSection({
  whatsappReminders,
  emailResults,
  fastSlotAlerts,
}: SettingsPreferencesSectionProps) {
  return (
    <section
      aria-labelledby="heading-preferencias"
      className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-xs border border-surface-container/60 flex flex-col gap-space-lg"
      id="preferencias-notificaciones"
    >
      <div className="flex items-center justify-between pb-space-sm border-b border-surface-container/50">
        <div className="flex items-center gap-space-sm">
          <span className="p-2.5 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
            <Sliders className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold" id="heading-preferencias">
              Preferencias y Notificaciones
            </h2>
            <p className="font-body-md text-body-md text-slate-500">
              Controla cómo y cuándo nos comunicamos contigo respecto a tu atención de salud.
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[11px] font-semibold">
          Deshabilitado
        </span>
      </div>

      <div className="flex flex-col divide-y divide-surface-container-low opacity-70">
        {/* Notification Toggle 1 (Disabled) */}
        <div className="flex items-center justify-between py-space-md first:pt-0">
          <div className="flex items-start gap-space-md max-w-xl">
            <MessageSquare className="h-6 w-6 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-body-md-medium text-body-md-medium text-slate-800 font-semibold">
                Recordatorios de turnos por WhatsApp
              </h3>
              <p className="font-label-sm text-label-sm text-slate-500 mt-0.5 leading-relaxed">
                Recibe aviso 24 horas y 2 horas antes de tu consulta, con enlace de confirmación inmediata.
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-not-allowed shrink-0 ml-4">
            <input
              checked={whatsappReminders}
              disabled
              className="sr-only peer"
              id="toggle-whatsapp"
              type="checkbox"
            />
            <div className="w-14 h-8 bg-slate-200 cursor-not-allowed rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-slate-400 shadow-inner" />
            <span className="sr-only">Notificaciones de WhatsApp (deshabilitado)</span>
          </label>
        </div>

        {/* Notification Toggle 2 (Disabled) */}
        <div className="flex items-center justify-between py-space-md">
          <div className="flex items-start gap-space-md max-w-xl">
            <MailCheck className="h-6 w-6 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-body-md-medium text-body-md-medium text-slate-800 font-semibold">
                Resultados de estudios y recetas por correo
              </h3>
              <p className="font-label-sm text-label-sm text-slate-500 mt-0.5 leading-relaxed">
                Alerta instantánea cuando un profesional cargue una receta digital o un informe de laboratorio.
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-not-allowed shrink-0 ml-4">
            <input
              checked={emailResults}
              disabled
              className="sr-only peer"
              id="toggle-email-results"
              type="checkbox"
            />
            <div className="w-14 h-8 bg-slate-200 cursor-not-allowed rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-slate-400 shadow-inner" />
            <span className="sr-only">Avisos de resultados por correo (deshabilitado)</span>
          </label>
        </div>

        {/* Notification Toggle 3 (Disabled) */}
        <div className="flex items-center justify-between py-space-md last:pb-0">
          <div className="flex items-start gap-space-md max-w-xl">
            <CalendarClock className="h-6 w-6 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h3 className="font-body-md-medium text-body-md-medium text-slate-800 font-semibold">
                Alertas de turnos cancelados (Adelantamiento)
              </h3>
              <p className="font-label-sm text-label-sm text-slate-500 mt-0.5 leading-relaxed">
                Te avisamos prioritariamente si se libera un turno antes de tu fecha original con tu médico de cabecera.
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-not-allowed shrink-0 ml-4">
            <input
              checked={fastSlotAlerts}
              disabled
              className="sr-only peer"
              id="toggle-fast-slot"
              type="checkbox"
            />
            <div className="w-14 h-8 bg-slate-200 cursor-not-allowed rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-slate-400 shadow-inner" />
            <span className="sr-only">Alertas de adelanto de turnos (deshabilitado)</span>
          </label>
        </div>
      </div>
    </section>
  )
}
