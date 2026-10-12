"use client"

import React, { useState, useEffect, useRef } from "react"
import { Stethoscope, X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CreateSpecialtyInput, Specialty, UpdateSpecialtyInput } from "@/types/admin"

interface SpecialtyModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: CreateSpecialtyInput | UpdateSpecialtyInput) => void
  specialty?: Specialty | null
}

function SpecialtyForm({
  onClose,
  onSave,
  specialty,
}: {
  onClose: () => void
  onSave: (data: CreateSpecialtyInput | UpdateSpecialtyInput) => void
  specialty?: Specialty | null
}) {
  const isEditing = !!specialty
  const [name, setName] = useState(specialty ? specialty.name : "")
  const [description, setDescription] = useState(specialty?.description || "")
  const [isActive, setIsActive] = useState(specialty ? specialty.isActive : true)
  const [error, setError] = useState<string | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError("El nombre de la especialidad es obligatorio.")
      return
    }

    try {
      onSave({
        name: trimmed,
        description: description.trim(),
        isActive,
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar la especialidad")
    }
  }

  return (
    <div
      ref={modalRef}
      className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
    >
      {/* Header */}
      <div className="bg-surface-container-low px-6 py-4.5 border-b border-surface-container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h3 id="specialty-modal-title" className="text-base font-bold text-slate-900">
              {isEditing ? "Editar Especialidad Médica" : "Nueva Especialidad Médica"}
            </h3>
            <p className="text-xs text-slate-500">
              {isEditing ? `Modificando ID: ${specialty?.id}` : "Catálogo operativo institucional"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 rounded-lg p-1.5 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <div className="p-6 space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-xs font-medium text-error">
              {error}
            </div>
          )}

          <Input
            label="Nombre de la Especialidad"
            placeholder="ej. Cardiología Clínica, Dermatología..."
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (error) setError(null)
            }}
            required
            autoFocus
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="specialty-description"
              className="text-xs font-semibold text-slate-600 tracking-wide uppercase"
            >
              Descripción Clínica / Alcance
            </label>
            <textarea
              id="specialty-description"
              rows={3}
              placeholder="Indique el alcance clínico, patologías que trata o estudios habituales..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <span className="text-[11px] text-slate-500">
              Esta descripción es utilizada por el Bot de IA para orientar a los pacientes.
            </span>
          </div>

          {/* Switch de Estado Activo */}
          <div className="pt-2">
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">
                  Estado Activo en Catálogo
                </span>
                <span className="text-xs text-slate-500">
                  Si está inactiva, no se mostrará para nuevos turnos en el portal ni en el bot.
                </span>
              </div>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="h-5 w-5 rounded text-primary focus:ring-primary cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
          <Button type="button" variant="secondary" size="md" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            leftIcon={<Save className="w-4 h-4" />}
          >
            {isEditing ? "Guardar Cambios" : "Crear Especialidad"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export function SpecialtyModal({
  isOpen,
  onClose,
  onSave,
  specialty,
}: SpecialtyModalProps) {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="specialty-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <SpecialtyForm
        key={specialty ? specialty.id : "new-specialty"}
        onClose={onClose}
        onSave={onSave}
        specialty={specialty}
      />
    </div>
  )
}
