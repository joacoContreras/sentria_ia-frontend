"use client"

import React, { useState, useMemo } from "react"
import {
  User,
  Plus,
  Search,
  CheckCircle2,
  Edit2,
  UserX,
  UserCheck,
  Stethoscope,
  CreditCard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Coverage, CreateDoctorInput, Doctor, Specialty, UpdateDoctorInput } from "@/types/admin"
import { catalogService } from "../services/catalog.service"
import { DoctorModal } from "./doctor-modal"
import { DoctorDeactivateModal } from "./doctor-deactivate-modal"

interface DoctorsTableProps {
  doctors: Doctor[]
  specialties: Specialty[]
  coverages: Coverage[]
  onRefresh: () => void
}

export function DoctorsTable({
  doctors,
  specialties,
  coverages,
  onRefresh,
}: DoctorsTableProps) {
  const [search, setSearch] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")

  // Modales
  const [modalOpen, setModalOpen] = useState(false)
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null)
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false)
  const [doctorToDeactivate, setDoctorToDeactivate] = useState<Doctor | null>(null)

  // Filtrado reactivo por nombre, matrícula o especialidad
  const filteredDoctors = useMemo(() => {
    return doctors.filter((doc) => {
      const q = search.toLowerCase()
      const matchSearch =
        doc.fullName.toLowerCase().includes(q) ||
        doc.license.toLowerCase().includes(q) ||
        doc.specialtyName.toLowerCase().includes(q)

      const matchSpecialty =
        specialtyFilter === "all"
          ? true
          : doc.specialtyId === specialtyFilter ||
            doc.specialtyName.toLowerCase() === specialtyFilter.toLowerCase()

      const matchStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "active"
            ? doc.isActive
            : !doc.isActive

      return matchSearch && matchSpecialty && matchStatus
    })
  }, [doctors, search, specialtyFilter, statusFilter])

  const handleOpenCreate = () => {
    setEditingDoctor(null)
    setModalOpen(true)
  }

  const handleOpenEdit = (doc: Doctor) => {
    setEditingDoctor(doc)
    setModalOpen(true)
  }

  const handleSave = (data: CreateDoctorInput | UpdateDoctorInput) => {
    if (editingDoctor) {
      catalogService.updateDoctor(editingDoctor.id, data)
    } else {
      catalogService.createDoctor(data as CreateDoctorInput)
    }
    onRefresh()
  }

  const handleDeactivateClick = (doc: Doctor) => {
    setDoctorToDeactivate(doc)
    setDeactivateModalOpen(true)
  }

  const handleConfirmDeactivate = (doctorId: string) => {
    catalogService.deactivateDoctor(doctorId)
    onRefresh()
  }

  const handleReactivate = (doc: Doctor) => {
    catalogService.activateDoctor(doc.id)
    onRefresh()
  }

  return (
    <div className="space-y-4">
      {/* Barra de herramientas y filtros superiores */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex flex-col sm:flex-row flex-1 items-stretch sm:items-center gap-3">
          {/* Buscador por Nombre, Matrícula o Especialidad */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre, matrícula (M.N.) o especialidad..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* Filtro por Especialidad */}
          <div className="sm:w-56 shrink-0">
            <select
              value={specialtyFilter}
              onChange={(e) => setSpecialtyFilter(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-700 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            >
              <option value="all">Todas las especialidades</option>
              {specialties.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Estado (Todos, Activo, Inactivo) */}
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
              Todos ({doctors.length})
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
              Activos ({doctors.filter((d) => d.isActive).length})
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
              Inactivos ({doctors.filter((d) => !d.isActive).length})
            </button>
          </div>
        </div>

        {/* Botón Alta de Profesional */}
        <Button
          type="button"
          variant="primary"
          size="md"
          onClick={handleOpenCreate}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shrink-0 self-end sm:self-auto"
        >
          Nuevo Profesional
        </Button>
      </div>

      {/* Tabla de Profesionales Médicos */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 text-xs font-semibold uppercase tracking-wider">
                <th className="py-3.5 px-4">Profesional Médico</th>
                <th className="py-3.5 px-4">Matrícula (Única)</th>
                <th className="py-3.5 px-4">Especialidad</th>
                <th className="py-3.5 px-4">Coberturas Aceptadas</th>
                <th className="py-3.5 px-4 text-center">Estado Operativo</th>
                <th className="py-3.5 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDoctors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <User className="w-8 h-8 text-slate-300" />
                      <p className="font-semibold text-slate-700">No se encontraron profesionales médicos</p>
                      <p className="text-xs text-slate-400">
                        {search || specialtyFilter !== "all"
                          ? "Intente ajustando los filtros de búsqueda."
                          : "Comience dando de alta a un profesional médico."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredDoctors.map((doc) => {
                  const coveragesSummary =
                    doc.acceptedCoverages?.includes("all")
                      ? "Todas las coberturas"
                      : doc.acceptedCoverages && doc.acceptedCoverages.length > 0
                        ? doc.acceptedCoverages.join(", ")
                        : "Particular únicamente"

                  return (
                    <tr
                      key={doc.id}
                      className={`hover:bg-slate-50/60 transition-colors ${
                        !doc.isActive ? "bg-slate-50/40 opacity-80" : ""
                      }`}
                    >
                      {/* Profesional */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                              doc.isActive
                                ? "bg-primary text-white shadow-2xs"
                                : "bg-slate-200 text-slate-500"
                            }`}
                          >
                            {doc.fullName.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-900 block leading-tight">
                              {doc.fullName}
                            </span>
                            <span className="text-xs text-slate-500 block max-w-xs truncate">
                              {doc.subtitle || doc.email || "Atención en consultorio y teleconsulta"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Matrícula (Única) */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-200">
                          {doc.license}
                        </span>
                      </td>

                      {/* Especialidad */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-800 bg-surface-container-low px-2.5 py-1 rounded-lg border border-surface-container">
                          <Stethoscope className="w-3.5 h-3.5 text-primary" />
                          {doc.specialtyName}
                        </span>
                      </td>

                      {/* Coberturas Aceptadas */}
                      <td className="py-3.5 px-4 max-w-xs text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 truncate" title={coveragesSummary}>
                          <CreditCard className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="truncate">{coveragesSummary}</span>
                        </div>
                      </td>

                      {/* Estado Operativo */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        {doc.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Activo
                          </span>
                        ) : (
                          <span
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600"
                            title="Profesional inactivo en agenda"
                          >
                            Inactivo
                          </span>
                        )}
                      </td>

                      {/* Acciones */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1">
                          {/* Editar */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(doc)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-100 transition-colors cursor-pointer"
                            title="Editar profesional"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>

                          {/* Desactivar o Reactivar */}
                          {doc.isActive ? (
                            <button
                              type="button"
                              onClick={() => handleDeactivateClick(doc)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-800 hover:bg-amber-50 transition-colors cursor-pointer"
                              title="Desactivar profesional"
                            >
                              <UserX className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleReactivate(doc)}
                              className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                              title="Reactivar profesional en agenda"
                            >
                              <UserCheck className="w-4 h-4" />
                            </button>
                          )}
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
        <div className="bg-slate-50/60 px-4 py-3 border-t border-slate-200/80 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            {doctors.filter((d) => d.isActive).length} profesionales activos disponibles para reserva de turnos.
          </span>
          <span>Mostrando {filteredDoctors.length} de {doctors.length} profesionales</span>
        </div>
      </div>

      {/* Modal de Creación / Edición */}
      <DoctorModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        doctor={editingDoctor}
        specialties={specialties}
        coverages={coverages}
      />

      {/* Modal de Confirmación de Baja Lógica */}
      <DoctorDeactivateModal
        isOpen={deactivateModalOpen}
        onClose={() => setDeactivateModalOpen(false)}
        onConfirm={handleConfirmDeactivate}
        doctor={doctorToDeactivate}
      />
    </div>
  )
}
