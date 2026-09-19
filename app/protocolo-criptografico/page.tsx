import type { Metadata } from "next"
import { KeyRound } from "lucide-react"
import { SiteHeader } from "@/components/shared/site-header"
import { SiteFooter } from "@/components/shared/site-footer"
import { LegalPageHeader } from "@/features/legal/components/legal-page-header"
import { LegalNavigation } from "@/features/legal/components/legal-navigation"
import { CryptoProtocolView } from "@/features/legal/components/crypto-protocol-view"

export const metadata: Metadata = {
  title: "Sentria AI | Protocolo Criptográfico y Ciberseguridad Hospitalaria",
  description:
    "Especificación de arquitectura de cifrado AES-256-GCM, TLS 1.3 con PFS, Zero-Knowledge enclaves y gestión de claves HSM en Sentria AI.",
}

export default function ProtocoloCriptograficoPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <LegalPageHeader
        badge="Ciberseguridad y Criptografía"
        title="Protocolo Criptográfico de Salud"
        description="Arquitectura de defensa en profundidad, cifrado en reposo AES-256-GCM, canales seguros TLS 1.3 y enclaves Zero-Knowledge para telemetría clínica."
        lastUpdated="Septiembre 2024"
        icon={<KeyRound className="h-8 w-8 text-primary" />}
      />
      <LegalNavigation />
      <main className="flex-1 w-full">
        <CryptoProtocolView />
      </main>
      <SiteFooter />
    </div>
  )
}
