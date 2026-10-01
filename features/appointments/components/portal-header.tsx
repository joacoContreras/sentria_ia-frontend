"use client"

import React from "react"
import { Activity, User, LogOut } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { AppointmentTab, PortalSection } from "@/types/appointments"
import { cn } from "@/lib/utils"

interface PortalHeaderProps {
  activeSection: PortalSection
  activeTab: AppointmentTab
  onSelectSection: (section: PortalSection) => void
  onSelectTab: (tab: AppointmentTab) => void
}

export function PortalHeader({
  activeSection,
  activeTab,
  onSelectSection,
  onSelectTab,
}: PortalHeaderProps) {
  const { user, logout } = useAuth()

  const displayName = user?.fullName || "María Florencia Gómez"
  const displayDocNumber = user?.docNumber ? `DNI ${user.docNumber}` : "DNI 38.452.901"

  const isMisTurnosActive = activeSection === "turnos" && activeTab === "upcoming"
  const isAyudaActive = activeSection === "ayuda"

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/30"
      role="banner"
    >
      <div className="h-20 max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop flex items-center justify-between gap-space-lg">
        {/* Brand & Logo */}
        <button
          type="button"
          onClick={() => {
            onSelectSection("turnos")
            onSelectTab("upcoming")
          }}
          className="flex items-center gap-space-md shrink-0 group text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-on-primary shadow-xs group-hover:bg-primary-container transition-colors">
            <Activity className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="font-headline-sm text-headline-sm text-primary font-semibold tracking-tight">
            Sentria AI
          </span>
        </button>

        {/* Primary Navigation within Portal Context */}
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-space-xs">
          <button
            type="button"
            onClick={() => {
              onSelectSection("turnos")
              onSelectTab("upcoming")
            }}
            className={cn(
              "px-space-md py-space-xs transition-all rounded-lg font-label-lg text-label-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer",
              isMisTurnosActive
                ? "bg-primary-container text-on-primary font-semibold shadow-xs"
                : "text-slate-700 hover:bg-surface-container-high hover:text-on-surface font-medium"
            )}
            aria-current={isMisTurnosActive ? "page" : undefined}
          >
            Mis Turnos
          </button>

          {/* Triage & Síntomas - Deshabilitado (Próximamente) */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Módulo de Triage en desarrollo (Próximamente)"
            className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-slate-400 opacity-50 cursor-not-allowed select-none"
          >
            Triage & Síntomas
          </button>

          {/* Historial Clínico - Deshabilitado (Próximamente) */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Historial Clínico en desarrollo (Próximamente)"
            className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-slate-400 opacity-50 cursor-not-allowed select-none"
          >
            Historial Clínico
          </button>

          <button
            type="button"
            onClick={() => onSelectSection("ayuda")}
            className={cn(
              "px-space-md py-space-xs transition-all rounded-lg font-label-lg text-label-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer",
              isAyudaActive
                ? "bg-primary-container text-on-primary font-semibold shadow-xs"
                : "text-slate-700 hover:bg-surface-container-high hover:text-on-surface font-medium"
            )}
            aria-current={isAyudaActive ? "page" : undefined}
          >
            Centro de Ayuda
          </button>
        </nav>

        {/* Patient Profile Widget & Actions */}
        <div className="flex items-center gap-space-md shrink-0">
          <div
            aria-label={`Perfil de paciente: ${displayName}, ${displayDocNumber}`}
            className="hidden sm:flex items-center gap-space-sm pl-space-sm"
            role="region"
          >
            <div className="flex flex-col text-right">
              <span className="font-body-md-medium text-body-md-medium text-on-surface font-semibold truncate max-w-[180px]">
                {displayName}
              </span>
              <span className="font-label-sm text-label-sm text-slate-600">
                {displayDocNumber}
              </span>
            </div>
            <div className="relative">
              <div
                aria-label={`Perfil de paciente: ${displayName}`}
                className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs"
                role="img"
              >
                <User className="h-4 w-4" />
              </div>
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-fixed ring-2 ring-surface-container-lowest"
                title="En línea"
              />
            </div>
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-slate-600 hover:text-error hover:bg-error-container/20"
            title="Cerrar sesión"
            leftIcon={<LogOut className="h-4 w-4" />}
          >
            <span className="hidden md:inline">Salir</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
