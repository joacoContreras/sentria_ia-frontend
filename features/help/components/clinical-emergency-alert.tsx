import React from "react"
import { Siren, Phone } from "lucide-react"

export function ClinicalEmergencyAlert() {
  return (
    <section className="w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop mb-space-2xl">
      <div className="relative overflow-hidden rounded-xl bg-error-container p-space-lg shadow-xs border border-error/20">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
          <div className="flex items-start gap-space-md">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-error flex items-center justify-center text-on-error shadow-md relative">
              <Siren className="h-7 w-7 animate-pulse" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-error" />
              </span>
            </div>

            <div className="space-y-space-2xs">
              <div className="flex flex-wrap items-center gap-space-xs">
                <span className="text-headline-sm text-on-error-container font-semibold tracking-tight">
                  Línea y Protocolo de Emergencia Vital 24/7
                </span>
                <span className="px-space-xs py-space-2xs rounded-full bg-error text-on-error text-label-sm uppercase font-semibold">
                  Urgencia Inmediata
                </span>
              </div>
              <p className="text-body-md text-on-error-container max-w-4xl leading-relaxed">
                Ante síntomas graves, dolor opresivo en el pecho, dificultad
                respiratoria severa, parálisis facial o pérdida del conocimiento,{" "}
                <strong className="font-semibold text-on-error-container">
                  NO espere una respuesta digital ni inicie una consulta por
                  chat
                </strong>
                : diríjase inmediatamente a una guardia física o active el servicio
                de ambulancias.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 w-full lg:w-auto">
            <a
              href="tel:911"
              className="w-full lg:w-auto flex items-center justify-center gap-space-xs bg-error text-on-error text-label-lg px-space-lg py-space-md rounded-xl hover:bg-on-error-container transition-all shadow-md active:scale-98 font-semibold"
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
              <span>Llamar a Emergencias (911 / 107)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
