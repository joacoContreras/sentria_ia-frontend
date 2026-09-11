"use client"

import { useState } from "react"
import { LogIn, UserPlus, AlertCircle, X } from "lucide-react"
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
    <div className="lg:col-span-7">
      <div className="flex flex-col gap-space-lg rounded-2xl bg-surface-container-lowest p-space-lg lg:p-space-xl shadow-xl">
        {/* Tab Switcher */}
        <div className="flex w-full rounded-xl bg-surface-container-low p-1">
          <button
            type="button"
            onClick={() => handleSwitchTab("register")}
            aria-pressed={tab === "register"}
            className={`flex flex-1 items-center justify-center gap-space-xs rounded-lg py-space-xs text-label-lg transition-all cursor-pointer ${
              tab === "register"
                ? "bg-primary text-white shadow-sm"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            <UserPlus className="h-[18px] w-[18px]" aria-hidden="true" />
            Registrarse
          </button>
          <button
            type="button"
            onClick={() => handleSwitchTab("login")}
            aria-pressed={tab === "login"}
            className={`flex flex-1 items-center justify-center gap-space-xs rounded-lg py-space-xs text-label-lg transition-all cursor-pointer ${
              tab === "login"
                ? "bg-primary text-white shadow-sm"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            <LogIn className="h-[18px] w-[18px]" aria-hidden="true" />
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
              <span className="text-label-sm uppercase text-primary">
                {tab === "register"
                  ? "Registro de Paciente"
                  : "Portal Pacientes"}
              </span>
              <h2 className="text-headline-md text-on-surface">
                {tab === "register"
                  ? "Crear Ficha de Paciente"
                  : "Acceso Seguro"}
              </h2>
              <p className="text-body-md text-secondary">
                {tab === "register"
                  ? "Complete sus datos para vincular su historia clínica y validar su cobertura médica institucional."
                  : "Ingrese sus credenciales de acceso para ver sus turnos y resultados médicos."}
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
    </div>
  )
}

