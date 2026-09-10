"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Activity,
  ShieldCheck,
  Calendar,
  FileText,
  Stethoscope,
  LogOut,
  User,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PatientPortalPage() {
  const { user, isAuthenticated, isLoading, isHydrated, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!isHydrated || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-space-sm text-secondary">
          <Activity className="h-8 w-8 animate-spin text-primary" />
          <p className="text-body-md">Cargando portal del paciente...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-gutter-mobile">
        <div className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-space-xl text-center shadow-xl border border-outline-variant/40">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-error-container/20 text-error mb-space-md">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h1 className="text-headline-md text-on-surface mb-space-2xs">
            Acceso no autenticado
          </h1>
          <p className="text-body-md text-secondary mb-space-lg">
            Para acceder al Portal del Paciente debe iniciar sesión o registrar su
            ficha clínica.
          </p>
          <Button
            variant="primary"
            onClick={() => router.push("/")}
            className="w-full"
          >
            Ir al Inicio de Sesión
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navbar del Portal */}
      <header className="border-b border-outline-variant/40 bg-surface-container-lowest sticky top-0 z-30">
        <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-sm flex items-center justify-between">
          <Link href="/portal" className="flex items-center gap-space-xs">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-on-primary">
              <Activity className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-headline-sm text-on-surface leading-tight">
              Sentria <span className="text-primary">AI</span>
              <span className="ml-2 text-label-sm font-normal text-secondary hidden sm:inline">
                | Portal Pacientes
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-space-md">
            <div className="hidden sm:flex items-center gap-space-xs text-on-surface text-label-md">
              <User className="h-4 w-4 text-primary" />
              <span>{user.fullName}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              leftIcon={<LogOut className="h-4 w-4" />}
            >
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-container-max mx-auto w-full px-gutter-mobile lg:px-gutter-desktop py-space-lg lg:py-space-xl flex flex-col gap-space-lg">
        {/* Banner de Bienvenida y Estado */}
        <section className="rounded-2xl bg-gradient-to-r from-primary to-primary-container p-space-lg lg:p-space-xl text-on-primary shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-2xs">
            <div className="flex items-center gap-space-xs">
              <Badge variant="routine" className="bg-success-container/30 text-white border border-white/20">
                <ShieldCheck className="h-3.5 w-3.5 mr-1" />
                Cobertura Validada
              </Badge>
              <span className="text-label-sm opacity-80">
                Ficha ID: {user.id.slice(0, 8)}
              </span>
            </div>
            <h1 className="text-headline-lg font-bold">
              Hola, {user.fullName.split(" ")[0]} 👋
            </h1>
            <p className="text-body-md opacity-90 max-w-xl">
              Bienvenido a su portal médico asistencial. Desde aquí puede gestionar
              sus consultas, ver diagnósticos y realizar un triage clínico en tiempo
              real.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-space-xs shrink-0">
            <Link href="#triage">
              <Button
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-md w-full"
                leftIcon={<Sparkles className="h-4 w-4 text-primary" />}
              >
                Triage con IA
              </Button>
            </Link>
          </div>
        </section>

        {/* Grid de Paneles Clínicos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {/* Tarjeta 1: Datos de Cobertura */}
          <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm border border-outline-variant/40 flex flex-col justify-between">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <Badge variant="primary">Activo</Badge>
              </div>
              <h2 className="text-headline-sm text-on-surface mt-2">
                Datos de Cobertura
              </h2>
              <div className="text-body-md text-secondary space-y-1">
                <p>
                  <strong className="text-on-surface">Entidad:</strong>{" "}
                  {user.coverageProvider || "Particular"}
                </p>
                <p>
                  <strong className="text-on-surface">Nº Documento:</strong>{" "}
                  {user.docNumber}
                </p>
                <p>
                  <strong className="text-on-surface">Email:</strong>{" "}
                  {user.email}
                </p>
              </div>
            </div>
            <div className="pt-space-md border-t border-outline-variant/30 mt-space-md">
              <span className="text-label-sm text-primary flex items-center gap-1 font-medium">
                Padrón sincronizado con éxito
              </span>
            </div>
          </div>

          {/* Tarjeta 2: Próximos Turnos */}
          <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm border border-outline-variant/40 flex flex-col justify-between">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary-container/30 text-secondary">
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="text-label-sm text-secondary">0 pendientes</span>
              </div>
              <h2 className="text-headline-sm text-on-surface mt-2">
                Mis Turnos
              </h2>
              <p className="text-body-md text-secondary">
                No tiene consultas agendadas próximamente en la red asistencial.
              </p>
            </div>
            <div className="pt-space-md border-t border-outline-variant/30 mt-space-md">
              <Button variant="secondary" size="sm" className="w-full">
                Solicitar Nuevo Turno
              </Button>
            </div>
          </div>

          {/* Tarjeta 3: Triage Asistido */}
          <div className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm border border-outline-variant/40 flex flex-col justify-between">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-tertiary-container/30 text-tertiary">
                  <Stethoscope className="h-5 w-5" />
                </div>
                <Badge variant="urgent">ESI v4</Badge>
              </div>
              <h2 className="text-headline-sm text-on-surface mt-2">
                Evaluación Clínica
              </h2>
              <p className="text-body-md text-secondary">
                ¿Presenta algún síntoma? Inicie una consulta de orientación médica asistida por IA.
              </p>
            </div>
            <div className="pt-space-md border-t border-outline-variant/30 mt-space-md">
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Iniciar Triage
              </Button>
            </div>
          </div>
        </div>


        {/* Sección de Historia Médica y Resultados */}
        <section className="rounded-2xl bg-surface-container-lowest p-space-lg shadow-sm border border-outline-variant/40 flex flex-col gap-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="text-headline-md text-on-surface">
                Historial Clínico y Estudios
              </h2>
            </div>
            <span className="text-label-sm text-secondary">
              Ley 25.326 de Protección de Datos
            </span>
          </div>
          <div className="rounded-xl bg-surface-container-low/50 p-space-lg text-center text-secondary">
            <p className="text-body-md">
              Su historial médico está sincronizado. Los nuevos resultados de
              laboratorio y diagnósticos se listarán automáticamente aquí.
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
