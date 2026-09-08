import { Siren, Phone } from "lucide-react"

const links = [
  { label: "Términos Clínicos" },
  { label: "Privacidad Médica" },
  { label: "Protocolo Criptográfico" },
]

export function SiteFooter() {
  return (
    <footer className="mt-space-3xl w-full bg-surface-container-low">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-xl">
        {/* Emergency banner */}
        <div className="mb-space-lg flex flex-col items-center justify-between gap-space-md rounded-xl bg-error-container/40 p-space-md md:flex-row">
          <div className="flex items-center gap-space-sm">
            <Siren className="h-6 w-6 shrink-0 text-error" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="text-label-lg text-on-error-container">
                Línea Hospitalaria de Emergencia Vital 24/7
              </span>
              <span className="text-body-md text-secondary">
                Si experimenta dolor torácico agudo o dificultad respiratoria
                grave, contacte inmediatamente.
              </span>
            </div>
          </div>
          <button
            type="button"
            className="flex shrink-0 items-center gap-space-xs rounded-full bg-error px-space-lg py-space-xs text-label-lg text-on-error"
          >
            <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
            Llamar 911 / 112 Directo
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-space-sm pt-space-md text-center">
          <div className="flex flex-wrap items-center justify-center gap-space-md">
            <span className="text-label-md text-on-surface-variant">
              Sede Médica y Telemétrica Central
            </span>
            <span className="text-outline">•</span>
            {links.map((link) => (
              <a
                key={link.label}
                href="#"
                className="text-label-sm text-on-surface-variant transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
          <span className="mt-space-2xs text-label-sm text-on-surface-variant">
            © 2024 Sentria AI Health Systems. Cumplimiento Estricto HIPAA y
            Regulaciones HITECH.
          </span>
        </div>
      </div>
    </footer>
  )
}
