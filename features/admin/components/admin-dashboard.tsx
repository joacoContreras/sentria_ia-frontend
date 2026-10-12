"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Bot,
  CreditCard,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Coverage, Doctor, Specialty } from "@/types/admin"
import { CATALOG_UPDATE_EVENT, catalogService } from "../services/catalog.service"
import { SpecialtiesTable } from "./specialties-table"
import { DoctorsTable } from "./doctors-table"
import { CoveragesTable } from "./coverages-table"
import { AiIntegrationPanel } from "./ai-integration-panel"

export type AdminTab = "specialties" | "doctors" | "coverages" | "ai"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>("specialties")
  const [specialties, setSpecialties] = useState<Specialty[]>(() =>
    catalogService.getSpecialties()
  )
  const [doctors, setDoctors] = useState<Doctor[]>(() =>
    catalogService.getDoctors()
  )
  const [coverages, setCoverages] = useState<Coverage[]>(() =>
    catalogService.getCoverages()
  )
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  // Carga reactiva de los catálogos
  const refreshData = useCallback(() => {
    setSpecialties(catalogService.getSpecialties())
    setDoctors(catalogService.getDoctors())
    setCoverages(catalogService.getCoverages())
  }, [])

  useEffect(() => {
    const handleUpdate = () => refreshData()
    window.addEventListener(CATALOG_UPDATE_EVENT, handleUpdate)
    window.addEventListener("storage", handleUpdate)

    return () => {
      window.removeEventListener(CATALOG_UPDATE_EVENT, handleUpdate)
      window.removeEventListener("storage", handleUpdate)
    }
  }, [refreshData])

  const handleResetDefaults = () => {
    catalogService.resetToDefaults()
    refreshData()
    setShowResetConfirm(false)
  }

  // Métricas calculadas para la barra superior
  const activeSpecialtiesCount = specialties.filter((s) => s.isActive).length
  const activeDoctorsCount = doctors.filter((d) => d.isActive).length
  const activeCoveragesCount = coverages.filter((c) => c.isActive).length

  return (
    <div className="min-h-screen bg-slate-50/50 pb-16">
      {/* Top Banner de Navegación Institucional */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-primary transition-colors py-1 px-2.5 rounded-lg hover:bg-slate-100"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Portal</span>
            </Link>

            <span className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-white shadow-2xs font-bold text-xs">
                S
              </span>
              <span className="font-bold text-sm text-slate-900 tracking-tight hidden sm:inline">
                Sentria AI <span className="text-primary font-normal">• Administración</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/turnos"
              target="_blank"
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-700 hover:text-primary bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-all"
            >
              <span>Ver Buscador Pacientes</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              title="Restablecer catálogos de prueba"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Reiniciar Datos Demo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Encabezado del Panel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <ShieldCheck className="w-3.5 h-3.5" />
                Panel de Control de Administradores y Médicos
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                RNF-02 Cumplido
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Gestión de Catálogos Asistenciales
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Administración de profesionales habilitados, especialidades médicas y coberturas en convenio. Los cambios se propagan de forma inmediata a los desplegables de pacientes (RF-01, RF-02) y al agente conversacional con OpenAI.
            </p>
          </div>
        </div>

        {/* Tarjetas KPI de Estado de Catálogos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Especialidades */}
          <button
            type="button"
            onClick={() => setActiveTab("specialties")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === "specialties"
                ? "bg-white border-primary shadow-xs ring-2 ring-primary/20"
                : "bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs"
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Especialidades</span>
              <Stethoscope className="w-4 h-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{specialties.length}</span>
              <span className="text-xs font-semibold text-emerald-600">
                {activeSpecialtiesCount} activas
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Catálogo base para consultorios
            </div>
          </button>

          {/* KPI 2: Médicos */}
          <button
            type="button"
            onClick={() => setActiveTab("doctors")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === "doctors"
                ? "bg-white border-primary shadow-xs ring-2 ring-primary/20"
                : "bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs"
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Profesionales</span>
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{doctors.length}</span>
              <span className="text-xs font-semibold text-emerald-600">
                {activeDoctorsCount} en agenda
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Matrícula única y borrado lógico
            </div>
          </button>

          {/* KPI 3: Coberturas */}
          <button
            type="button"
            onClick={() => setActiveTab("coverages")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === "coverages"
                ? "bg-white border-primary shadow-xs ring-2 ring-primary/20"
                : "bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs"
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Coberturas / Prepagas</span>
              <CreditCard className="w-4 h-4 text-primary" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">{coverages.length}</span>
              <span className="text-xs font-semibold text-emerald-600">
                {activeCoveragesCount} habilitadas
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Convenios y planes aceptados
            </div>
          </button>

          {/* KPI 4: Integridad RNF-02 */}
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === "ai"
                ? "bg-white border-purple-500 shadow-xs ring-2 ring-purple-500/20"
                : "bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs"
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Integración IA</span>
              <Sparkles className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">4 Tools</span>
              <span className="text-xs font-semibold text-purple-600">OpenAI</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Function Calling en vivo
            </div>
          </button>
        </div>

        {/* Barra de Pestañas de Navegación */}
        <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-px">
          <button
            type="button"
            onClick={() => setActiveTab("specialties")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "specialties"
                ? "border-primary text-primary bg-white/50 rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>1. Especialidades Médicas (CA1)</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
              {specialties.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("doctors")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "doctors"
                ? "border-primary text-primary bg-white/50 rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>2. Profesionales Médicos (CA2)</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
              {doctors.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("coverages")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "coverages"
                ? "border-primary text-primary bg-white/50 rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>3. Obras Sociales / Prepagas (CA3)</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
              {coverages.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "ai"
                ? "border-purple-600 text-purple-700 bg-white/50 rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>4. Integración e IA Bot (CA4)</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-purple-100 text-purple-700">
              OpenAI
            </span>
          </button>
        </div>

        {/* Contenido de la pestaña activa */}
        <div className="pt-2">
          {activeTab === "specialties" && (
            <SpecialtiesTable
              specialties={specialties}
              doctors={doctors}
              onRefresh={refreshData}
            />
          )}

          {activeTab === "doctors" && (
            <DoctorsTable
              doctors={doctors}
              specialties={specialties}
              coverages={coverages}
              onRefresh={refreshData}
            />
          )}

          {activeTab === "coverages" && (
            <CoveragesTable
              coverages={coverages}
              specialties={specialties}
              doctors={doctors}
              onRefresh={refreshData}
            />
          )}

          {activeTab === "ai" && (
            <AiIntegrationPanel
              specialties={specialties}
              doctors={doctors}
              coverages={coverages}
            />
          )}
        </div>
      </main>

      {/* Modal de confirmación de restablecimiento */}
      {showResetConfirm && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 text-slate-900 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base">¿Restablecer catálogos demo?</h4>
                <p className="text-xs text-slate-500">Se cargarán los médicos, especialidades y prepagas iniciales</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              Esta acción reiniciará los 3 catálogos base con la nómina clínica original de Sentria AI. Útil para verificar pruebas y validaciones.
            </p>
            <div className="flex justify-end gap-2.5">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={handleResetDefaults}
              >
                Sí, restablecer
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
