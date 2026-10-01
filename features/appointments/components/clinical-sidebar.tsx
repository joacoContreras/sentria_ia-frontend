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
      <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container-high flex flex-col gap-space-sm shadow-xs">
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-primary shrink-0" />
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
            Información Importante
          </h3>
        </div>
        <p className="font-body-md text-body-md text-slate-700 leading-relaxed">
          Recuerda presentarte 15 minutos antes de tu cita con DNI vigente y tu
          credencial digital o física.
        </p>
        <div className="pt-space-xs border-t border-surface-container">
          <p className="font-label-sm text-label-sm text-slate-600 font-medium">
            Liberar turnos con más de 24 hs de anticipación permite reasignar el
            lugar a pacientes que lo necesitan.
          </p>
        </div>
      </div>

      {/* Habitual Venue */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl border border-surface-container-high flex flex-col gap-space-sm shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary shrink-0" />
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Sede Habitual
            </h3>
          </div>
          <a
            className="font-label-sm text-label-sm text-primary font-semibold hover:underline inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
            href="https://maps.google.com/?q=Av.+Cabildo+1845,+CABA"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span>Ver en mapa</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
        <div>
          <p className="font-body-md-medium text-body-md-medium text-on-surface font-semibold">
            Sede Central Belgrano
          </p>
          <p className="font-body-md text-body-md text-slate-700">
            Av. Cabildo 1845, CABA
          </p>
        </div>
        <p className="font-label-sm text-label-sm text-slate-600 font-medium pt-space-xs border-t border-surface-container">
          Estacionamiento para pacientes sobre calle Echeverría.
        </p>
      </div>
    </aside>
  )
}
