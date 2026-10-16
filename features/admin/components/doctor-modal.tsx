"use client"

import React, { useState, useEffect, useRef } from "react"
import { UserPlus, X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Coverage,
  CreateDoctorInput,
  Doctor,
  Specialty,
  UpdateDoctorInput,
} from "@/types/admin"
import { catalogService } from "../services/catalog.service"

interface DoctorModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: CreateDoctorInput | UpdateDoctorInput) => void
  doctor?: Doctor | null
  specialties: Specialty[]
  coverages: Coverage[]
}

function DoctorForm({
  onClose,
  onSave,
  doctor,
  specialties,
  coverages,
}: {
  onClose: () => void
  onSave: (data: CreateDoctorInput | UpdateDoctorInput) => void
  doctor?: Doctor | null
  specialties: Specialty[]
  coverages: Coverage[]
}) {
  const isEditing = !!doctor

  const [fullName, setFullName] = useState(doctor?.fullName || "")
  const [license, setLicense] = useState(doctor?.license || "")
  const [specialtyId, setSpecialtyId] = useState(
    doctor?.specialtyId || specialties[0]?.id || ""
  )
  const [isActive, setIsActive] = useState(doctor ? doctor.isActive : true)
  const [email, setEmail] = useState(doctor?.email || "")
  const [phone, setPhone] = useState(doctor?.phone || "")
  const [subtitle, setSubtitle] = useState(doctor?.subtitle || "")
  const [selectedCoverages, setSelectedCoverages] = useState<string[]>(
    doctor?.acceptedCoverages || ["all"]
  )
  const [errors, setErrors] = useState<Record<string, string>>({})

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!fullName.trim()) {
      newErrors.fullName = "El nombre completo del profesional es obligatorio."
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = "Ingrese un nombre válido (mínimo 3 caracteres)."
    }

    if (!license.trim()) {
      newErrors.license = "El número de matrícula (M.N. o M.P.) es obligatorio."
    } else {
      const isUnique = catalogService.isLicenseUnique(
        license.trim(),
        doctor ? doctor.id : undefined
      )
      if (!isUnique) {
        newErrors.license = "Esta matrícula ya está registrada para otro profesional (debe ser única)."
      }
    }

    if (!specialtyId) {
      newErrors.specialtyId = "Debe asociar una especialidad médica al profesional."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      onSave({
        fullName: fullName.trim(),
        license: license.trim(),
        specialtyId,
        isActive,
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
        subtitle: subtitle.trim() || undefined,
        acceptedCoverages: selectedCoverages,
      })
      onClose()
    } catch (err) {
      setErrors({
        general: err instanceof Error ? err.message : "Error al guardar profesional",
      })
    }
  }

  const toggleCoverageSelection = (covName: string) => {
    if (covName === "all") {
      setSelectedCoverages(["all"])
      return
    }

    let next = selectedCoverages.filter((c) => c !== "all")
    if (next.includes(covName)) {
      next = next.filter((c) => c !== covName)
      if (next.length === 0) next = ["all"]
    } else {
      next.push(covName)
    }
    setSelectedCoverages(next)
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
            <UserPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 id="doctor-modal-title" className="text-base font-bold text-slate-900">
              {isEditing ? "Editar Profesional Médico" : "Alta de Profesional Médico"}
            </h3>
            <p className="text-xs text-slate-500">
              {isEditing ? `Matrícula: ${doctor?.license}` : "Registro en el catálogo asistencial de Sentria AI"}
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
          {errors.general && (
            <div className="p-3 rounded-xl bg-error/10 border border-error/20 text-xs font-medium text-error">
              {errors.general}
            </div>
          )}

          {/* Nombre Completo (Obligatorio) */}
          <Input
            label="Nombre Completo del Profesional"
            placeholder="ej. Dr. Alejandro Rossi o Dra. Silvina Katz"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value)
              if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }))
            }}
            error={errors.fullName}
            required
            autoFocus
          />

          {/* Matrícula (Obligatorio y Único) y Especialidad (Obligatorio) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Número de Matrícula (Única)"
              placeholder="ej. M.N. 104.892"
              value={license}
              onChange={(e) => {
                setLicense(e.target.value)
                if (errors.license) setErrors((prev) => ({ ...prev, license: "" }))
              }}
              error={errors.license}
              helperText="Número de matrícula nacional o provincial único"
              required
            />

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="doctor-specialty"
                className="text-xs font-semibold text-slate-600 tracking-wide uppercase"
              >
                Especialidad Asociada <span className="text-error font-bold">*</span>
              </label>
              <select
                id="doctor-specialty"
                value={specialtyId}
                onChange={(e) => {
                  setSpecialtyId(e.target.value)
                  if (errors.specialtyId) setErrors((prev) => ({ ...prev, specialtyId: "" }))
                }}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                required
              >
                <option value="" disabled>
                  Seleccione una especialidad...
                </option>
                {specialties.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} {!s.isActive ? "(Inactiva)" : ""}
                  </option>
                ))}
              </select>
              {errors.specialtyId && (
                <span className="text-xs text-error font-medium">{errors.specialtyId}</span>
              )}
            </div>
          </div>

          {/* Subtítulo / Ficha clínica */}
          <Input
            label="Subtítulo / Perfil Clínico (Opcional)"
            placeholder="ej. Especialista en Arritmias y Miocardio • Valoración 4.9/5"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            helperText="Información clínica que verán los pacientes en el buscador de turnos"
          />

          {/* Email y Teléfono */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Correo Electrónico Asistencial"
              type="email"
              placeholder="profesional@sentria.med.ar"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Teléfono / Interno"
              placeholder="+54 11 4821 0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Coberturas Aceptadas */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
              Coberturas y Prepagas Aceptadas
            </label>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={() => toggleCoverageSelection("all")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                  selectedCoverages.includes("all")
                    ? "bg-primary text-white border-primary shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                Todas las Coberturas
              </button>
              {coverages.map((cov) => {
                const isSelected =
                  !selectedCoverages.includes("all") &&
                  selectedCoverages.includes(cov.name)
                return (
                  <button
                    key={cov.id}
                    type="button"
                    onClick={() => toggleCoverageSelection(cov.name)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-xs"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {cov.name}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Estado Activo / Inactivo (Obligatorio) */}
          <div className="pt-2">
            <label className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-slate-900">
                  Estado Operativo del Profesional
                </span>
                <span className="text-xs text-slate-500">
                  {isActive
                    ? "Activo: Visible para agenda y turnos de pacientes en el portal y bot."
                    : "Inactivo: Baja lógica (preserva historial clínico sin turnos futuros)."}
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
            {isEditing ? "Guardar Profesional" : "Dar de Alta"}
          </Button>
        </div>
      </form>
    </div>
  )
}

export function DoctorModal({
  isOpen,
  onClose,
  onSave,
  doctor,
  specialties,
  coverages,
}: DoctorModalProps) {
  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="doctor-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 overflow-y-auto"
    >
      <DoctorForm
        key={doctor ? doctor.id : "new-doctor"}
        onClose={onClose}
        onSave={onSave}
        doctor={doctor}
        specialties={specialties}
        coverages={coverages}
      />
    </div>
  )
}
