import type { Metadata } from "next"
import { SiteHeader } from "@/components/shared/site-header"
import { SiteFooter } from "@/components/shared/site-footer"
import { AboutHero } from "@/features/about/components/about-hero"
import { ClinicalShowcase } from "@/features/about/components/clinical-showcase"
import { EthicalBoundaries } from "@/features/about/components/ethical-boundaries"
import { TechnologyPrivacy } from "@/features/about/components/technology-privacy"
import { DossierCta } from "@/features/about/components/dossier-cta"

export const metadata: Metadata = {
  title: "Sentria AI | Sobre Nosotros - Manifiesto y Misión Institucional",
  description:
    "Conozca cómo Sentria AI transforma el flujo asistencial hospitalario y la gestión de triage con inteligencia clínica asistida, seguridad HIPAA y estricto apego bioético.",
}

export default function SobreNosotrosPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 w-full">
        <AboutHero />
        <ClinicalShowcase />
        <EthicalBoundaries />
        <TechnologyPrivacy />
        <DossierCta />
      </main>
      <SiteFooter />
    </div>
  )
}
