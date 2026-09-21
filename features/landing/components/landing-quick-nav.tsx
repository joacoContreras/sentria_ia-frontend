import Link from "next/link"
import { Users, HelpCircle, ArrowRight } from "lucide-react"

export function LandingQuickNav() {
  return (
    <section className="py-space-xl sm:py-space-2xl">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-xl mx-auto space-y-space-2xs mb-space-lg">
          <h2 className="text-headline-lg text-on-surface font-bold tracking-tight">
            Explore más sobre Sentria AI
          </h2>
          <p className="text-body-md text-secondary leading-relaxed">
            Consulte nuestro propósito institucional o acceda a la guía de ayuda y preguntas frecuentes.
          </p>
        </div>

        {/* Two cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
          
          {/* Card 1: Sobre Nosotros */}
          <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/20 p-space-lg sm:p-space-xl shadow-2xs flex flex-col justify-between hover:border-primary/40 transition-all group">
            <div className="space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Users className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-space-2xs">
                <h3 className="text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Sobre Nosotros
                </h3>
                <p className="text-body-md text-secondary leading-relaxed">
                  Conozca nuestro compromiso bioético, la visión del equipo médico asesor y cómo diseñamos tecnología para humanizar la atención hospitalaria.
                </p>
              </div>
            </div>

            <div className="pt-space-lg mt-space-md border-t border-outline-variant/15">
              <Link
                href="/sobre-nosotros"
                className="inline-flex items-center gap-space-xs text-label-md font-semibold text-primary hover:text-primary-container transition-colors"
              >
                <span>Conocer nuestra misión institucional</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Card 2: Centro de Ayuda */}
          <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/20 p-space-lg sm:p-space-xl shadow-2xs flex flex-col justify-between hover:border-primary/40 transition-all group">
            <div className="space-y-space-md">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <HelpCircle className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-space-2xs">
                <h3 className="text-headline-sm text-on-surface font-semibold group-hover:text-primary transition-colors">
                  Centro de Ayuda
                </h3>
                <p className="text-body-md text-secondary leading-relaxed">
                  Respuestas inmediatas sobre turnos, sedes hospitalarias, guardias 24/7 y asistencia en tiempo real mediante nuestro asistente virtual.
                </p>
              </div>
            </div>

            <div className="pt-space-lg mt-space-md border-t border-outline-variant/15">
              <Link
                href="/ayuda"
                className="inline-flex items-center gap-space-xs text-label-md font-semibold text-primary hover:text-primary-container transition-colors"
              >
                <span>Visitar el Centro de Ayuda</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
