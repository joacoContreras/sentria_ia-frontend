"use client"

import { useState } from "react"
import { AlertCircle, X, ShieldCheck } from "lucide-react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { RegistrationSuccess } from "./registration-success"
import { useAuth } from "../hooks/use-auth"
import type { PatientRegistrationInput, PatientLoginInput } from "@/types/auth"

export function RegistrationCard() {
  const [tab, setTab] = useState<"login" | "register">("register")
  const [isSuccess, setIsSuccess] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [successInfo, setSuccessInfo] = useState<{
    fullName?: string
    coverageProvider?: string
    email?: string
  }>({})

  const { login, register, isLoading } = useAuth()

  const handleRegister = async (data: PatientRegistrationInput) => {
    setApiError(null)
    try {
      const response = await register(data)
      if (response.success) {
        setSuccessInfo({
          fullName: data.fullName,
          coverageProvider: data.coverageProvider,
          email: data.email,
        })
        setIsSuccess(true)
      } else {
        setApiError(
          response.error ||
            response.message ||
            "No se pudo completar el registro del paciente."
        )
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Error de conexión con el servidor. Intente nuevamente."
      setApiError(message)
    }
  }

  const handleLogin = async (credentials: PatientLoginInput) => {
    setApiError(null)
    try {
      const response = await login(credentials)
      if (response.success) {
        setSuccessInfo({
          email: credentials.email,
        })
        setIsSuccess(true)
      } else {
        setApiError(
          response.error ||
            response.message ||
            "Credenciales incorrectas o usuario no encontrado."
        )
      }
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Error de conexión con el servidor. Intente nuevamente."
      setApiError(message)
    }
  }

  const handleReset = () => {
    setIsSuccess(false)
    setApiError(null)
    setSuccessInfo({})
  }

  const handleSwitchTab = (newTab: "login" | "register") => {
    setTab(newTab)
    handleReset()
  }

  return (
    <div className="w-full flex flex-col gap-space-md">
      <div className="flex flex-col gap-space-lg rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 shadow-2xs">
        {/* Tab Switcher */}
        <div className="flex w-full rounded-xl bg-surface-container p-1 border border-outline-variant/15">
          <button
            type="button"
            onClick={() => handleSwitchTab("register")}
            aria-pressed={tab === "register"}
            className={`flex flex-1 items-center justify-center rounded-lg py-space-xs text-label-md transition-all cursor-pointer font-medium ${
              tab === "register"
                ? "bg-primary text-white shadow-2xs font-semibold"
                : "text-secondary hover:text-on-surface hover:bg-surface-container-high/60"
            }`}
          >
            Crear cuenta
          </button>
          <button
            type="button"
            onClick={() => handleSwitchTab("login")}
            aria-pressed={tab === "login"}
            className={`flex flex-1 items-center justify-center rounded-lg py-space-xs text-label-md transition-all cursor-pointer font-medium ${
              tab === "login"
                ? "bg-primary text-white shadow-2xs font-semibold"
                : "text-secondary hover:text-on-surface hover:bg-surface-container-high/60"
            }`}
          >
            Iniciar sesión
          </button>
        </div>

        {/* Banner de error global de API */}
        {apiError && (
          <div
            role="alert"
            className="flex items-start justify-between gap-space-sm rounded-xl bg-error-container/20 border border-error/30 p-space-sm text-error"
          >
            <div className="flex items-start gap-space-xs">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span className="text-body-md font-medium">{apiError}</span>
            </div>
            <button
              type="button"
              onClick={() => setApiError(null)}
              aria-label="Cerrar notificación de error"
              className="text-error/70 hover:text-error cursor-pointer p-0.5 rounded transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Feedback visual de éxito */}
        {isSuccess ? (
          <RegistrationSuccess
            tab={tab}
            fullName={successInfo.fullName}
            coverageProvider={successInfo.coverageProvider}
            email={successInfo.email}
            onReset={handleReset}
          />
        ) : (
          <>
            {/* Header del formulario */}
            <div className="flex flex-col gap-space-2xs">
              <span className="text-label-sm uppercase font-semibold tracking-wider text-primary">
                {tab === "register" ? "Atención asistencial digital" : "Portal de Pacientes"}
              </span>
              <h1 className="text-headline-md font-bold text-on-surface">
                {tab === "register"
                  ? "Crear ficha de paciente"
                  : "Acceso seguro"}
              </h1>
              <p className="text-body-md text-secondary">
                {tab === "register"
                  ? "Complete sus datos para crear un nuevo usuario y vincular su historia clínica con cobertura médica institucional."
                  : "Ingrese sus credenciales para consultar turnos, diagnósticos e iniciar su triage clínico."}
              </p>
            </div>

            {tab === "login" ? (
              <LoginForm isLoading={isLoading} onSubmit={handleLogin} />
            ) : (
              <RegisterForm
                isLoading={isLoading}
                onSubmit={handleRegister}
                onSwitchToLogin={() => handleSwitchTab("login")}
              />
            )}
          </>
        )}
      </div>

      {/* Nota de seguridad y privacidad al pie */}
      <div className="flex items-center justify-center gap-1.5 text-label-xs text-secondary text-center">
        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
        <span>Conexión cifrada de extremo a extremo · Ley 25.326 de Protección de Datos Personales</span>
      </div>
    </div>
  )
}
