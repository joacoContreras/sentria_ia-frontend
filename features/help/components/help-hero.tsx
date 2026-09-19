"use client"

import React from "react"
import { Search, X } from "lucide-react"
import { QUICK_SEARCH_PILLS } from "../data/faq-data"

interface HelpHeroProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  onSelectPill: (pill: string) => void
  onSearchSubmit?: () => void
}

export function HelpHero({
  searchQuery,
  onSearchChange,
  onSelectPill,
  onSearchSubmit,
}: HelpHeroProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      onSearchSubmit?.()
    }
  }

  return (
    <section className="w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pt-space-lg sm:pt-space-xl pb-space-lg">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-space-sm">
        <h1 className="text-display-hero sm:text-display-hero text-on-surface font-bold tracking-tight">
          Centro de Ayuda
        </h1>

        <p className="text-body-md sm:text-body-lg text-secondary leading-relaxed">
          Encuentre respuestas sobre turnos, guardias médicas, sedes hospitalarias y consultas frecuentes.
        </p>

        {/* Search Input Container */}
        <div className="w-full pt-space-xs">
          <div className="relative flex items-center w-full bg-surface-container-lowest rounded-xl shadow-2xs border border-outline-variant/20 p-space-xs transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
            <div className="flex items-center justify-center pl-space-sm pr-space-2xs text-secondary">
              <Search className="h-5 w-5 shrink-0" aria-hidden="true" />
            </div>

            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Buscar por trámite, guardia, sedes o turnos..."
              className="w-full bg-transparent text-body-md text-on-surface placeholder:text-outline focus:outline-none py-space-xs px-space-2xs"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchChange("")}
                className="px-space-xs text-secondary hover:text-on-surface transition-colors cursor-pointer mr-space-xs"
                title="Limpiar búsqueda"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onSearchSubmit}
              className="bg-primary text-white text-label-md px-space-md py-space-xs rounded-lg hover:bg-primary-container transition-all active:scale-[0.98] cursor-pointer shrink-0 font-medium"
            >
              Buscar
            </button>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-space-xs mt-space-sm text-left">
            <span className="text-label-xs text-secondary">
              Consultas frecuentes:
            </span>
            {QUICK_SEARCH_PILLS.map((pill) => (
              <button
                key={pill}
                type="button"
                onClick={() => onSelectPill(pill)}
                className="px-space-sm py-space-3xs rounded-full bg-surface-container-lowest text-label-xs text-on-surface-variant hover:bg-surface-container hover:text-primary hover:border-primary/40 transition-all border border-outline-variant/20 cursor-pointer"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

