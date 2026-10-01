"use client"

import React from "react"
import { ShieldCheck, ChevronRight } from "lucide-react"

interface SettingsProfileHeaderProps {
  onNavigate?: (section: "turnos" | "triage" | "historial") => void
}

export function SettingsProfileHeader({ onNavigate }: SettingsProfileHeaderProps) {
  return (
    <>
      {/* Dynamic Gradient Ambient Backdrop */}
      <div className="absolute -top-12 right-12 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-4 w-80 h-80 bg-secondary-container/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Breadcrumb & Header Section */}
      <header className="flex flex-col gap-space-xs mb-space-2xl">
        <nav aria-label="Ruta de navegación" className="flex items-center gap-space-xs text-slate-500">
          <button
            type="button"
            onClick={() => onNavigate?.("turnos")}
            className="font-label-md text-label-md hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded cursor-pointer"
          >
            Inicio
          </button>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400 select-none" aria-hidden="true" />
          <span aria-current="page" className="font-label-md text-label-md text-primary font-semibold">
            Configuración
          </span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md pt-space-xs">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Configuración de la Cuenta
            </h1>
            <p className="font-body-lg text-body-lg text-slate-600 mt-1">
              Administra tu información personal, credenciales médicas, seguridad y preferencias del portal de salud.
            </p>
          </div>
          <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-space-xs rounded-full shadow-xs shrink-0">
            <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="font-label-sm text-label-sm text-slate-700 font-medium">
              Identidad Validada con RENAPER &amp; SSSALUD
            </span>
          </div>
        </div>
      </header>
    </>
  )
}
