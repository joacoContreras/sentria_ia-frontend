import {
  Coverage,
  CreateCoverageInput,
  CreateDoctorInput,
  CreateSpecialtyInput,
  Doctor,
  ReferentialIntegrityCheck,
  Specialty,
  UpdateCoverageInput,
  UpdateDoctorInput,
  UpdateSpecialtyInput,
} from "@/types/admin"
import {
  INITIAL_COVERAGES,
  INITIAL_DOCTORS,
  INITIAL_SPECIALTIES,
} from "../data/initial-catalogs"

const STORAGE_KEY = "sentria_catalog_data_v1"
export const CATALOG_UPDATE_EVENT = "sentria_catalog_updated"

interface CatalogStorageData {
  specialties: Specialty[]
  doctors: Doctor[]
  coverages: Coverage[]
}

class CatalogService {
  private specialties: Specialty[] = []
  private doctors: Doctor[] = []
  private coverages: Coverage[] = []
  private isLoaded: boolean = false

  constructor() {
    this.loadFromStorage()
  }

  private loadFromStorage(): void {
    if (typeof window === "undefined") {
      this.specialties = [...INITIAL_SPECIALTIES]
      this.doctors = [...INITIAL_DOCTORS]
      this.coverages = [...INITIAL_COVERAGES]
      this.isLoaded = true
      return
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: CatalogStorageData = JSON.parse(stored)
        this.specialties = parsed.specialties || [...INITIAL_SPECIALTIES]
        this.doctors = parsed.doctors || [...INITIAL_DOCTORS]
        this.coverages = parsed.coverages || [...INITIAL_COVERAGES]
      } else {
        this.specialties = [...INITIAL_SPECIALTIES]
        this.doctors = [...INITIAL_DOCTORS]
        this.coverages = [...INITIAL_COVERAGES]
        this.saveToStorage()
      }
    } catch {
      this.specialties = [...INITIAL_SPECIALTIES]
      this.doctors = [...INITIAL_DOCTORS]
      this.coverages = [...INITIAL_COVERAGES]
    }
    this.isLoaded = true
  }

  private saveToStorage(): void {
    if (typeof window === "undefined") return
    try {
      const payload: CatalogStorageData = {
        specialties: this.specialties,
        doctors: this.doctors,
        coverages: this.coverages,
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
      window.dispatchEvent(
        new CustomEvent(CATALOG_UPDATE_EVENT, { detail: payload })
      )
    } catch (e) {
      console.warn("No se pudo persistir el catálogo en localStorage", e)
    }
  }

  private ensureLoaded(): void {
    if (!this.isLoaded && typeof window !== "undefined") {
      this.loadFromStorage()
    }
  }

  // ==========================================
  // CA1: GESTIÓN DE ESPECIALIDADES MÉDICAS
  // ==========================================

  getSpecialties(): Specialty[] {
    this.ensureLoaded()
    return [...this.specialties]
  }

  getActiveSpecialties(): Specialty[] {
    this.ensureLoaded()
    return this.specialties.filter((s) => s.isActive)
  }

  getSpecialtyById(id: string): Specialty | undefined {
    this.ensureLoaded()
    return this.specialties.find((s) => s.id === id)
  }

  createSpecialty(input: CreateSpecialtyInput): Specialty {
    this.ensureLoaded()
    const trimmedName = input.name.trim()
    if (!trimmedName) {
      throw new Error("El nombre de la especialidad es obligatorio.")
    }

    const existing = this.specialties.find(
      (s) => s.name.toLowerCase() === trimmedName.toLowerCase()
    )
    if (existing) {
      throw new Error(`Ya existe una especialidad con el nombre '${trimmedName}'.`)
    }

    const slug =
      trimmedName
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || `esp-${Date.now()}`

    const now = new Date().toISOString()
    const newSpecialty: Specialty = {
      id: slug,
      name: trimmedName,
      description: input.description?.trim() || `Especialidad clínica de ${trimmedName}.`,
      isActive: input.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    }

    this.specialties.push(newSpecialty)
    this.saveToStorage()
    return newSpecialty
  }

  updateSpecialty(id: string, input: UpdateSpecialtyInput): Specialty {
    this.ensureLoaded()
    const index = this.specialties.findIndex((s) => s.id === id)
    if (index === -1) {
      throw new Error("Especialidad no encontrada.")
    }

    const current = this.specialties[index]
    const trimmedName = input.name !== undefined ? input.name.trim() : current.name
    if (!trimmedName) {
      throw new Error("El nombre de la especialidad no puede quedar vacío.")
    }

    if (input.name && trimmedName.toLowerCase() !== current.name.toLowerCase()) {
      const duplicate = this.specialties.find(
        (s) => s.id !== id && s.name.toLowerCase() === trimmedName.toLowerCase()
      )
      if (duplicate) {
        throw new Error(`Ya existe otra especialidad con el nombre '${trimmedName}'.`)
      }
    }

    const updated: Specialty = {
      ...current,
      name: trimmedName,
      description: input.description !== undefined ? input.description.trim() : current.description,
      isActive: input.isActive !== undefined ? input.isActive : current.isActive,
      updatedAt: new Date().toISOString(),
    }

    // Si cambió el nombre, actualizar en cascada el nombre de especialidad en los médicos asociados
    if (current.name !== updated.name) {
      this.doctors = this.doctors.map((doc) => {
        if (doc.specialtyId === id) {
          return { ...doc, specialtyName: updated.name, updatedAt: new Date().toISOString() }
        }
        return doc
      })
    }

    this.specialties[index] = updated
    this.saveToStorage()
    return updated
  }

  /**
   * Valida la regla RNF-02:
   * No se debe permitir eliminar una especialidad si existen profesionales activos vinculados a ella.
   */
  canDeleteSpecialty(id: string): ReferentialIntegrityCheck {
    this.ensureLoaded()
    const specialty = this.specialties.find((s) => s.id === id)
    if (!specialty) {
      return { canDelete: true, activeDoctorsCount: 0, activeDoctors: [] }
    }

    const activeLinkedDoctors = this.doctors.filter(
      (doc) => (doc.specialtyId === id || doc.specialtyName.toLowerCase() === specialty.name.toLowerCase()) && doc.isActive
    )

    if (activeLinkedDoctors.length > 0) {
      return {
        canDelete: false,
        activeDoctorsCount: activeLinkedDoctors.length,
        activeDoctors: activeLinkedDoctors,
        message: `No se puede eliminar la especialidad '${specialty.name}' porque existen ${activeLinkedDoctors.length} profesional(es) activo(s) vinculado(s) a ella (RNF-02). Debe reasignar o dar de baja a los profesionales antes de borrar la especialidad.`,
      }
    }

    return {
      canDelete: true,
      activeDoctorsCount: 0,
      activeDoctors: [],
    }
  }

  deleteSpecialty(id: string): void {
    this.ensureLoaded()
    const check = this.canDeleteSpecialty(id)
    if (!check.canDelete) {
      throw new Error(check.message)
    }

    const index = this.specialties.findIndex((s) => s.id === id)
    if (index === -1) {
      throw new Error("Especialidad no encontrada.")
    }

    this.specialties.splice(index, 1)
    this.saveToStorage()
  }

  toggleSpecialtyStatus(id: string): Specialty {
    this.ensureLoaded()
    const specialty = this.getSpecialtyById(id)
    if (!specialty) throw new Error("Especialidad no encontrada.")
    return this.updateSpecialty(id, { isActive: !specialty.isActive })
  }

  // ==========================================
  // CA2: GESTIÓN DE PROFESIONALES MÉDICOS
  // ==========================================

  getDoctors(): Doctor[] {
    this.ensureLoaded()
    return [...this.doctors]
  }

  getActiveDoctors(specialtyIdOrName?: string): Doctor[] {
    this.ensureLoaded()
    const active = this.doctors.filter((d) => d.isActive)
    if (!specialtyIdOrName || specialtyIdOrName === "all") {
      return active
    }
    return active.filter(
      (d) =>
        d.specialtyId === specialtyIdOrName ||
        d.specialtyName.toLowerCase() === specialtyIdOrName.toLowerCase()
    )
  }

  getDoctorById(id: string): Doctor | undefined {
    this.ensureLoaded()
    return this.doctors.find((d) => d.id === id)
  }

  isLicenseUnique(license: string, excludeDoctorId?: string): boolean {
    this.ensureLoaded()
    const normalized = license.trim().toLowerCase()
    return !this.doctors.some(
      (d) => d.id !== excludeDoctorId && d.license.trim().toLowerCase() === normalized
    )
  }

  createDoctor(input: CreateDoctorInput): Doctor {
    this.ensureLoaded()
    const fullName = input.fullName.trim()
    const license = input.license.trim()
    const specialtyId = input.specialtyId.trim()

    if (!fullName) {
      throw new Error("El nombre completo del profesional es obligatorio.")
    }
    if (!license) {
      throw new Error("El número de matrícula es obligatorio.")
    }
    if (!specialtyId) {
      throw new Error("Debe seleccionar una especialidad asociada.")
    }

    if (!this.isLicenseUnique(license)) {
      throw new Error(`La matrícula '${license}' ya se encuentra registrada para otro profesional.`)
    }

    const specialty = this.getSpecialtyById(specialtyId)
    const specialtyName = specialty ? specialty.name : specialtyId

    const now = new Date().toISOString()
    const id = `doc-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`

    const newDoctor: Doctor = {
      id,
      fullName,
      license,
      specialtyId,
      specialtyName,
      isActive: input.isActive ?? true,
      email: input.email?.trim() || undefined,
      phone: input.phone?.trim() || undefined,
      subtitle: input.subtitle?.trim() || `Especialista en ${specialtyName}`,
      acceptedCoverages: input.acceptedCoverages || ["all"],
      createdAt: now,
      updatedAt: now,
    }

    this.doctors.push(newDoctor)
    this.saveToStorage()
    return newDoctor
  }

  updateDoctor(id: string, input: UpdateDoctorInput): Doctor {
    this.ensureLoaded()
    const index = this.doctors.findIndex((d) => d.id === id)
    if (index === -1) {
      throw new Error("Profesional no encontrado.")
    }

    const current = this.doctors[index]
    const fullName = input.fullName !== undefined ? input.fullName.trim() : current.fullName
    const license = input.license !== undefined ? input.license.trim() : current.license
    const specialtyId = input.specialtyId !== undefined ? input.specialtyId.trim() : current.specialtyId

    if (!fullName) throw new Error("El nombre completo es obligatorio.")
    if (!license) throw new Error("La matrícula es obligatoria.")
    if (!specialtyId) throw new Error("La especialidad es obligatoria.")

    if (license.toLowerCase() !== current.license.toLowerCase() && !this.isLicenseUnique(license, id)) {
      throw new Error(`La matrícula '${license}' ya está registrada para otro profesional.`)
    }

    let specialtyName = current.specialtyName
    if (specialtyId !== current.specialtyId) {
      const spec = this.getSpecialtyById(specialtyId)
      specialtyName = spec ? spec.name : specialtyId
    }

    const updated: Doctor = {
      ...current,
      fullName,
      license,
      specialtyId,
      specialtyName,
      isActive: input.isActive !== undefined ? input.isActive : current.isActive,
      email: input.email !== undefined ? input.email.trim() : current.email,
      phone: input.phone !== undefined ? input.phone.trim() : current.phone,
      subtitle: input.subtitle !== undefined ? input.subtitle.trim() : current.subtitle,
      acceptedCoverages: input.acceptedCoverages !== undefined ? input.acceptedCoverages : current.acceptedCoverages,
      updatedAt: new Date().toISOString(),
    }

    this.doctors[index] = updated
    this.saveToStorage()
    return updated
  }

  /**
   * Baja lógica de profesional (RNF-02):
   * Se marca con isActive = false para preservar el historial de turnos pasados
   * sin romper relaciones en la base de datos relacional.
   */
  deactivateDoctor(id: string): Doctor {
    return this.updateDoctor(id, { isActive: false })
  }

  activateDoctor(id: string): Doctor {
    return this.updateDoctor(id, { isActive: true })
  }

  toggleDoctorStatus(id: string): Doctor {
    this.ensureLoaded()
    const doctor = this.getDoctorById(id)
    if (!doctor) throw new Error("Profesional no encontrado.")
    return this.updateDoctor(id, { isActive: !doctor.isActive })
  }

  // ==========================================
  // CA3: GESTIÓN DE OBRAS SOCIALES / PREPAGAS
  // ==========================================

  getCoverages(): Coverage[] {
    this.ensureLoaded()
    return [...this.coverages]
  }

  getActiveCoverages(): Coverage[] {
    this.ensureLoaded()
    return this.coverages.filter((c) => c.isActive)
  }

  getCoverageById(id: string): Coverage | undefined {
    this.ensureLoaded()
    return this.coverages.find((c) => c.id === id)
  }

  createCoverage(input: CreateCoverageInput): Coverage {
    this.ensureLoaded()
    const name = input.name.trim()
    if (!name) {
      throw new Error("El nombre de la cobertura u obra social es obligatorio.")
    }

    const existing = this.coverages.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    )
    if (existing) {
      throw new Error(`La cobertura '${name}' ya se encuentra registrada.`)
    }

    const id =
      `cov-${name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")}` || `cov-${Date.now()}`

    const now = new Date().toISOString()
    const newCoverage: Coverage = {
      id,
      name,
      type: input.type,
      plans: input.plans.length > 0 ? input.plans : ["Plan Estándar"],
      isActive: input.isActive ?? true,
      associatedSpecialties: input.associatedSpecialties || ["all"],
      associatedDoctors: input.associatedDoctors || ["all"],
      requiresCopay: input.requiresCopay ?? false,
      requiresAuthorization: input.requiresAuthorization ?? false,
      notes: input.notes?.trim() || undefined,
      createdAt: now,
      updatedAt: now,
    }

    this.coverages.push(newCoverage)
    this.saveToStorage()
    return newCoverage
  }

  updateCoverage(id: string, input: UpdateCoverageInput): Coverage {
    this.ensureLoaded()
    const index = this.coverages.findIndex((c) => c.id === id)
    if (index === -1) {
      throw new Error("Cobertura no encontrada.")
    }

    const current = this.coverages[index]
    const name = input.name !== undefined ? input.name.trim() : current.name
    if (!name) throw new Error("El nombre de la cobertura no puede estar vacío.")

    if (name.toLowerCase() !== current.name.toLowerCase()) {
      const duplicate = this.coverages.find(
        (c) => c.id !== id && c.name.toLowerCase() === name.toLowerCase()
      )
      if (duplicate) {
        throw new Error(`Ya existe otra cobertura con el nombre '${name}'.`)
      }
    }

    const updated: Coverage = {
      ...current,
      name,
      type: input.type !== undefined ? input.type : current.type,
      plans: input.plans !== undefined ? input.plans : current.plans,
      isActive: input.isActive !== undefined ? input.isActive : current.isActive,
      associatedSpecialties:
        input.associatedSpecialties !== undefined
          ? input.associatedSpecialties
          : current.associatedSpecialties,
      associatedDoctors:
        input.associatedDoctors !== undefined
          ? input.associatedDoctors
          : current.associatedDoctors,
      requiresCopay: input.requiresCopay !== undefined ? input.requiresCopay : current.requiresCopay,
      requiresAuthorization:
        input.requiresAuthorization !== undefined
          ? input.requiresAuthorization
          : current.requiresAuthorization,
      notes: input.notes !== undefined ? input.notes.trim() : current.notes,
      updatedAt: new Date().toISOString(),
    }

    this.coverages[index] = updated
    this.saveToStorage()
    return updated
  }

  toggleCoverageStatus(id: string): Coverage {
    this.ensureLoaded()
    const coverage = this.getCoverageById(id)
    if (!coverage) throw new Error("Cobertura no encontrada.")
    return this.updateCoverage(id, { isActive: !coverage.isActive })
  }

  deleteCoverage(id: string): void {
    this.ensureLoaded()
    const index = this.coverages.findIndex((c) => c.id === id)
    if (index === -1) throw new Error("Cobertura no encontrada.")
    this.coverages.splice(index, 1)
    this.saveToStorage()
  }

  // ==========================================
  // RESET GENERAL (Para pruebas y soporte demo)
  // ==========================================

  resetToDefaults(): void {
    this.specialties = [...INITIAL_SPECIALTIES]
    this.doctors = [...INITIAL_DOCTORS]
    this.coverages = [...INITIAL_COVERAGES]
    this.saveToStorage()
  }
}

export const catalogService = new CatalogService()
