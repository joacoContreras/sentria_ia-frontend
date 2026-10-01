import {
  Appointment,
  AvailableDateOption,
  BookAppointmentInput,
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
    isNext: true,
  },
  {
    id: "apt-soria-02",
    doctorName: "Dra. Lucía Soria",
    doctorLicense: "M.N. 98.412",
    specialty: "Dermatología General",
    appointmentDate: "2024-11-05T10:15:00Z",
    displayDate: "Martes 05 de Noviembre",
    displayTime: "10:15 hs",
    relativeTime: "En 12 días",
    venue: "Centro Médico Palermo",
    venueAddress: "Av. Santa Fe 3200, CABA",
    coverageProvider: "OSDE 310 • Copago $0",
    coverageStatus: "Vigente",
    rule: "gestion_habilitada",
    status: "confirmado",
    isCancelledInSession: false,
    isNext: false,
  },
  {
    id: "apt-pando-03",
    doctorName: "Bioq. Horacio Pando",
    doctorLicense: "M.N. 44.192",
    specialty: "Perfil Lipídico y Glucemia",
    appointmentDate: "2024-11-08T07:45:00Z",
    displayDate: "Viernes 08 de Noviembre",
    displayTime: "07:45 hs",
    relativeTime: "En 15 días",
    venue: "Unidad Analítica San Isidro",
    venueAddress: "Av. Libertador 16200, San Isidro",
    coverageProvider: "OSDE 310",
    coverageStatus: "Orden validada",
    rule: "gestion_habilitada",
    status: "confirmado",
    isCancelledInSession: false,
    isNext: false,
  },
  {
    id: "apt-mendez-prev-04",
    doctorName: "Dra. Valeria Méndez",
    doctorLicense: "M.N. 104.551",
    specialty: "Traumatología y Ortopedia",
    appointmentDate: "2024-07-04T10:15:00Z",
    displayDate: "04 de Julio de 2024",
    displayTime: "10:15 hs",
    relativeTime: "Hace 3 meses",
    venue: "Sede Las Heras (Cons. 12)",
    venueAddress: "Av. Las Heras 2390, CABA",
    coverageProvider: "OSDE 310",
    coverageStatus: "Cubierto 100%",
    rule: "gestion_habilitada",
    status: "atendido",
    clinicalNote: "Tendinopatía rotuliana leve • Kinesioterapia 10 sesiones",
    summaryReportAvailable: true,
  },
  {
    id: "apt-benitez-prev-05",
    doctorName: "Dr. Esteban Benítez",
    doctorLicense: "M.N. 87.319",
    specialty: "Clínica Médica",
    appointmentDate: "2024-03-15T09:00:00Z",
    displayDate: "15 de Marzo de 2024",
    displayTime: "09:00 hs",
    relativeTime: "Hace 7 meses",
    venue: "Teleconsulta Sentria",
    venueAddress: "Atención Virtual HD",
    coverageProvider: "OSDE 310",
    coverageStatus: "Finalizada",
    rule: "gestion_habilitada",
    status: "atendido",
    clinicalNote: "Cuadro rinofaríngeo estacional • Reposo 48hs",
    summaryReportAvailable: true,
  },
  {
    id: "apt-paz-canc-06",
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

export const MOCK_AVAILABLE_DATES: AvailableDateOption[] = [
  {
    id: "date-vie-25",
    dateKey: "vie-25",
    label: "Viernes 25 Oct",
    dayName: "Viernes",
    dateMetric: "25 Oct",
    dateDisplay: "Viernes 25 de Octubre",
    slotsCount: 6,
    slots: [
      { id: "s-1", time: "09:00 hs", period: "morning" },
      { id: "s-2", time: "09:45 hs", period: "morning" },
      { id: "s-3", time: "11:15 hs", period: "morning" },
      { id: "s-4", time: "14:30 hs", period: "afternoon" },
      { id: "s-5", time: "16:00 hs", period: "afternoon" },
      { id: "s-6", time: "17:15 hs", period: "afternoon" },
    ],
  },
  {
    id: "date-lun-28",
    dateKey: "lun-28",
    label: "Lunes 28 Oct",
    dayName: "Lunes",
    dateMetric: "28 Oct",
    dateDisplay: "Lunes 28 de Octubre",
    slotsCount: 4,
    slots: [
      { id: "s-7", time: "09:00 hs", period: "morning" },
      { id: "s-8", time: "10:30 hs", period: "morning" },
      { id: "s-9", time: "14:30 hs", period: "afternoon" },
      { id: "s-10", time: "16:00 hs", period: "afternoon" },
    ],
  },
  {
    id: "date-mar-29",
    dateKey: "mar-29",
    label: "Martes 29 Oct",
    dayName: "Martes",
    dateMetric: "29 Oct",
    dateDisplay: "Martes 29 de Octubre",
    slotsCount: 3,
    slots: [
      { id: "s-11", time: "09:45 hs", period: "morning" },
      { id: "s-12", time: "14:30 hs", period: "afternoon" },
      { id: "s-13", time: "16:00 hs", period: "afternoon" },
    ],
  },
  {
    id: "date-mie-30",
    dateKey: "mie-30",
    label: "Miércoles 30 Oct",
    dayName: "Miércoles",
    dateMetric: "30 Oct",
    dateDisplay: "Miércoles 30 de Octubre",
    slotsCount: 5,
    slots: [
      { id: "s-14", time: "09:00 hs", period: "morning" },
      { id: "s-15", time: "11:15 hs", period: "morning" },
      { id: "s-16", time: "14:30 hs", period: "afternoon" },
      { id: "s-17", time: "16:00 hs", period: "afternoon" },
      { id: "s-18", time: "17:15 hs", period: "afternoon" },
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
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...this.appointments])
      }, 50)
    })
  }

  /**
   * Obtiene las opciones de fechas y turnos disponibles para reprogramar o agendar
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

  /**
   * Agenda un nuevo turno médico
   */
  async bookAppointment(
    input: BookAppointmentInput
  ): Promise<{ success: boolean; appointment: Appointment }> {
    return new Promise((resolve) => {
      const newAppointment: Appointment = {
        id: `apt-new-${Date.now()}`,
        doctorName: input.doctorName,
        doctorLicense: input.doctorLicense || "M.N. 104.892",
        specialty: input.specialty,
        appointmentDate: new Date().toISOString(),
        displayDate: input.dateDisplay,
        displayTime: input.timeDisplay,
        relativeTime: "Nuevo turno",
        venue: input.venue,
        venueAddress: input.venueAddress || "Av. Cabildo 1845, CABA",
        coverageProvider: input.coverageProvider || "OSDE 310 • Copago $0",
        coverageStatus: "Autorizado en línea",
        rule: "gestion_habilitada",
        status: "confirmado",
        isCancelledInSession: false,
        isNext: false,
      }

      this.appointments = [newAppointment, ...this.appointments]
      resolve({ success: true, appointment: newAppointment })
    })
  }
}

export const appointmentService = new AppointmentService()
