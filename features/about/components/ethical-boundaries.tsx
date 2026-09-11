import { Ban, Pill, FileText } from "lucide-react"

const boundaries = [
  {
    icon: Ban,
    iconColor: "text-error",
    iconBg: "bg-error-container/60",
    badgeLabel: "Límite diagnóstico",
    badgeClass: "bg-error-container text-on-error-container",
    title: "NO realiza diagnósticos clínicos",
    description: (
      <>
        Sentria AI orienta la prioridad de atención aplicando algoritmos estandarizados basados en el Emergency Severity Index (ESI), pero{" "}
        <strong className="text-on-surface font-semibold">
          jamás emite un dictamen patológico definitivo
        </strong>{" "}
        ni pretende reemplazar el ojo clínico y la anamnesis directa.
      </>
    ),
  },
  {
    icon: Pill,
    iconColor: "text-error",
    iconBg: "bg-error-container/60",
    badgeLabel: "Límite farmacológico",
    badgeClass: "bg-error-container text-on-error-container",
    title: "NO prescribe medicamentos ni recetas",
    description: (
      <>
        La plataforma tiene{" "}
        <strong className="text-on-surface font-semibold">
          estrictamente vedada la dosificación, sugerencia o emisión de recetas médicas
        </strong>
        . La prescripción farmacológica es potestad exclusiva e intransferible de médicos matriculados y habilitados por los entes reguladores.
      </>
    ),
  },
  {
    icon: FileText,
    iconColor: "text-primary",
    iconBg: "bg-primary-fixed",
    badgeLabel: "Puente de consulta",
    badgeClass: "bg-primary-fixed text-on-primary-fixed-variant",
    title: "NO reemplaza la consulta profesional",
    description: (
      <>
        Toda interacción con nuestro agente conversacional actúa como un{" "}
        <strong className="text-on-surface font-semibold">puente preparatorio</strong>{" "}
        para organizar la información subjetiva del paciente, facilitando una consulta presencial o telemática mucho más ágil y enriquecida con el profesional facultativo.
      </>
    ),
  },
]

export function EthicalBoundaries() {
  return (
    <section className="w-full bg-surface-container-low py-space-3xl lg:py-space-4xl relative">
      <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
        
        {/* Header */}
        <div className="max-w-3xl mb-space-2xl">
          <span className="mb-space-xs block text-label-sm font-semibold uppercase tracking-widest text-error">
            Aviso legal y bioético
          </span>
          <h2 className="text-headline-lg text-on-surface font-bold mb-space-xs tracking-tight">
            Fronteras operativas y marco ético asistencial
          </h2>
          <p className="text-body-lg text-secondary leading-relaxed">
            Sentria AI es una herramienta de soporte administrativo y orientación clasificatoria previa, diseñada bajo estrictos límites normativos y bioéticos. Garantizamos una demarcación nítida entre la asistencia algorítmica y la potestad clínica indelegable.
          </p>
        </div>

        {/* 3 Boundary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {boundaries.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="flex flex-col rounded-2xl bg-surface-container-lowest border border-outline-variant/20 p-space-xl shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className={`mb-space-lg flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg} ${item.iconColor}`}>
                  <Icon className="h-8 w-8" aria-hidden="true" />
                </div>
                <div className={`mb-space-sm inline-block self-start rounded px-space-xs py-space-2xs text-label-sm font-semibold uppercase tracking-wider ${item.badgeClass}`}>
                  {item.badgeLabel}
                </div>
                <h3 className="mb-space-sm text-headline-sm text-on-surface font-bold">
                  {item.title}
                </h3>
                <p className="text-body-md text-secondary leading-relaxed">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
