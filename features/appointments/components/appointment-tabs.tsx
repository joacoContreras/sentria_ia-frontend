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
    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-xs gap-3">
      {/* Tab Buttons (Segmented Container) */}
      <div
        aria-label="Filtro de citas médicas"
        className="bg-surface-container-low/70 p-1.5 rounded-2xl border border-outline-variant/20 inline-flex flex-wrap gap-1.5 shadow-2xs"
        role="tablist"
      >
        {/* Próximos Turnos */}
        <button
          id="tab-upcoming"
          type="button"
          role="tab"
          aria-selected={activeTab === "upcoming"}
          aria-controls="panel-upcoming"
          tabIndex={activeTab === "upcoming" ? 0 : -1}
          onClick={() => onTabChange("upcoming")}
          className={cn(
            "px-4 py-2 rounded-xl text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer flex items-center gap-2",
            activeTab === "upcoming"
              ? "bg-surface-container-lowest text-on-surface font-bold shadow-xs border border-outline-variant/30"
              : "text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface font-medium border border-transparent"
          )}
        >
          <span>Próximos Turnos</span>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-semibold transition-colors",
              activeTab === "upcoming"
                ? "bg-primary/10 text-primary"
                : "bg-surface-container-high/60 text-on-surface-variant"
            )}
          >
            {upcomingCount}
          </span>
        </button>

        {/* Historial y Pasados */}
        <button
          id="tab-history"
          type="button"
          role="tab"
          aria-selected={activeTab === "history"}
          aria-controls="panel-history"
          tabIndex={activeTab === "history" ? 0 : -1}
          onClick={() => onTabChange("history")}
          className={cn(
            "px-4 py-2 rounded-xl text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer flex items-center gap-2",
            activeTab === "history"
              ? "bg-surface-container-lowest text-on-surface font-bold shadow-xs border border-outline-variant/30"
              : "text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface font-medium border border-transparent"
          )}
        >
          <span>Historial</span>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-semibold transition-colors",
              activeTab === "history"
                ? "bg-primary/10 text-primary"
                : "bg-surface-container-high/60 text-on-surface-variant"
            )}
          >
            {historyCount}
          </span>
        </button>

        {/* Cancelados */}
        <button
          id="tab-canceled"
          type="button"
          role="tab"
          aria-selected={activeTab === "canceled"}
          aria-controls="panel-canceled"
          tabIndex={activeTab === "canceled" ? 0 : -1}
          onClick={() => onTabChange("canceled")}
          className={cn(
            "px-4 py-2 rounded-xl text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer flex items-center gap-2",
            activeTab === "canceled"
              ? "bg-surface-container-lowest text-on-surface font-bold shadow-xs border border-outline-variant/30"
              : "text-on-surface-variant hover:bg-surface-container/60 hover:text-on-surface font-medium border border-transparent"
          )}
        >
          <span>Cancelados</span>
          <span
            className={cn(
              "px-2 py-0.5 rounded-full text-xs font-semibold transition-colors",
              activeTab === "canceled"
                ? "bg-primary/10 text-primary"
                : "bg-surface-container-high/60 text-on-surface-variant"
            )}
          >
            {canceledCount}
          </span>
        </button>
      </div>

      {/* Sync Status Badge (Static accessible indicator) */}
      <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low/50 text-outline border border-outline-variant/20 font-medium select-none text-xs">
        <RefreshCw className="h-3.5 w-3.5 text-outline" aria-hidden="true" />
        <span>Sincronizado</span>
      </div>
    </div>
  )
}
