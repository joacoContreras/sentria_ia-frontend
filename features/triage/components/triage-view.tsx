"use client"

import React, { useState } from "react"
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  Brain,
  CalendarPlus,
  Check,
  CheckCircle2,
  Clock,
  Download,
  Gauge,
  Heart,
  Lock,
  Phone,
  Plus,
  RotateCw,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TriageViewProps {
  onOpenBookAppointment?: (specialty?: string, doctor?: string) => void
  onShowToast?: (title: string, message: string, icon?: string, type?: "success" | "info" | "warning" | "error") => void
}

const QUICK_SYMPTOMS = [
  "Dolor de cabeza agudo",
  "Fiebre persistente > 38°",
  "Dificultad respiratoria leve",
  "Dolor lumbar",
  "Molestia abdominal",
  "Tos persistente",
]

export function TriageView({
  onOpenBookAppointment,
  onShowToast,
}: TriageViewProps) {
  const [selectedChips, setSelectedChips] = useState<string[]>([])
  const [symptomText, setSymptomText] = useState<string>(
    "Cefalea pulsátil frontal izquierda de 48 horas de evolución. Aumenta con estímulos luminosos intensos. Acompañada de náuseas leves matinales sin vómitos."
  )
  const [painLevel, setPainLevel] = useState<number>(6)
  const [duration, setDuration] = useState<string>("1_to_3_days")
  const [riskFactors, setRiskFactors] = useState<string[]>(["allergies"])
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
  const [analysisHighlight, setAnalysisHighlight] = useState<boolean>(false)

  // Toggle quick symptom chip
  const toggleChip = (symptom: string) => {
    if (selectedChips.includes(symptom)) {
      setSelectedChips((prev) => prev.filter((s) => s !== symptom))
      setSymptomText((prev) =>
        prev
          .replace(`${symptom}. `, "")
          .replace(`${symptom}.`, "")
          .replace(symptom, "")
          .trim()
      )
    } else {
      setSelectedChips((prev) => [...prev, symptom])
      setSymptomText((prev) => {
        const clean = prev.trim()
        if (clean.includes(symptom)) return clean
        return clean ? `${clean} ${symptom}.` : `${symptom}.`
      })
    }
  }

  // Toggle risk factors
  const toggleRiskFactor = (factor: string) => {
    setRiskFactors((prev) =>
      prev.includes(factor) ? prev.filter((f) => f !== factor) : [...prev, factor]
    )
  }

  // Pain level label
  const getPainLabel = (level: number) => {
    if (level <= 3) return "Leve"
    if (level <= 6) return "Moderado"
    if (level <= 8) return "Severo"
    return "Muy Severo"
  }

  // AI analysis simulation
  const handleAnalyze = () => {
    if (isAnalyzing) return
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setAnalysisHighlight(true)
      onShowToast?.(
        "Triage Actualizado",
        "Evaluación clínica algorítmica procesada con éxito.",
        "neurology",
        "success"
      )
      setTimeout(() => {
        setAnalysisHighlight(false)
      }, 1500)
    }, 1200)
  }

  const handleDownloadReport = () => {
    onShowToast?.(
      "Informe Clínico Generado",
      "Descargando Informe Clínico Digital de Triage Sentria (PDF)...",
      "download",
      "success"
    )
  }

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-200">
      <div className="w-full max-w-container-max mx-auto px-gutter-mobile sm:px-gutter-desktop py-space-xl">
        {/* Alerta Institucional de Cabecera */}
        <div
          role="alert"
          aria-live="assertive"
          className="mb-space-lg p-space-md rounded-xl bg-error-container/40 text-on-surface flex items-start gap-space-sm shadow-sm border border-error/20"
        >
          <AlertOctagon className="h-6 w-6 text-error shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg text-error font-bold">
              Aviso Importante
            </span>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Este sistema es una guía orientativa asistida por IA y no reemplaza el criterio médico de emergencia ni el servicio de guardia 24hs. Ante dolor torácico opresivo, pérdida súbita de conciencia o disnea grave, comuníquese inmediatamente al{" "}
              <strong className="text-on-surface font-bold">107 / 911</strong> o concurra a la guardia hospitalaria más cercana.
            </p>
          </div>
        </div>

        {/* Encabezado de la Sección */}
        <div className="mb-space-2xl flex flex-col md:flex-row md:items-end md:justify-between gap-space-md">
          <div className="max-w-3xl">
            <div className="flex items-center gap-space-xs text-primary font-label-md text-label-md uppercase tracking-wider mb-space-2xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Protocolo Clínico Manchester &amp; Sentria Algorithmic Triage</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Evaluación y Triage Clínico de Síntomas
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-2xs">
              Asistente de orientación clínica inteligente. Describe lo que sientes para recibir una recomendación de urgencia, derivación de especialidad y sugerencia de agendamiento.
            </p>
          </div>
          <div className="flex items-center gap-space-xs self-start md:self-auto bg-surface-container px-space-md py-space-xs rounded-lg">
            <Lock className="h-4 w-4 text-primary" aria-hidden="true" />
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              Datos cifrados E2E · Cumple Ley 25.326
            </span>
          </div>
        </div>

        {/* Layout Principal: 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Columna Izquierda: Captura y Evaluación activa (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* Tarjeta de Ingreso de Síntomas */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-lg border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary font-label-md text-label-md font-bold">
                    1
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Manifestación del Cuadro
                  </h2>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Paso 1 de 2
                </span>
              </div>

              {/* Selector rápido de síntomas frecuentes */}
              <div className="flex flex-col gap-space-2xs">
                <label className="font-label-md text-label-md text-on-surface-variant font-medium">
                  Selección rápida de motivos de consulta frecuentes:
                </label>
                <div className="flex flex-wrap gap-space-xs mt-space-2xs" id="quick-symptoms">
                  {QUICK_SYMPTOMS.map((sym) => {
                    const isSelected = selectedChips.includes(sym)
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleChip(sym)}
                        className={cn(
                          "symptom-chip px-space-md py-space-xs rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer",
                          isSelected
                            ? "bg-primary text-on-primary font-semibold shadow-xs"
                            : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
                        )}
                      >
                        {isSelected ? (
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        ) : (
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        )}
                        <span>{sym}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Campo de texto amplio para relato de síntomas */}
              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="symptom-text"
                    className="font-label-lg text-label-lg text-on-surface font-semibold"
                  >
                    Describe tus síntomas, duración e intensidad en detalle
                  </label>
                  <span
                    id="char-counter"
                    className="font-label-sm text-label-sm text-on-surface-variant font-medium"
                  >
                    {symptomText.length} caracteres
                  </span>
                </div>
                <textarea
                  id="symptom-text"
                  rows={4}
                  value={symptomText}
                  onChange={(e) => setSymptomText(e.target.value)}
                  placeholder="Ej: Cefalea pulsátil de localización frontal desde hace 48 horas, acompañada de náuseas leves y sensibilidad a la luz natural..."
                  className="w-full p-space-md rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all resize-y border-0 ring-1 ring-outline-variant/30"
                />
              </div>

              {/* Escala de dolor Visual (1 a 10) */}
              <div className="flex flex-col gap-space-xs p-space-md rounded-xl bg-surface-container-low/70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <Gauge className="h-5 w-5 text-primary" aria-hidden="true" />
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      Escala Visual Analógica del Dolor (EVA)
                    </span>
                  </div>
                  <span
                    id="pain-indicator"
                    className="font-headline-sm text-headline-sm text-primary font-bold"
                  >
                    {painLevel} / 10 · {getPainLabel(painLevel)}
                  </span>
                </div>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  1 representa molestia mínima y 10 dolor insoportable e incapacitante.
                </p>
                <div
                  aria-label="Escala analógica visual del dolor de 1 a 10"
                  className="grid grid-cols-10 gap-1.5 mt-space-2xs"
                  id="pain-buttons"
                  role="radiogroup"
                >
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((lvl) => {
                    const isSelected = painLevel === lvl
                    return (
                      <button
                        key={lvl}
                        type="button"
                        role="radio"
                        aria-checked={isSelected}
                        onClick={() => setPainLevel(lvl)}
                        className={cn(
                          "pain-btn py-2 text-center rounded-lg font-label-md text-label-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer",
                          isSelected
                            ? "bg-primary text-on-primary font-bold shadow-sm"
                            : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
                        )}
                      >
                        {lvl}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Selectores contextuales de temporalidad y comorbilidades */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <fieldset className="border-0 p-0 m-0 flex flex-col gap-space-xs">
                  <legend className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-space-2xs mb-2">
                    <Clock className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                    Duración del episodio
                  </legend>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: "under_24h", label: "Menos de 24 horas" },
                      { id: "1_to_3_days", label: "1 a 3 días" },
                      { id: "over_week", label: "Más de una semana" },
                    ].map((dur) => {
                      const isChecked = duration === dur.id
                      return (
                        <label
                          key={dur.id}
                          className={cn(
                            "flex items-center gap-space-sm p-space-xs px-space-sm rounded-lg cursor-pointer transition-colors",
                            isChecked ? "bg-surface-container font-semibold" : "bg-surface-container-low hover:bg-surface-container"
                          )}
                        >
                          <input
                            type="radio"
                            name="duration"
                            value={dur.id}
                            checked={isChecked}
                            onChange={() => setDuration(dur.id)}
                            className="text-primary focus:ring-0 cursor-pointer"
                          />
                          <span className="font-body-md text-body-md text-on-surface">
                            {dur.label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                <fieldset className="border-0 p-0 m-0 flex flex-col gap-space-xs">
                  <legend className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center gap-space-2xs mb-2">
                    <Brain className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                    Antecedentes y comorbilidades
                  </legend>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: "hypertension", label: "Hipertensión arterial" },
                      { id: "diabetes", label: "Diabetes diagnosticada" },
                      { id: "allergies", label: "Alergias medicamentosas (AINEs)" },
                    ].map((factor) => {
                      const isChecked = riskFactors.includes(factor.id)
                      return (
                        <label
                          key={factor.id}
                          className={cn(
                            "flex items-center gap-space-sm p-space-xs px-space-sm rounded-lg cursor-pointer transition-colors",
                            isChecked ? "bg-surface-container-low font-semibold" : "bg-surface-container-low hover:bg-surface-container"
                          )}
                        >
                          <input
                            type="checkbox"
                            name="risk_factors"
                            value={factor.id}
                            checked={isChecked}
                            onChange={() => toggleRiskFactor(factor.id)}
                            className="rounded text-primary focus:ring-0 cursor-pointer"
                          />
                          <span className="font-body-md text-body-md text-on-surface">
                            {factor.label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              </div>

              {/* Botón de Acción Principal de Análisis */}
              <div className="pt-space-xs flex flex-col sm:flex-row items-center justify-between gap-space-md">
                <button
                  type="button"
                  id="analyze-btn"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full sm:w-auto px-space-xl py-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-space-xs hover:bg-primary-container active:scale-[0.98] transition-all shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer disabled:opacity-75"
                >
                  {isAnalyzing ? (
                    <>
                      <RotateCw className="h-5 w-5 animate-spin" aria-hidden="true" />
                      <span>Evaluando con Sentria AI...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5" aria-hidden="true" />
                      <span>Analizar Síntomas con Sentria AI</span>
                    </>
                  )}
                </button>
                <span className="font-label-sm text-label-sm text-on-surface-variant text-center sm:text-right font-medium">
                  Tiempo estimado de análisis: 1.8 segundos
                </span>
              </div>
            </div>

            {/* Telemetría de Constantes Vitales Reportadas por Paciente */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm border border-outline-variant/30">
              <div className="flex items-center justify-between mb-space-md">
                <div className="flex items-center gap-space-xs">
                  <Activity className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Parámetros Basales Registrados Hoy
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Sincronizado vía App Móvil (09:40 hs)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md">
                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                    Presión Arterial
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-vital-metric text-vital-metric text-on-surface font-bold">
                      124/82
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      mmHg
                    </span>
                  </div>
                  <span className="font-label-sm text-[11px] text-primary font-semibold mt-1">
                    Normotensión
                  </span>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                    Frec. Cardíaca
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-vital-metric text-vital-metric text-on-surface font-bold">
                      76
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      lpm
                    </span>
                  </div>
                  <span className="font-label-sm text-[11px] text-primary font-semibold mt-1">
                    Ritmo regular
                  </span>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                    Temperatura
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-vital-metric text-vital-metric text-on-surface font-bold">
                      36.8
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      °C
                    </span>
                  </div>
                  <span className="font-label-sm text-[11px] text-primary font-semibold mt-1">
                    Afebril
                  </span>
                </div>

                <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                    Sat. Oxígeno
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-vital-metric text-vital-metric text-on-surface font-bold">
                      98
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      %
                    </span>
                  </div>
                  <span className="font-label-sm text-[11px] text-primary font-semibold mt-1">
                    Óptima
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Resultado de Triage Orientativo (5 cols) */}
          <aside
            aria-label="Diagnóstico orientativo y pautas de alarma"
            className="lg:col-span-5 flex flex-col gap-space-lg"
            role="complementary"
          >
            <div
              id="triage-result-card"
              aria-live="polite"
              className={cn(
                "bg-surface-container-lowest rounded-2xl p-space-xl shadow-sm flex flex-col gap-space-lg relative overflow-hidden border border-outline-variant/30 transition-all duration-300",
                analysisHighlight && "ring-2 ring-primary ring-offset-2"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Diagnóstico Orientativo Algorítmico
                </span>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                  ID: TR-9428-B
                </span>
              </div>

              {/* Conducta sugerida */}
              <div className="flex flex-col gap-space-2xs">
                <span className="font-label-md text-label-md text-on-surface-variant font-semibold">
                  Conducta clínica sugerida:
                </span>
                <p className="font-body-lg-medium text-body-lg-medium text-on-surface bg-surface-container-low p-space-md rounded-xl leading-relaxed">
                  Se recomienda consulta con{" "}
                  <strong className="text-primary font-bold">
                    Especialista en Neurología o Clínica Médica
                  </strong>{" "}
                  dentro de las próximas{" "}
                  <strong className="text-on-surface font-bold">48 a 72 horas</strong>.
                </p>
              </div>

              {/* Hallazgos y autocuidado */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Hallazgos de evaluación y autocuidado seguro:
                </span>
                <div className="space-y-space-xs">
                  <div className="flex items-start gap-space-xs p-space-xs rounded-lg">
                    <CheckCircle2
                      className="h-4 w-4 text-primary mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      <strong className="text-on-surface font-medium">
                        Patrón vascular/migrañoso compatible:
                      </strong>{" "}
                      El cuadro no evidencia rigidez nucal ni déficit neurológico focal agudo reportado.
                    </p>
                  </div>

                  <div className="flex items-start gap-space-xs p-space-xs rounded-lg">
                    <CheckCircle2
                      className="h-4 w-4 text-primary mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      <strong className="text-on-surface font-medium">
                        Restricción de automedicación:
                      </strong>{" "}
                      Evitar consumo de AINEs por antecedente alérgico registrado. Hidratación constante y reposo en penumbra.
                    </p>
                  </div>

                  <div className="flex items-start gap-space-xs p-space-xs rounded-lg">
                    <CheckCircle2
                      className="h-4 w-4 text-primary mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      <strong className="text-on-surface font-medium">
                        Monitoreo continuo:
                      </strong>{" "}
                      Si se adiciona fiebre &gt; 38.5°C o alteración visual persistente, acudir a guardia de forma urgente.
                    </p>
                  </div>
                </div>
              </div>

              {/* Acciones del Triage */}
              <div className="flex flex-col gap-space-xs pt-space-xs">
                <button
                  type="button"
                  onClick={() => onOpenBookAppointment?.("Neurología", "Dra. Mariana Rossi")}
                  className="w-full py-space-md px-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-semibold flex items-center justify-center gap-space-xs hover:bg-primary-container active:scale-[0.98] transition-all text-center shadow-sm cursor-pointer"
                >
                  <CalendarPlus className="h-5 w-5" aria-hidden="true" />
                  <span>+ Agendar Turno Directo con Especialista</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  className="w-full py-space-sm px-space-md rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg font-medium flex items-center justify-center gap-space-xs transition-colors cursor-pointer"
                >
                  <Download className="h-4 w-4 text-on-surface-variant" aria-hidden="true" />
                  <span>Descargar Informe de Triage en PDF</span>
                </button>
              </div>

              <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-space-2xs border-t border-surface-container">
                <span>Algoritmo Sentria v4.2.1</span>
                <span>Validado bajo SNOMED-CT</span>
              </div>
            </div>

            {/* Pautas de Alarma Inmediata */}
            <div className="bg-surface-container-lowest rounded-2xl p-space-lg shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
              <div className="flex items-center gap-space-xs">
                <AlertTriangle className="h-5 w-5 text-error" aria-hidden="true" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Pautas de Alarma Inmediata
                </h3>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Concurre de urgencia a una guardia médica si en las próximas horas manifiestas:
              </p>
              <ul className="space-y-space-xs font-body-md text-body-md text-on-surface-variant">
                <li className="flex items-start gap-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-error mt-2 shrink-0" aria-hidden="true" />
                  <span>Dolor de cabeza explosivo y súbito de intensidad 10/10 en segundos.</span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-error mt-2 shrink-0" aria-hidden="true" />
                  <span>Dificultad repentina para hablar, sonreír o mover una extremidad.</span>
                </li>
                <li className="flex items-start gap-space-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-error mt-2 shrink-0" aria-hidden="true" />
                  <span>Fiebre alta refractaria con rigidez en el cuello o erupción dérmica.</span>
                </li>
              </ul>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                <div className="flex items-center gap-space-2xs">
                  <Heart className="h-4 w-4 text-on-surface" aria-hidden="true" />
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Guardia Sentria Central: Abierta 24hs
                  </span>
                </div>
                <a
                  href="tel:107"
                  className="font-label-md text-label-md text-primary font-bold hover:underline inline-flex items-center gap-1"
                >
                  <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                  Llamar 107
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
