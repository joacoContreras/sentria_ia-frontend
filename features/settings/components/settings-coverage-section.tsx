"use client"

import React from "react"
import { Shield, RefreshCw } from "lucide-react"

interface SettingsCoverageSectionProps {
  coverageProvider: string
  coveragePlan: string
  affiliateNumber: string
  coverageExpiry: string
  onUpdatePadron?: () => void
}

export function SettingsCoverageSection({
  coverageProvider,
  coveragePlan,
  affiliateNumber,
  coverageExpiry,
  onUpdatePadron,
}: SettingsCoverageSectionProps) {
  return (
    <section
      aria-labelledby="heading-cobertura"
      className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-xs border border-surface-container/60 flex flex-col gap-space-lg"
      id="cobertura-medica"
    >
      <div className="flex items-center justify-between pb-space-sm border-b border-surface-container/50">
        <div className="flex items-center gap-space-sm">
          <span className="p-2.5 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
            <Shield className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold" id="heading-cobertura">
              Cobertura Médica &amp; Obra Social
            </h2>
            <p className="font-body-md text-body-md text-slate-500">
              Convenios activos para autorizaciones de consultas, laboratorios e internación.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onUpdatePadron}
          className="text-primary hover:text-primary-container font-label-md text-label-md flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          <span>Actualizar Padrón</span>
        </button>
      </div>

      {/* Digital Card Preview Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg items-center">
        {/* Graphical Health Card Graphic */}
        <div className="md:col-span-5 bg-gradient-to-br from-primary-container via-primary to-tertiary text-on-primary rounded-2xl p-space-lg shadow-md flex flex-col justify-between h-56 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-white/10 blur-xl" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-xs uppercase font-semibold tracking-wider text-primary-fixed block">
                Credencial Virtual
              </span>
              <span className="font-headline-md text-headline-md tracking-tight font-bold">
                OSDE
              </span>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider">
              Activa
            </span>
          </div>
          <div className="relative z-10 flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-white/80">Número de Afiliado</span>
            <span className="font-vital-metric text-vital-metric tracking-widest text-white">
              {affiliateNumber.replace("-", " • ")}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs text-white/90 relative z-10 pt-2 border-t border-white/20">
            <span>
              Plan: <strong>OSDE 310</strong>
            </span>
            <span>
              Vence: <strong>{coverageExpiry}</strong>
            </span>
          </div>
        </div>

        {/* Form / Data Specs */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md text-slate-600 font-medium" htmlFor="input-provider">
              Empresa de Medicina Prepaga
            </label>
            <input
              className="h-11 px-space-md bg-surface-container-low rounded-xl font-body-md text-slate-800 border border-surface-container/60 cursor-not-allowed"
              id="input-provider"
              readOnly
              type="text"
              value={coverageProvider}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-label-md text-label-md text-slate-600 font-medium" htmlFor="input-plan">
              Plan Contratado
            </label>
            <input
              className="h-11 px-space-md bg-surface-container-low rounded-xl font-body-md text-slate-800 border border-surface-container/60 cursor-not-allowed"
              id="input-plan"
              readOnly
              type="text"
              value={coveragePlan}
            />
          </div>
          <div className="flex flex-col gap-1 sm:col-span-2">
            <label className="font-label-md text-label-md text-slate-600 font-medium" htmlFor="input-affiliate-num">
              Número de Afiliado y Dígito Verificador
            </label>
            <input
              className="h-11 px-space-md bg-surface-container-low rounded-xl font-body-md text-slate-800 font-mono border border-surface-container/60 cursor-not-allowed"
              id="input-affiliate-num"
              readOnly
              type="text"
              value={affiliateNumber}
            />
          </div>

          {/* Status badge highlight */}
          <div className="sm:col-span-2 flex items-center justify-between bg-surface-container-low p-space-md rounded-xl border border-surface-container/60">
            <div className="flex items-center gap-space-sm">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <span className="font-body-md-medium text-body-md-medium text-slate-800 font-semibold">
                Estado de Cobertura
              </span>
            </div>
            <span className="px-3 py-1 bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold rounded-full shadow-2xs border border-surface-container/40">
              Validación Automática Vigente
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
