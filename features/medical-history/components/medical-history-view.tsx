"use client"

import React, { useState, useMemo } from "react"
import {
  Activity,
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  Droplet,
  Eye,
  FileEdit,
  FileText,
  HeartPulse,
  MapPin,
  Pill,
  Receipt,
  RotateCcw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Stethoscope,
  Video,
} from "lucide-react"
import {
  INITIAL_CONSULTATIONS,
  ADDITIONAL_2023_CONSULTATIONS,
  PATIENT_CLINICAL_PROFILE,
} from "../data/medical-history-data"
import { MedicalConsultation } from "@/types/medical-history"

interface MedicalHistoryViewProps {
  onBookAppointmentWithDoctor?: (doctorName: string, specialty: string) => void
  onShowToast?: (title: string, message: string, icon?: string, type?: "success" | "info" | "warning" | "error") => void
}

export function MedicalHistoryView({
  onBookAppointmentWithDoctor,
  onShowToast,
}: MedicalHistoryViewProps) {
  const [consultations, setConsultations] = useState<MedicalConsultation[]>([
    ...INITIAL_CONSULTATIONS,
  ])
  const [hasLoaded2023, setHasLoaded2023] = useState(false)

  // Filters state
  const [searchQuery, setSearchQuery] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("")
  const [periodFilter, setPeriodFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  // Load more / 2023 records
  const handleLoadMore2023 = () => {
    if (!hasLoaded2023) {
      setConsultations((prev) => [...prev, ...ADDITIONAL_2023_CONSULTATIONS])
      setHasLoaded2023(true)
      onShowToast?.(
        "Expediente Actualizado",
        "Se cargaron las consultas archivadas del período 2023.",
        "history",
        "info"
      )
    }
  }

  // Clear filters
  const handleResetFilters = () => {
    setSearchQuery("")
    setSpecialtyFilter("")
    setPeriodFilter("all")
    setLocationFilter("")
    setStatusFilter("")
  }

  // Filtered consultations
  const filteredConsultations = useMemo(() => {
    return consultations.filter((c) => {
      // Search query filter (doctor, specialty, diagnosis, therapeutic notes)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchText = `${c.doctorName} ${c.specialty} ${c.primaryDiagnosis} ${c.diagnosticNotes} ${c.therapeuticIndication}`.toLowerCase()
        if (!matchText.includes(query)) return false
      }

      // Specialty filter
      if (specialtyFilter && c.specialtySlug !== specialtyFilter) {
        return false
      }

      // Period filter
      if (periodFilter === "2024" && c.periodYear !== "2024") return false
      if (periodFilter === "2023" && c.periodYear !== "2023") return false

      // Location filter
      if (locationFilter && c.venueSlug !== locationFilter) {
        return false
      }

      // Status filter
      if (statusFilter && c.status !== statusFilter) {
        return false
      }

      return true
    })
  }, [consultations, searchQuery, specialtyFilter, periodFilter, locationFilter, statusFilter])

  const handleDownloadConsolidatedPdf = () => {
    onShowToast?.(
      "Descarga Iniciada",
      "Generando expediente clínico consolidado y firmado digitalmente (PDF)...",
      "download",
      "success"
    )
  }

  const handleActionClick = (actionName: string, docOrDetail: string) => {
    onShowToast?.(
      actionName,
      `Accediendo a: ${docOrDetail}`,
      "description",
      "info"
    )
  }

  const getSpecialtyIcon = (slug: string) => {
    switch (slug) {
      case "cardio":
        return <HeartPulse className="h-6 w-6 text-primary" aria-hidden="true" />
      case "trauma":
        return <Activity className="h-6 w-6 text-tertiary" aria-hidden="true" />
      case "clinica":
      case "tele":
        return <Video className="h-6 w-6 text-secondary" aria-hidden="true" />
      case "derma":
        return <Stethoscope className="h-6 w-6 text-primary" aria-hidden="true" />
      default:
        return <FileText className="h-6 w-6 text-primary" aria-hidden="true" />
    }
  }

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-200">
      <div className="max-w-container-max mx-auto px-gutter-mobile sm:px-gutter-desktop py-space-xl sm:py-space-2xl w-full">
        {/* Encabezado de la página */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-2xl">
          <div className="flex flex-col max-w-3xl">
            <div className="inline-flex items-center gap-space-2xs text-primary font-label-md text-label-md uppercase tracking-wider mb-space-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Expediente Clínico Digital
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Historial Clínico y Consultas Médicas
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-2xs">
              Consulta el registro de tus atenciones médicas finalizadas, indicaciones terapéuticas, diagnósticos y estudios asociados.
            </p>
          </div>
          <div className="flex items-center gap-space-sm shrink-0">
            <button
              type="button"
              onClick={handleDownloadConsolidatedPdf}
              aria-label="Descargar historial consolidado en formato PDF"
              className="inline-flex items-center justify-center gap-space-xs px-space-lg h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary active:scale-95 cursor-pointer font-semibold"
            >
              <Download className="h-5 w-5 text-primary" aria-hidden="true" />
              <span>Descargar Historial Consolidado (PDF)</span>
            </button>
          </div>
        </div>

        {/* Layout Principal: Filtros y Consultas (8 cols) + Ficha Resumen (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Columna Principal */}
          <section
            aria-label="Historial de consultas médicas"
            className="lg:col-span-8 flex flex-col gap-space-xl"
          >
            {/* Barra de Filtros de Búsqueda Avanzada */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg sm:p-space-xl shadow-sm flex flex-col gap-space-lg border border-outline-variant/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                <span className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-space-2xs font-semibold">
                  <SlidersHorizontal className="h-5 w-5 text-primary" aria-hidden="true" />
                  Filtrar Consultas
                </span>
                <span
                  id="results-counter"
                  aria-live="polite"
                  aria-atomic="true"
                  className="font-label-md text-label-md text-on-surface-variant bg-surface-container px-space-sm py-1 rounded-full font-medium"
                >
                  Mostrando {filteredConsultations.length} {filteredConsultations.length === 1 ? "consulta registrada" : "consultas registradas"}
                </span>
              </div>

              {/* Formulario de Filtros */}
              <form
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-md"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Campo de Búsqueda de Texto Completo */}
                <div className="lg:col-span-12 flex flex-col gap-space-2xs">
                  <label
                    htmlFor="busqueda-consultas"
                    className="font-label-sm text-label-sm text-on-surface font-semibold"
                  >
                    Búsqueda Rápida
                  </label>
                  <div className="relative flex items-center">
                    <Search
                      className="absolute left-4 text-on-surface-variant h-5 w-5 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      id="busqueda-consultas"
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Buscar por profesional, diagnóstico o motivo de consulta..."
                      aria-label="Buscar consultas por profesional, diagnóstico o motivo"
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-lowest border-0 ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-body-md text-on-surface placeholder:text-outline transition-all"
                    />
                  </div>
                </div>

                {/* Especialidad */}
                <div className="lg:col-span-6 flex flex-col gap-space-2xs">
                  <label
                    htmlFor="filter-specialty"
                    className="font-label-sm text-label-sm text-on-surface font-semibold"
                  >
                    Especialidad Médica
                  </label>
                  <div className="relative">
                    <select
                      id="filter-specialty"
                      value={specialtyFilter}
                      onChange={(e) => setSpecialtyFilter(e.target.value)}
                      className="w-full h-12 pl-4 pr-10 rounded-xl bg-surface-container-lowest ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-body-md text-on-surface appearance-none transition-all cursor-pointer border-0"
                    >
                      <option value="">Todas las especialidades</option>
                      <option value="cardio">Cardiología</option>
                      <option value="trauma">Traumatología</option>
                      <option value="clinica">Clínica Médica</option>
                      <option value="derma">Dermatología</option>
                      <option value="oftalmo">Oftalmología</option>
                    </select>
                    <ChevronDown
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Rango / Período */}
                <div className="lg:col-span-6 flex flex-col gap-space-2xs">
                  <label
                    htmlFor="filter-period"
                    className="font-label-sm text-label-sm text-on-surface font-semibold"
                  >
                    Período Temporal
                  </label>
                  <div className="relative">
                    <select
                      id="filter-period"
                      value={periodFilter}
                      onChange={(e) => setPeriodFilter(e.target.value)}
                      className="w-full h-12 pl-4 pr-10 rounded-xl bg-surface-container-lowest ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-body-md text-on-surface appearance-none transition-all cursor-pointer border-0"
                    >
                      <option value="all">Últimos 6 meses</option>
                      <option value="30days">Últimos 30 días</option>
                      <option value="2024">Año 2024</option>
                      <option value="2023">Año 2023</option>
                      <option value="custom">Personalizado</option>
                    </select>
                    <Calendar
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Sede */}
                <div className="lg:col-span-6 flex flex-col gap-space-2xs">
                  <label
                    htmlFor="filter-location"
                    className="font-label-sm text-label-sm text-on-surface font-semibold"
                  >
                    Sede o Modalidad
                  </label>
                  <div className="relative">
                    <select
                      id="filter-location"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full h-12 pl-4 pr-10 rounded-xl bg-surface-container-lowest ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-body-md text-on-surface appearance-none transition-all cursor-pointer border-0"
                    >
                      <option value="">Todas las sedes</option>
                      <option value="belgrano">Sede Central Belgrano</option>
                      <option value="las-heras">Sede Las Heras</option>
                      <option value="tele">Teleconsulta Sentria</option>
                    </select>
                    <MapPin
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Estado de Atención */}
                <div className="lg:col-span-6 flex flex-col gap-space-2xs">
                  <label
                    htmlFor="filter-status"
                    className="font-label-sm text-label-sm text-on-surface font-semibold"
                  >
                    Estado del Proceso
                  </label>
                  <div className="relative">
                    <select
                      id="filter-status"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="w-full h-12 pl-4 pr-10 rounded-xl bg-surface-container-lowest ring-1 ring-outline-variant focus:ring-2 focus:ring-primary font-body-md text-body-md text-on-surface appearance-none transition-all cursor-pointer border-0"
                    >
                      <option value="">Atendido / Finalizado</option>
                      <option value="pending">Estudios Pendientes</option>
                      <option value="interconsulta">Interconsulta</option>
                    </select>
                    <CheckCircle2
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none h-5 w-5"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </form>

              {/* Barra de Acciones de Filtrado */}
              <div className="flex items-center justify-between pt-space-xs">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <span className="font-label-sm text-label-sm text-outline">Filtros Activos:</span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-secondary-fixed text-on-secondary-fixed font-semibold">
                    {periodFilter === "all" ? "Últimos 6 meses" : periodFilter === "2024" ? "2024" : periodFilter === "2023" ? "2023" : periodFilter}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-secondary-fixed text-on-secondary-fixed font-semibold">
                    Finalizadas
                  </span>
                </div>
                <button
                  type="button"
                  id="reset-filters"
                  onClick={handleResetFilters}
                  className="font-label-md text-label-md text-primary hover:text-primary-container inline-flex items-center gap-1 transition-colors px-2 py-1 rounded focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer font-semibold"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Limpiar Filtros
                </button>
              </div>
            </div>

            {/* Listado de Tarjetas de Consultas */}
            {filteredConsultations.length === 0 ? (
              <div className="p-space-xl text-center bg-surface-container-lowest rounded-2xl border border-surface-container-high text-slate-600">
                <p className="font-body-lg">
                  No se encontraron consultas con los filtros seleccionados.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="mt-3 font-label-md text-primary hover:underline cursor-pointer font-semibold"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              filteredConsultations.map((c) => (
                <article
                  key={c.id}
                  className="bg-surface-container-lowest rounded-2xl p-space-lg sm:p-space-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden border border-outline-variant/30"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-md pb-space-md">
                    <div className="flex items-start gap-space-md">
                      <div className="w-12 h-12 rounded-xl bg-primary-container/10 text-primary flex items-center justify-center shrink-0">
                        {getSpecialtyIcon(c.specialtySlug)}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-space-xs flex-wrap">
                          <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                            {c.specialty}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface font-medium">
                            {c.statusLabel}
                          </span>
                        </div>
                        <span className="font-body-lg-medium text-body-lg-medium text-primary mt-0.5 font-semibold">
                          {c.doctorName}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">
                          {c.doctorLicense} • {c.doctorRole}
                        </span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-start sm:items-end justify-between gap-space-2xs sm:text-right bg-surface-container-low sm:bg-transparent p-space-sm sm:p-0 rounded-xl">
                      <div className="flex items-center gap-1 text-on-surface font-label-md text-label-md font-semibold">
                        <Calendar className="h-4 w-4 text-outline" aria-hidden="true" />
                        {c.dateDisplay}
                      </div>
                      <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                        <Clock className="h-4 w-4" aria-hidden="true" />
                        {c.timeDisplay}
                      </div>
                      <div className="flex items-center gap-1 text-outline font-label-sm text-label-sm">
                        {c.isTelehealth ? (
                          <Video className="h-4 w-4 text-primary" aria-hidden="true" />
                        ) : (
                          <Building2 className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span className={c.isTelehealth ? "text-primary font-semibold" : ""}>
                          {c.venue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Diagnóstico e Indicaciones */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md bg-surface-container-low rounded-xl p-space-md sm:p-space-lg my-space-md">
                    <div className="flex flex-col gap-space-2xs">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline flex items-center gap-1 font-semibold">
                        <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
                        Diagnóstico Principal
                      </span>
                      <p className="font-body-md-medium text-body-md-medium text-on-surface font-semibold">
                        {c.primaryDiagnosis}
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {c.diagnosticNotes}
                      </p>
                    </div>

                    <div className="flex flex-col gap-space-2xs">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-outline flex items-center gap-1 font-semibold">
                        <Pill className="h-4 w-4 text-primary" aria-hidden="true" />
                        Indicación Terapéutica
                      </span>
                      <p className="font-body-md-medium text-body-md-medium text-on-surface font-semibold">
                        {c.therapeuticIndication}
                      </p>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {c.therapeuticNotes}
                      </p>
                    </div>
                  </div>

                  {/* Métricas de la Consulta si existen */}
                  {c.vitals && (
                    <div className="flex flex-wrap items-center gap-space-md py-space-xs text-on-surface-variant">
                      {c.vitals.bloodPressure && (
                        <div className="flex items-center gap-space-2xs bg-surface-container px-3 py-1.5 rounded-lg">
                          <span className="font-label-sm text-label-sm text-outline">Tensión:</span>
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            {c.vitals.bloodPressure}
                          </span>
                        </div>
                      )}
                      {c.vitals.heartRate && (
                        <div className="flex items-center gap-space-2xs bg-surface-container px-3 py-1.5 rounded-lg">
                          <span className="font-label-sm text-label-sm text-outline">Frecuencia:</span>
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            {c.vitals.heartRate}
                          </span>
                        </div>
                      )}
                      {c.vitals.spO2 && (
                        <div className="flex items-center gap-space-2xs bg-surface-container px-3 py-1.5 rounded-lg">
                          <span className="font-label-sm text-label-sm text-outline">SpO2:</span>
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            {c.vitals.spO2}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Acciones de la Tarjeta */}
                  <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-md mt-space-sm border-t border-surface-container">
                    <div className="flex flex-wrap items-center gap-space-xs">
                      {c.actions.hasClinicalSummary && (
                        <button
                          type="button"
                          onClick={() => handleActionClick("Resumen Clínico", `${c.specialty} - ${c.doctorName}`)}
                          className="inline-flex items-center gap-space-2xs px-space-md h-10 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer font-medium"
                        >
                          <Eye className="h-4 w-4" aria-hidden="true" />
                          <span>Ver Resumen Clínico</span>
                        </button>
                      )}

                      {c.actions.hasPrescription && (
                        <button
                          type="button"
                          onClick={() => handleActionClick("Receta Médica", `Indicación de ${c.doctorName}`)}
                          className="inline-flex items-center gap-space-2xs px-space-md h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer font-medium"
                        >
                          <Receipt className="h-4 w-4" aria-hidden="true" />
                          <span>Descargar Receta</span>
                        </button>
                      )}

                      {c.actions.hasMedicalOrder && (
                        <button
                          type="button"
                          onClick={() => handleActionClick("Orden Médica", `Estudio / Kinesiología`)}
                          className="inline-flex items-center gap-space-2xs px-space-md h-10 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer font-medium"
                        >
                          <Receipt className="h-4 w-4" aria-hidden="true" />
                          <span>Ver Orden Médica</span>
                        </button>
                      )}

                      {c.actions.hasRestCertificate && (
                        <button
                          type="button"
                          onClick={() => handleActionClick("Certificado de Reposo", "Reposo 48hs")}
                          className="inline-flex items-center gap-space-2xs px-space-md h-10 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer font-medium"
                        >
                          <Download className="h-4 w-4" aria-hidden="true" />
                          <span>Descargar Certificado de Reposo</span>
                        </button>
                      )}
                    </div>

                    {c.actions.canBookDirect && onBookAppointmentWithDoctor && (
                      <button
                        type="button"
                        onClick={() => onBookAppointmentWithDoctor(c.doctorName, c.specialty)}
                        className="inline-flex items-center gap-space-2xs px-space-md h-10 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all shadow-sm focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:outline-none cursor-pointer font-semibold"
                      >
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        <span>Solicitar Nuevo Turno con {c.doctorName}</span>
                      </button>
                    )}
                  </div>
                </article>
              ))
            )}

            {/* Paginación Simplificada / Carga de Historial Previo */}
            <div className="flex items-center justify-between py-space-sm text-on-surface-variant font-label-md text-label-md">
              <span>
                Mostrando {filteredConsultations.length} de {hasLoaded2023 ? 5 : 8} atenciones registradas
              </span>
              <div className="flex items-center gap-space-xs">
                {!hasLoaded2023 ? (
                  <button
                    type="button"
                    onClick={handleLoadMore2023}
                    className="px-space-md py-space-xs rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer font-medium"
                  >
                    Cargar consultas de 2023
                  </button>
                ) : (
                  <span className="font-label-sm text-outline">
                    Historial 2023-2024 consolidado
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* Columna Lateral: Ficha de Resumen Médico del Paciente */}
          <aside
            aria-label="Ficha de resumen clínico del paciente"
            className="lg:col-span-4 flex flex-col gap-space-xl"
            role="complementary"
          >
            {/* Tarjeta Ficha Médica */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg sm:p-space-xl shadow-sm flex flex-col gap-space-lg sticky top-28 border border-outline-variant/30">
              <div className="flex items-center justify-between pb-space-xs">
                <div className="flex items-center gap-space-xs">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center">
                    <FileText className="h-5 w-5 text-on-primary-container" aria-hidden="true" />
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Ficha de Resumen
                  </h2>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full font-label-sm text-[10px] bg-primary-fixed text-on-primary-fixed font-semibold">
                  Activa
                </span>
              </div>

              {/* Datos Demográficos y de Afiliación */}
              <div className="flex flex-col gap-space-md bg-surface-container-low p-space-md rounded-xl">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                    Paciente Titular
                  </span>
                  <span className="font-body-lg-medium text-body-lg-medium text-on-surface font-bold">
                    {PATIENT_CLINICAL_PROFILE.fullName}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    DNI {PATIENT_CLINICAL_PROFILE.docNumber} • {PATIENT_CLINICAL_PROFILE.age} años
                  </span>
                </div>
                <div className="w-full h-px bg-surface-container-high" />
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                    Cobertura Médica
                  </span>
                  <span className="font-body-md-medium text-body-md-medium text-on-surface font-bold">
                    {PATIENT_CLINICAL_PROFILE.coverage}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    N° Afiliado {PATIENT_CLINICAL_PROFILE.memberNumber}
                  </span>
                </div>
              </div>

              {/* Parámetros Clínicos Críticos */}
              <div className="flex flex-col gap-space-md">
                {/* Grupo Sanguíneo */}
                <div className="flex items-center justify-between p-space-sm bg-surface-container rounded-xl">
                  <div className="flex items-center gap-space-xs">
                    <Droplet className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Grupo Sanguíneo
                    </span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    {PATIENT_CLINICAL_PROFILE.bloodType}
                  </span>
                </div>

                {/* Alergias Registradas */}
                <div
                  className="flex flex-col gap-space-2xs p-space-sm bg-error-container/40 rounded-xl border border-error/20"
                  role="region"
                  aria-label="Alergias médicas verificadas"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-error uppercase tracking-wider font-semibold flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                      Alergias Registradas
                    </span>
                    <span className="font-label-sm text-[10px] text-error font-semibold bg-surface-container-lowest px-2 py-0.5 rounded-full shadow-xs">
                      Verificado
                    </span>
                  </div>
                  <p className="font-body-md-medium text-body-md-medium text-on-error-container font-semibold">
                    {PATIENT_CLINICAL_PROFILE.allergies[0].allergen}
                  </p>
                  <span className="font-label-sm text-[11px] text-on-error-container/80">
                    {PATIENT_CLINICAL_PROFILE.allergies[0].registeredBy}
                  </span>
                </div>

                {/* Medicación Habitual */}
                <div className="flex flex-col gap-space-2xs p-space-sm bg-surface-container rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold">
                      Medicación Habitual Activa
                    </span>
                    <Pill className="h-4 w-4 text-outline" aria-hidden="true" />
                  </div>
                  <p className="font-body-md-medium text-body-md-medium text-on-surface font-semibold">
                    {PATIENT_CLINICAL_PROFILE.activeMedications}
                  </p>
                  <span className="font-label-sm text-[11px] text-on-surface-variant">
                    {PATIENT_CLINICAL_PROFILE.medicationNotes}
                  </span>
                </div>
              </div>

              {/* Sincronización y Validación del Sistema de Salud */}
              <div className="flex flex-col gap-space-xs pt-space-xs border-t-0">
                <div className="flex items-start gap-space-xs">
                  <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      Red Hospitalaria Conectada
                    </span>
                    <p className="font-label-sm text-label-sm text-outline">
                      {PATIENT_CLINICAL_PROFILE.networkStatus}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-surface-container-low px-space-sm py-2 rounded-lg mt-space-2xs">
                  <span className="font-label-sm text-[11px] text-outline">Última actualización:</span>
                  <span className="font-label-sm text-[11px] text-on-surface font-medium">
                    {PATIENT_CLINICAL_PROFILE.lastSyncTime}
                  </span>
                </div>
              </div>

              {/* Solicitud de Rectificación o Actualización */}
              <button
                type="button"
                onClick={() =>
                  onShowToast?.(
                    "Solicitud de Actualización",
                    "Se abrió el formulario de rectificación de datos para enviar a recepción central.",
                    "edit_note",
                    "info"
                  )
                }
                className="w-full h-11 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-space-xs focus:ring-2 focus:ring-primary focus:outline-none cursor-pointer font-medium"
              >
                <FileEdit className="h-4 w-4" aria-hidden="true" />
                <span>Solicitar Corrección de Datos</span>
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
