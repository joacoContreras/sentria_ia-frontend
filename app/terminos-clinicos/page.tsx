import type { Metadata } from "next"
import { FileText } from "lucide-react"
import { SiteHeader } from "@/components/shared/site-header"
import { SiteFooter } from "@/components/shared/site-footer"
import { LegalPageHeader } from "@/features/legal/components/legal-page-header"
import { LegalNavigation } from "@/features/legal/components/legal-navigation"
import { ClinicalTermsView } from "@/features/legal/components/clinical-terms-view"

export const metadata: Metadata = {
  title: "Sentria AI | Términos Clínicos y Consentimiento Informado",
  description:
    "Términos del servicio telemétrico, consentimiento informado bajo Ley 26.529 y alcances de la inteligencia clínica asistencial de Sentria AI.",
}

export default function TerminosClinicosPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <LegalPageHeader
        badge="Marco Regulatorio Sanitario"
        title="Términos Clínicos y de Servicio"
        description="Regulación asistencial, consentimiento informado del paciente y condiciones de uso de la plataforma telemétrica y algoritmos de triage Sentria AI."
        lastUpdated="Septiembre 2024"
        icon={<FileText className="h-8 w-8 text-primary" />}
      />
      <LegalNavigation />
      <main className="flex-1 w-full">
        <ClinicalTermsView />
      </main>
      <SiteFooter />
    </div>
  )
}
