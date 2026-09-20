import React from "react"
import { ShieldCheck } from "lucide-react"

interface LegalPageHeaderProps {
  badge: string
  title: string
  description: string
  lastUpdated: string
  icon?: React.ReactNode
}

export function LegalPageHeader({
  badge,
  title,
  description,
  lastUpdated,
  icon,
}: LegalPageHeaderProps) {
  return (
    <section className="relative w-full overflow-hidden bg-surface-container-lowest border-b border-outline-variant/15 py-space-xl lg:py-space-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--color-primary)/8%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop relative">
        <div className="max-w-3xl space-y-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-label-xs font-semibold uppercase tracking-wider text-primary">
              <ShieldCheck className="h-3.5 w-3.5" />
              {badge}
            </span>
            <span className="text-label-xs text-secondary">
              Última actualización: {lastUpdated}
            </span>
          </div>

          <div className="flex items-start gap-space-sm pt-space-3xs">
            {icon && <div className="mt-1 text-primary">{icon}</div>}
            <h1 className="text-display-hero-mobile sm:text-display-hero font-bold text-on-surface tracking-tight">
              {title}
            </h1>
          </div>

          <p className="text-body-lg text-secondary leading-relaxed pt-space-2xs">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}
