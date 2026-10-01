"use client"

import React from "react"
import { UserCheck, Shield, Lock, Bell, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

export type SettingsTabId =
  | "datos-personales"
  | "cobertura-medica"
  | "seguridad-acceso"
  | "preferencias-notificaciones"

interface SettingsNavSidebarProps {
  activeTab: SettingsTabId
  onSelectTab: (tabId: SettingsTabId) => void
}

const TABS: { id: SettingsTabId; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "datos-personales", label: "Datos Personales", icon: UserCheck },
  { id: "cobertura-medica", label: "Cobertura Médica", icon: Shield },
  { id: "seguridad-acceso", label: "Seguridad y 2FA", icon: Lock },
  { id: "preferencias-notificaciones", label: "Preferencias & Alertas", icon: Bell },
]

export function SettingsNavSidebar({ activeTab, onSelectTab }: SettingsNavSidebarProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, tabId: SettingsTabId) => {
    e.preventDefault()
    onSelectTab(tabId)
    const element = document.getElementById(tabId)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <aside aria-label="Navegación de secciones" className="lg:col-span-3 lg:sticky lg:top-28 flex flex-col gap-space-xs">
      <div className="bg-surface-container-lowest p-space-sm rounded-2xl shadow-xs border border-surface-container/60 flex flex-col gap-1">
        {TABS.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <a
              key={tab.id}
              href={`#${tab.id}`}
              onClick={(e) => handleClick(e, tab.id)}
              className={cn(
                "tab-link flex items-center gap-space-sm px-space-md py-3 rounded-xl font-label-lg text-label-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer font-medium",
                isActive
                  ? "bg-primary-container text-on-primary font-semibold shadow-2xs"
                  : "text-slate-600 hover:bg-surface-container-low hover:text-on-surface"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span>{tab.label}</span>
            </a>
          )
        })}
      </div>

      {/* Security Quick Card */}
      <div className="bg-primary/5 rounded-2xl p-space-md flex flex-col gap-space-xs mt-space-sm border border-primary/10">
        <div className="flex items-center gap-2 text-primary font-label-md text-label-md font-semibold">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <span>Cifrado de Extremo a Extremo</span>
        </div>
        <p className="font-label-sm text-label-sm text-slate-600 leading-relaxed">
          Tu información médica está protegida bajo estándares HIPAA &amp; Ley 25.326 de Protección de Datos Personales.
        </p>
      </div>
    </aside>
  )
}
