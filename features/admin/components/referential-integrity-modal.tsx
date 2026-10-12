"use client"

import React, { useEffect, useRef } from "react"
import { X, ShieldAlert, ArrowRight, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Doctor, Specialty } from "@/types/admin"

interface ReferentialIntegrityModalProps {
  isOpen: boolean
  onClose: () => void
  specialty: Specialty | null
  activeDoctors: Doctor[]
  onDeactivateInstead?: (specialtyId: string) => void
}

export function ReferentialIntegrityModal({
  isOpen,
  onClose,
  specialty,
  activeDoctors,
  onDeactivateInstead,
}: ReferentialIntegrityModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !specialty) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="integrity-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="bg-amber-50/70 border-b border-amber-200/60 px-6 py-4.5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              id="integrity-modal-title"
              className="text-base font-bold text-slate-900"
            >
              No es posible eliminar la especialidad
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Existen profesionales médicos activos asignados
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors cursor-pointer"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido explicativo */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-600 leading-relaxed">
            La especialidad <strong className="text-slate-900 font-semibold">{specialty.name}</strong> cuenta con{" "}
            <strong className="text-slate-900 font-semibold">{activeDoctors.length} profesional(es) activo(s)</strong> vinculados en el catálogo institucional.
          </p>

          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-primary" />
              <span>Profesionales vinculados:</span>
            </div>
            <ul className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {activeDoctors.map((doc) => (
                <li
                  key={doc.id}
                  className="text-xs text-slate-800 bg-white px-3 py-2 rounded-lg border border-slate-200/60 flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-900">{doc.fullName}</span>
                  <span className="text-slate-500 font-mono text-[11px]">{doc.license}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-slate-500 leading-relaxed">
            Para eliminar esta especialidad, reasigne previamente a los profesionales a otra área o desactívelos. También puede optar por <strong>desactivar la especialidad</strong> para ocultarla de nuevos agendamientos sin alterar las agendas existentes.
          </p>
        </div>

        {/* Footer con acciones */}
        <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Cerrar
          </Button>

          {onDeactivateInstead && specialty.isActive && (
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={() => {
                onDeactivateInstead(specialty.id)
                onClose()
              }}
              className="w-full sm:w-auto text-white"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Desactivar en su lugar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
