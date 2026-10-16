export type AppointmentStatus =
  | "pendiente"
  | "confirmado"
  | "en_curso"
  | "completado"
  | "cancelado"
  | "atendido"

export type AppointmentRule = "gestion_habilitada" | "bloqueado_24h"

export type AppointmentTab = "upcoming" | "history" | "canceled"

export type PortalSection =
  | "turnos"
  | "buscar"
  | "triage"
  | "historial"
  | "ayuda"
  | "sede"
  | "terminos"
  | "privacidad"
  | "protocolo"
  | "configuracion"

export interface Appointment {
  id: string
  userId?: string
  doctorName: string
  doctorLicense?: string
  specialty: string
  appointmentDate: string
  displayDate: string
  displayTime: string
  relativeTime: string
  venue: string
  venueAddress: string
  coverageProvider: string
  coverageStatus: string
  managementDeadline?: string
  rule: AppointmentRule
  status: AppointmentStatus
  isCancelledInSession?: boolean
  cancellationReason?: string
  clinicalNote?: string
  summaryReportAvailable?: boolean
  isNext?: boolean
}

export interface AvailableTimeSlot {
  id: string
  time: string
  period: "morning" | "afternoon"
}

export interface AvailableDateOption {
  id: string
  dateKey: string
  label: string
  dayName: string
  dateMetric: string
  dateDisplay: string
  slotsCount: number
  slots: AvailableTimeSlot[]
}

export interface CancelAppointmentInput {
  appointmentId: string
  reason: string
}

export interface RescheduleAppointmentInput {
  appointmentId: string
  newDate: string
  newTime: string
}

export interface BookAppointmentInput {
  specialty: string
  doctorName: string
  doctorLicense?: string
  venue: string
  venueAddress?: string
  dateDisplay: string
  timeDisplay: string
  coverageProvider: string
  reason?: string
}

export interface ToastNotification {
  id?: string
  title: string
  message: string
  icon?: string
  type?: "success" | "info" | "warning" | "error"
}

export interface TurnoSearchFilters {
  specialty?: string
  doctor?: string
  venue?: string
  dateFrom?: string
  dateTo?: string
  searchQuery?: string
}

export interface AvailableTurnoSlot {
  id: string
  time: string
  period: "morning" | "afternoon"
  date: string // YYYY-MM-DD
  dateDisplay: string // e.g. "Viernes 25 de Octubre"
  doctorName: string
  doctorLicense: string
  doctorSubtitle?: string
  doctorAvatarUrl?: string
  specialty: string
  venue: string
  venueAddress: string
  consultorio: string
  isTeleconsulta?: boolean
}

export interface DoctorSlotGroup {
  doctorName: string
  doctorLicense: string
  doctorSubtitle?: string
  doctorAvatarUrl?: string
  rating?: number
  specialty: string
  venue: string
  venueAddress: string
  consultorio: string
  isTeleconsulta?: boolean
  dates: {
    date: string
    dateDisplay: string
    slots: AvailableTurnoSlot[]
  }[]
}

export interface SpecialtyOption {
  value: string
  label: string
  iconName?: string
  count?: number
}

export interface DoctorOption {
  name: string
  license: string
  specialty: string
  subtitle?: string
}

export interface VenueOption {
  id: string
  name: string
  address: string
  isVirtual?: boolean
}

