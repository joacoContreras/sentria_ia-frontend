"use client"

import { useState } from "react"
import { LogIn, UserPlus } from "lucide-react"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"
import { RegistrationSuccess } from "./registration-success"
import { authService } from "../services/auth.service"
import type { PatientRegistrationInput, PatientLoginInput } from "@/types/auth"

export function RegistrationCard() {
  const [tab, setTab] = useState<"login" | "register">("register")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successInfo, setSuccessInfo] = useState<{
    fullName?: string
    coverageProvider?: string
    email?: string
  }>({})

  const handleRegister = async (data: PatientRegistrationInput) => {
    setIsLoading(true)
    try {
      const response = await authService.register(data)
      if (response.success) {
        setSuccessInfo({
          fullName: data.fullName,
          coverageProvider: data.coverageProvider,
          email: data.email,
        })
        setIsSuccess(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (credentials: PatientLoginInput) => {
    setIsLoading(true)
    try {
      const response = await authService.login(credentials)
      if (response.success) {
        setSuccessInfo({
          email: credentials.email,
        })
        setIsSuccess(true)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setIsSuccess(false)
    setSuccessInfo({})
  }

  return (
    <div className="lg:col-span-7">
      <div className="flex flex-col gap-space-lg rounded-2xl bg-surface-container-lowest p-space-lg lg:p-space-xl shadow-xl">
        {/* Tab Switcher */}
        <div className="flex w-full rounded-xl bg-surface-container-low p-1">
          <button
            type="button"
            onClick={() => {
              setTab("register")
              handleReset()
            }}
            aria-pressed={tab === "register"}
            className={`flex flex-1 items-center justify-center gap-space-xs rounded-lg py-space-xs text-label-lg transition-all cursor-pointer ${
              tab === "register"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            <UserPlus className="h-[18px] w-[18px]" aria-hidden="true" />
            Registrarse
          </button>
          <button
            type="button"
            onClick={() => {
              setTab("login")
              handleReset()
            }}
            aria-pressed={tab === "login"}
            className={`flex flex-1 items-center justify-center gap-space-xs rounded-lg py-space-xs text-label-lg transition-all cursor-pointer ${
              tab === "login"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            <LogIn className="h-[18px] w-[18px]" aria-hidden="true" />
            Iniciar Sesión
          </button>
        </div>

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
                  ? "Registro de Paciente (RF-01)"
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
                onSwitchToLogin={() => {
                  setTab("login")
                  handleReset()
                }}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}
