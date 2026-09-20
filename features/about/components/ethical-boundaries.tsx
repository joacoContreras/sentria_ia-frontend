const boundaries = [
  {
    badgeLabel: "Límite diagnóstico",
    title: "No realiza diagnósticos clínicos",
    description: (
      <>
        Sentria AI orienta la prioridad de atención aplicando algoritmos estandarizados basados en el Emergency Severity Index (ESI), pero{" "}
        <strong className="text-on-surface font-semibold">
          no emite un dictamen patológico definitivo
        </strong>{" "}
        ni reemplaza la evaluación médica presencial.
      </>
    ),
  },
  {
    badgeLabel: "Límite farmacológico",
    title: "No prescribe medicamentos ni recetas",
    description: (
      <>
        La plataforma tiene{" "}
        <strong className="text-on-surface font-semibold">
          estrictamente vedada la indicación o emisión de recetas
        </strong>
        . La prescripción farmacológica es potestad exclusiva e indelegable de profesionales médicos habilitados.
      </>
    ),
  },
  {
    badgeLabel: "Puente de consulta",
    title: "No reemplaza la consulta profesional",
    description: (
      <>
        Toda interacción actúa como un{" "}
        <strong className="text-on-surface font-semibold">puente organizativo</strong>{" "}
        para preparar la información clínica previa, permitiendo una consulta presencial o telemática más ágil y precisa con el facultativo.
      </>
    ),
  },
]

export function EthicalBoundaries() {
  return (
    <section className="w-full bg-surface-container-low py-space-2xl lg:py-space-3xl relative border-y border-outline-variant/15">
      <div className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop">
        
        {/* Header */}
        <div className="max-w-2xl mb-space-xl">
          <span className="mb-space-3xs block text-label-xs font-semibold uppercase tracking-wider text-error">
            Aviso legal y bioético
          </span>
          <h2 className="text-headline-lg text-on-surface font-bold mb-space-xs tracking-tight">
            Fronteras operativas y marco asistencial
          </h2>
          <p className="text-body-md text-secondary leading-relaxed">
            Sentria AI es una herramienta de orientación previa y soporte de turnos diseñada bajo límites normativos y bioéticos claros.
          </p>
        </div>

        {/* 3 Boundary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {boundaries.map((item, index) => (
            <div
              key={index}
              className="flex flex-col rounded-2xl bg-surface-container-lowest border border-outline-variant/15 p-space-lg shadow-2xs space-y-space-xs"
            >
              <span className="text-label-xs font-semibold uppercase tracking-wider text-primary">
                {item.badgeLabel}
              </span>
              <h3 className="text-title-lg text-on-surface font-semibold">
                {item.title}
              </h3>
              <p className="text-body-sm text-secondary leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

