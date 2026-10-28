"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import {
  Activity,
  Bot,
  CreditCard,
  LogOut,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { Coverage, Doctor, Specialty } from "@/types/admin"
import { CATALOG_UPDATE_EVENT, catalogService } from "../services/catalog.service"
import { SpecialtiesTable } from "./specialties-table"
import { DoctorsTable } from "./doctors-table"
import { CoveragesTable } from "./coverages-table"
import { AiIntegrationPanel } from "./ai-integration-panel"
import { AnalyticsDashboard } from "./analytics-dashboard"

export type AdminTab = "analytics" | "specialties" | "doctors" | "coverages" | "ai"

export function AdminDashboard() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, isHydrated, logout } = useAuth()

  const [activeTab, setActiveTab] = useState<AdminTab>("analytics")
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

  const handleLogout = () => {
    logout()
    router.push("/acceso")
  }

  // Loading fallback
  if (!isHydrated || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3 text-secondary">
          <Activity className="h-8 w-8 animate-spin text-primary" />
          <p className="text-sm font-medium text-slate-600">Cargando panel de administración...</p>
        </div>
      </div>
    )
  }

  // Protección: No autenticado
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 text-center border border-slate-200/80 shadow-md space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary mx-auto flex items-center justify-center">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Acceso a la Consola de Administración</h2>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              Debe iniciar sesión con una cuenta de administración institucional para acceder a este panel.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => router.push("/acceso")}
            className="w-full text-white"
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    )
  }

  // Protección: Usuario no es administrador (es un paciente)
  if (user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 text-center border border-slate-200/80 shadow-md space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center border border-amber-200">
            <ShieldAlert className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Acceso Restringido</h2>
            <p className="text-sm text-slate-500 mt-1 leading-relaxed">
              Esta sección es exclusiva para la administración del centro médico. Su cuenta actual está registrada como paciente.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => router.push("/portal")}
            className="w-full text-white"
          >
            Ir a mi Portal de Paciente
          </Button>
        </div>
      </div>
    )
  }

  // Métricas de estado de catálogos
  const activeSpecialtiesCount = specialties.filter((s) => s.isActive).length
  const activeDoctorsCount = doctors.filter((d) => d.isActive).length
  const activeCoveragesCount = coverages.filter((c) => c.isActive).length

  return (
    <div className="min-h-screen bg-background pb-16">
      {/* Top Header Institucional */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo & Título del Panel */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-2xs font-bold">
              <Activity className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900 tracking-tight leading-tight">
                  Sentria <span className="text-primary font-bold">AI</span>
                </span>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-primary/10 text-primary border border-primary/20">
                  Administración
                </span>
              </div>
              <span className="text-[11px] text-slate-500 hidden sm:inline leading-none mt-0.5">
                Centro de Inteligencia Operativa
              </span>
            </div>
          </div>

          {/* Acciones y Perfil del Administrador */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors cursor-pointer"
              title="Restablecer catálogos de prueba iniciales"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden md:inline">Restablecer datos demo</span>
            </button>

            <div className="h-5 w-px bg-slate-200 hidden sm:block" />

            {/* Administrador logueado & Cerrar sesión */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center border border-primary/20">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="hidden lg:flex flex-col text-left">
                  <span className="text-xs font-semibold text-slate-900 leading-tight">
                    {user.fullName || "Administrador Central"}
                  </span>
                  <span className="text-[11px] text-slate-500 leading-tight truncate max-w-[160px]">
                    {user.email}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-error hover:bg-error/10 px-2.5 py-1.5 rounded-xl transition-colors cursor-pointer"
                title="Cerrar sesión de administrador"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* Encabezado Principal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Panel de analíticas
            </h1>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Mida el rendimiento de sus turnos, la conversión de reservas y el impacto del Agente de IA con datos consolidados.
            </p>
          </div>
        </div>

        {/* Tarjetas KPI de Estado */}
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
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Especialidades</span>
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Stethoscope className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{specialties.length}</span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {activeSpecialtiesCount} activas
              </span>
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
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Profesionales</span>
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{doctors.length}</span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {activeDoctorsCount} en agenda
              </span>
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
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Coberturas</span>
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{coverages.length}</span>
              <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                {activeCoveragesCount} habilitadas
              </span>
            </div>
          </button>

          {/* KPI 4: Asistente IA */}
          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
              activeTab === "ai"
                ? "bg-white border-primary shadow-xs ring-2 ring-primary/20"
                : "bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs"
            }`}
          >
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Asistente IA</span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-primary flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">Activo</span>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                Sincronizado
              </span>
            </div>
          </button>
        </div>

        {/* Barra de Pestañas de Navegación */}
        <div className="flex items-center gap-2 border-b border-slate-200/80 overflow-x-auto pb-px">
          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "analytics"
                ? "border-primary text-primary bg-white/60 rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Analíticas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("specialties")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "specialties"
                ? "border-primary text-primary bg-white/60 rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <Stethoscope className="w-4 h-4" />
            <span>Especialidades Médicas</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
              {specialties.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("doctors")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "doctors"
                ? "border-primary text-primary bg-white/60 rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Profesionales Médicos</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
              {doctors.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("coverages")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "coverages"
                ? "border-primary text-primary bg-white/60 rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Obras Sociales y Prepagas</span>
            <span className="px-2 py-0.5 rounded-full text-xs bg-slate-100 text-slate-700">
              {coverages.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ai")}
            className={`flex items-center gap-2 px-4 py-3 font-semibold text-sm border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === "ai"
                ? "border-primary text-primary bg-white/60 rounded-t-xl"
                : "border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300"
            }`}
          >
            <Bot className="w-4 h-4" />
            <span>Asistente e Integración IA</span>
          </button>
        </div>

        {/* Contenido de la pestaña activa */}
        <div className="pt-2">
          {activeTab === "analytics" && (
            <AnalyticsDashboard doctors={doctors} specialties={specialties} />
          )}

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
                <h4 className="font-bold text-base">¿Restablecer datos demo?</h4>
                <p className="text-xs text-slate-500">Se reiniciarán las especialidades, médicos y prepagas iniciales</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">
              Esta acción restaurará los 3 catálogos con la nómina clínica de prueba original de Sentria AI.
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
