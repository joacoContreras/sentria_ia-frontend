import type { Metadata } from "next"
import { SiteHeader } from "@/components/shared/site-header"
import { SiteFooter } from "@/components/shared/site-footer"
import { HelpView } from "@/features/help/components/help-view"

export const metadata: Metadata = {
  title: "Sentria AI | Centro de Ayuda y Asistencia Clínica",
  description:
    "Centro de ayuda y soporte clínico de Sentria AI. Horarios de guardia, ubicación de sedes hospitalarias, retiro de estudios y guía de uso del asistente inteligente.",
}

export default function AyudaPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 w-full">
        <HelpView />
      </main>
      <SiteFooter />
    </div>
  )
}
