import Link from "next/link"
import { ArrowRight, ShieldCheck, HeartPulse, Clock, Sparkles } from "lucide-react"
import { TelemetryChart } from "./telemetry-chart"

export function LandingHero() {
  return (
    <section className="relative overflow-hidden pt-space-xl sm:pt-space-2xl pb-space-lg sm:pb-space-xl">
      {/* Subtle ambient background glow */}
      <div 
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-full max-w-4xl bg-primary/5 blur-3xl rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
          
          {/* Main Hero Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
            
            {/* Main Headline */}
            <div className="space-y-space-2xs">
              <h1 className="text-display-hero-mobile sm:text-display-hero text-on-surface font-bold tracking-tight">
                Atención médica sin esperas con{" "}
                <span className="text-primary">triage clínico inteligente</span>
              </h1>
              <p className="text-body-md sm:text-body-lg text-secondary leading-relaxed max-w-2xl pt-space-2xs">
                Sentria AI agiliza la admisión hospitalaria: evalúa preliminarmente sus síntomas según estándares médicos internacionales (ESI), valida su cobertura médica en segundos y prioriza su atención sin demoras innecesarias.
              </p>
            </div>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center gap-space-sm pt-space-xs w-full sm:w-auto">
              <Link
                href="/acceso"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-primary text-white hover:bg-primary-container font-semibold px-space-lg py-3 rounded-xl transition-all shadow-sm active:scale-[0.985] text-label-md"
              >
                <span>Acceder al Portal / Registrarse</span>
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/sobre-nosotros"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-surface-container-lowest border border-outline-variant/30 hover:bg-surface-container text-on-surface font-semibold px-space-md py-3 rounded-xl transition-all shadow-2xs text-label-md"
              >
                <span>Conocer Más</span>
              </Link>

              <Link
                href="/ayuda"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs text-secondary hover:text-primary font-medium px-space-sm py-3 transition-colors text-label-md"
              >
                <span>Centro de Ayuda</span>
              </Link>
            </div>

            {/* Value Indicators */}
            <div className="grid grid-cols-3 gap-space-sm pt-space-md w-full border-t border-outline-variant/20">
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-primary">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="text-label-xs font-semibold">0 seg</span>
                </div>
                <span className="text-body-sm text-secondary font-medium">Recepción digital</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-primary">
                  <HeartPulse className="h-3.5 w-3.5" />
                  <span className="text-label-xs font-semibold">ESI v4</span>
                </div>
                <span className="text-body-sm text-secondary font-medium">Escala médica validada</span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span className="text-label-xs font-semibold">E2E 256b</span>
                </div>
                <span className="text-body-sm text-secondary font-medium">Privacidad y HIPAA</span>
              </div>
            </div>

          </div>

          {/* Telemetry Visual Column */}
          <div className="lg:col-span-5 flex flex-col gap-space-md">
            <TelemetryChart />
            
            {/* Context Notice Card */}
            <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/20 p-space-md shadow-2xs flex items-center gap-space-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-label-sm font-semibold text-on-surface">
                  Orientación clínica asistida
                </span>
                <span className="text-body-sm text-secondary">
                  El asistente organiza su historial y síntomas para el médico tratante en guardia.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
