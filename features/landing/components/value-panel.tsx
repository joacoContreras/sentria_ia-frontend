import { TelemetryChart } from "./telemetry-chart"

const features = [
  {
    title: "Autogestión de turnos 24/7",
    description:
      "Reserve consultas presenciales de guardia programada o telemedicina en segundos, sincronizadas con su agenda.",
  },
  {
    title: "Triage clínico asistido",
    description:
      "Orientación sintomática previa para identificar el nivel de prioridad médica y la especialidad requerida.",
  },
  {
    title: "Validación automática de cobertura",
    description:
      "Verificación directa con obras sociales y prepagas sin esperas en mostradores de recepción.",
  },
]

export function ValuePanel() {
  return (
    <div className="lg:col-span-5 flex flex-col gap-space-lg">
      {/* Branding & headline */}
      <div className="flex flex-col gap-space-xs items-start">
        <span className="text-label-xs font-semibold uppercase tracking-wider text-primary">
          Atención asistencial digital
        </span>
        <h1 className="text-headline-lg text-on-surface font-bold tracking-tight">
          Gestione sus consultas de salud sin esperas ni demoras
        </h1>
        <p className="text-body-md text-secondary leading-relaxed">
          Acceso al ecosistema de Sentria AI para consultar turnos, validar cobertura médica e iniciar un triage previo a su visita.
        </p>
      </div>

      {/* Telemetry chart */}
      <TelemetryChart />

      {/* Feature list */}
      <div className="flex flex-col gap-space-xs">
        {features.map(({ title, description }) => (
          <div
            key={title}
            className="flex flex-col gap-space-3xs rounded-xl bg-surface-container-lowest p-space-md border border-outline-variant/15 shadow-2xs"
          >
            <h3 className="text-label-lg text-on-surface font-semibold">
              {title}
            </h3>
            <p className="text-body-sm text-secondary leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>

      {/* Satisfaction stat */}
      <div className="rounded-xl bg-surface-container-lowest p-space-md border border-outline-variant/15 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div>
          <span className="text-display-hero text-primary font-bold leading-none block">
            98.4%
          </span>
          <span className="text-label-sm text-secondary font-medium mt-space-3xs block">
            Satisfacción en pacientes ambulatorios
          </span>
        </div>
        <div className="sm:text-right text-body-sm text-secondary border-t sm:border-t-0 sm:border-l border-outline-variant/20 pt-space-xs sm:pt-0 sm:pl-space-md">
          Tiempo en recepción reducido a <strong className="text-on-surface font-semibold">4 minutos</strong> promedio.
        </div>
      </div>
    </div>
  )
}

