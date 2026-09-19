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
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-6 rounded-2xl bg-white p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        {/* Tab Switcher */}
        <div className="flex w-full rounded-xl bg-slate-100/90 p-1 border border-slate-200/50">
          <button
            type="button"
            onClick={() => handleSwitchTab("register")}
            aria-pressed={tab === "register"}
            className={`flex flex-1 items-center justify-center rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
              tab === "register"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            Crear cuenta
          </button>
          <button
            type="button"
            onClick={() => handleSwitchTab("login")}
            aria-pressed={tab === "login"}
            className={`flex flex-1 items-center justify-center rounded-lg py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-150 cursor-pointer ${
              tab === "login"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
            }`}
          >
            Iniciar sesión
          </button>
        </div>

        {/* Banner de error global de API */}
        {apiError && (
          <div
            role="alert"
            className="flex items-start justify-between gap-3 rounded-xl bg-red-50 border border-red-200 p-3 text-red-700"
          >
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
              <span className="text-xs font-medium">{apiError}</span>
            </div>
            <button
              type="button"
              onClick={() => setApiError(null)}
              aria-label="Cerrar notificación de error"
              className="text-red-500 hover:text-red-700 cursor-pointer p-0.5 rounded transition-colors"
            >
              <X className="h-3.5 w-3.5" />
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
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] uppercase font-semibold tracking-wider text-primary">
                {tab === "register" ? "Ficha de Paciente" : "Portal de Pacientes"}
              </span>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {tab === "register"
                  ? "Crear ficha de paciente"
                  : "Acceso a su cuenta"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {tab === "register"
                  ? "Complete sus datos personales y cobertura para gestionar sus consultas e historial clínico."
                  : "Ingrese sus datos de acceso para consultar turnos, resultados e indicaciones médicas."}
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
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs text-slate-400 text-center px-2">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5 text-primary/70 shrink-0" />
          <span>Conexión encriptada de extremo a extremo</span>
        </span>
        <span className="hidden sm:inline text-slate-300" aria-hidden="true">·</span>
        <span>Ley 25.326 de Protección de Datos Personales</span>
      </div>
    </div>
  )
}
