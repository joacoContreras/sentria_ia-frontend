/**
 * Tipos y contratos de datos para la gestión administrativa de catálogos
 * Sentria AI - Centro Médico
 * Cumple con RNF-02 (Integridad referencial y borrado lógico)
 */

export interface Specialty {
  id: string
  name: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Doctor {
  id: string
  fullName: string
  license: string // Matrícula única (ej. "M.N. 104.892")
  specialtyId: string
  specialtyName: string
  isActive: boolean // Borrado lógico (RNF-02)
  email?: string
  phone?: string
  subtitle?: string
  acceptedCoverages?: string[] // IDs o nombres de coberturas aceptadas
  createdAt: string
  updatedAt: string
}

export type CoverageType = "prepaga" | "obra_social" | "particular"

export interface Coverage {
  id: string
  name: string
  type: CoverageType
  plans: string[] // Planes aceptados (ej. ["210", "310", "410"])
  isActive: boolean
  associatedSpecialties: string[] // IDs o nombres de especialidades asociadas, o ["all"]
  associatedDoctors: string[] // IDs o matrículas de médicos asociados, o ["all"]
  requiresCopay: boolean
  requiresAuthorization: boolean
  notes?: string
  createdAt: string
  updatedAt: string
}

// DTOs para Creación y Edición
export interface CreateSpecialtyInput {
  name: string
  description?: string
  isActive?: boolean
}

export interface UpdateSpecialtyInput {
  name?: string
  description?: string
  isActive?: boolean
}

export interface CreateDoctorInput {
  fullName: string
  license: string
  specialtyId: string
  isActive?: boolean
  email?: string
  phone?: string
  subtitle?: string
  acceptedCoverages?: string[]
}

export interface UpdateDoctorInput {
  fullName?: string
  license?: string
  specialtyId?: string
  isActive?: boolean
  email?: string
  phone?: string
  subtitle?: string
  acceptedCoverages?: string[]
}

export interface CreateCoverageInput {
  name: string
  type: CoverageType
  plans: string[]
  isActive?: boolean
  associatedSpecialties?: string[]
  associatedDoctors?: string[]
  requiresCopay?: boolean
  requiresAuthorization?: boolean
  notes?: string
}

export interface UpdateCoverageInput {
  name?: string
  type?: CoverageType
  plans?: string[]
  isActive?: boolean
  associatedSpecialties?: string[]
  associatedDoctors?: string[]
  requiresCopay?: boolean
  requiresAuthorization?: boolean
  notes?: string
}

// Validación de Integridad Referencial (RNF-02)
export interface ReferentialIntegrityCheck {
  canDelete: boolean
  activeDoctorsCount: number
  activeDoctors: Doctor[]
  message?: string
}

// Herramientas OpenAI Function Calling para Bot Conversacional
export interface OpenAiToolDefinition {
  type: "function"
  function: {
    name: string
    description: string
    parameters: {
      type: "object"
      properties: Record<string, unknown>
      required: string[]
    }
  }
}

export interface SpecialtyAvailabilityResult {
  available: boolean
  specialty?: Specialty
  activeDoctors: Array<{
    fullName: string
    license: string
  }>
  message: string
}

export interface CoverageAcceptedResult {
  accepted: boolean
  coverage?: Coverage
  availablePlans: string[]
  requiresCopay: boolean
  requiresAuthorization: boolean
  coveredSpecialties: string[]
  message: string
}
