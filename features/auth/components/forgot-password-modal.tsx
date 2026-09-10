"use client"

import * as React from "react"
import { Mail, KeyRound, X, CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { validateEmail } from "../schemas/auth.schema"

interface ForgotPasswordModalProps {
  isOpen: boolean
  onClose: () => void
  initialEmail?: string
}

function ForgotPasswordContent({
  initialEmail,
  onClose,
}: {
  initialEmail: string
  onClose: () => void
}) {
  const [email, setEmail] = React.useState(initialEmail)
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isSent, setIsSent] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailErr = validateEmail(email)
    if (emailErr) {
      setError(emailErr)
      return
    }

    setError(null)
    setIsLoading(true)

    // Simulación de envío de correo de recuperación
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSent(true)
  }

  return (
    <div
      className="relative w-full max-w-md rounded-2xl bg-surface-container-lowest p-space-lg shadow-2xl transition-all"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-title"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar modal"
        className="absolute right-space-md top-space-md text-secondary hover:text-on-surface cursor-pointer p-1 rounded-lg"
      >
        <X className="h-5 w-5" />
      </button>

      {isSent ? (
        <div className="flex flex-col items-center text-center gap-space-md py-space-sm">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="flex flex-col gap-space-2xs">
            <h3
              id="forgot-password-title"
              className="text-headline-sm text-on-surface"
            >
              Instrucciones Enviadas
            </h3>
            <p className="text-body-md text-secondary">
              Hemos enviado un enlace de restablecimiento seguro a{" "}
              <strong className="text-on-surface">{email}</strong>. Revise su
              bandeja de entrada o spam.
            </p>
          </div>
          <Button
            type="button"
            variant="primary"
            onClick={onClose}
            className="w-full mt-space-xs"
          >
            Entendido
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-space-md">
          <div className="flex items-center gap-space-xs text-primary">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
              <KeyRound className="h-5 w-5" />
            </div>
            <div>
              <h3
                id="forgot-password-title"
                className="text-headline-sm text-on-surface"
              >
                Recuperar Contraseña
              </h3>
              <span className="text-label-sm text-secondary">
                Portal Seguro de Pacientes
              </span>
            </div>
          </div>

          <p className="text-body-md text-secondary">
            Ingrese el correo electrónico registrado con su ficha clínica y le
            enviaremos las instrucciones de restablecimiento.
          </p>

          <Input
            label="Correo Electrónico"
            id="reset-email"
            type="email"
            required
            placeholder="paciente@email.com"
            leftIcon={<Mail className="h-5 w-5" />}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError(null)
            }}
            error={error || undefined}
          />

          <div className="flex gap-space-sm pt-space-2xs">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              isLoading={isLoading}
              variant="primary"
              className="flex-1"
            >
              Enviar Enlace
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export function ForgotPasswordModal({
  isOpen,
  onClose,
  initialEmail = "",
}: ForgotPasswordModalProps) {
  React.useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <ForgotPasswordContent initialEmail={initialEmail} onClose={onClose} />
    </div>
  )
}

