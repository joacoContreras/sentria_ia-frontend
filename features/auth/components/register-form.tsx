"use client"

import * as React from "react"
import {
  Mail,
  Info,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { PasswordInput } from "@/components/ui/password-input"
import { Button } from "@/components/ui/button"
import type { PatientRegistrationInput } from "@/types/auth"
import {
  validateRegistrationForm,
  validateFullName,
  validateDocNumber,
  validatePhone,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateCoverage,
  sanitizeDocNumber,
  sanitizePhone,
} from "../schemas/auth.schema"

const coverageOptions = [
  { value: "", label: "Seleccione entidad...", disabled: true },
  { value: "OSDE", label: "OSDE" },
  { value: "Swiss Medical", label: "Swiss Medical" },
  { value: "Galeno", label: "Galeno" },
  { value: "Medife", label: "Medifé" },
  { value: "Omint", label: "Omint" },
  { value: "Particular", label: "Particular / Sin Cobertura" },
]

const initialRegistrationData: PatientRegistrationInput = {
  fullName: "",
  docType: "DNI",
  docNumber: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
  coverageProvider: "",
  memberId: "",
  acceptTerms: false,
}

interface RegisterFormProps {
  isLoading: boolean
  onSubmit: (data: PatientRegistrationInput) => void
  onSwitchToLogin: () => void
}

export function RegisterForm({
  isLoading,
  onSubmit,
  onSwitchToLogin,
}: RegisterFormProps) {
  const [formData, setFormData] = React.useState<PatientRegistrationInput>(
    initialRegistrationData
  )
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof PatientRegistrationInput, string>>
  >({})
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof PatientRegistrationInput, boolean>>
  >({})

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked
    const nextValue = type === "checkbox" ? checked : value

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }))

    // Limpiar error del campo modificado si ya fue tocado
    if (errors[name as keyof PatientRegistrationInput]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name as keyof PatientRegistrationInput]
        return next
      })
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    let fieldError: string | null = null

    switch (name) {
      case "fullName":
        fieldError = validateFullName(value)
        break
      case "docNumber":
        fieldError = validateDocNumber(value, formData.docType)
        break
      case "phone":
        fieldError = validatePhone(value)
        break
      case "email":
        fieldError = validateEmail(value)
        break
      case "password":
        fieldError = validatePassword(value)
        if (formData.confirmPassword) {
          const confirmErr = validateConfirmPassword(
            value,
            formData.confirmPassword
          )
          setErrors((prev) => ({ ...prev, confirmPassword: confirmErr || undefined }))
        }
        break
      case "confirmPassword":
        fieldError = validateConfirmPassword(formData.password, value)
        break
      case "coverageProvider":
      case "memberId": {
        const coverageErrors = validateCoverage(
          name === "coverageProvider" ? value : formData.coverageProvider,
          name === "memberId" ? value : formData.memberId
        )
        setErrors((prev) => ({
          ...prev,
          coverageProvider: coverageErrors.coverageProvider,
          memberId: coverageErrors.memberId,
        }))
        return
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: fieldError || undefined,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateRegistrationForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      // Marcar todos los campos como tocados para que resalten los errores
      const allTouched: Partial<Record<keyof PatientRegistrationInput, boolean>> = {
        fullName: true,
        docNumber: true,
        phone: true,
        email: true,
        password: true,
        confirmPassword: true,
        coverageProvider: true,
        memberId: true,
        acceptTerms: true,
      }
      setTouched(allTouched)
      return
    }

    setErrors({})

    // Sanitización antes de enviar al backend
    const sanitizedData: PatientRegistrationInput = {
      ...formData,
      fullName: formData.fullName.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: sanitizePhone(formData.phone),
      docNumber:
        formData.docType === "PAS"
          ? formData.docNumber.trim().toUpperCase()
          : sanitizeDocNumber(formData.docNumber),
      memberId: formData.memberId.trim(),
    }

    onSubmit(sanitizedData)
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Sección 1: Datos Personales */}
      <div className="flex flex-col gap-4">
        <div className="border-b border-slate-100 pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            1. Datos personales
          </span>
        </div>

        <Input
          label="Nombre y apellido completo"
          id="full-name"
          name="fullName"
          type="text"
          required
          placeholder="Ej. María Florencia Gómez"
          value={formData.fullName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched.fullName ? errors.fullName : undefined}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
          <div className="flex flex-col gap-1.5 sm:col-span-7">
            <label
              className="text-xs font-semibold text-slate-600 tracking-wide uppercase"
              htmlFor="doc-number"
            >
              Tipo y Nº de documento <span className="text-error font-bold ml-0.5">*</span>
            </label>
            <div className="flex gap-2">
              <Select
                id="doc-type"
                name="docType"
                value={formData.docType}
                onChange={(e) => {
                  handleInputChange(e)
                  if (touched.docNumber) {
                    const err = validateDocNumber(formData.docNumber, e.target.value)
                    setErrors((prev) => ({ ...prev, docNumber: err || undefined }))
                  }
                }}
                containerClassName="w-28 shrink-0"
                options={[
                  { value: "DNI", label: "DNI" },
                  { value: "LC", label: "LC" },
                  { value: "LE", label: "LE" },
                  { value: "PAS", label: "Pasaporte" },
                ]}
              />
              <Input
                id="doc-number"
                name="docNumber"
                type="text"
                required
                maxLength={12}
                placeholder="38.452.901"
                value={formData.docNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={touched.docNumber ? errors.docNumber : undefined}
                containerClassName="flex-1"
              />
            </div>
          </div>

          <div className="sm:col-span-5">
            <Input
              label="Teléfono móvil"
              id="phone-mobile"
              name="phone"
              type="tel"
              required
              placeholder="+54 9 11 4821 0000"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.phone ? errors.phone : undefined}
            />
          </div>
        </div>
      </div>

      {/* Sección 2: Credenciales de Acceso */}
      <div className="flex flex-col gap-4">
        <div className="border-b border-slate-100 pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            2. Credenciales de acceso
          </span>
        </div>

        <Input
          label="Correo electrónico"
          id="register-email"
          name="email"
          type="email"
          required
          placeholder="paciente@email.com"
          leftIcon={<Mail className="h-4 w-4" />}
          value={formData.email}
          onChange={handleInputChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : undefined}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 items-start">
          <PasswordInput
            label="Contraseña"
            id="register-password"
            name="password"
            required
            showStrengthMeter
            placeholder="••••••••••••"
            value={formData.password}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={touched.password ? errors.password : undefined}
          />

          <PasswordInput
            label="Confirmar contraseña"
            id="register-confirm-password"
            name="confirmPassword"
            required
            placeholder="••••••••••••"
            value={formData.confirmPassword || ""}
            onChange={handleInputChange}
            onBlur={handleBlur}
            error={touched.confirmPassword ? errors.confirmPassword : undefined}
          />
        </div>
      </div>

      {/* Sección 3: Cobertura Sanitaria */}
      <div className="flex flex-col gap-4">
        <div className="border-b border-slate-100 pb-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            3. Cobertura médica
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-12">
          <div className="sm:col-span-6">
            <Select
              label="Obra social o prepaga"
              id="coverage-provider"
              name="coverageProvider"
              required
              value={formData.coverageProvider}
              onChange={handleInputChange}
              onBlur={handleBlur}
              error={touched.coverageProvider ? errors.coverageProvider : undefined}
              options={coverageOptions}
            />
          </div>

          <div className="sm:col-span-6">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between min-h-[1.25rem]">
                <label
                  className="text-xs font-semibold text-slate-600 tracking-wide uppercase"
                  htmlFor="member-id"
                >
                  Nº Afiliado{" "}
                  {formData.coverageProvider !== "Particular" && (
                    <span className="text-error font-bold ml-0.5">*</span>
                  )}
                </label>
                <div className="group relative flex cursor-pointer items-center">
                  <Info
                    className="h-3.5 w-3.5 text-slate-400 hover:text-primary transition-colors"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-full right-0 z-30 mb-2 hidden w-56 rounded-xl bg-slate-900/95 backdrop-blur-md p-2.5 text-xs text-white shadow-xl group-hover:block pointer-events-none">
                    Ubicado al frente de su credencial plástica o digital.
                  </div>
                </div>
              </div>
              <Input
                id="member-id"
                name="memberId"
                type="text"
                required={formData.coverageProvider !== "Particular"}
                disabled={formData.coverageProvider === "Particular"}
                placeholder={
                  formData.coverageProvider === "Particular"
                    ? "No requerido (Particular)"
                    : "02-12345678-01"
                }
                value={formData.memberId}
                onChange={handleInputChange}
                onBlur={handleBlur}
                error={touched.memberId ? errors.memberId : undefined}
              />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2.5 rounded-xl bg-teal-50/70 border border-teal-100/80 p-3 text-xs text-teal-800 leading-relaxed">
          <CheckCircle2
            className="h-4 w-4 shrink-0 text-primary mt-0.5"
            aria-hidden="true"
          />
          <span>
            Su cobertura se verificará automáticamente con el padrón del prestador sin necesidad de presentar credencial física.
          </span>
        </div>
      </div>

      {/* Términos y Condiciones */}
      <div className="flex flex-col gap-1.5 pt-1">
        <div className="flex items-start gap-3">
          <input
            id="terms-check"
            name="acceptTerms"
            type="checkbox"
            checked={formData.acceptTerms}
            onChange={handleInputChange}
            onBlur={handleBlur}
            required
            className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-slate-300 text-primary accent-primary focus:ring-primary/20"
          />
          <label
            htmlFor="terms-check"
            className="cursor-pointer select-none text-xs sm:text-sm text-slate-600 leading-relaxed"
          >
            Acepto los{" "}
            <a
              href="/terminos-clinicos"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline hover:text-primary-container"
            >
              Términos Clínicos
            </a>{" "}
            y la{" "}
            <a
              href="/privacidad-medica"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline hover:text-primary-container"
            >
              Política de Privacidad Médica (Ley 25.326)
            </a>{" "}
            para el resguardo de información clínica.
          </label>
        </div>
        {touched.acceptTerms && errors.acceptTerms && (
          <div className="flex items-center gap-1 text-xs text-error pl-7">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span>{errors.acceptTerms}</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-3 pt-2">
        <Button
          type="submit"
          isLoading={isLoading}
          className="w-full text-white"
        >
          Crear cuenta
        </Button>
        <div className="text-center">
          <span className="text-xs text-slate-500">¿Ya tienes una cuenta? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-xs font-semibold text-primary hover:underline cursor-pointer"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </form>
  )
}

