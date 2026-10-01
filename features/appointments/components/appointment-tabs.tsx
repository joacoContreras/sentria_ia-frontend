"use client"

import React from "react"
import { RefreshCw } from "lucide-react"
import { AppointmentTab } from "@/types/appointments"
import { cn } from "@/lib/utils"

interface AppointmentTabsProps {
  activeTab: AppointmentTab
  upcomingCount: number
  historyCount: number
  canceledCount: number
  onTabChange: (tab: AppointmentTab) => void
}

export function AppointmentTabs({
  activeTab,
  upcomingCount,
  historyCount,
  canceledCount,
  onTabChange,
}: AppointmentTabsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container-high pb-space-xs gap-3">
      {/* Tab Buttons */}
      <div aria-label="Filtro de citas médicas" className="flex flex-wrap gap-2" role="tablist">
        {/* Próximos Turnos (Activo) */}
        <button
          id="tab-upcoming"
          type="button"
          role="tab"
          aria-selected={activeTab === "upcoming"}
          aria-controls="panel-upcoming"
          tabIndex={activeTab === "upcoming" ? 0 : -1}
          onClick={() => onTabChange("upcoming")}
          className={cn(
            "px-space-md py-space-xs rounded-lg font-label-lg text-label-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer",
            activeTab === "upcoming"
              ? "bg-primary-container text-white font-semibold shadow-xs"
              : "text-slate-700 hover:bg-surface-container hover:text-on-surface font-medium"
          )}
        >
          Próximos Turnos ({upcomingCount})
        </button>

        {/* Historial y Pasados - Deshabilitado (Próximamente) */}
        <button
          id="tab-history"
          type="button"
          role="tab"
          disabled
          aria-disabled="true"
          title="Historial de consultas disponible próximamente"
          className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-slate-400 opacity-50 cursor-not-allowed select-none"
        >
          Historial y Pasados ({historyCount})
        </button>

        {/* Cancelados (Activo) */}
        <button
          id="tab-canceled"
          type="button"
          role="tab"
          aria-selected={activeTab === "canceled"}
          aria-controls="panel-canceled"
          tabIndex={activeTab === "canceled" ? 0 : -1}
          onClick={() => onTabChange("canceled")}
          className={cn(
            "px-space-md py-space-xs rounded-lg font-label-lg text-label-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer",
            activeTab === "canceled"
              ? "bg-primary-container text-white font-semibold shadow-xs"
              : "text-slate-700 hover:bg-surface-container hover:text-on-surface font-medium"
          )}
        >
          Cancelados ({canceledCount})
        </button>
      </div>

      {/* Sync Status Badge */}
      <div className="hidden sm:flex items-center gap-space-xs text-slate-600 font-medium select-none">
        <RefreshCw className="h-3.5 w-3.5 text-slate-500 animate-spin-reverse" />
        <span className="font-label-sm text-label-sm text-slate-500">
          Actualizado hace 2 min
        </span>
      </div>
    </div>
  )
}
