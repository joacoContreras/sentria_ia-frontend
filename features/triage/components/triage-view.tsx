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
        {/* Alerta Institucional de Emergencia Médica */}
        <div
          role="alert"
          aria-live="polite"
          className="mb-space-lg p-4 sm:p-5 rounded-2xl bg-error-container/20 text-on-surface flex items-start gap-3.5 shadow-sm border border-error/20"
        >
          <div className="w-9 h-9 rounded-xl bg-error-container/40 text-error flex items-center justify-center shrink-0 border border-error/20 mt-0.5">
            <AlertOctagon className="h-5 w-5 text-error" aria-hidden="true" />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-sm text-error font-bold">
              Orientación Médica Asistida
            </span>
            <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
              Este asistente ofrece una orientación clínica preliminar y no sustituye la consulta médica de urgencia. Ante dolor torácico opresivo, pérdida súbita de fuerza o dificultad respiratoria severa, llama de inmediato al{" "}
              <strong className="text-on-surface font-bold">107 / 911</strong> o concurre a la guardia más cercana.
            </p>
          </div>
        </div>

        {/* Encabezado de la Sección */}
        <div className="mb-space-xl flex flex-col md:flex-row md:items-end md:justify-between gap-space-md">
          <div className="max-w-3xl">
            <div className="flex items-center gap-space-xs text-primary text-xs uppercase tracking-wider mb-space-2xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span>Orientación Clínica Inteligente</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
              Triage y Evaluación de Síntomas
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-2xs">
              Describe tus síntomas actuales para obtener una recomendación sobre el nivel de atención sugerido y agendar con la especialidad adecuada.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto bg-surface-container-high/60 px-3.5 py-1.5 rounded-full border border-outline-variant/30">
            <Lock className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            <span className="text-xs text-on-surface-variant font-medium">
              Datos protegidos y confidenciales
            </span>
          </div>
        </div>

        {/* Layout Principal: 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Columna Izquierda: Captura y Evaluación activa (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            {/* Tarjeta de Ingreso de Síntomas */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-space-lg border border-outline-variant/30">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary text-xs font-bold border border-outline-variant/20">
                    1
                  </span>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Manifestación del Cuadro
                  </h2>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-container text-on-secondary-container">
                  Registro Activo
                </span>
              </div>

              {/* Selector rápido de síntomas frecuentes */}
              <div className="flex flex-col gap-2">
                <label className="text-xs text-outline uppercase tracking-wider font-semibold">
                  Selección rápida de síntomas habituales:
                </label>
                <div className="flex flex-wrap gap-2" id="quick-symptoms">
                  {QUICK_SYMPTOMS.map((sym) => {
                    const isSelected = selectedChips.includes(sym)
                    return (
                      <button
                        key={sym}
                        type="button"
                        onClick={() => toggleChip(sym)}
                        className={cn(
                          "symptom-chip px-3.5 py-1.5 rounded-full text-xs transition-all flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer active:scale-95 border",
                          isSelected
                            ? "bg-primary text-on-primary font-semibold shadow-xs border-primary"
                            : "bg-surface-container-low/70 text-on-surface-variant hover:bg-surface-container border-outline-variant/20 font-medium"
                        )}
                      >
                        {isSelected ? (
                          <Check className="h-3 w-3" aria-hidden="true" />
                        ) : (
                          <Plus className="h-3 w-3 text-outline" aria-hidden="true" />
                        )}
                        <span>{sym}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Campo de texto amplio para relato de síntomas */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="symptom-text"
                    className="text-sm text-on-surface font-semibold"
                  >
                    Describe tus síntomas, duración e intensidad en detalle
                  </label>
                  <span
                    id="char-counter"
                    className="text-xs text-outline font-medium"
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
                  className="w-full p-3.5 rounded-xl bg-surface-container-low text-on-surface text-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all resize-y border-0 ring-1 ring-outline-variant/30"
                />
              </div>

              {/* Escala de dolor Visual (1 a 10) */}
              <div className="flex flex-col gap-3 p-4 rounded-2xl bg-surface-container-low/60 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Gauge className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="text-sm text-on-surface font-semibold">
                      Escala Visual del Dolor (1 al 10)
                    </span>
                  </div>
                  <span
                    id="pain-indicator"
                    className="text-sm text-primary font-bold"
                  >
                    {painLevel} / 10 · {getPainLabel(painLevel)}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Donde 1 representa molestia mínima y 10 dolor muy intenso e incapacitante.
                </p>
                <div
                  aria-label="Escala analógica visual del dolor de 1 a 10"
                  className="grid grid-cols-5 sm:grid-cols-10 gap-1.5 mt-0.5"
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
                        aria-label={`Nivel de dolor ${lvl}`}
                        onClick={() => setPainLevel(lvl)}
                        className={cn(
                          "pain-btn h-11 min-h-[44px] flex items-center justify-center rounded-xl text-xs transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer font-semibold border",
                          isSelected
                            ? "bg-primary text-on-primary shadow-xs border-primary"
                            : "bg-surface-container-lowest text-on-surface hover:bg-surface-container border-outline-variant/20"
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
                <fieldset className="border-0 p-0 m-0 flex flex-col gap-2">
                  <legend className="text-xs uppercase tracking-wider text-outline font-semibold flex items-center gap-1.5 mb-1">
                    <Clock className="h-3.5 w-3.5 text-outline" aria-hidden="true" />
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
                            "flex items-center gap-2.5 p-2.5 px-3 rounded-xl cursor-pointer transition-all border",
                            isChecked
                              ? "bg-surface-container-lowest font-semibold border-primary/40 ring-1 ring-primary/20 shadow-2xs"
                              : "bg-surface-container-low/70 hover:bg-surface-container border-outline-variant/20"
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
                          <span className="text-xs text-on-surface">
                            {dur.label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>

                <fieldset className="border-0 p-0 m-0 flex flex-col gap-2">
                  <legend className="text-xs uppercase tracking-wider text-outline font-semibold flex items-center gap-1.5 mb-1">
                    <Brain className="h-3.5 w-3.5 text-outline" aria-hidden="true" />
                    Antecedentes y condiciones
                  </legend>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { id: "hypertension", label: "Hipertensión arterial" },
                      { id: "diabetes", label: "Diabetes diagnosticada" },
                      { id: "allergies", label: "Alergias a medicamentos (AINEs)" },
                    ].map((factor) => {
                      const isChecked = riskFactors.includes(factor.id)
                      return (
                        <label
                          key={factor.id}
                          className={cn(
                            "flex items-center gap-2.5 p-2.5 px-3 rounded-xl cursor-pointer transition-all border",
                            isChecked
                              ? "bg-surface-container-lowest font-semibold border-primary/40 ring-1 ring-primary/20 shadow-2xs"
                              : "bg-surface-container-low/70 hover:bg-surface-container border-outline-variant/20"
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
                          <span className="text-xs text-on-surface">
                            {factor.label}
                          </span>
                        </label>
                      )
                    })}
                  </div>
                </fieldset>
              </div>

              {/* Botón de Acción Principal de Análisis */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-surface-container/60">
                <button
                  type="button"
                  id="analyze-btn"
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-primary text-on-primary text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer disabled:opacity-75"
                >
                  {isAnalyzing ? (
                    <>
                      <RotateCw className="h-4 w-4 animate-spin" aria-hidden="true" />
                      <span>Evaluando síntomas...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4" aria-hidden="true" />
                      <span>Actualizar Evaluación de Síntomas</span>
                    </>
                  )}
                </button>
                <span className="text-xs text-on-surface-variant text-center sm:text-right font-medium">
                  Análisis asistido instantáneo
                </span>
              </div>
            </div>

            {/* Telemetría de Constantes Vitales - FUERA DE ALCANCE (DISABLED) */}
            <div
              aria-disabled="true"
              className="bg-surface-container-low/30 rounded-2xl p-5 md:p-6 shadow-xs border border-dashed border-outline-variant/50 opacity-60 select-none cursor-not-allowed transition-opacity"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-outline" aria-hidden="true" />
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                    Parámetros Basales Registrados Hoy
                  </h3>
                </div>
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-surface-container-high/60 text-on-surface-variant font-medium self-start sm:self-auto border border-outline-variant/30">
                  Funcionalidad fuera de alcance
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pointer-events-none">
                <div className="p-3 rounded-xl bg-surface-container-lowest/70 flex flex-col border border-outline-variant/20">
                  <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                    Presión Arterial
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-vital-metric text-vital-metric text-on-surface font-bold">
                      124/82
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      mmHg
                    </span>
                  </div>
                  <span className="text-[10px] text-outline font-semibold mt-1">
                    Normotensión
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-lowest/70 flex flex-col border border-outline-variant/20">
                  <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                    Frec. Cardíaca
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-vital-metric text-vital-metric text-on-surface font-bold">
                      76
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      lpm
                    </span>
                  </div>
                  <span className="text-[10px] text-outline font-semibold mt-1">
                    Ritmo regular
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-lowest/70 flex flex-col border border-outline-variant/20">
                  <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                    Temperatura
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-vital-metric text-vital-metric text-on-surface font-bold">
                      36.8
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      °C
                    </span>
                  </div>
                  <span className="text-[10px] text-outline font-semibold mt-1">
                    Afebril
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-surface-container-lowest/70 flex flex-col border border-outline-variant/20">
                  <span className="text-[11px] font-semibold text-outline uppercase tracking-wider">
                    Sat. Oxígeno
                  </span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="font-vital-metric text-vital-metric text-on-surface font-bold">
                      98
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      %
                    </span>
                  </div>
                  <span className="text-[10px] text-outline font-semibold mt-1">
                    Óptima
                  </span>
                </div>
              </div>
              <p className="text-xs text-outline mt-3">
                Nota: La sincronización telemétrica automática de constantes basales se encuentra deshabilitada en esta versión del portal.
              </p>
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
                "bg-surface-container-lowest rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-4 relative overflow-hidden border border-outline-variant/30 transition-all duration-300",
                analysisHighlight && "ring-2 ring-primary ring-offset-2"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-primary uppercase tracking-wider font-bold">
                  Orientación Clínica Preliminar
                </span>
                <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold">
                  Prioridad Media
                </span>
              </div>

              {/* Conducta sugerida */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-outline uppercase tracking-wider font-semibold">
                  Conducta recomendada:
                </span>
                <p className="text-sm text-on-surface bg-surface-container-low/60 p-4 rounded-xl leading-relaxed border border-outline-variant/20">
                  Se recomienda consulta ambulatoria con{" "}
                  <strong className="text-primary font-bold">
                    Especialista en Neurología o Clínica Médica
                  </strong>{" "}
                  dentro de las próximas{" "}
                  <strong className="text-on-surface font-bold">48 a 72 horas</strong>.
                </p>
              </div>

              {/* Hallazgos y autocuidado */}
              <div className="flex flex-col gap-2">
                <span className="text-xs text-outline uppercase tracking-wider font-semibold">
                  Pautas de cuidado general:
                </span>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-surface-container-low/40 border border-outline-variant/10">
                    <CheckCircle2
                      className="h-4 w-4 text-primary mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      <strong className="text-on-surface font-medium">
                        Patrón compatible sin signos de foco agudo:
                      </strong>{" "}
                      No se evidencian signos focales ni rigidez nucal en el relato.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-surface-container-low/40 border border-outline-variant/10">
                    <CheckCircle2
                      className="h-4 w-4 text-primary mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      <strong className="text-on-surface font-medium">
                        Evitar automedicación:
                      </strong>{" "}
                      No consumir AINEs por antecedente de alergia registrado en ficha. Mantener reposo en ambiente tranquilo.
                    </p>
                  </div>

                  <div className="flex items-start gap-2.5 p-2 rounded-xl bg-surface-container-low/40 border border-outline-variant/10">
                    <CheckCircle2
                      className="h-4 w-4 text-primary mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      <strong className="text-on-surface font-medium">
                        Control evolutivo:
                      </strong>{" "}
                      Si se adiciona fiebre &gt; 38.5°C o síntomas visuales nuevos, recurrir a guardia médica.
                    </p>
                  </div>
                </div>
              </div>

              {/* Acciones del Triage */}
              <div className="flex flex-col gap-2 pt-2 border-t border-surface-container/60">
                <button
                  type="button"
                  onClick={() => onOpenBookAppointment?.("Neurología", "Dra. Mariana Rossi")}
                  className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary text-xs font-semibold flex items-center justify-center gap-2 hover:bg-primary-container active:scale-[0.98] transition-all text-center shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <CalendarPlus className="h-4 w-4" aria-hidden="true" />
                  <span>Agendar Turno con Especialista</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadReport}
                  className="w-full py-2.5 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-outline-variant/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  <Download className="h-3.5 w-3.5 text-on-surface-variant" aria-hidden="true" />
                  <span>Descargar Informe de Triage (PDF)</span>
                </button>
              </div>
            </div>

            {/* Pautas de Alarma Inmediata */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 md:p-6 shadow-sm flex flex-col gap-3.5 border border-outline-variant/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-error-container/30 text-error flex items-center justify-center shrink-0 border border-error/20">
                  <AlertTriangle className="h-4 w-4 text-error" aria-hidden="true" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                  Pautas de Alarma Inmediata
                </h3>
              </div>
              <p className="text-xs text-on-surface-variant">
                Concurre de urgencia a una guardia médica si manifiestas:
              </p>
              <ul className="space-y-2 text-xs text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0" aria-hidden="true" />
                  <span>Dolor de cabeza de máxima intensidad súbito e inhabitual.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0" aria-hidden="true" />
                  <span>Dificultad repentina para hablar, sonreír o movilizar un brazo o pierna.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-error mt-1.5 shrink-0" aria-hidden="true" />
                  <span>Fiebre alta con rigidez de nuca o confusión mental.</span>
                </li>
              </ul>
              <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between border border-outline-variant/20 mt-1">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-on-surface" aria-hidden="true" />
                  <span className="text-xs text-on-surface font-semibold">
                    Guardia Sentria 24hs
                  </span>
                </div>
                <a
                  href="tel:107"
                  className="text-xs text-primary font-bold hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
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
