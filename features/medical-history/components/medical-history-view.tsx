"use client"

import React, { useState, useMemo } from "react"
import {
  Activity,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  Eye,
  FileEdit,
  FileText,
  HeartPulse,
  MapPin,
  Pill,
  Receipt,
  RotateCcw,
  Search,
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
              <span className="w-2 h-2 rounded-full bg-primary" aria-hidden="true" />
              Expediente Clínico Digital
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
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
              className="inline-flex items-center justify-center gap-space-xs px-space-lg h-12 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-lg text-label-lg transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary active:scale-95 cursor-pointer font-semibold border border-outline-variant/30"
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
                      className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low border-0 ring-1 ring-outline-variant/40 focus:ring-2 focus:ring-primary font-body-md text-body-md text-on-surface placeholder:text-outline transition-all"
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
                      className="w-full h-12 pl-4 pr-10 rounded-xl bg-surface-container-low ring-1 ring-outline-variant/40 focus:ring-2 focus:ring-primary font-body-md text-body-md text-on-surface appearance-none transition-all cursor-pointer border-0"
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
                      className="w-full h-12 pl-4 pr-10 rounded-xl bg-surface-container-low ring-1 ring-outline-variant/40 focus:ring-2 focus:ring-primary font-body-md text-body-md text-on-surface appearance-none transition-all cursor-pointer border-0"
                    >
                      <option value="all">Últimos 6 meses</option>
                      <option value="30days">Últimos 30 días</option>
                      <option value="2024">Año 2024</option>
                      <option value="2023">Año 2023</option>
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
                      className="w-full h-12 pl-4 pr-10 rounded-xl bg-surface-container-low ring-1 ring-outline-variant/40 focus:ring-2 focus:ring-primary font-body-md text-body-md text-on-surface appearance-none transition-all cursor-pointer border-0"
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
                      className="w-full h-12 pl-4 pr-10 rounded-xl bg-surface-container-low ring-1 ring-outline-variant/40 focus:ring-2 focus:ring-primary font-body-md text-body-md text-on-surface appearance-none transition-all cursor-pointer border-0"
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
              <div className="flex items-center justify-between pt-space-xs border-t border-surface-container">
                <div className="flex items-center gap-space-xs flex-wrap">
                  <span className="font-label-sm text-label-sm text-outline">Filtros Activos:</span>
                  {periodFilter !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-secondary-container text-on-secondary-container font-semibold">
                      {periodFilter === "2024" ? "Año 2024" : periodFilter === "2023" ? "Año 2023" : "Últimos 30 días"}
                    </span>
                  )}
                  {specialtyFilter && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-secondary-container text-on-secondary-container font-semibold">
                      {specialtyFilter === "cardio" ? "Cardiología" : specialtyFilter === "trauma" ? "Traumatología" : specialtyFilter === "clinica" ? "Clínica Médica" : specialtyFilter}
                    </span>
                  )}
                  {locationFilter && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-secondary-container text-on-secondary-container font-semibold">
                      {locationFilter === "belgrano" ? "Sede Belgrano" : locationFilter === "las-heras" ? "Sede Las Heras" : "Teleconsulta"}
                    </span>
                  )}
                  {statusFilter && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-secondary-container text-on-secondary-container font-semibold">
                      {statusFilter === "pending" ? "Estudios Pendientes" : "Interconsulta"}
                    </span>
                  )}
                  {!specialtyFilter && !locationFilter && !statusFilter && periodFilter === "all" && !searchQuery && (
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      Vista general (Últimos 6 meses)
                    </span>
                  )}
                </div>
                {(specialtyFilter || locationFilter || statusFilter || periodFilter !== "all" || searchQuery) && (
                  <button
                    type="button"
                    id="reset-filters"
                    onClick={handleResetFilters}
                    className="font-label-md text-label-md text-primary hover:text-primary-container inline-flex items-center gap-1 transition-colors px-2 py-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer font-semibold"
                  >
                    <RotateCcw className="h-4 w-4" aria-hidden="true" />
                    Restablecer
                  </button>
                )}
              </div>
            </div>

            {/* Listado de Tarjetas de Consultas */}
            {filteredConsultations.length === 0 ? (
              <div className="p-space-xl text-center bg-surface-container-lowest rounded-2xl border border-surface-container-high text-on-surface-variant">
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
                      <div className="w-12 h-12 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center shrink-0">
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

                    <div className="flex sm:flex-col items-start sm:items-end justify-between gap-space-2xs sm:text-right bg-surface-container-low sm:bg-transparent p-space-sm sm:p-0 rounded-xl border border-outline-variant/20 sm:border-0">
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md bg-surface-container-low rounded-xl p-space-md sm:p-space-lg my-space-md border border-outline-variant/20">
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
                    <div className="flex flex-wrap items-center gap-space-sm py-space-xs text-on-surface-variant">
                      {c.vitals.bloodPressure && (
                        <div className="flex items-center gap-space-2xs bg-surface-container px-3 py-1 rounded-lg border border-outline-variant/20">
                          <span className="font-label-sm text-label-sm text-outline">Tensión:</span>
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            {c.vitals.bloodPressure}
                          </span>
                        </div>
                      )}
                      {c.vitals.heartRate && (
                        <div className="flex items-center gap-space-2xs bg-surface-container px-3 py-1 rounded-lg border border-outline-variant/20">
                          <span className="font-label-sm text-label-sm text-outline">Frecuencia:</span>
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            {c.vitals.heartRate}
                          </span>
                        </div>
                      )}
                      {c.vitals.spO2 && (
                        <div className="flex items-center gap-space-2xs bg-surface-container px-3 py-1 rounded-lg border border-outline-variant/20">
                          <span className="font-label-sm text-label-sm text-outline">SpO2:</span>
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            {c.vitals.spO2}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Acciones de la Tarjeta con Jerarquía Clara */}
                  <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-md mt-space-sm border-t border-surface-container">
                    {/* Documentos y Estudios Clínicos */}
                    <div className="flex flex-wrap items-center gap-space-xs">
                      {c.actions.hasClinicalSummary && (
                        <button
                          type="button"
                          onClick={() => handleActionClick("Resumen Clínico", `${c.specialty} - ${c.doctorName}`)}
                          className="inline-flex items-center gap-space-2xs px-space-md h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer font-medium border border-outline-variant/30"
                        >
                          <Eye className="h-4 w-4 text-primary" aria-hidden="true" />
                          <span>Resumen Clínico</span>
                        </button>
                      )}

                      {c.actions.hasPrescription && (
                        <button
                          type="button"
                          onClick={() => handleActionClick("Receta Médica", `Indicación de ${c.doctorName}`)}
                          className="inline-flex items-center gap-space-2xs px-space-md h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer font-medium border border-outline-variant/30"
                        >
                          <Receipt className="h-4 w-4 text-primary" aria-hidden="true" />
                          <span>Receta</span>
                        </button>
                      )}

                      {c.actions.hasMedicalOrder && (
                        <button
                          type="button"
                          onClick={() => handleActionClick("Orden Médica", `Estudio / Kinesiología`)}
                          className="inline-flex items-center gap-space-2xs px-space-md h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer font-medium border border-outline-variant/30"
                        >
                          <FileText className="h-4 w-4 text-primary" aria-hidden="true" />
                          <span>Orden Médica</span>
                        </button>
                      )}

                      {c.actions.hasRestCertificate && (
                        <button
                          type="button"
                          onClick={() => handleActionClick("Certificado de Reposo", "Reposo 48hs")}
                          className="inline-flex items-center gap-space-2xs px-space-md h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer font-medium border border-outline-variant/30"
                        >
                          <Download className="h-4 w-4 text-primary" aria-hidden="true" />
                          <span>Certificado</span>
                        </button>
                      )}
                    </div>

                    {/* Acción Primaria: Reagendar / Solicitar Turno */}
                    {c.actions.canBookDirect && onBookAppointmentWithDoctor && (
                      <button
                        type="button"
                        onClick={() => onBookAppointmentWithDoctor(c.doctorName, c.specialty)}
                        className="inline-flex items-center gap-space-2xs px-space-lg h-10 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary cursor-pointer font-semibold active:scale-98 ml-auto"
                      >
                        <Calendar className="h-4 w-4" aria-hidden="true" />
                        <span>Solicitar Turno con {c.doctorName}</span>
                      </button>
                    )}
                  </div>
                </article>
              ))
            )}

            {/* Paginación Simplificada / Carga de Historial Previo */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-space-sm py-space-sm text-on-surface-variant font-label-md text-label-md">
              <span>
                Mostrando {filteredConsultations.length} de {hasLoaded2023 ? 5 : 8} atenciones registradas
              </span>
              <div className="flex items-center gap-space-xs">
                {!hasLoaded2023 ? (
                  <button
                    type="button"
                    onClick={handleLoadMore2023}
                    className="px-space-lg py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer font-semibold border border-outline-variant/30"
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

          {/* Columna Lateral: Ficha del Paciente (Minimalista y Serena) */}
          <aside
            aria-label="Ficha clínica del paciente"
            className="lg:col-span-4 flex flex-col gap-space-lg"
            role="complementary"
          >
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg sm:p-space-xl shadow-sm flex flex-col gap-space-lg sticky top-28 border border-outline-variant/30">
              {/* Cabecera de la Ficha */}
              <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Ficha del Paciente
                </h2>
                <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-primary font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                  Sincronizada
                </span>
              </div>

              {/* Identidad y Cobertura */}
              <div className="flex flex-col gap-1">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  {PATIENT_CLINICAL_PROFILE.fullName}
                </span>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  DNI {PATIENT_CLINICAL_PROFILE.docNumber} · {PATIENT_CLINICAL_PROFILE.age} años
                </p>
                <p className="font-label-sm text-label-sm text-outline mt-0.5">
                  {PATIENT_CLINICAL_PROFILE.coverage} · Afiliado N° {PATIENT_CLINICAL_PROFILE.memberNumber}
                </p>
              </div>

              <div className="w-full h-px bg-surface-container" />

              {/* Parámetros Clínicos Esenciales */}
              <div className="flex flex-col gap-space-md">
                <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider font-bold">
                  Información Clínica de Relevancia
                </span>

                {/* Grid Grupo Sanguíneo y Alergias */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-label-sm text-label-sm text-outline">
                      Grupo Sanguíneo
                    </span>
                    <span className="font-body-lg text-body-lg text-on-surface font-bold">
                      {PATIENT_CLINICAL_PROFILE.bloodType}
                    </span>
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <span className="font-label-sm text-label-sm text-outline">
                      Alergias Registradas
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-body-md text-body-md text-on-surface font-semibold">
                        {PATIENT_CLINICAL_PROFILE.allergies[0].allergen}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Medicación Habitual */}
                <div className="flex flex-col gap-0.5 pt-space-xs border-t border-surface-container">
                  <span className="font-label-sm text-label-sm text-outline">
                    Medicación Habitual
                  </span>
                  <span className="font-body-md text-body-md text-on-surface font-medium">
                    {PATIENT_CLINICAL_PROFILE.activeMedications}
                  </span>
                  <span className="font-label-sm text-[11px] text-outline">
                    {PATIENT_CLINICAL_PROFILE.medicationNotes}
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-surface-container" />

              {/* Footer y Acción */}
              <div className="flex flex-col gap-space-xs pt-space-2xs">
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
                  className="w-full h-10 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-space-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer font-medium border border-outline-variant/30"
                >
                  <FileEdit className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span>Solicitar actualización de ficha</span>
                </button>
                <span className="font-label-sm text-[11px] text-outline text-center">
                  Última sincronización: {PATIENT_CLINICAL_PROFILE.lastSyncTime}
                </span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
