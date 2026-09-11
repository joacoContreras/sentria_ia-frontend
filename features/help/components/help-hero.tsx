"use client"

import React from "react"
import { Search, X, ArrowRight } from "lucide-react"
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
    <div className="relative w-full overflow-hidden">
      {/* Top Ambient Glow Decorators */}
      <div className="pointer-events-none absolute top-0 right-1/4 -z-10 h-96 w-96 rounded-full bg-primary-fixed/30 blur-3xl" />
      <div className="pointer-events-none absolute top-20 left-10 -z-10 h-72 w-72 rounded-full bg-secondary-container/40 blur-3xl" />

      {/* Hero Section */}
      <section className="w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pt-space-xl pb-space-2xl">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-space-md">
          {/* Clinical Badge */}
          <div className="inline-flex items-center gap-space-2xs px-space-md py-space-xs rounded-full bg-surface-container-high shadow-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-label-sm text-primary uppercase tracking-wider font-semibold">
              Soporte y Orientación al Paciente
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-headline-lg lg:text-display-hero text-on-surface font-bold tracking-tight">
            Centro de Ayuda y Asistencia Clínica
          </h1>

          <p className="text-body-lg text-secondary max-w-2xl leading-relaxed">
            Resuelva gestiones administrativas, localice sedes con guardias activas
            y descubra cómo interactuar de forma segura con el agente inteligente
            de triage de Sentria AI.
          </p>

          {/* Search Input Container */}
          <div className="w-full pt-space-md">
            <div className="relative flex items-center w-full bg-surface-container-lowest rounded-xl shadow-md p-space-xs transition-shadow duration-200 focus-within:shadow-xl focus-within:ring-2 focus-within:ring-primary">
              <div className="flex items-center justify-center pl-space-md pr-space-xs text-primary">
                <Search className="h-6 w-6 shrink-0" aria-hidden="true" />
              </div>

              <input
                id="faq-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar por síntoma, trámite, turnos, sedes o dudas frecuentes..."
                className="w-full bg-transparent text-body-lg text-on-surface placeholder:text-outline focus:outline-none py-space-sm"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="px-space-xs text-secondary hover:text-on-surface transition-colors cursor-pointer"
                  title="Limpiar búsqueda"
                  aria-label="Limpiar búsqueda"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              <button
                type="button"
                onClick={onSearchSubmit}
                className="flex items-center gap-space-2xs bg-primary text-on-primary text-label-lg px-space-lg py-space-sm rounded-lg hover:bg-primary-container transition-all active:scale-[0.98] cursor-pointer shrink-0 ml-space-xs font-semibold"
              >
                <span>Explorar</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-space-xs mt-space-md text-left">
              <span className="text-label-md text-secondary mr-space-2xs">
                Atajos frecuentes:
              </span>
              {QUICK_SEARCH_PILLS.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => onSelectPill(pill)}
                  className="px-space-md py-space-2xs rounded-full bg-surface-container-lowest text-label-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all shadow-xs cursor-pointer border border-outline-variant/30"
                >
                  {pill}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
