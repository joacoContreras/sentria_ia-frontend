"use client"

import React from "react"
import {
  Calendar,
  Filter,
  MapPin,
  RefreshCw,
  Search,
  Stethoscope,
  User,
  X,
} from "lucide-react"
import { DoctorOption, SpecialtyOption, TurnoSearchFilters, VenueOption } from "@/types/appointments"
import { cn } from "@/lib/utils"

interface AppointmentSearchFiltersProps {
  specialties: SpecialtyOption[]
  doctors: DoctorOption[]
  venues: VenueOption[]
  filters: TurnoSearchFilters
  onFilterChange: (newFilters: Partial<TurnoSearchFilters>) => void
  onResetFilters: () => void
  totalResults: number
  isLoading?: boolean
}

export function AppointmentSearchFilters({
  specialties,
  doctors,
  venues,
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
  isLoading = false,
}: AppointmentSearchFiltersProps) {
  // Pre-sets de rango de fechas
  const handleDatePreset = (preset: "today" | "week" | "next_week" | "all") => {
    const today = new Date()
    const formatDate = (d: Date) => {
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, "0")
      const day = String(d.getDate()).padStart(2, "0")
      return `${year}-${month}-${day}`
    }

    if (preset === "all") {
      onFilterChange({ dateFrom: undefined, dateTo: undefined })
      return
    }

    if (preset === "today") {
      const todayStr = formatDate(today)
      onFilterChange({ dateFrom: todayStr, dateTo: todayStr })
      return
    }

    if (preset === "week") {
      const start = new Date(today)
      const end = new Date(today)
      end.setDate(end.getDate() + 7)
      onFilterChange({ dateFrom: formatDate(start), dateTo: formatDate(end) })
      return
    }

    if (preset === "next_week") {
      const start = new Date(today)
      start.setDate(start.getDate() + 7)
      const end = new Date(today)
      end.setDate(end.getDate() + 14)
      onFilterChange({ dateFrom: formatDate(start), dateTo: formatDate(end) })
      return
    }
  }

  const isFiltered = Boolean(
    (filters.specialty && filters.specialty !== "all") ||
      (filters.doctor && filters.doctor !== "all") ||
      (filters.venue && filters.venue !== "all") ||
      filters.dateFrom ||
      filters.dateTo ||
      filters.searchQuery
  )

  return (
    <section
      aria-label="Filtros del buscador de turnos"
      className="w-full bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 md:p-6 shadow-sm flex flex-col gap-5 transition-all"
    >
      {/* Encabezado del panel de filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
            <Filter className="h-4 w-4" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-on-surface uppercase tracking-wider">
              Filtros de Búsqueda
            </h2>
            <p className="text-xs text-on-surface-variant">
              Encuentra horarios disponibles según tu preferencia médica
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Contador de resultados */}
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant/20">
            {isLoading ? "Buscando..." : `${totalResults} ${totalResults === 1 ? "turno libre" : "turnos libres"}`}
          </span>

          {/* Botón de limpiar filtros */}
          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer py-1 px-2 rounded-lg hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Restablecer todos los filtros"
            >
              <RefreshCw className="h-3 w-3" aria-hidden="true" />
              <span>Restablecer</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid de Controles Principales (CA1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CONTROL 1: Especialidad */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="filter-specialty"
            className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
          >
            <Stethoscope className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Especialidad</span>
          </label>
          <div className="relative">
            <select
              id="filter-specialty"
              value={filters.specialty || "all"}
              onChange={(e) => {
                const val = e.target.value === "all" ? undefined : e.target.value
                // CA2: Al cambiar especialidad, se actualiza profesional a 'all'
                onFilterChange({ specialty: val, doctor: undefined })
              }}
              className="w-full h-11 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 appearance-none cursor-pointer pl-3.5 pr-8 transition-all hover:border-slate-300 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10"
            >
              <option value="all">Todas las especialidades</option>
              {specialties.map((spec) => (
                <option key={spec.value} value={spec.value}>
                  {spec.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              ▼
            </div>
          </div>
        </div>

        {/* CONTROL 2: Profesional Médico (CA2 - Reactivo a especialidad) */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="filter-doctor"
            className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
          >
            <User className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Profesional Médico</span>
          </label>
          <div className="relative">
            <select
              id="filter-doctor"
              value={filters.doctor || "all"}
              onChange={(e) => {
                const val = e.target.value === "all" ? undefined : e.target.value
                onFilterChange({ doctor: val })
              }}
              className="w-full h-11 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 appearance-none cursor-pointer pl-3.5 pr-8 transition-all hover:border-slate-300 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10"
            >
              <option value="all">Cualquier profesional</option>
              {doctors.map((doc) => (
                <option key={doc.name} value={doc.name}>
                  {doc.name} {filters.specialty ? "" : `(${doc.specialty})`}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              ▼
            </div>
          </div>
        </div>

        {/* CONTROL 3: Sede / Ubicación */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="filter-venue"
            className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
          >
            <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Sede / Ubicación</span>
          </label>
          <div className="relative">
            <select
              id="filter-venue"
              value={filters.venue || "all"}
              onChange={(e) => {
                const val = e.target.value === "all" ? undefined : e.target.value
                onFilterChange({ venue: val })
              }}
              className="w-full h-11 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 appearance-none cursor-pointer pl-3.5 pr-8 transition-all hover:border-slate-300 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10"
            >
              <option value="all">Todas las sedes</option>
              {venues.map((v) => (
                <option key={v.id} value={v.name}>
                  {v.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              ▼
            </div>
          </div>
        </div>

        {/* CONTROL 4: Rango de Fecha / Fecha Específica (Date picker interactivo) */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="filter-date-from"
            className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5"
          >
            <Calendar className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span>Fecha Desde</span>
          </label>
          <div className="relative flex items-center">
            <input
              id="filter-date-from"
              type="date"
              value={filters.dateFrom || ""}
              onChange={(e) => {
                const val = e.target.value || undefined
                onFilterChange({ dateFrom: val })
              }}
              className="w-full h-11 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 cursor-pointer px-3 transition-all hover:border-slate-300 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10"
            />
          </div>
        </div>
      </div>

      {/* Fila Inferior: Date presets rápidos y búsqueda libre */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pt-3 border-t border-surface-container/60">
        {/* Atajos rápidos de fecha */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-outline font-medium mr-1 hidden sm:inline">
            Período:
          </span>
          <button
            type="button"
            onClick={() => handleDatePreset("all")}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              !filters.dateFrom && !filters.dateTo
                ? "bg-primary text-on-primary shadow-xs"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
            )}
          >
            Cualquier fecha
          </button>
          <button
            type="button"
            onClick={() => handleDatePreset("today")}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              filters.dateFrom && filters.dateFrom === filters.dateTo
                ? "bg-primary text-on-primary shadow-xs"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
            )}
          >
            Hoy
          </button>
          <button
            type="button"
            onClick={() => handleDatePreset("week")}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer",
              filters.dateFrom && filters.dateTo && filters.dateFrom !== filters.dateTo
                ? "bg-primary text-on-primary shadow-xs"
                : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
            )}
          >
            Próximos 7 días
          </button>
          <button
            type="button"
            onClick={() => handleDatePreset("next_week")}
            className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface-variant transition-all cursor-pointer"
          >
            Próxima semana
          </button>
        </div>

        {/* Input de búsqueda complementario (Médico o consultorio) */}
        <div className="relative w-full lg:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por médico o consultorio..."
            value={filters.searchQuery || ""}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value || undefined })}
            className="w-full h-9 rounded-lg bg-surface-container-low border border-slate-200 text-xs text-slate-900 pl-8 pr-7 transition-all focus:outline-none focus:border-primary focus:bg-white"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange({ searchQuery: undefined })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Borrar búsqueda"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
