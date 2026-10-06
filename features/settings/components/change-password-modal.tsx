"use client"

import React, { useState } from "react"
import { KeyRound, X, CheckCircle2 } from "lucide-react"

interface ChangePasswordModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function ChangePasswordModal({
  isOpen,
  onClose,
  onSuccess,
}: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Por favor completa todos los campos.")
      return
    }

    if (newPassword.length < 8) {
      setError("La nueva contraseña debe tener al menos 8 caracteres.")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas nuevas no coinciden.")
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      onSuccess()
      onClose()
    }, 600)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-space-xl shadow-2xl border border-surface-container relative animate-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-password-title"
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
          <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <KeyRound className="h-6 w-6" />
          </div>
          <div>
            <h3 id="modal-password-title" className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Cambiar Contraseña
            </h3>
            <p className="font-body-md text-body-md text-slate-500">
              Actualiza tus credenciales de acceso seguro.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-error-container/40 text-on-error-container text-xs font-medium border border-error/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-slate-800 font-medium" htmlFor="current-pwd">
              Contraseña actual
            </label>
            <input
              id="current-pwd"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-xl font-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-slate-800 font-medium" htmlFor="new-pwd">
              Nueva contraseña
            </label>
            <input
              id="new-pwd"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-xl font-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              placeholder="Mínimo 8 caracteres"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-slate-800 font-medium" htmlFor="confirm-pwd">
              Confirmar nueva contraseña
            </label>
            <input
              id="confirm-pwd"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-xl font-body-md text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
              placeholder="Repite la nueva contraseña"
              required
            />
          </div>

          <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-surface-container">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-xl text-slate-600 hover:bg-surface-container text-sm font-medium transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 px-5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold shadow-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>{isSubmitting ? "Actualizando..." : "Guardar contraseña"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
