"use client"

import React from "react"
import { AlertTriangle, X, UserX } from "lucide-react"

interface DeactivateAccountModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export function DeactivateAccountModal({
  isOpen,
  onClose,
  onConfirm,
}: DeactivateAccountModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-space-xl shadow-2xl border border-surface-container relative animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-deactivate-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-surface-container transition-colors cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3 mb-space-lg">
          <div className="w-12 h-12 rounded-xl bg-error-container/30 text-error flex items-center justify-center shrink-0">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <div>
            <h3 id="modal-deactivate-title" className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Desactivar Cuenta Temporalmente
            </h3>
            <p className="font-body-md text-body-md text-slate-500">
              Pausa tu acceso al portal del paciente.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container/60 mb-6 text-sm text-slate-600 leading-relaxed space-y-2">
          <p>
            Al desactivar tu cuenta, no recibirás recordatorios automáticos por WhatsApp ni alertas de resultados hasta que vuelvas a iniciar sesión.
          </p>
          <p className="text-xs text-slate-500">
            Tus historias clínicas y recetas emitidas continuarán resguardadas conforme a la Ley 26.529 de Derechos del Paciente.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-surface-container">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-4 rounded-xl text-slate-600 hover:bg-surface-container text-sm font-medium transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm()
              onClose()
            }}
            className="h-10 px-5 rounded-xl bg-error hover:bg-red-700 text-on-error text-sm font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <UserX className="h-4 w-4" />
            <span>Confirmar desactivación</span>
          </button>
        </div>
      </div>
    </div>
  )
}
