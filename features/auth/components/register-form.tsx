"use client"

import * as React from "react"
import {
  IdCard,
  Lock,
  Mail,
  ShieldPlus,
  Info,
  CheckCircle2,
  Shield,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { PasswordInput } from "@/components/ui/password-input"
import { Button } from "@/components/ui/button"
import type { PatientRegistrationInput } from "@/types/auth"

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-space-lg">
      {/* Sección 1: Datos Personales */}
      <fieldset className="flex flex-col gap-space-md rounded-xl bg-surface-container-low/40 p-space-md">
        <legend className="mb-space-2xs flex items-center gap-space-xs">
          <IdCard className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="text-headline-sm text-on-surface">
            1. Datos Personales
          </span>
        </legend>

        <Input
          label="Nombre y Apellido completo"
          id="full-name"
          name="fullName"
          type="text"
          required
          placeholder="ej. María Florencia Gómez"
          value={formData.fullName}
          onChange={handleInputChange}
        />

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-12">
          <div className="flex flex-col gap-space-2xs sm:col-span-7">
            <label
              className="text-label-md text-on-surface"
              htmlFor="doc-number"
            >
              Tipo y Nº de Documento <span className="text-error">*</span>
            </label>
            <div className="flex gap-space-xs">
              <Select
                id="doc-type"
                name="docType"
                value={formData.docType}
                onChange={handleInputChange}
                containerClassName="w-32 shrink-0"
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
                maxLength={11}
                placeholder="38.452.901"
                value={formData.docNumber}
                onChange={handleInputChange}
                containerClassName="flex-1"
              />
            </div>
          </div>

          <div className="sm:col-span-5">
            <Input
              label="Teléfono Móvil"
              id="phone-mobile"
              name="phone"
              type="tel"
              required
              placeholder="+54 9 11 4821 0000"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </fieldset>

      {/* Sección 2: Credenciales de Acceso */}
      <fieldset className="flex flex-col gap-space-md rounded-xl bg-surface-container-low/40 p-space-md">
        <legend className="mb-space-2xs flex items-center gap-space-xs">
          <Lock className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="text-headline-sm text-on-surface">
            2. Credenciales de Acceso
          </span>
        </legend>

        <Input
          label="Correo Electrónico"
          id="register-email"
          name="email"
          type="email"
          required
          placeholder="paciente@email.com"
          leftIcon={<Mail className="h-5 w-5" />}
          value={formData.email}
          onChange={handleInputChange}
        />

        <PasswordInput
          label="Contraseña"
          id="register-password"
          name="password"
          required
          showStrengthMeter
          placeholder="••••••••••••"
          value={formData.password}
          onChange={handleInputChange}
        />
      </fieldset>

      {/* Sección 3: Cobertura Sanitaria */}
      <fieldset className="flex flex-col gap-space-md rounded-xl bg-surface-container-low/40 p-space-md">
        <legend className="mb-space-2xs flex items-center gap-space-xs">
          <ShieldPlus className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="text-headline-sm text-on-surface">
            3. Cobertura Sanitaria
          </span>
        </legend>

        <div className="grid grid-cols-1 gap-space-md sm:grid-cols-12">
          <div className="sm:col-span-6">
            <Select
              label="Obra Social o Prepaga"
              id="coverage-provider"
              name="coverageProvider"
              required
              value={formData.coverageProvider}
              onChange={handleInputChange}
              options={coverageOptions}
            />
          </div>

          <div className="sm:col-span-6">
            <div className="flex flex-col gap-space-2xs">
              <div className="flex items-center justify-between">
                <label
                  className="text-label-md text-on-surface"
                  htmlFor="member-id"
                >
                  Nº Afiliado / Credencial <span className="text-error">*</span>
                </label>
                <div className="group relative flex cursor-pointer items-center">
                  <Info
                    className="h-4 w-4 text-secondary hover:text-primary"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-full right-0 z-20 mb-2 hidden w-64 rounded-lg bg-inverse-surface p-space-xs text-label-sm text-inverse-on-surface shadow-xl group-hover:block">
                    Ubicado al frente de su credencial plástica o digital (10 a 16 dígitos).
                  </div>
                </div>
              </div>
              <Input
                id="member-id"
                name="memberId"
                type="text"
                required
                placeholder="02-12345678-01"
                value={formData.memberId}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="flex items-start gap-space-xs rounded-xl bg-primary-fixed/30 p-space-sm">
          <CheckCircle2
            className="h-5 w-5 shrink-0 text-primary"
            aria-hidden="true"
          />
          <span className="text-body-md text-on-primary-fixed-variant">
            Tu cobertura se verificará automáticamente al guardar con el padrón
            del financiador. No requiere copias físicas.
          </span>
        </div>
      </fieldset>

      {/* Términos */}
      <div className="flex items-start gap-space-sm pt-space-xs">
        <input
          id="terms-check"
          name="acceptTerms"
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={handleInputChange}
          required
          className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-primary"
        />
        <label
          htmlFor="terms-check"
          className="cursor-pointer select-none text-body-md text-on-surface-variant"
        >
          Acepto los{" "}
          <a href="#" className="font-medium text-primary underline">
            Términos de Servicio
          </a>{" "}
          y la{" "}
          <a href="#" className="font-medium text-primary underline">
            Política de Privacidad de Datos Médicos (Ley 25.326)
          </a>{" "}
          para el resguardo de información clínica sensible.
        </label>
      </div>

      {/* CTA */}
      <div className="flex flex-col gap-space-sm pt-space-xs">
        <Button
          type="submit"
          isLoading={isLoading}
          leftIcon={<Shield className="h-5 w-5" />}
          className="w-full text-white"
        >
          Crear Cuenta
        </Button>
        <div className="pt-space-2xs text-center">
          <span className="text-body-md text-secondary">¿Ya tienes cuenta? </span>
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-label-lg text-primary hover:underline cursor-pointer"
          >
            Inicia sesión
          </button>
        </div>
      </div>
    </form>
  )
}
