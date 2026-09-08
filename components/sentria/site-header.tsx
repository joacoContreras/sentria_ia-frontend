import Link from "next/link"
import { Activity, ShieldCheck, UserRound } from "lucide-react"

const badges = [
  { icon: ShieldCheck, label: "Plataforma Clínica Acreditada" }
]

export function SiteHeader() {
  return (
    <header className="w-full border-b border-outline-variant/40 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-sm">
        <div className="flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-lg">
            <Link href="/" className="flex items-center gap-space-xs shrink-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-on-primary">
                <Activity className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-headline-sm text-on-surface leading-tight">
                Sentria <span className="text-primary">AI</span>
              </span>
            </Link>

            <ul className="hidden xl:flex items-center gap-space-sm">
              {badges.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-space-2xs rounded-full bg-surface-container-low px-space-sm py-space-2xs"
                >
                  <Icon className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                  <span className="text-label-sm text-on-surface-variant max-w-[8rem] leading-tight">
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <nav className="flex items-center gap-space-md">
            <Link href="#acceso" className="text-label-lg text-primary hover:underline">
              Acceso
            </Link>
            <Link
              href="#verificacion"
              className="hidden sm:inline text-label-lg text-on-surface-variant hover:text-on-surface"
            >
              Verificación
            </Link>
            <Link
              href="#ayuda"
              className="hidden sm:inline text-label-lg text-on-surface-variant hover:text-on-surface"
            >
              Ayuda
            </Link>
            <button
              type="button"
              aria-label="Cuenta"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-on-primary"
            >
              <UserRound className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}
