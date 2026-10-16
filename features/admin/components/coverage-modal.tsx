"use client"

import React, { useState, useEffect, useRef } from "react"
import { Shield, X, Save, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Coverage,
  CoverageType,
  CreateCoverageInput,
  Specialty,
  UpdateCoverageInput,
} from "@/types/admin"

interface CoverageModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: CreateCoverageInput | UpdateCoverageInput) => void
  coverage?: Coverage | null
  specialties: Specialty[]
}

function CoverageForm({
  onClose,
  onSave,
  coverage,
  specialties,
}: {
  onClose: () => void
  onSave: (data: CreateCoverageInput | UpdateCoverageInput) => void
  coverage?: Coverage | null
  specialties: Specialty[]
}) {
  const isEditing = !!coverage

  const [name, setName] = useState(coverage?.name || "")
  const [type, setType] = useState<CoverageType>(coverage?.type || "prepaga")
  const [plans, setPlans] = useState<string[]>(
    coverage?.plans && coverage.plans.length > 0 ? coverage.plans : ["Plan Estándar"]
  )
  const [newPlanInput, setNewPlanInput] = useState("")
  const [associatedSpecialties, setAssociatedSpecialties] = useState<string[]>(
    coverage?.associatedSpecialties || ["all"]
  )
  const [associatedDoctors] = useState<string[]>(
    coverage?.associatedDoctors || ["all"]
  )
  const [requiresCopay, setRequiresCopay] = useState(coverage?.requiresCopay ?? false)
  const [requiresAuthorization, setRequiresAuthorization] = useState(
    coverage?.requiresAuthorization ?? false
  )
  const [notes, setNotes] = useState(coverage?.notes || "")
  const [isActive, setIsActive] = useState(coverage ? coverage.isActive : true)
  const [error, setError] = useState<string | null>(null)

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const handleAddPlan = () => {
    const trimmed = newPlanInput.trim()
    if (!trimmed) return
    if (plans.includes(trimmed)) {
      setError(`El plan '${trimmed}' ya está en la lista.`)
      return
    }
    setPlans([...plans, trimmed])
    setNewPlanInput("")
    setError(null)
  }

  const handleRemovePlan = (planToRemove: string) => {
    const next = plans.filter((p) => p !== planToRemove)
    setPlans(next.length > 0 ? next : ["Plan Estándar"])
  }

  const toggleSpecialtyAssociation = (specId: string) => {
    if (specId === "all") {
      setAssociatedSpecialties(["all"])
      return
    }
    let next = associatedSpecialties.filter((s) => s !== "all")
    if (next.includes(specId)) {
      next = next.filter((s) => s !== specId)
      if (next.length === 0) next = ["all"]
    } else {
      next.push(specId)
    }
    setAssociatedSpecialties(next)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = name.trim()
    if (!trimmedName) {
      setError("El nombre de la cobertura u obra social es obligatorio.")
      return
    }

    try {
      onSave({
        name: trimmedName,
        type,
        plans: plans.length > 0 ? plans : ["Plan Estándar"],
        associatedSpecialties,
        associatedDoctors,
        requiresCopay,
        requiresAuthorization,
        notes: notes.trim() || undefined,
        isActive,
      })
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar cobertura")
    }
  }

  return (
    <div
      ref={modalRef}
      className="w-full max-w-xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-surface-container overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 my-8"
    >
      {/* Header */}
      <div className="bg-surface-container-low px-6 py-4.5 border-b border-surface-container flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 id="coverage-modal-title" className="text-base font-bold text-slate-900">
              {isEditing ? "Editar Cobertura Médica" : "Nueva Cobertura / Prepaga"}
            </h3>
            <p className="text-xs text-slate-500">
              {isEditing ? `Entidad: ${coverage?.name}` : "Gestión de convenios y planes asistenciales aceptados"}
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
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {error && (
            <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-xs font-medium text-error">
              {error}
            </div>
          )}

          {/* Nombre y Tipo */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nombre de la Entidad"
              placeholder="ej. OSDE, Swiss Medical, Galeno..."
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (error) setError(null)
              }}
              required
              autoFocus
            />

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="coverage-type"
                className="text-xs font-semibold text-slate-600 tracking-wide uppercase"
              >
                Tipo de Cobertura <span className="text-error font-bold">*</span>
              </label>
              <select
                id="coverage-type"
                value={type}
                onChange={(e) => setType(e.target.value as CoverageType)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              >
                <option value="prepaga">Medicina Prepaga Privada</option>
                <option value="obra_social">Obra Social Sindical / Nacional</option>
                <option value="particular">Particular / Sin Cobertura</option>
              </select>
            </div>
          </div>

          {/* Planes Aceptados */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
              Planes Aceptados por Convenio
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="ej. 210, 310, SMG20, Oro 440..."
                value={newPlanInput}
                onChange={(e) => setNewPlanInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleAddPlan()
                  }
                }}
                className="flex-1 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={handleAddPlan}
                leftIcon={<Plus className="w-4 h-4" />}
              >
                Agregar Plan
              </Button>
            </div>

            {/* Lista de chips de planes */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {plans.map((plan) => (
                <span
                  key={plan}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                >
                  {plan}
                  <button
                    type="button"
                    onClick={() => handleRemovePlan(plan)}
                    className="hover:text-error transition-colors"
                    aria-label={`Eliminar plan ${plan}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Especialidades Asociadas bajo Convenio */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
              Especialidades con Cobertura Habilitada
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => toggleSpecialtyAssociation("all")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                  associatedSpecialties.includes("all")
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Todas las Especialidades
              </button>
              {specialties.map((s) => {
                const isSelected =
                  !associatedSpecialties.includes("all") &&
                  associatedSpecialties.includes(s.id)
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => toggleSpecialtyAssociation(s.id)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {s.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Configuración de Copago y Autorizaciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={requiresCopay}
                onChange={(e) => setRequiresCopay(e.target.checked)}
                className="h-4 w-4 rounded text-primary focus:ring-primary cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-900">Requiere Copago</span>
                <span className="text-[11px] text-slate-500">Arancel adicional en consultorio</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
              <input
                type="checkbox"
                checked={requiresAuthorization}
                onChange={(e) => setRequiresAuthorization(e.target.checked)}
                className="h-4 w-4 rounded text-primary focus:ring-primary cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-900">Requiere Autorización</span>
                <span className="text-[11px] text-slate-500">Orden médica visada previa</span>
              </div>
            </label>
          </div>

          {/* Notas operativas */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="coverage-notes"
              className="text-xs font-semibold text-slate-600 tracking-wide uppercase"
            >
              Notas Operativas / Requisitos de Admisión
            </label>
            <textarea
              id="coverage-notes"
              rows={2}
              placeholder="Instrucciones para recepción y respuestas del Bot conversacional..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Estado Habilitado / Deshabilitado */}
          <div className="pt-2">
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">
                  Convenio Habilitado y Vigente
                </span>
                <span className="text-xs text-slate-500">
                  Si se deshabilita, no aparecerá en el registro de pacientes ni en el buscador de turnos.
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
            {isEditing ? "Guardar Cambios" : "Dar de Alta Cobertura"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export function CoverageModal({
  isOpen,
  onClose,
  onSave,
  coverage,
  specialties,
}: CoverageModalProps) {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="coverage-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      <CoverageForm
        key={coverage ? coverage.id : "new-coverage"}
        onClose={onClose}
        onSave={onSave}
        coverage={coverage}
        specialties={specialties}
      />
    </div>
  )
}
