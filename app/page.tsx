import type { Metadata } from "next"
import { SiteHeader } from "@/components/shared/site-header"
import { SiteFooter } from "@/components/shared/site-footer"
import { LandingView } from "@/features/landing/components/landing-view"

export const metadata: Metadata = {
  title: "Sentria AI | Triage Médico Inteligente & Gestión Asistencial",
  description:
    "Plataforma de triage clínico asistido por IA, validación instantánea de cobertura y gestión de pacientes sin demoras hospitalarias. Cifrado E2E y cumplimiento HIPAA.",
}

export default function HomePage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 w-full">
        <LandingView />
      </main>
      <SiteFooter />
    </div>
  )
}
