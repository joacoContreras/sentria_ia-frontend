import { apiClient } from "@/lib/api-client"
import { SymptomIntakeForm, BaselineVitals, TriageResult } from "@/types/triage"

export interface TriageEvaluationInput {
  symptoms: SymptomIntakeForm
  vitals?: Partial<BaselineVitals>
}

const MOCK_TRIAGE_RESULT: TriageResult = {
  caseId: "TRG-2024-8849",
  esiLevel: 3,
  recommendedSpecialty: "Neurología / Guardia Clínica",
  suggestedAction: "Consulta médica presencial para evaluación y control hemodinámico",
  timeframe: "Dentro de las próximas 4 a 6 horas",
  findings: [
    {
      title: "Cefalea tensional / migrañosa recurrente",
      detail: "Patrón pulsátil unilateral asociado a fotofobia sin signos de focalidad neurológica aguda.",
    },
    {
      title: "Presión arterial y signos vitales estables",
      detail: "Parámetros basales dentro del rango de normotensión (120/80 mmHg, SpO2 98%).",
    },
    {
      title: "Bajo riesgo de bandera roja inmediata",
      detail: "No se reporta pérdida súbita de conciencia, rigidez de nuca ni déficit motor.",
    },
  ],
  algorithmVersion: "ESI v4.2 Medical AI Core",
  standard: "Norma Internacional ESI (Emergency Severity Index)",
}

export const triageService = {
  /**
   * Evalúa los síntomas y signos vitales mediante el motor clínico de IA
   * Conecta con POST /api/triage/evaluate en el backend Java o ejecuta simulación local
   */
  async evaluateTriage(input: TriageEvaluationInput): Promise<{
    success: boolean
    result?: TriageResult
    error?: string
  }> {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const response = await apiClient<TriageResult>("/api/triage/evaluate", {
        method: "POST",
        body: {
          chiefComplaint: input.symptoms.description,
          symptoms: input.symptoms.selectedSymptoms,
          painLevel: input.symptoms.painLevel,
          duration: input.symptoms.duration,
          riskFactors: input.symptoms.riskFactors,
          vitalSigns: input.vitals,
        },
      })

      if (response.success && response.data) {
        return {
          success: true,
          result: response.data,
        }
      }

      if (!response.success && response.error) {
        return {
          success: false,
          error: response.error,
        }
      }
    }

    // Modo Simulado (Mock)
    await new Promise((resolve) => setTimeout(resolve, 1400))

    const dynamicEsi = input.symptoms.painLevel >= 8 ? 2 : input.symptoms.painLevel >= 5 ? 3 : 4
    return {
      success: true,
      result: {
        ...MOCK_TRIAGE_RESULT,
        esiLevel: dynamicEsi,
        caseId: `TRG-2024-${Math.floor(1000 + Math.random() * 9000)}`,
      },
    }
  },
}
