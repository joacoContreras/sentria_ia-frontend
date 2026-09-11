import { ShieldCheck, Lock, Handshake, Activity } from "lucide-react"

export function AboutHero() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* Top Decorative Ambient Glow */}
      <div 
        className="pointer-events-none absolute -top-40 right-1/4 -z-10 h-[600px] w-[600px] rounded-full bg-primary-fixed/30 blur-3xl" 
        aria-hidden="true" 
      />
      <div 
        className="pointer-events-none absolute top-20 left-10 -z-10 h-[450px] w-[450px] rounded-full bg-primary-container/10 blur-3xl" 
        aria-hidden="true" 
      />

      <section className="relative mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop pt-space-2xl lg:pt-space-3xl pb-space-2xl lg:pb-space-3xl">
        <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12 lg:items-center">
          
          {/* Text Column */}
          <div className="flex flex-col items-start lg:col-span-7">
            {/* Brand Header */}
            <div className="mb-space-md flex items-center gap-space-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-on-primary shadow-sm">
                <Activity className="h-7 w-7" aria-hidden="true" />
              </div>
              <div>
                <span className="block text-label-sm font-semibold text-secondary uppercase tracking-widest">
                  Manifiesto y misión institucional
                </span>
                <span className="text-headline-sm text-on-surface font-semibold">
                  Sentria Health Systems
                </span>
              </div>
            </div>

            {/* Main Title */}
            <h1 className="mb-space-lg max-w-2xl text-headline-lg lg:text-display-hero text-on-surface font-bold tracking-tight">
              Transformamos el acceso a la salud con inteligencia clínica asistida
            </h1>

            {/* Subheading / Description */}
            <p className="mb-space-xl max-w-xl text-body-lg lg:text-body-xl text-secondary leading-relaxed">
              Sentria AI nace para resolver la ineficiencia estructural, las demoras críticas en salas de espera y el ausentismo no planificado en centros hospitalarios. Optimizamos el flujo asistencial inicial mediante la automatización empática, precisa y validada del agendamiento y la clasificación previa.
            </p>

            {/* Quick Trust Tokens */}
            <div className="flex flex-wrap items-center gap-space-sm sm:gap-space-md pt-space-xs">
              <div className="flex items-center gap-space-xs rounded-full bg-surface-container-lowest border border-outline-variant/30 px-space-md py-space-xs text-on-surface shadow-xs text-label-md">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                <span>Validación médica continua</span>
              </div>
              <div className="flex items-center gap-space-xs rounded-full bg-surface-container-lowest border border-outline-variant/30 px-space-md py-space-xs text-on-surface shadow-xs text-label-md">
                <Lock className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                <span>Arquitectura cero-confianza</span>
              </div>
              <div className="flex items-center gap-space-xs rounded-full bg-surface-container-lowest border border-outline-variant/30 px-space-md py-space-xs text-on-surface shadow-xs text-label-md">
                <Handshake className="h-5 w-5 text-primary shrink-0" aria-hidden="true" />
                <span>Diseño centrado en el paciente</span>
              </div>
            </div>
          </div>

          {/* Metric & Visual Hero Mosaic */}
          <div className="flex flex-col gap-space-md lg:col-span-5">
            {/* Main Metric Card */}
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest border border-outline-variant/20 p-space-xl shadow-md flex flex-col justify-between">
              <div 
                className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-primary-container/10" 
                aria-hidden="true" 
              />
              <div>
                <span className="block text-label-sm font-semibold uppercase tracking-wider text-secondary mb-space-xs">
                  Eficiencia operativa
                </span>

                <p className="mb-space-2xs text-display-hero text-primary font-bold tracking-tight leading-none">
                  -75%
                </p>
                <p className="mb-space-xs text-headline-sm text-on-surface font-semibold mt-space-xs">
                  Reducción de demoras en mostrador
                </p>
                <p className="text-body-md text-secondary leading-relaxed">
                  Agilización comprobada en áreas de admisión de urgencias y turnos ambulatorios mediante pre-triage autónomo.
                </p>
              </div>

              {/* Inline Mini Sparkline Chart */}
              <div className="mt-space-lg flex items-center justify-between rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-md">
                <div className="flex flex-col">
                  <span className="text-label-sm text-secondary">
                    Tiempo medio en recepción
                  </span>
                  <span className="text-headline-sm text-on-surface font-semibold">
                    3.8 min{" "}
                    <span className="text-label-md text-primary font-medium">
                      (antes 22 min)
                    </span>
                  </span>
                </div>
                <svg
                  className="h-10 w-24 text-primary shrink-0"
                  fill="none"
                  viewBox="0 0 100 30"
                  aria-hidden="true"
                >
                  <path
                    d="M0 26 C 20 24, 30 18, 50 14 C 70 10, 80 4, 100 2"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M0 26 C 20 24, 30 18, 50 14 C 70 10, 80 4, 100 2 L 100 30 L 0 30 Z"
                    fill="currentColor"
                    fillOpacity="0.12"
                  />
                </svg>
              </div>
            </div>

            {/* Secondary Metric Split */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest border border-outline-variant/20 p-space-lg shadow-xs">
                <div>
                  <span className="block text-label-sm font-semibold uppercase tracking-wider text-secondary mb-space-xs">
                    Calidad asistencial
                  </span>
                  <p className="mb-space-2xs text-display-hero text-primary font-bold tracking-tight leading-none">
                    98.4%
                  </p>
                  <p className="text-body-md-medium text-on-surface font-semibold mt-space-xs mb-space-2xs">
                    Satisfacción de pacientes
                  </p>
                  <p className="text-label-sm text-secondary">
                    Evaluación CSAT post-atención
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest border border-outline-variant/20 p-space-lg shadow-xs">
                <div>
                  <span className="block text-label-sm font-semibold uppercase tracking-wider text-secondary mb-space-xs">
                    Escala de impacto
                  </span>
                  <p className="mb-space-2xs text-display-hero text-primary font-bold tracking-tight leading-none">
                    +120k
                  </p>
                  <p className="text-body-md-medium text-on-surface font-semibold mt-space-xs mb-space-2xs">
                    Turnos gestionados
                  </p>
                  <p className="text-label-sm text-secondary">
                    Sin congestión ni fricción física
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}
