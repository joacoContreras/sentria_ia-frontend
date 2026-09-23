import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SiteHeader } from "@/components/shared/site-header"
import { SiteFooter } from "@/components/shared/site-footer"
import { RegistrationCard } from "@/features/auth/components/registration-card"

export const metadata: Metadata = {
  title: "Sentria AI | Acceso al Portal y Registro de Pacientes",
  description:
    "Inicie sesión con sus datos de paciente o cree su ficha clínica para gestionar turnos, coberturas y realizar triage asistido.",
}

export default function AccesoPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center py-space-xl lg:py-space-2xl px-gutter-mobile">
        <div className="w-full max-w-xl mx-auto space-y-space-md">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-label-sm text-secondary hover:text-primary transition-colors mb-space-2xs"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al inicio</span>
          </Link>

          {/* Registration / Login Card */}
          <RegistrationCard />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
