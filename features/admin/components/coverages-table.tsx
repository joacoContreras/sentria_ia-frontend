"use client"

import React, { useState, useMemo } from "react"
import {
  Shield,
  Plus,
  Search,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Coverage,
  CreateCoverageInput,
  Specialty,
  UpdateCoverageInput,
} from "@/types/admin"
import { catalogService } from "../services/catalog.service"
import { CoverageModal } from "./coverage-modal"

interface CoveragesTableProps {
  coverages: Coverage[]
  specialties: Specialty[]
  doctors?: unknown
  onRefresh: () => void
}

export function CoveragesTable({
  coverages,
  specialties,
  onRefresh,
}: CoveragesTableProps) {
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")

  // Modales
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCoverage, setEditingCoverage] = useState<Coverage | null>(null)
  const [confirmDeleteCoverage, setConfirmDeleteCoverage] = useState<Coverage | null>(null)

  // Filtrado reactivo
  const filteredCoverages = useMemo(() => {
    return coverages.filter((cov) => {
      const q = search.toLowerCase()
      const matchSearch =
        cov.name.toLowerCase().includes(q) ||
        cov.plans.some((p) => p.toLowerCase().includes(q)) ||
        (cov.notes && cov.notes.toLowerCase().includes(q))

      const matchType = typeFilter === "all" ? true : cov.type === typeFilter

      const matchStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
            ? cov.isActive
            : !cov.isActive

      return matchSearch && matchType && matchStatus
    })
  }, [coverages, search, typeFilter, statusFilter])

  const handleOpenCreate = () => {
    setEditingCoverage(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (cov: Coverage) => {
    setEditingCoverage(cov)
    setModalOpen(true)
  }

  const handleSave = (data: CreateCoverageInput | UpdateCoverageInput) => {
    if (editingCoverage) {
      catalogService.updateCoverage(editingCoverage.id, data)
    } else {
      catalogService.createCoverage(data as CreateCoverageInput)
    }
    onRefresh()
  }

  const handleToggleStatus = (cov: Coverage) => {
    catalogService.toggleCoverageStatus(cov.id)
    onRefresh()
  }

  const handleConfirmDelete = () => {
    if (confirmDeleteCoverage) {
      catalogService.deleteCoverage(confirmDeleteCoverage.id)
      setConfirmDeleteCoverage(null)
      onRefresh()
    }
  }

  return (
    <div className="space-y-4">
      {/* Barra de herramientas y filtros */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-3">
          {/* Buscador */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por prepaga, obra social, plan o notas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Filtro por Tipo */}
          <div className="sm:w-52 shrink-0">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value="all">Todos los tipos</option>
              <option value="prepaga">Medicina Prepaga</option>
              <option value="obra_social">Obra Social</option>
              <option value="particular">Particular</option>
            </select>
          </div>

          {/* Filtro por Estado */}
          <div className="flex items-center gap-1.5 shrink-0 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setStatusFilter("all")}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                statusFilter === "all"
                  ? "bg-white text-slate-900 shadow-2xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Todas ({coverages.length})
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
              Habilitadas ({coverages.filter((c) => c.isActive).length})
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
              Deshabilitadas ({coverages.filter((c) => !c.isActive).length})
            </button>
          </div>
        </div>

        {/* Botón Nueva Cobertura */}
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleOpenCreate}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shrink-0 self-end sm:self-auto"
        >
          Nueva Cobertura
        </Button>
      </div>

      {/* Grilla / Tabla de Coberturas */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Entidad / Cobertura</th>
                <th className="py-3.5 px-4">Tipo</th>
                <th className="py-3.5 px-4">Planes Aceptados</th>
                <th className="py-3.5 px-4">Convenios / Especialidades</th>
                <th className="py-3.5 px-4">Condiciones</th>
                <th className="py-3.5 px-4 text-center">Estado</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCoverages.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Shield className="w-8 h-8 text-slate-300" />
                      <p className="font-semibold text-slate-700">No se encontraron coberturas médicas</p>
                      <p className="text-xs text-slate-400">
                        {search ? "Intente con otros términos." : "Comience dando de alta una cobertura médica."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredCoverages.map((cov) => {
                  const typeLabel =
                    cov.type === "prepaga"
                      ? "Prepaga"
                      : cov.type === "obra_social"
                        ? "Obra Social"
                        : "Particular"

                  const specSummary = cov.associatedSpecialties.includes("all")
                    ? "Todas las especialidades"
                    : `${cov.associatedSpecialties.length} especialidades`

                  return (
                    <tr
                      key={cov.id}
                      className={`hover:bg-slate-50/60 transition-colors ${
                        !cov.isActive ? "bg-slate-50/40 opacity-75" : ""
                      }`}
                    >
                      {/* Entidad */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              cov.isActive
                                ? "bg-primary/10 text-primary"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            <Shield className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 block leading-tight">
                              {cov.name}
                            </span>
                            {cov.notes && (
                              <span className="text-[11px] text-slate-500 block max-w-xs truncate">
                                {cov.notes}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Tipo */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                          {typeLabel}
                        </span>
                      </td>

                      {/* Planes */}
                      <td className="py-3.5 px-4 max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {cov.plans.slice(0, 3).map((plan) => (
                            <span
                              key={plan}
                              className="px-2 py-0.5 rounded text-[11px] font-semibold bg-surface-container-low text-primary border border-surface-container"
                            >
                              {plan}
                            </span>
                          ))}
                          {cov.plans.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium text-slate-500 bg-slate-100">
                              +{cov.plans.length - 3}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Especialidades asociadas */}
                      <td className="py-3.5 px-4 text-xs text-slate-700 whitespace-nowrap">
                        <span className="font-medium">{specSummary}</span>
                      </td>

                      {/* Condiciones (Copago / Autorización) */}
                      <td className="py-3.5 px-4 text-xs whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          {cov.requiresCopay ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800">
                              Copago
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                              Sin copago
                            </span>
                          )}

                          {cov.requiresAuthorization && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-800">
                              Autorización previa
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Estado */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(cov)}
                          className="inline-flex items-center gap-1.5 cursor-pointer"
                          title={cov.isActive ? "Deshabilitar convenio" : "Habilitar convenio"}
                        >
                          {cov.isActive ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              Habilitada
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                              <XCircle className="w-3.5 h-3.5 text-slate-400" />
                              Deshabilitada
                            </span>
                          )}
                        </button>
                      </td>

                      {/* Acciones */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(cov)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Editar cobertura"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setConfirmDeleteCoverage(cov)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                            title="Eliminar cobertura"
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

        {/* Footer */}
        <div className="bg-slate-50/60 px-4 py-3 border-t border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {coverages.filter((c) => c.isActive).length} coberturas habilitadas para pacientes.
          </span>
          <span>Mostrando {filteredCoverages.length} de {coverages.length} coberturas</span>
        </div>
      </div>

      {/* Modal de Creación / Edición */}
      <CoverageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        coverage={editingCoverage}
        specialties={specialties}
      />

      {/* Modal de Confirmación de Borrado */}
      {confirmDeleteCoverage && (
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
                <h4 className="font-bold text-base">¿Eliminar cobertura?</h4>
                <p className="text-xs text-slate-500">Removerá la entidad del catálogo institucional</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-6">
              ¿Está seguro de que desea eliminar la cobertura <strong>{confirmDeleteCoverage.name}</strong>? Los pacientes ya registrados conservarán su número de afiliado, pero la opción no estará disponible para nuevos ingresos.
            </p>
            <div className="flex justify-end gap-2.5">
              <Button
                type="button"
                variant="secondary"
                size="md"
                onClick={() => setConfirmDeleteCoverage(null)}
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
