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
      className="relative w-full max-w-md rounded-2xl bg-white p-6 sm:p-7 shadow-xl border border-slate-200/80 transition-all"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="forgot-password-title"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar modal"
        className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 cursor-pointer p-1 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      {isSent ? (
        <div className="flex flex-col items-center text-center gap-4 py-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-primary">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div className="flex flex-col gap-1">
            <h3
              id="forgot-password-title"
              className="text-lg font-bold text-slate-900"
            >
              Instrucciones enviadas
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Hemos enviado un enlace de recuperación seguro a{" "}
              <strong className="text-slate-800">{email}</strong>. Revise su
              bandeja de entrada.
            </p>
          </div>
          <Button
            type="button"
            variant="primary"
            onClick={onClose}
            className="w-full mt-2"
          >
            Entendido
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5 text-primary">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-primary">
              <KeyRound className="h-4 w-4" />
            </div>
            <div>
              <h3
                id="forgot-password-title"
                className="text-base font-bold text-slate-900 leading-tight"
              >
                Recuperar contraseña
              </h3>
              <span className="text-xs text-slate-500">
                Portal de Pacientes
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Ingrese el correo electrónico registrado y le enviaremos las instrucciones para restablecer su contraseña de acceso.
          </p>

          <Input
            label="Correo electrónico"
            id="reset-email"
            type="email"
            required
            placeholder="paciente@email.com"
            leftIcon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (error) setError(null)
            }}
            error={error || undefined}
          />

          <div className="flex gap-2.5 pt-1">
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
              className="flex-1 text-white"
            >
              Enviar enlace
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

