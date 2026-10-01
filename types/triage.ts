export type EpisodeDuration = "under_24h" | "1_to_3_days" | "over_week"

export interface SymptomIntakeForm {
  selectedSymptoms: string[]
  description: string
  painLevel: number
  duration: EpisodeDuration
  riskFactors: string[]
}

export interface BaselineVitals {
  bloodPressure: string
  bloodPressureStatus: string
  heartRate: number
  heartRateStatus: string
  temperature: number
  temperatureStatus: string
  oxygenSat: number
  oxygenSatStatus: string
  syncTimestamp: string
}

export interface TriageFinding {
  title: string
  detail: string
}

export interface TriageResult {
  caseId: string
  recommendedSpecialty: string
  suggestedAction: string
  timeframe: string
  findings: TriageFinding[]
  algorithmVersion: string
  standard: string
}
