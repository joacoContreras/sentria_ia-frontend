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
  | "triage"
  | "historial"
  | "ayuda"
  | "sede"
  | "terminos"
  | "privacidad"
  | "protocolo"

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
