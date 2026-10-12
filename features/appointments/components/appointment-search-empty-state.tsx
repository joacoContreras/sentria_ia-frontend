"use client"

import React from "react"
import { CalendarX2, RefreshCw } from "lucide-react"

interface AppointmentSearchEmptyStateProps {
  onResetFilters: () => void
  onExpandDateRange?: () => void
}

export function AppointmentSearchEmptyState({
  onResetFilters,
  onExpandDateRange,
}: AppointmentSearchEmptyStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="w-full bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-8 sm:p-12 text-center flex flex-col items-center gap-4 shadow-sm animate-in fade-in duration-150"
    >
      <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200 shadow-xs">
        <CalendarX2 className="h-7 w-7" aria-hidden="true" />
      </div>

      <div className="max-w-md flex flex-col gap-1.5">
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
          Sin disponibilidad para tu búsqueda
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          No encontramos turnos disponibles para los filtros seleccionados. Intenta
          ampliar el rango de fechas o consultar con otro profesional.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2.5 mt-2">
        {onExpandDateRange && (
          <button
            type="button"
            onClick={onExpandDateRange}
            className="w-full sm:w-auto h-11 px-space-lg rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center gap-2"
          >
            <span>Ampliar rango de fechas</span>
          </button>
        )}

        <button
          type="button"
          onClick={onResetFilters}
          className="w-full sm:w-auto h-11 px-space-lg rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold transition-all cursor-pointer border border-outline-variant/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex items-center justify-center gap-2"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          <span>Restablecer filtros</span>
        </button>
      </div>
    </div>
  )
}
