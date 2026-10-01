"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Activity, AlertCircle } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { PortalDashboard } from "@/features/appointments/components/portal-dashboard"
import { Button } from "@/components/ui/button"

function PortalLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-space-sm text-secondary">
        <Activity className="h-8 w-8 animate-spin text-primary" />
        <p className="text-body-md font-medium">Cargando portal...</p>
      </div>
    </div>
  )
}

export default function PatientPortalPage() {
  const { user, isAuthenticated, isLoading, isHydrated } = useAuth()
  const router = useRouter()

  if (!isHydrated || isLoading) {
    return <PortalLoadingFallback />
  }

  // If unauthenticated and not in development fallback
  if (!isAuthenticated && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-gutter-mobile">
        <div className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-space-xl text-center shadow-xl border border-outline-variant/40">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-error-container/20 text-error mb-space-md">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h1 className="text-headline-md text-on-surface mb-space-2xs font-semibold">
            Acceso no autenticado
          </h1>
          <p className="text-body-md text-secondary mb-space-lg">
            Para acceder al Portal del Paciente debe iniciar sesión o registrar
            su ficha clínica.
          </p>
          <Button
            variant="primary"
            onClick={() => router.push("/acceso")}
            className="w-full"
          >
            Ir al inicio de sesión
          </Button>
        </div>
      </div>
    )
  }

  return (
    <React.Suspense fallback={<PortalLoadingFallback />}>
      <PortalDashboard />
    </React.Suspense>
  )
}
