"use client"

import * as React from "react"
import { Mail, LogIn } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Button } from "@/components/ui/button"
import type { PatientLoginInput } from "@/types/auth"
import { validateLoginForm, validateEmail } from "../schemas/auth.schema"
import { ForgotPasswordModal } from "./forgot-password-modal"

interface LoginFormProps {
  isLoading: boolean
  onSubmit: (data: PatientLoginInput) => void
}

export function LoginForm({ isLoading, onSubmit }: LoginFormProps) {
  const [formData, setFormData] = React.useState<PatientLoginInput>({
    email: "",
    password: "",
  })
  const [errors, setErrors] = React.useState<
    Partial<Record<keyof PatientLoginInput, string>>
  >({})
  const [touched, setTouched] = React.useState<
    Partial<Record<keyof PatientLoginInput, boolean>>
  >({})
  const [isForgotModalOpen, setIsForgotModalOpen] = React.useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error en tiempo real si ya fue tocado
    if (errors[name as keyof PatientLoginInput]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name as keyof PatientLoginInput]
        return next
      })
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))

    if (name === "email") {
      const emailErr = validateEmail(value)
      if (emailErr) {
        setErrors((prev) => ({ ...prev, email: emailErr }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const validation = validateLoginForm(formData)
    if (!validation.isValid) {
      setErrors(validation.errors)
      setTouched({ email: true, password: true })
      return
    }

    setErrors({})
    onSubmit({
      email: formData.email.trim(),
      password: formData.password,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-space-md">
        <Input
          label="Correo Electrónico"
          id="login-email"
          name="email"
          type="email"
          required
          placeholder="paciente@email.com"
          leftIcon={<Mail className="h-5 w-5" />}
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email ? errors.email : undefined}
        />

        <PasswordInput
          label="Contraseña"
          id="login-password"
          name="password"
          required
          placeholder="••••••••••••"
          value={formData.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password ? errors.password : undefined}
        />

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setIsForgotModalOpen(true)}
            className="text-label-sm text-primary hover:underline cursor-pointer"
          >
            ¿Olvidó su contraseña?
          </button>
        </div>

        <Button
          type="submit"
          isLoading={isLoading}
          leftIcon={<LogIn className="h-5 w-5" />}
          className="w-full mt-space-sm text-white"
        >
          Ingresar al Portal
        </Button>
      </form>

      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        initialEmail={formData.email}
      />
    </>
  )
}


