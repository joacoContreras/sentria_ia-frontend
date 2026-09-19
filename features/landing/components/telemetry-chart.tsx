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
    <div className="bg-surface-container-low p-space-md sm:p-space-lg rounded-xl border border-outline-variant/15 shadow-2xs">
      <div className="flex items-center justify-between gap-space-sm mb-space-sm">
        <div className="flex items-center gap-space-xs">
          <HeartPulse className="h-4 w-4 text-primary" aria-hidden="true" />
          <span className="text-label-sm font-semibold text-on-surface">
            Telemetría de Triage Sentria
          </span>
        </div>
        <div className="flex items-center gap-space-2xs rounded-full bg-surface-container px-space-xs py-0.5 text-label-xs text-secondary">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span>4 min promedio</span>
        </div>
      </div>

      <div className="relative flex h-20 w-full items-center justify-center rounded-lg bg-surface-container-lowest p-space-xs border border-outline-variant/10 shadow-2xs">
        <svg
          className="h-full w-full text-primary"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 340 60"
          aria-hidden="true"
        >
          <path
            className="opacity-25"
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
            strokeWidth={2}
          >
            <animate
              attributeName="stroke-dashoffset"
              dur="2.4s"
              repeatCount="indefinite"
              values="340;0"
            />
          </path>
        </svg>
      </div>

      <div className="mt-space-sm grid grid-cols-3 gap-space-xs text-center">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="rounded-lg bg-surface-container-lowest p-space-xs border border-outline-variant/10 shadow-2xs"
          >
            <span className="block text-title-lg sm:text-vital-metric text-primary font-bold">
              {m.value}
            </span>
            <span className="block truncate text-label-xs text-secondary mt-0.5">
              {m.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

