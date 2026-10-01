"use client"

import React from "react"
import { PortalSection } from "@/types/appointments"

interface PortalFooterProps {
  onSelectSection?: (section: PortalSection) => void
}

export function PortalFooter({ onSelectSection }: PortalFooterProps) {
  const handleNav = (section: PortalSection) => {
    if (onSelectSection) {
      onSelectSection(section)
    }
  }

  return (
    <footer
      className="w-full bg-surface-container-low mt-space-3xl border-t border-surface-container-high"
      role="contentinfo"
    >
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-2xl">
        <div className="flex flex-wrap items-center justify-center gap-x-space-xl gap-y-space-sm pb-space-lg">
          <button
            type="button"
            onClick={() => handleNav("sede")}
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg cursor-pointer"
          >
            Sede Médica Central
          </button>
          <span aria-hidden="true" className="text-outline select-none">
            •
          </span>
          <button
            type="button"
            onClick={() => handleNav("terminos")}
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg cursor-pointer"
          >
            Términos Clínicos
          </button>
          <span aria-hidden="true" className="text-outline select-none">
            •
          </span>
          <button
            type="button"
            onClick={() => handleNav("privacidad")}
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg cursor-pointer"
          >
            Privacidad Médica
          </button>
          <span aria-hidden="true" className="text-outline select-none">
            •
          </span>
          <button
            type="button"
            onClick={() => handleNav("protocolo")}
            className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg cursor-pointer"
          >
            Protocolo Criptográfico
          </button>
        </div>
        <div className="pt-space-md text-center border-t border-surface-container">
          <p className="font-label-sm text-label-sm text-outline">
            © {new Date().getFullYear()} Sentria AI Health Systems. Cumplimiento
            Estricto de Normativas de Salud y Privacidad Médica.
          </p>
        </div>
      </div>
    </footer>
  )
}
