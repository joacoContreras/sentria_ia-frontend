export type DocumentType = "DNI" | "LC" | "LE" | "PAS"

export interface PatientRegistrationInput {
  fullName: string
  docType: DocumentType | string
  docNumber: string
  phone: string
  email: string
  password: string
  confirmPassword?: string
  coverageProvider: string
  memberId: string
  acceptTerms: boolean
}

export interface PatientLoginInput {
  email: string
  password: string
}

export interface ApiError {
  message: string
  statusCode?: number
  fieldErrors?: Record<string, string>
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: {
    id: string
    fullName: string
    email: string
    docNumber: string
    coverageProvider?: string
  }
  error?: string
}

