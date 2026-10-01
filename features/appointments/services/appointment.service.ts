import {
  Appointment,
  AvailableDateOption,
  CancelAppointmentInput,
  RescheduleAppointmentInput,
} from "@/types/appointments"

// Initial mock dataset matching clinical business rules and acceptance criteria
const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "apt-rossi-01",
    doctorName: "Dr. Alejandro Rossi",
    doctorLicense: "M.N. 104.892",
    specialty: "Cardiología Clínica",
    appointmentDate: "2024-10-24T15:30:00Z",
    displayDate: "Jueves 24 de Octubre de 2024",
    displayTime: "15:30 hs",
    relativeTime: "En 4 días",
    venue: "Sede Central Belgrano (Cons. 304)",
    venueAddress: "Av. Cabildo 1845, CABA",
    coverageProvider: "OSDE 310 • Plan Médico",
    coverageStatus: "Autorización al día",
    managementDeadline: "Gestión online hasta el 23/10 15:30 hs",
    rule: "gestion_habilitada",
    status: "confirmado",
    isCancelledInSession: false,
    isNext: false,
  },
  {
    id: "apt-mendez-02",
    doctorName: "Dra. Valeria Méndez",
    doctorLicense: "M.N. 98.415",
    specialty: "Traumatología y Ortopedia",
    appointmentDate: "2024-10-21T09:15:00Z",
    displayDate: "Mañana Viernes",
    displayTime: "09:15 hs",
    relativeTime: "Faltan 18 horas",
    venue: "Sede Las Heras (Cons. 12)",
    venueAddress: "Av. Las Heras 2390, CABA",
    coverageProvider: "OSDE 310 • Copago $0",
    coverageStatus: "Orden médica cargada",
    rule: "bloqueado_24h",
    status: "confirmado",
    isCancelledInSession: false,
    isNext: true,
  },
  {
    id: "apt-soria-hist-03",
    doctorName: "Dra. Camila Soria",
    doctorLicense: "M.N. 87.210",
    specialty: "Dermatología Quirúrgica",
    appointmentDate: "2024-09-12T11:00:00Z",
    displayDate: "12 de Septiembre 2024",
    displayTime: "11:00 hs",
    relativeTime: "Hace 1 mes",
    venue: "Sede Central Belgrano (Cons. 108)",
    venueAddress: "Av. Cabildo 1845, CABA",
    coverageProvider: "OSDE 310",
    coverageStatus: "Cubierto 100%",
    rule: "gestion_habilitada",
    status: "atendido",
    clinicalNote: "Atendido • Informe de biopsia disponible",
    summaryReportAvailable: true,
  },
  {
    id: "apt-paz-canc-04",
    doctorName: "Dr. Martín Paz",
    doctorLicense: "M.N. 79.112",
    specialty: "Oftalmología General",
    appointmentDate: "2024-10-02T16:00:00Z",
    displayDate: "02 de Octubre 2024",
    displayTime: "16:00 hs",
    relativeTime: "Hace 3 semanas",
    venue: "Sede Las Heras (Cons. 04)",
    venueAddress: "Av. Las Heras 2390, CABA",
    coverageProvider: "OSDE 310",
    coverageStatus: "Liberado",
    rule: "gestion_habilitada",
    status: "cancelado",
    cancellationReason: "Cancelado con aviso previo",
  },
]

const MOCK_AVAILABLE_DATES: AvailableDateOption[] = [
  {
    id: "date-1",
    dateKey: "2024-10-28",
    label: "Lun 28 Oct",
    dateDisplay: "Lunes 28 de Octubre",
    slotsCount: 3,
    slots: [
      { id: "s-1", time: "09:00 hs", period: "morning" },
      { id: "s-2", time: "10:30 hs", period: "morning" },
      { id: "s-3", time: "14:00 hs", period: "afternoon" },
    ],
  },
  {
    id: "date-2",
    dateKey: "2024-10-29",
    label: "Mar 29 Oct",
    dateDisplay: "Martes 29 de Octubre",
    slotsCount: 2,
    slots: [
      { id: "s-4", time: "14:00 hs", period: "afternoon" },
      { id: "s-5", time: "16:15 hs", period: "afternoon" },
    ],
  },
  {
    id: "date-3",
    dateKey: "2024-10-31",
    label: "Jue 31 Oct",
    dateDisplay: "Jueves 31 de Octubre",
    slotsCount: 4,
    slots: [
      { id: "s-6", time: "09:00 hs", period: "morning" },
      { id: "s-7", time: "10:30 hs", period: "morning" },
      { id: "s-8", time: "16:15 hs", period: "afternoon" },
      { id: "s-9", time: "17:45 hs", period: "afternoon" },
    ],
  },
]

class AppointmentService {
  private appointments: Appointment[] = [...INITIAL_APPOINTMENTS]

  /**
   * Obtiene todos los turnos del paciente
   * En producción conectará con GET /api/patient/appointments
   */
  async getAppointments(): Promise<Appointment[]> {
    // Simula pequeña latencia asíncrona
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.appointments])
      }, 50)
    })
  }

  /**
   * Obtiene las opciones de fechas y turnos disponibles para reprogramar
   * En producción conectará con GET /api/patient/appointments/available-slots?doctorId=...
   */
  async getAvailableSlots(): Promise<AvailableDateOption[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...MOCK_AVAILABLE_DATES])
      }, 50)
    })
  }

  /**
   * Cancela un turno (>24 hs)
   * En producción conectará con PUT/POST /api/patient/appointments/:id/cancel
   */
  async cancelAppointment(input: CancelAppointmentInput): Promise<{ success: boolean; appointment: Appointment }> {
    return new Promise((resolve, reject) => {
      const index = this.appointments.findIndex((a) => a.id === input.appointmentId)
      if (index === -1) {
        reject(new Error("Turno no encontrado"))
        return
      }

      const updated: Appointment = {
        ...this.appointments[index],
        status: "cancelado",
        isCancelledInSession: true,
        cancellationReason: input.reason || "Cancelado por el paciente",
      }

      this.appointments[index] = updated
      resolve({ success: true, appointment: updated })
    })
  }

  /**
   * Restaura un turno previamente cancelado en la sesión
   * En producción conectará con POST /api/patient/appointments/:id/restore
   */
  async restoreAppointment(appointmentId: string): Promise<{ success: boolean; appointment: Appointment }> {
    return new Promise((resolve, reject) => {
      const index = this.appointments.findIndex((a) => a.id === appointmentId)
      if (index === -1) {
        reject(new Error("Turno no encontrado"))
        return
      }

      const updated: Appointment = {
        ...this.appointments[index],
        status: "confirmado",
        isCancelledInSession: false,
        cancellationReason: undefined,
      }

      this.appointments[index] = updated
      resolve({ success: true, appointment: updated })
    })
  }

  /**
   * Reprograma un turno médico
   * En producción conectará con PUT /api/patient/appointments/:id/reschedule
   */
  async rescheduleAppointment(
    input: RescheduleAppointmentInput
  ): Promise<{ success: boolean; appointment: Appointment }> {
    return new Promise((resolve, reject) => {
      const index = this.appointments.findIndex((a) => a.id === input.appointmentId)
      if (index === -1) {
        reject(new Error("Turno no encontrado"))
        return
      }

      const updated: Appointment = {
        ...this.appointments[index],
        displayDate: input.newDate,
        displayTime: input.newTime,
        relativeTime: "Reprogramado",
        status: "confirmado",
        isCancelledInSession: false,
      }

      this.appointments[index] = updated
      resolve({ success: true, appointment: updated })
    })
  }
}

export const appointmentService = new AppointmentService()
