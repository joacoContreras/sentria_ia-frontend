"use client"

import React, { useEffect } from "react"
import { UserX, X, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Doctor } from "@/types/admin"

interface DoctorDeactivateModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (doctorId: string) => void
  doctor: Doctor | null
}

export function DoctorDeactivateModal({
  isOpen,
  onClose,
  onConfirm,
  doctor,
}: DoctorDeactivateModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !doctor) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="deactivate-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-amber-50/70 px-6 py-4.5 border-b border-amber-200/60 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <UserX className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <h3
              id="deactivate-modal-title"
              className="text-base font-bold text-slate-900"
            >
              ¿Desactivar a {doctor.fullName}?
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              El profesional no estará disponible para nuevos turnos
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

        {/* Contenido */}
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm">
              {doctor.fullName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="font-semibold text-slate-900 text-sm">{doctor.fullName}</div>
              <div className="text-xs text-slate-500">
                Matrícula: <span className="font-mono">{doctor.license}</span> • Especialidad: {doctor.specialtyName}
              </div>
            </div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed">
            Al dar de baja a este profesional en la agenda, ya no figurará en la búsqueda de turnos para los pacientes ni en las asignaciones directas.
          </p>

          <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80 text-xs text-slate-700 space-y-2">
            <div className="font-semibold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Consideraciones:</span>
            </div>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600">
              <li>El profesional <strong>no aparecerá en nuevos turnos</strong> ni en las búsquedas asistenciales.</li>
              <li>Se <strong>conservará todo el historial</strong> de consultas y turnos previos asociados al profesional.</li>
              <li>Podrá reactivar su perfil en cualquier momento con un clic.</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50/80 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="danger"
            size="md"
            onClick={() => {
              onConfirm(doctor.id)
              onClose()
            }}
          >
            Desactivar profesional
          </Button>
        </div>
      </div>
    </div>
  )
}
