import Link from "next/link"
import { ArrowRight, ShieldCheck } from "lucide-react"

export function LandingCta() {
  return (
    <section className="py-space-xl sm:py-space-2xl bg-surface-container-low/40 border-y border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/20 p-space-lg sm:p-space-2xl shadow-xs text-center flex flex-col items-center max-w-3xl mx-auto space-y-space-md">
          
          <div className="space-y-space-2xs">
            <h2 className="text-headline-lg text-on-surface font-bold tracking-tight">
              Inicie su triage clínico o gestione sus turnos
            </h2>
            <p className="text-body-md text-secondary max-w-xl mx-auto leading-relaxed">
              Cree su ficha clínica en menos de 2 minutos o inicie sesión para consultar sus órdenes médicas, cobertura y estado de atención.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-space-sm pt-space-xs w-full sm:w-auto">
            <Link
              href="/acceso"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-primary text-white hover:bg-primary-container font-semibold px-space-xl py-3 rounded-xl transition-all shadow-sm active:scale-[0.985] text-label-md"
            >
              <span>Acceder / Registrarse</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/ayuda"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-surface-container border border-outline-variant/30 hover:bg-surface-container-high text-on-surface font-semibold px-space-lg py-3 rounded-xl transition-all text-label-md"
            >
              <span>Preguntas Frecuentes</span>
            </Link>
          </div>

          <div className="flex items-center gap-1.5 text-label-xs text-secondary pt-space-xs">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Cifrado E2E de datos médicos bajo estricto estándar HIPAA</span>
          </div>

        </div>
      </div>
    </section>
  )
}
