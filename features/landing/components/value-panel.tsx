import {
  Brain,
  CalendarClock,
  Stethoscope,
  BadgeCheck,
  ThumbsUp,
} from "lucide-react"
import { TelemetryChart } from "./telemetry-chart"

const features = [
  {
    icon: CalendarClock,
    title: "Autogestión de Turnos 24/7",
    description:
      "Reserve consultas presenciales de guardia programada o telemedicina en segundos, sincronizadas con su agenda.",
  },
  {
    icon: Stethoscope,
    title: "Triage Clínico Asistido",
    description:
      "Clasificación sintomática inteligente previa al ingreso institucional para orientar el nivel de prioridad y especialidad.",
  },
  {
    icon: BadgeCheck,
    title: "Validación Automática de Cobertura",
    description:
      "Conectividad directa con obras sociales y empresas de medicina prepaga sin demoras en mostradores de recepción.",
  },
]

export function ValuePanel() {
  return (
    <div className="lg:col-span-5 flex flex-col gap-space-lg">
      {/* Branding & headline */}
      <div className="flex flex-col gap-space-sm items-start">
        <h1 className="text-headline-lg text-on-surface">
          Gestione sus consultas de salud sin esperas ni fricción administrativa
        </h1>
        <p className="text-body-lg text-secondary">
          Acceso directo al ecosistema asistencial Sentria AI. Centralice su
          historial médico, turnos hospitalarios y validaciones de cobertura en
          tiempo real.
        </p>
      </div>

      {/* Telemetry chart */}
      <TelemetryChart />

      {/* Feature list */}
      <div className="flex flex-col gap-space-md">
        {features.map(({ icon: Icon, title, description }) => (
          <div
            key={title}
            className="flex items-start gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-fixed text-on-primary-fixed-variant shadow-sm">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-headline-sm text-on-surface">{title}</span>
              <span className="mt-space-2xs text-body-md text-secondary">
                {description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Satisfaction stat */}
      <div className="flex items-center gap-space-md rounded-xl bg-surface-container p-space-md shadow-sm">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
          <ThumbsUp className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="flex flex-col">
          <span className="text-label-lg text-on-surface">
            98.4% de satisfacción en pacientes ambulatorios
          </span>
          <span className="text-body-md text-secondary">
            Tiempo promedio de ingreso reducido de{" "}
            <strong>22 a 4 minutos</strong> en centros acreditados.
          </span>
        </div>
      </div>
    </div>
  )
}
