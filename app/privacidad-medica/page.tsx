import type { Metadata } from "next"
import { Shield } from "lucide-react"
import { SiteHeader } from "@/components/shared/site-header"
import { SiteFooter } from "@/components/shared/site-footer"
import { LegalPageHeader } from "@/features/legal/components/legal-page-header"
import { LegalNavigation } from "@/features/legal/components/legal-navigation"
import { MedicalPrivacyView } from "@/features/legal/components/medical-privacy-view"

export const metadata: Metadata = {
  title: "Sentria AI | Política de Privacidad de Datos Médicos (Ley 25.326 & HIPAA)",
  description:
    "Política de resguardo, tratamiento de datos sensibles de salud, derechos ARCO y cumplimiento de la Ley 25.326 y estándares HIPAA en Sentria AI.",
}

export default function PrivacidadMedicaPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <LegalPageHeader
        badge="Protección de Datos Sensibles"
        title="Política de Privacidad Médica"
        description="Cumplimiento estricto de la Ley 25.326 de Protección de Datos Personales, directivas HIPAA/HITECH y resguardo de la confidencialidad médica."
        lastUpdated="Septiembre 2024"
        icon={<Shield className="h-8 w-8 text-primary" />}
      />
      <LegalNavigation />
      <main className="flex-1 w-full">
        <MedicalPrivacyView />
      </main>
      <SiteFooter />
    </div>
  )
}
