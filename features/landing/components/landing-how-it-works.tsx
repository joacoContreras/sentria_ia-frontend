import { UserCheck, Stethoscope, Zap } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: UserCheck,
    title: "Identificación & Padrón Digital",
    description:
      "Ingrese con su documento y valide su cobertura médica (particular, prepaga u obra social) de forma instantánea sin trámites burocráticos.",
  },
  {
    step: "02",
    icon: Stethoscope,
    title: "Triage Clínico Asistido",
    description:
      "Indique sus síntomas mediante una interfaz asistida que analiza la severidad médica bajo la escala internacional ESI (Emergency Severity Index).",
  },
  {
    step: "03",
    icon: Zap,
    title: "Atención Médica Priorizada",
    description:
      "El equipo médico recibe su ficha estructurada antes de que ingrese al consultorio o sala de urgencias, reduciendo drásticamente los tiempos de espera.",
  },
]

export function LandingHowItWorks() {
  return (
    <section className="py-space-xl sm:py-space-2xl bg-surface-container-low/50 border-y border-outline-variant/20">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-space-2xs mb-space-xl">
          <h2 className="text-headline-lg text-on-surface font-bold tracking-tight">
            ¿Cómo funciona Sentria AI?
          </h2>
          <p className="text-body-md text-secondary leading-relaxed">
            Una experiencia simple y humana diseñada para reducir la incertidumbre del paciente y acelerar la toma de decisiones clínicas.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {steps.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="relative rounded-2xl bg-surface-container-lowest border border-outline-variant/20 p-space-lg sm:p-space-xl shadow-2xs flex flex-col justify-between hover:border-primary/40 transition-colors group"
              >
                <div className="space-y-space-md">
                  <div className="flex items-center justify-between">
                    <span className="text-display-hero text-primary/20 font-bold group-hover:text-primary/30 transition-colors">
                      {item.step}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-container text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-space-2xs">
                    <h3 className="text-title-md text-on-surface font-semibold">
                      {item.title}
                    </h3>
                    <p className="text-body-sm text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
