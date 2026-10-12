"use client"

import React, { useState, useMemo } from "react"
import {
  Stethoscope,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Users,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CreateSpecialtyInput, Doctor, Specialty, UpdateSpecialtyInput } from "@/types/admin"
import { catalogService } from "../services/catalog.service"
import { SpecialtyModal } from "./specialty-modal"
import { ReferentialIntegrityModal } from "./referential-integrity-modal"

interface SpecialtiesTableProps {
  specialties: Specialty[]
  doctors: Doctor[]
  onRefresh: () => void
}

export function SpecialtiesTable({
  specialties,
  doctors,
  onRefresh,
}: SpecialtiesTableProps) {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [modalOpen, setModalOpen] = useState(false)
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null)

  // Estado para el modal de integridad referencial RNF-02
  const [integrityModalOpen, setIntegrityModalOpen] = useState(false)
  const [blockedSpecialty, setBlockedSpecialty] = useState<Specialty | null>(null)
  const [linkedDoctors, setLinkedDoctors] = useState<Doctor[]>([])

  // Modal de confirmación de borrado simple (cuando no tiene médicos)
  const [confirmDeleteSpecialty, setConfirmDeleteSpecialty] = useState<Specialty | null>(null)

  // Conteo de médicos activos por especialidad
  const doctorsCountMap = useMemo(() => {
    const map = new Map<string, number>()
    specialties.forEach((s) => {
      const count = doctors.filter(
        (d) =>
          d.isActive &&
          (d.specialtyId === s.id || d.specialtyName.toLowerCase() === s.name.toLowerCase())
      ).length
      map.set(s.id, count)
    })
    return map
  }, [specialties, doctors])

  // Filtrado
  const filteredSpecialties = useMemo(() => {
    return specialties.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase()) ||
        s.id.toLowerCase().includes(search.toLowerCase())

      const matchStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
            ? s.isActive
            : !s.isActive

      return matchSearch && matchStatus
    })
  }, [specialties, search, statusFilter])

  const handleOpenCreate = () => {
    setEditingSpecialty(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (spec: Specialty) => {
    setEditingSpecialty(spec)
    setModalOpen(true)
  }

  const handleSave = (data: CreateSpecialtyInput | UpdateSpecialtyInput) => {
    if (editingSpecialty) {
      catalogService.updateSpecialty(editingSpecialty.id, data)
    } else {
      catalogService.createSpecialty(data as CreateSpecialtyInput)
    }
    onRefresh()
  }

  const handleToggleStatus = (spec: Specialty) => {
    catalogService.toggleSpecialtyStatus(spec.id)
    onRefresh()
  }

  /**
   * Intento de eliminación con verificación estricta de regla RNF-02
   */
  const handleDeleteAttempt = (spec: Specialty) => {
    const check = catalogService.canDeleteSpecialty(spec.id)

    if (!check.canDelete) {
      // Bloquear borrado y mostrar advertencia con lista de profesionales activos
      setBlockedSpecialty(spec)
      setLinkedDoctors(check.activeDoctors)
      setIntegrityModalOpen(true)
    } else {
      // Permitir borrado con confirmación
      setConfirmDeleteSpecialty(spec)
    }
  }

  const handleConfirmDelete = () => {
    if (confirmDeleteSpecialty) {
      catalogService.deleteSpecialty(confirmDeleteSpecialty.id)
      setConfirmDeleteSpecialty(null)
      onRefresh()
    }
  }

  return (
    <div className="space-y-4">
      {/* Barra de herramientas superior */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar especialidad por nombre, código o descripción..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 shrink-0 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                statusFilter === "all"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Todas ({specialties.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("active")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                statusFilter === "active"
                  ? "bg-white text-emerald-800 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Activas ({specialties.filter((s) => s.isActive).length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter("inactive")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                statusFilter === "inactive"
                  ? "bg-white text-slate-700 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Inactivas ({specialties.filter((s) => !s.isActive).length})
            </button>
          </div>
        </div>

        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleOpenCreate}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shrink-0"
        >
          Nueva Especialidad
        </Button>
      </div>

      {/* Tabla de Especialidades */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Especialidad Médica</th>
                <th className="py-3.5 px-4">Código / Slug</th>
                <th className="py-3.5 px-4">Alcance / Descripción</th>
                <th className="py-3.5 px-4 text-center">Médicos Activos</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSpecialties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Stethoscope className="w-8 h-8 text-slate-300" />
                      <p className="font-semibold text-slate-700">No se encontraron especialidades</p>
                      <p className="text-xs text-slate-400">
                        {search ? "Intente con otro término de búsqueda." : "Comience agregando una nueva especialidad."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredSpecialties.map((spec) => {
                  const activeDoctorsCount = doctorsCountMap.get(spec.id) || 0
                  return (
                    <tr
                      key={spec.id}
                      className="hover:bg-slate-50/60 transition-colors group"
                    >
                      {/* Nombre */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              spec.isActive
                                ? "bg-primary/10 text-primary"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            <Stethoscope className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 block leading-tight">
                              {spec.name}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Alta: {new Date(spec.createdAt).toLocaleDateString("es-AR")}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Código */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {spec.id}
                        </span>
                      </td>

                      {/* Descripción */}
                      <td className="py-3.5 px-4 max-w-xs truncate text-xs text-slate-600">
                        {spec.description || "—"}
                      </td>

                      {/* Médicos activos vinculados (RNF-02) */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            activeDoctorsCount > 0
                              ? "bg-primary-container/15 text-primary"
                              : "bg-slate-100 text-slate-500"
                          }`}
                          title={`${activeDoctorsCount} profesionales activos vinculados`}
                        >
                          <Users className="w-3.5 h-3.5" />
                          {activeDoctorsCount} {activeDoctorsCount === 1 ? "médico" : "médicos"}
                        </span>
                      </td>

                      {/* Estado con Toggle interactivo */}
                      <td className="py-3.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(spec)}
                          className="inline-flex items-center gap-1.5 cursor-pointer group/btn"
                          title={spec.isActive ? "Desactivar especialidad" : "Activar especialidad"}
                        >
                          {spec.isActive ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Activa
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                              <XCircle className="w-3.5 h-3.5 text-slate-400" />
                              Inactiva
                            </span>
                          )}
                        </button>
                      </td>

                      {/* Acciones */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(spec)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Editar especialidad"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteAttempt(spec)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                            title={
                              activeDoctorsCount > 0
                                ? "Protegido por RNF-02: existen médicos activos"
                                : "Eliminar especialidad"
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer informativo */}
        <div className="bg-slate-50/60 px-4 py-3 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>
              <strong>Regla RNF-02 activa:</strong> Las especialidades con médicos activos no pueden ser eliminadas directamente.
            </span>
          </div>
          <span>Mostrando {filteredSpecialties.length} de {specialties.length} especialidades</span>
        </div>
      </div>

      {/* Modal de Creación / Edición */}
      <SpecialtyModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        specialty={editingSpecialty}
      />

      {/* Modal de Advertencia RNF-02 */}
      <ReferentialIntegrityModal
        isOpen={integrityModalOpen}
        onClose={() => setIntegrityModalOpen(false)}
        specialty={blockedSpecialty}
        activeDoctors={linkedDoctors}
        onDeactivateInstead={(id) => {
          const s = specialties.find((x) => x.id === id) || blockedSpecialty
          if (s) handleToggleStatus(s)
        }}
      />

      {/* Modal de Confirmación de Borrado Simple */}
      {confirmDeleteSpecialty && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
        >
          <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3 text-slate-900 mb-3">
              <div className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-base">¿Eliminar especialidad?</h4>
                <p className="text-xs text-slate-500">Esta acción removerá la categoría del catálogo</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              ¿Está seguro de que desea eliminar <strong>{confirmDeleteSpecialty.name}</strong>? Esta especialidad no tiene profesionales activos vinculados (cumple RNF-02).
            </p>
            <div className="flex justify-end gap-2.5">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setConfirmDeleteSpecialty(null)}
              >
                Cancelar
              </Button>
              <Button
                type="button"
                variant="danger"
                size="md"
                onClick={handleConfirmDelete}
              >
                Sí, eliminar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
