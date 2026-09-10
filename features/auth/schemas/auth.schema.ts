import type { PatientLoginInput, PatientRegistrationInput } from "@/types/auth"

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const PHONE_REGEX = /^\+?[0-9\s-]{8,20}$/
export const DNI_REGEX = /^[0-9]{7,8}$/
export const PASSPORT_REGEX = /^[a-zA-Z0-9]{6,12}$/

export function sanitizeDocNumber(docNumber: string): string {
  return docNumber.replace(/\D/g, "")
}

export function sanitizePhone(phone: string): string {
  return phone.trim().replace(/[^\d+]/g, "")
}

export function validateEmail(email: string): string | null {
  const trimmed = email.trim()
  if (!trimmed) {
    return "El correo electrónico es obligatorio."
  }
  if (!EMAIL_REGEX.test(trimmed)) {
    return "Ingrese un formato de correo electrónico válido (ej. paciente@email.com)."
  }
  return null
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return "La contraseña es obligatoria."
  }
  if (password.length < 8) {
    return "La contraseña debe tener al menos 8 caracteres."
  }
  if (!/[A-Z]/.test(password)) {
    return "Debe contener al menos una letra mayúscula."
  }
  if (!/[a-z]/.test(password)) {
    return "Debe contener al menos una letra minúscula."
  }
  if (!/[0-9]/.test(password)) {
    return "Debe contener al menos un número."
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Debe contener al menos un caracter especial (!@#$%^&*)."
  }
  return null
}

export function validateConfirmPassword(
  password: string,
  confirmPassword?: string
): string | null {
  if (!confirmPassword) {
    return "Por favor, confirme su contraseña."
  }
  if (password !== confirmPassword) {
    return "Las contraseñas no coinciden."
  }
  return null
}

export function validateFullName(fullName: string): string | null {
  const trimmed = fullName.trim()
  if (!trimmed) {
    return "El nombre y apellido es obligatorio."
  }
  if (trimmed.length < 3) {
    return "Ingrese un nombre y apellido válido (mínimo 3 caracteres)."
  }
  const parts = trimmed.split(/\s+/)
  if (parts.length < 2) {
    return "Por favor, ingrese al menos nombre y apellido completo."
  }
  return null
}

export function validateDocNumber(
  docNumber: string,
  docType: string = "DNI"
): string | null {
  const trimmed = docNumber.trim()
  if (!trimmed) {
    return "El número de documento es obligatorio."
  }

  if (docType === "PAS") {
    if (!PASSPORT_REGEX.test(trimmed)) {
      return "El pasaporte debe contener entre 6 y 12 caracteres alfanuméricos."
    }
    return null
  }

  const cleanDigits = sanitizeDocNumber(trimmed)
  if (!DNI_REGEX.test(cleanDigits)) {
    return "El documento debe contener entre 7 y 8 dígitos numéricos."
  }

  return null
}

export function validatePhone(phone: string): string | null {
  const trimmed = phone.trim()
  if (!trimmed) {
    return "El teléfono de contacto es obligatorio."
  }
  if (!PHONE_REGEX.test(trimmed)) {
    return "Ingrese un número de teléfono válido (ej. +54 9 11 4821 0000)."
  }
  return null
}

export function validateCoverage(
  coverageProvider: string,
  memberId: string
): { coverageProvider?: string; memberId?: string } {
  const errors: { coverageProvider?: string; memberId?: string } = {}

  if (!coverageProvider) {
    errors.coverageProvider = "Seleccione su cobertura médica u obra social."
  }

  if (coverageProvider && coverageProvider !== "Particular") {
    const trimmedMemberId = memberId.trim()
    if (!trimmedMemberId) {
      errors.memberId = "El número de afiliado o credencial es obligatorio."
    } else if (trimmedMemberId.length < 4) {
      errors.memberId = "El número de afiliado debe tener al menos 4 caracteres."
    }
  }

  return errors
}

export function validateLoginForm(data: PatientLoginInput): {
  isValid: boolean
  errors: Partial<Record<keyof PatientLoginInput, string>>
} {
  const errors: Partial<Record<keyof PatientLoginInput, string>> = {}

  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError

  if (!data.password) {
    errors.password = "La contraseña es obligatoria."
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateRegistrationForm(data: PatientRegistrationInput): {
  isValid: boolean
  errors: Partial<Record<keyof PatientRegistrationInput, string>>
} {
  const errors: Partial<Record<keyof PatientRegistrationInput, string>> = {}

  const nameError = validateFullName(data.fullName)
  if (nameError) errors.fullName = nameError

  const docError = validateDocNumber(data.docNumber, data.docType)
  if (docError) errors.docNumber = docError

  const phoneError = validatePhone(data.phone)
  if (phoneError) errors.phone = phoneError

  const emailError = validateEmail(data.email)
  if (emailError) errors.email = emailError

  const passwordError = validatePassword(data.password)
  if (passwordError) errors.password = passwordError

  const confirmError = validateConfirmPassword(
    data.password,
    data.confirmPassword
  )
  if (confirmError) errors.confirmPassword = confirmError

  const coverageErrors = validateCoverage(data.coverageProvider, data.memberId)
  if (coverageErrors.coverageProvider) {
    errors.coverageProvider = coverageErrors.coverageProvider
  }
  if (coverageErrors.memberId) {
    errors.memberId = coverageErrors.memberId
  }

  if (!data.acceptTerms) {
    errors.acceptTerms =
      "Debe aceptar los Términos de Servicio y la Política de Privacidad."
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
