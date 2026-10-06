"use client"

import React from "react"
import { MapPin, Info, ExternalLink } from "lucide-react"

export function ClinicalSidebar() {
  return (
    <aside
      aria-label="Información de la sede y recordatorios"
      className="lg:col-span-4 flex flex-col gap-space-lg"
      role="complementary"
    >
      {/* Important Notice */}
      <div className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl border border-outline-variant/30 flex flex-col gap-3.5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0 border border-outline-variant/20">
            <Info className="h-4 w-4 text-primary" aria-hidden="true" />
          </div>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Información Importante
          </h3>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          Recuerda presentarte 15 minutos antes de tu cita con DNI vigente y tu
          credencial digital o física.
        </p>
        <div className="pt-3 border-t border-surface-container/60">
          <p className="text-xs text-outline font-medium">
            Liberar turnos con más de 24 hs de anticipación permite reasignar el
            lugar a pacientes que lo necesitan.
          </p>
        </div>
      </div>

      {/* Habitual Venue */}
      <div className="bg-surface-container-lowest p-5 md:p-6 rounded-2xl border border-outline-variant/30 flex flex-col gap-3.5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-surface-container text-primary flex items-center justify-center shrink-0 border border-outline-variant/20">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Sede Habitual
            </h3>
          </div>
          <a
            className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
            href="https://maps.google.com/?q=Av.+Cabildo+1845,+CABA"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Ver en mapa</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
        <div>
          <p className="text-sm font-semibold text-on-surface">
            Sede Central Belgrano
          </p>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Av. Cabildo 1845, CABA
          </p>
        </div>
        <p className="text-xs text-outline font-medium pt-3 border-t border-surface-container/60">
          Estacionamiento para pacientes sobre calle Echeverría.
        </p>
      </div>
    </aside>
  )
}
