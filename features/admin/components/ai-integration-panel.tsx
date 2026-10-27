"use client"

import React, { useState } from "react"
import {
  Bot,
  Sparkles,
  CheckCircle2,
  Send,
  Terminal,
  Search,
  Stethoscope,
  CreditCard,
  Code2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  OPENAI_CATALOG_TOOLS,
  evaluateConversationalCatalogQuery,
  executeOpenAiTool,
} from "../services/ai-catalog-tools"
import { Coverage, Doctor, Specialty } from "@/types/admin"

interface AiIntegrationPanelProps {
  specialties: Specialty[]
  doctors: Doctor[]
  coverages: Coverage[]
}

export function AiIntegrationPanel({
  specialties,
  doctors,
  coverages,
}: AiIntegrationPanelProps) {
  const [testQuery, setTestQuery] = useState("¿Atienden Cardiología Clínica?")
  const [selectedTool, setSelectedTool] = useState<string>("check_specialty_availability")
  const [toolParamInput, setToolParamInput] = useState('{"specialty_name": "Cardiología"}')
  const [executionResult, setExecutionResult] = useState<Record<string, unknown> | null>(null)
  const [conversationalResult, setConversationalResult] = useState<{
    matched: boolean
    reply: string
  } | null>(null)

  const activeSpecialties = specialties.filter((s) => s.isActive)
  const activeDoctors = doctors.filter((d) => d.isActive)
  const activeCoverages = coverages.filter((c) => c.isActive)

  const handleTestConversationalQuery = () => {
    if (!testQuery.trim()) return
    const res = evaluateConversationalCatalogQuery(testQuery)
    if (res) {
      setConversationalResult(res)
    } else {
      setConversationalResult({
        matched: false,
        reply: "El asistente no detectó coincidencia directa con especialidades o convenios activos en el catálogo.",
      })
    }
  }

  const handleExecuteTool = () => {
    try {
      const parsedParams = JSON.parse(toolParamInput)
      const res = executeOpenAiTool(selectedTool, parsedParams)
      setExecutionResult(res)
    } catch (err) {
      setExecutionResult({
        error: "Parámetros JSON inválidos",
        details: err instanceof Error ? err.message : String(err),
      })
    }
  }

  const handlePreloadTool = (toolName: string) => {
    setSelectedTool(toolName)
    if (toolName === "check_specialty_availability") {
      setToolParamInput(
        JSON.stringify(
          { specialty_name: activeSpecialties[0]?.name || "Cardiología" },
          null,
          2
        )
      )
    } else if (toolName === "check_coverage_accepted") {
      setToolParamInput(
        JSON.stringify(
          { coverage_name: activeCoverages[0]?.name || "OSDE", plan_name: "310" },
          null,
          2
        )
      )
    } else {
      setToolParamInput("{}")
    }
  }

  return (
    <div className="space-y-6">
      {/* Estado de Sincronización en Tiempo Real */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Registro y Afiliación */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Sincronizado
            </span>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Registro de Pacientes</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Alimenta el catálogo de coberturas y prepagas aceptadas.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Entidades vigentes:</span>
            <span className="font-semibold text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded">
              {activeCoverages.length} coberturas
            </span>
          </div>
        </div>

        {/* Buscador de Turnos */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <Stethoscope className="w-5 h-5" />
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Sincronizado
            </span>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Agenda y Turnos</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Alimenta los desplegables de especialidad y profesionales.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Médicos en agenda:</span>
            <span className="font-semibold text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded">
              {activeDoctors.length} activos
            </span>
          </div>
        </div>

        {/* Asistente Clínico Inteligente */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="w-9 h-9 rounded-xl bg-teal-50 text-primary flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-primary">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Activo
            </span>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Asistente Conversacional</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Responde consultas sobre profesionales y coberturas en tiempo real.
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Consultas disponibles:</span>
            <span className="font-semibold text-slate-900 font-mono bg-slate-100 px-2 py-0.5 rounded">
              {OPENAI_CATALOG_TOOLS.length} herramientas
            </span>
          </div>
        </div>
      </div>

      {/* Simulador de Consultas del Asistente */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">
              Simulador del Asistente Clínico
            </h3>
            <p className="text-xs text-slate-500">
              Verifique en tiempo real las respuestas del asistente según los catálogos activos
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ej. '¿Atienden Cardiología?', '¿Aceptan OSDE 310?', '¿Qué especialidades tienen?'"
              value={testQuery}
              onChange={(e) => setTestQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTestConversationalQuery()}
              className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={handleTestConversationalQuery}
            leftIcon={<Send className="w-4 h-4" />}
            className="text-white"
          >
            Consultar
          </Button>
        </div>

        {/* Sugerencias Rápidas de Prueba */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium py-1">Consultas de prueba:</span>
          {[
            "¿Atienden Dermatología?",
            "¿Tienen cardiólogo activo?",
            "¿Aceptan Swiss Medical?",
            "¿Reciben OSDE?",
            "¿Qué especialidades tienen?",
          ].map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                setTestQuery(q)
                const res = evaluateConversationalCatalogQuery(q)
                if (res) setConversationalResult(res)
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Respuesta generada por el Asistente */}
        {conversationalResult && (
          <div className="p-4 rounded-xl bg-teal-50/60 border border-teal-200/80 animate-in fade-in duration-150 space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-primary">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                Respuesta del Asistente Virtual:
              </span>
              <span className="text-[11px] text-primary/80 font-mono">
                Catálogo Institucional
              </span>
            </div>
            <div className="text-sm text-slate-800 whitespace-pre-line leading-relaxed bg-white p-3.5 rounded-lg border border-teal-100">
              {conversationalResult.reply}
            </div>
          </div>
        )}
      </div>

      {/* Consola Técnica de Herramientas del Modelo */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900">
                Herramientas de Integración API / AI
              </h3>
              <p className="text-xs text-slate-500">
                Ejecución de funciones estructuradas invocadas por el asistente inteligente
              </p>
            </div>
          </div>
          <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            POST /api/ai/tools
          </span>
        </div>

        {/* Selector de Herramienta */}
        <div className="flex flex-wrap gap-2">
          {OPENAI_CATALOG_TOOLS.map((t) => (
            <button
              key={t.function.name}
              type="button"
              onClick={() => handlePreloadTool(t.function.name)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedTool === t.function.name
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {t.function.name}
            </button>
          ))}
        </div>

        {/* Parámetros y Ejecución */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Parámetros JSON
          </label>
          <div className="flex flex-col sm:flex-row gap-2">
            <textarea
              rows={2}
              value={toolParamInput}
              onChange={(e) => setToolParamInput(e.target.value)}
              className="flex-1 font-mono text-xs bg-slate-900 text-emerald-400 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button
              type="button"
              variant="secondary"
              size="md"
              onClick={handleExecuteTool}
              className="sm:w-36 shrink-0 self-end sm:self-auto"
            >
              Ejecutar
            </Button>
          </div>
        </div>

        {/* Resultado JSON */}
        {executionResult && (
          <div className="p-4 rounded-xl bg-slate-900 text-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span>Resultado Estructurado:</span>
              <span className="text-emerald-400">200 OK</span>
            </div>
            <pre className="text-xs font-mono text-emerald-300 overflow-x-auto max-h-56 p-2 bg-slate-950/60 rounded-lg">
              {JSON.stringify(executionResult, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Nota técnica institucional */}
      <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-4 text-xs text-slate-600 flex items-start gap-3">
        <Code2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Los catálogos están expuestos a través de endpoints seguros en Sentria AI. Cualquier alta, modificación o baja aplicada en esta consola se sincroniza de forma inmediata con los canales asistenciales.
        </p>
      </div>
    </div>
  )
}
