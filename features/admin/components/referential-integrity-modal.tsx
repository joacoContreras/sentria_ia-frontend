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
        className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-error/30 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
      >
        {/* Header con alerta RNF-02 */}
        <div className="bg-error/10 border-b border-error/20 px-6 py-4 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-error/20 text-error flex items-center justify-center shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-error text-white">
                RNF-02
              </span>
              <span className="text-xs font-semibold text-error">
                Integridad Referencial Protegida
              </span>
            </div>
            <h3
              id="integrity-modal-title"
              className="text-lg font-bold text-slate-900 mt-1"
            >
              No se puede eliminar la especialidad
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 rounded-lg p-1 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido explicativo */}
        <div className="p-6 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            La especialidad <strong className="text-slate-900 font-semibold">{specialty.name}</strong> tiene{" "}
            <strong className="text-error font-bold">{activeDoctors.length} profesional(es) médico(s) activo(s)</strong>{" "}
            vinculado(s) actualmente a ella en el catálogo institucional.
          </p>

          <div className="bg-surface-container-low rounded-xl p-3.5 border border-surface-container">
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-primary" />
              Profesionales activos vinculados:
            </div>
            <ul className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
              {activeDoctors.map((doc) => (
                <li
                  key={doc.id}
                  className="text-xs text-slate-800 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/60 flex items-center justify-between"
                >
                  <span className="font-semibold text-slate-900">{doc.fullName}</span>
                  <span className="text-slate-500 font-mono text-[11px]">{doc.license}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <strong>Requisito RNF-02:</strong> Para preservar la coherencia del sistema y evitar profesionales huérfanos o inconsistencias en turnos, debe reasignar a los médicos a otra especialidad o darles la baja lógica antes de eliminar la categoría. Alternativamente, puede <strong>desactivar</strong> la especialidad para ocultarla de nuevos agendamientos.
          </div>
        </div>

        {/* Footer con acciones alternativas */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Entendido, cancelar borrado
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
              className="w-full sm:w-auto"
              leftIcon={<ArrowRight className="w-4 h-4" />}
            >
              Desactivar en su lugar
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
