import React from "react"
import Link from "next/link"

export function SupportContactPanel() {
  return (
    <section className="w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pb-space-3xl">
      <div className="rounded-xl bg-surface-container-lowest p-space-lg sm:p-space-xl shadow-2xs border border-outline-variant/15">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
          <div className="space-y-space-2xs max-w-2xl">
            <span className="text-label-xs text-primary uppercase tracking-wider font-semibold">
              Atención personalizada
            </span>

            <h3 className="text-headline-sm sm:text-headline-md text-on-surface font-semibold">
              ¿No encontró la respuesta que buscaba?
            </h3>

            <p className="text-body-md text-secondary leading-relaxed">
              Nuestro equipo de atención al paciente puede ayudarlo con consultas administrativas, problemas de acceso al portal o gestiones de turnos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-space-sm w-full lg:w-auto shrink-0">
            <Link
              href="#chat-soporte"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-surface-container-high text-primary text-label-md px-space-lg py-space-sm rounded-lg hover:bg-surface-container transition-all active:scale-[0.98] font-medium"
            >
              Iniciar chat de ayuda
            </Link>

            <Link
              href="mailto:soporte@sentria.ai"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-primary text-on-primary text-label-md px-space-lg py-space-sm rounded-lg hover:bg-primary-container transition-all shadow-2xs active:scale-[0.98] font-medium"
            >
              Enviar correo a soporte
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

