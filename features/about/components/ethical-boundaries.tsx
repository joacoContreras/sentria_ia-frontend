import { ShieldAlert, Ban, Pill, FileText, ShieldCheck, Headphones } from "lucide-react"

const boundaries = [
  {
    icon: Ban,
    iconColor: "text-error",
    iconBg: "bg-error-container/60",
    badgeLabel: "Límite Diagnóstico",
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
    footerIcon: ShieldCheck,
    footerText: "Clasificación de prioridad orientativa",
  },
  {
    icon: Pill,
    iconColor: "text-error",
    iconBg: "bg-error-container/60",
    badgeLabel: "Límite Farmacológico",
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
    footerIcon: Ban,
    footerText: "Sin módulos de dispensación activa",
  },
  {
    icon: FileText,
    iconColor: "text-primary",
    iconBg: "bg-surface-container-highest",
    badgeLabel: "Puente de Consulta",
    badgeClass: "bg-surface-container-highest text-primary",
    title: "NO reemplaza la consulta profesional",
    description: (
      <>
        Toda interacción con nuestro agente conversacional actúa como un{" "}
        <strong className="text-on-surface font-semibold">puente preparatorio</strong>{" "}
        para organizar la información subjetiva del paciente, facilitando una consulta presencial o telemática mucho más ágil y enriquecida con el profesional facultativo.
      </>
    ),
    footerIcon: Headphones,
    footerText: "Facilitador del acto médico real",
  },
]

export function EthicalBoundaries() {
  return (
    <section className="w-full bg-surface-container-low py-space-3xl lg:py-space-4xl relative">
      <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
        
        {/* Header */}
        <div className="max-w-3xl mb-space-2xl">
          <div className="inline-flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-error-container text-on-error-container font-semibold text-label-sm mb-space-sm">
            <ShieldAlert className="h-4 w-4 shrink-0 text-error" aria-hidden="true" />
            <span>Aviso Legal y Bioético Obligatorio</span>
          </div>
          <h2 className="text-headline-lg text-on-surface font-bold mb-space-xs tracking-tight">
            Fronteras Operativas y Marco Ético Asistencial
          </h2>
          <p className="text-body-lg text-on-surface-variant leading-relaxed">
            Sentria AI es una herramienta de soporte administrativo y orientación clasificatoria previa, diseñada bajo estrictos límites normativos y bioéticos. Garantizamos una demarcación nítida entre la asistencia algorítmica y la potestad clínica indelegable.
          </p>
        </div>

        {/* 3 Boundary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {boundaries.map((item, index) => {
            const Icon = item.icon
            const FooterIcon = item.footerIcon
            return (
              <div
                key={index}
                className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest p-space-xl shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div>
                  <div className={`mb-space-lg flex h-14 w-14 items-center justify-center rounded-2xl ${item.iconBg} ${item.iconColor}`}>
                    <Icon className="h-8 w-8" aria-hidden="true" />
                  </div>
                  <div className={`mb-space-sm inline-block rounded px-space-xs py-space-2xs text-label-sm font-semibold uppercase ${item.badgeClass}`}>
                    {item.badgeLabel}
                  </div>
                  <h3 className="mb-space-sm text-headline-sm text-on-surface font-bold">
                    {item.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-space-lg pt-space-md bg-surface-container-low/60 rounded-xl p-space-sm flex items-center gap-space-xs text-secondary text-label-sm">
                  <FooterIcon className="h-[18px] w-[18px] text-tertiary shrink-0" aria-hidden="true" />
                  <span>{item.footerText}</span>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
