export interface MedicalConsultation {
  id: string
  specialty: string
  specialtySlug: "cardio" | "trauma" | "clinica" | "derma" | "oftalmo" | string
  doctorName: string
  doctorLicense: string
  doctorRole: string
  dateDisplay: string
  timeDisplay: string
  venue: string
  venueSlug: "belgrano" | "las-heras" | "tele" | string
  periodYear: "2024" | "2023" | string
  status: "finalizada" | "pending" | "interconsulta"
  statusLabel: string
  isTelehealth?: boolean
  primaryDiagnosis: string
  diagnosticNotes: string
  therapeuticIndication: string
  therapeuticNotes: string
  vitals?: {
    bloodPressure?: string
    heartRate?: string
    spO2?: string
    temperature?: string
  }
  actions: {
    hasClinicalSummary?: boolean
    hasPrescription?: boolean
    hasMedicalOrder?: boolean
    hasRestCertificate?: boolean
    canBookDirect?: boolean
  }
}

export interface PatientAllergy {
  allergen: string
  registeredBy: string
  isVerified: boolean
}

export interface PatientClinicalProfile {
  fullName: string
  docNumber: string
  age: number
  coverage: string
  memberNumber: string
  bloodType: string
  allergies: PatientAllergy[]
  activeMedications: string
  medicationNotes: string
  lastSyncTime: string
  networkStatus: string
}

export interface HistoryFilterState {
  searchQuery: string
  specialty: string
  period: string
  location: string
  status: string
}
