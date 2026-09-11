import { HeartPulse } from "lucide-react"

const metrics = [
  { value: "0 s", label: "Espera Digital" },
  { value: "99.8%", label: "Padrón Activo" },
  { value: "256b", label: "Cifrado E2E" },
]

const pulsePath =
  "M0 30 H80 L90 20 L100 45 L115 5 L130 55 L140 25 L150 30 H210 L220 15 L230 40 L245 10 L255 50 L265 25 L275 30 H340"

export function TelemetryChart() {
  return (
    <div className="relative bg-surface-container-low p-space-lg rounded-xl overflow-hidden shadow-sm">
      <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary-fixed-dim/30 blur-2xl pointer-events-none" />
      <div className="flex items-center justify-between gap-space-sm mb-space-md">
        <div className="flex items-center gap-space-xs">
          <HeartPulse className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="text-label-md text-on-surface">
            Telemetría de Triage Sentria
          </span>
        </div>
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
  )
}
