"use client"

import React from "react"
import { CheckCircle2, UserX, Save } from "lucide-react"

interface SettingsActionFooterProps {
  showSaveSuccess: boolean
  isSaving: boolean
  onCancel: () => void
  onSave: () => void
  onDeactivateAccount: () => void
}

export function SettingsActionFooter({
  showSaveSuccess,
  isSaving,
  onCancel,
  onSave,
  onDeactivateAccount,
}: SettingsActionFooterProps) {
  return (
    <>
      {/* Save Feedback Banner (Accessible Toast/Status) */}
      {showSaveSuccess && (
        <div
          aria-live="polite"
          role="status"
          id="save-status-msg"
          className="flex items-center justify-between p-space-md rounded-xl bg-primary-fixed text-on-primary-fixed-variant transition-all shadow-md animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-primary fill-primary-fixed text-primary" aria-hidden="true" />
            <span className="font-body-md-medium text-body-md-medium font-semibold">
              ¡Cambios guardados con éxito en la plataforma clínica!
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-slate-600 font-medium">
            Sincronizado
          </span>
        </div>
      )}

      {/* Sticky Bottom Actions Bar */}
      <footer className="sticky bottom-4 z-40 bg-surface-container-lowest/95 backdrop-blur-md rounded-2xl p-space-md shadow-xl border border-surface-container/60 flex flex-col sm:flex-row items-center justify-between gap-space-md">
        {/* Danger Area Link */}
        <div className="flex items-center gap-space-md order-2 sm:order-1">
          <button
            type="button"
            onClick={onDeactivateAccount}
            className="text-error hover:text-red-700 font-label-md text-label-md flex items-center gap-1.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error rounded-lg p-1.5 cursor-pointer font-medium"
          >
            <UserX className="h-4 w-4" aria-hidden="true" />
            <span>Desactivar cuenta temporalmente</span>
          </button>
        </div>

        {/* Primary / Secondary CTAs */}
        <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end order-1 sm:order-2">
          <button
            type="button"
            onClick={onCancel}
            className="h-12 px-space-xl bg-surface-container hover:bg-surface-container-high text-slate-700 font-label-lg text-label-lg rounded-xl transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 cursor-pointer font-medium"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="h-12 px-space-2xl bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-xl transition-all shadow-md flex items-center justify-center gap-space-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-98 cursor-pointer font-semibold disabled:opacity-50"
          >
            <Save className="h-5 w-5" aria-hidden="true" />
            <span>{isSaving ? "Guardando..." : "Guardar Cambios"}</span>
          </button>
        </div>
      </footer>
    </>
  )
}
