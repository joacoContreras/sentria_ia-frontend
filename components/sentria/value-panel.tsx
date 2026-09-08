import {
  Brain,
  HeartPulse,
  CalendarClock,
  Stethoscope,
  BadgeCheck,
  ThumbsUp,
} from "lucide-react"

const metrics = [
  { value: "0 s", label: "Espera Digital" },
  { value: "99.8%", label: "Padrón Activo" },
  { value: "256b", label: "Cifrado E2E" },
]

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

const pulsePath =
  "M0 30 H80 L90 20 L100 45 L115 5 L130 55 L140 25 L150 30 H210 L220 15 L230 40 L245 10 L255 50 L265 25 L275 30 H340"

export function ValuePanel() {
  return (
    <div className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-24">
      {/* Branding & headline */}
      <div className="flex flex-col gap-space-sm items-start">
        <div className="inline-flex items-center gap-space-xs bg-surface-container px-space-sm py-space-2xs rounded-full">
          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <Brain className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="text-label-sm text-primary">
            Inteligencia Clínica &amp; Triage Asistido
          </span>
        </div>
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
      <div className="relative bg-surface-container-low p-space-lg rounded-xl overflow-hidden shadow-sm">
        <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary-fixed-dim/30 blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between gap-space-sm mb-space-md">
          <div className="flex items-center gap-space-xs">
            <HeartPulse className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="text-label-md text-on-surface">
              Telemetría de Triage Sentria
            </span>
          </div>
          <span className="text-label-sm bg-surface-container-highest text-primary px-space-xs py-space-2xs rounded-full">
            Sincronizado ESI v4
          </span>
        </div>

        <div className="relative flex h-24 w-full items-center justify-center rounded-lg bg-surface-container-lowest/80 p-space-xs shadow-sm">
          <svg
            className="h-full w-full text-primary"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 340 60"
            aria-hidden="true"
          >
            <path
              className="opacity-30"
              d={pulsePath}
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
            <path
              d={pulsePath}
              stroke="currentColor"
              strokeDasharray="80 260"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
            >
              <animate
                attributeName="stroke-dashoffset"
                dur="2.4s"
                repeatCount="indefinite"
                values="340;0"
              />
            </path>
          </svg>
          <div className="absolute right-3 top-2 flex items-center gap-space-2xs rounded bg-surface-container px-space-xs py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-container" />
            <span className="text-label-sm text-on-surface-variant">
              4 min prom.
            </span>
          </div>
        </div>

        <div className="mt-space-sm grid grid-cols-3 gap-space-xs text-center">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg bg-surface-container-lowest p-space-xs shadow-sm"
            >
              <span className="block text-vital-metric text-primary">
                {m.value}
              </span>
              <span className="block truncate text-label-sm text-secondary">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>

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
