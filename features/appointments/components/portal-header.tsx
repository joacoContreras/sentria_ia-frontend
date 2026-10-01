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

  const isMisTurnosActive = activeSection === "turnos"
  const isTriageActive = activeSection === "triage"
  const isHistorialActive = activeSection === "historial"
  const isAyudaActive = activeSection === "ayuda"

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container"
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
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-none font-bold">
              Sentria AI
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-0.5">
              Portal Pacientes
            </span>
          </div>
        </button>

        {/* Primary Navigation within Portal Context */}
        <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-space-xs">
          <button
            type="button"
            onClick={() => {
              onSelectSection("turnos")
              if (activeTab !== "upcoming") {
                onSelectTab("upcoming")
              }
            }}
            className={cn(
              "px-space-md py-space-xs transition-all rounded-lg font-label-lg text-label-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer font-semibold",
              isMisTurnosActive
                ? "bg-primary-container text-on-primary-container shadow-xs"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium"
            )}
            aria-current={isMisTurnosActive ? "page" : undefined}
          >
            Mis Turnos
          </button>

          {/* Triage & Síntomas */}
          <button
            type="button"
            onClick={() => onSelectSection("triage")}
            className={cn(
              "px-space-md py-space-xs transition-all rounded-lg font-label-lg text-label-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer font-semibold",
              isTriageActive
                ? "bg-primary-container text-on-primary-container shadow-xs"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium"
            )}
            aria-current={isTriageActive ? "page" : undefined}
          >
            Triage y Síntomas
          </button>

          {/* Historial Clínico */}
          <button
            type="button"
            onClick={() => onSelectSection("historial")}
            className={cn(
              "px-space-md py-space-xs transition-all rounded-lg font-label-lg text-label-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer font-semibold",
              isHistorialActive
                ? "bg-primary-container text-on-primary-container shadow-xs"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium"
            )}
            aria-current={isHistorialActive ? "page" : undefined}
          >
            Historial Clínico
          </button>

          {/* Centro de Ayuda */}
          <button
            type="button"
            onClick={() => onSelectSection("ayuda")}
            className={cn(
              "px-space-md py-space-xs transition-all rounded-lg font-label-lg text-label-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer font-semibold",
              isAyudaActive
                ? "bg-primary-container text-on-primary-container shadow-xs"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface font-medium"
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
            className="hidden sm:flex flex-col text-right"
          >
            <span className="font-label-lg text-label-lg text-on-surface font-semibold leading-tight truncate max-w-[200px]">
              {displayName}
            </span>
            <div className="flex items-center justify-end gap-space-2xs mt-0.5">
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {displayDocNumber}
              </span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full font-label-sm text-[10px] bg-secondary-container text-on-secondary-container font-medium">
                Verificada
              </span>
            </div>
          </div>

          <div
            aria-label={`Avatar de ${displayName}`}
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-xs shrink-0"
            role="img"
          >
            <User className="h-4 w-4" aria-hidden="true" />
          </div>

          {/* Logout Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className="text-on-surface-variant hover:text-error hover:bg-error-container/20 font-label-md"
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
