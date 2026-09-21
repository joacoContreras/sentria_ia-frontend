import { Activity, ShieldCheck, Database } from "lucide-react"

const pillars = [
  {
    icon: Activity,
    title: "Triaje ESI Determinístico",
    description:
      "Algoritmos basados en el índice de severidad de emergencias (ESI) para categorizar la urgencia médica objetivamente y sin demoras en mostrador.",
  },
  {
    icon: ShieldCheck,
    title: "Privacidad y Cifrado Médico",
    description:
      "Protección de datos de salud con cifrado TLS 1.3 y AES-256 en reposo, en estricto cumplimiento con estándares HIPAA y Ley de Protección de Datos.",
  },
  {
    icon: Database,
    title: "Integración de Padrón y Guardia",
    description:
      "Validación en tiempo real de cobertura médica y sincronización directa con los puestos de enfermería y consultorios médicos.",
  },
]

export function LandingPillars() {
  return (
    <section className="py-space-xl sm:py-space-2xl">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto space-y-space-2xs mb-space-xl">
          <h2 className="text-headline-lg text-on-surface font-bold tracking-tight">
            Diseñado para la máxima seguridad y precisión
          </h2>
          <p className="text-body-md text-secondary leading-relaxed">
            Un sistema que une la rigurosidad médica con una experiencia de usuario limpia, humana y sin fricciones.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="rounded-2xl bg-surface-container-lowest border border-outline-variant/20 p-space-lg sm:p-space-xl shadow-2xs flex flex-col justify-between space-y-space-md"
              >
                <div className="space-y-space-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="space-y-space-3xs">
                    <h3 className="text-title-md text-on-surface font-semibold">
                      {pillar.title}
                    </h3>
                    <p className="text-body-sm text-secondary leading-relaxed">
                      {pillar.description}
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
