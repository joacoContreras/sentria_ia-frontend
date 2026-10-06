"use client"

import React from "react"
import { Lock, KeyRound, Smartphone, Laptop, LogOut } from "lucide-react"
import { UserSession } from "../types/settings"

interface SettingsSecuritySectionProps {
  passwordLastUpdated: string
  twoFactorEnabled: boolean
  sessions: UserSession[]
  onToggle2FA?: (enabled: boolean) => void
  onOpenChangePassword: () => void
  onCloseSession?: (sessionId: string) => void
  onCloseAllOtherSessions?: () => void
}

export function SettingsSecuritySection({
  passwordLastUpdated,
  twoFactorEnabled,
  sessions,
  onOpenChangePassword,
}: SettingsSecuritySectionProps) {
  return (
    <section
      aria-labelledby="heading-seguridad"
      className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-xs border border-surface-container/60 flex flex-col gap-space-lg"
      id="seguridad-acceso"
    >
      <div className="flex items-center justify-between pb-space-sm border-b border-surface-container/50">
        <div className="flex items-center gap-space-sm">
          <span className="p-2.5 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
            <Lock className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold" id="heading-seguridad">
              Seguridad y Acceso
            </h2>
            <p className="font-body-md text-body-md text-slate-500">
              Protege tu acceso a historias clínicas y recetas digitales.
            </p>
          </div>
        </div>
      </div>

      {/* Password Row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-space-md bg-surface-container-low rounded-xl gap-space-md border border-surface-container/60">
        <div className="flex items-center gap-space-md">
          <KeyRound className="h-6 w-6 text-slate-600 shrink-0" aria-hidden="true" />
          <div>
            <h3 className="font-body-md-medium text-body-md-medium text-slate-800 font-semibold">
              Contraseña de acceso
            </h3>
            <p className="font-label-sm text-label-sm text-slate-500">
              Última actualización: {passwordLastUpdated}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenChangePassword}
          className="h-10 px-space-md bg-surface-container-lowest hover:bg-surface text-primary font-label-lg text-label-lg rounded-xl shadow-2xs border border-surface-container transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer font-medium"
        >
          Cambiar contraseña
        </button>
      </div>

      {/* 2FA Multi-factor Toggle Block (Disabled) */}
      <div className="flex items-center justify-between p-space-md bg-surface-container-low/60 rounded-xl border border-surface-container/60 opacity-70">
        <div className="flex items-start gap-space-md max-w-xl">
          <Smartphone className="h-6 w-6 text-slate-500 shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-body-md-medium text-body-md-medium text-slate-800 font-semibold">
                Autenticación en dos pasos (2FA)
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[11px] font-semibold">
                Deshabilitado
              </span>
            </div>
            <p className="font-label-sm text-label-sm text-slate-500 mt-0.5">
              Te enviaremos un código temporal por WhatsApp o SMS cada vez que inicies sesión desde un dispositivo nuevo.
            </p>
          </div>
        </div>

        {/* Custom Accessible Toggle (Disabled) */}
        <label className="relative inline-flex items-center cursor-not-allowed shrink-0 ml-4">
          <input
            checked={twoFactorEnabled}
            disabled
            className="sr-only peer"
            id="toggle-2fa"
            type="checkbox"
          />
          <div className="w-14 h-8 bg-slate-200 cursor-not-allowed rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-slate-400 shadow-inner" />
          <span className="sr-only">Autenticación en dos factores (deshabilitada)</span>
        </label>
      </div>

      {/* Active Sessions Monitor (Disabled) */}
      <div className="flex flex-col gap-space-sm pt-space-xs opacity-70">
        <div className="flex items-center justify-between">
          <h3 className="font-body-md-medium text-body-md-medium text-slate-800 font-semibold flex items-center gap-1.5">
            <Laptop className="h-4 w-4 text-slate-500" aria-hidden="true" />
            Dispositivos y Sesiones Activas
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-slate-200 text-slate-600 text-[11px] font-semibold">
            Deshabilitado
          </span>
        </div>

        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between p-space-md rounded-xl bg-surface-container-low/40 border border-surface-container/40"
          >
            <div className="flex items-center gap-space-md">
              {session.type === "smartphone" ? (
                <Smartphone className="h-6 w-6 text-slate-500 shrink-0" aria-hidden="true" />
              ) : (
                <Laptop className="h-6 w-6 text-slate-500 shrink-0" aria-hidden="true" />
              )}
              <div>
                <p className="font-body-md-medium text-body-md-medium text-slate-700 font-medium">
                  {session.device} • {session.location}
                </p>
                <p className="font-label-sm text-label-sm text-slate-500 font-medium">
                  {session.activity}
                </p>
              </div>
            </div>

            {session.isCurrent ? (
              <span className="font-label-sm text-label-sm text-slate-400 font-medium">
                Este dispositivo
              </span>
            ) : (
              <button
                type="button"
                disabled
                className="font-label-md text-label-md text-slate-400 cursor-not-allowed p-1 font-medium"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        ))}

        <div className="pt-2">
          <button
            type="button"
            disabled
            className="text-slate-400 text-xs font-medium flex items-center gap-1.5 cursor-not-allowed p-1"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Cerrar sesión en todos los demás navegadores y equipos</span>
          </button>
        </div>
      </div>
    </section>
  )
}
