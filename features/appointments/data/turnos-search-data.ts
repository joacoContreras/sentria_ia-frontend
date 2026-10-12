import {
  AvailableTurnoSlot,
  DoctorOption,
  SpecialtyOption,
  VenueOption,
} from "@/types/appointments"

export const MOCK_SPECIALTIES: SpecialtyOption[] = [
  { value: "Cardiología Clínica", label: "Cardiología Clínica", count: 14 },
  { value: "Dermatología", label: "Dermatología", count: 8 },
  { value: "Traumatología", label: "Traumatología", count: 11 },
  { value: "Clínica Médica", label: "Clínica Médica", count: 18 },
  { value: "Neurología", label: "Neurología", count: 6 },
  { value: "Oftalmología", label: "Oftalmología", count: 9 },
  { value: "Pediatría", label: "Pediatría", count: 12 },
  { value: "Ginecología y Obstetricia", label: "Ginecología y Obstetricia", count: 7 },
]

export const MOCK_VENUES: VenueOption[] = [
  {
    id: "belgrano",
    name: "Sede Central Belgrano",
    address: "Av. Cabildo 1845, CABA",
    isVirtual: false,
  },
  {
    id: "palermo",
    name: "Centro Médico Palermo",
    address: "Av. Santa Fe 3200, CABA",
    isVirtual: false,
  },
  {
    id: "las-heras",
    name: "Sede Las Heras",
    address: "Av. Las Heras 2390, CABA",
    isVirtual: false,
  },
  {
    id: "teleconsulta",
    name: "Teleconsulta Sentria",
    address: "Atención Virtual HD",
    isVirtual: true,
  },
]

export const MOCK_DOCTORS: DoctorOption[] = [
  // Cardiología
  {
    name: "Dr. Alejandro Rossi",
    license: "M.N. 104.892",
    specialty: "Cardiología Clínica",
    subtitle: "Especialista en Evaluación Miocárdica y Arritmias • Valoración 4.9/5",
  },
  {
    name: "Dra. Silvina Katz",
    license: "M.N. 98.412",
    specialty: "Cardiología Clínica",
    subtitle: "Cardiología Preventiva y Ergometría • Valoración 4.8/5",
  },
  // Dermatología
  {
    name: "Dra. Lucía Soria",
    license: "M.N. 87.210",
    specialty: "Dermatología",
    subtitle: "Dermatología General y Control de Lunares • Valoración 4.9/5",
  },
  // Traumatología
  {
    name: "Dra. Valeria Méndez",
    license: "M.N. 104.551",
    specialty: "Traumatología",
    subtitle: "Traumatología Deportiva y Artroscopía • Valoración 5.0/5",
  },
  // Clínica Médica
  {
    name: "Dr. Esteban Benítez",
    license: "M.N. 87.319",
    specialty: "Clínica Médica",
    subtitle: "Medicina Familiar y Chequeos Preventivos • Valoración 4.9/5",
  },
  {
    name: "Dra. Florencia Carrizo",
    license: "M.N. 119.450",
    specialty: "Clínica Médica",
    subtitle: "Medicina Interna y Seguimiento Ambulatorio • Valoración 4.8/5",
  },
  // Neurología
  {
    name: "Dra. Mariana Rossi",
    license: "M.N. 112.940",
    specialty: "Neurología",
    subtitle: "Cefaleas, Migrañas y Trastornos Cognitivos • Valoración 4.9/5",
  },
  // Oftalmología
  {
    name: "Dr. Martín Paz",
    license: "M.N. 79.112",
    specialty: "Oftalmología",
    subtitle: "Agudeza Visual, Fondo de Ojo y Glaucoma • Valoración 4.8/5",
  },
  // Pediatría
  {
    name: "Dra. Camila Varela",
    license: "M.N. 95.302",
    specialty: "Pediatría",
    subtitle: "Desarrollo y Control de Niños y Adolescentes • Valoración 4.9/5",
  },
  // Ginecología
  {
    name: "Dra. Paula D'Angelo",
    license: "M.N. 103.218",
    specialty: "Ginecología y Obstetricia",
    subtitle: "Salud Integral Femenina y Control Prenatal • Valoración 4.9/5",
  },
]

// Función auxiliar para formatear fechas legibles en español
function formatSpanishDate(d: Date): { dateStr: string; displayStr: string } {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  const dateStr = `${year}-${month}-${day}`

  const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
  const monthsOfYear = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]

  const dayName = daysOfWeek[d.getDay()]
  const monthName = monthsOfYear[d.getMonth()]
  const displayStr = `${dayName} ${d.getDate()} de ${monthName}`

  return { dateStr, displayStr }
}

/**
 * Genera un conjunto representativo de turnos disponibles para los próximos 21 días
 */
export function generateMockTurnos(): AvailableTurnoSlot[] {
  const slots: AvailableTurnoSlot[] = []
  const baseDate = new Date()

  // Lista de doctores con sus configuraciones de sede
  const doctorConfigs = [
    {
      doctor: MOCK_DOCTORS[0], // Dr. Alejandro Rossi
      venue: MOCK_VENUES[0], // Sede Central Belgrano
      consultorio: "Consultorio 304",
      times: [
        { time: "09:00 hs", period: "morning" as const },
        { time: "09:45 hs", period: "morning" as const },
        { time: "11:15 hs", period: "morning" as const },
        { time: "14:30 hs", period: "afternoon" as const },
        { time: "16:00 hs", period: "afternoon" as const },
      ],
      dayOffsets: [1, 2, 4, 7, 8, 11, 14],
    },
    {
      doctor: MOCK_DOCTORS[1], // Dra. Silvina Katz
      venue: MOCK_VENUES[1], // Centro Médico Palermo
      consultorio: "Consultorio 108",
      times: [
        { time: "10:00 hs", period: "morning" as const },
        { time: "11:30 hs", period: "morning" as const },
        { time: "15:00 hs", period: "afternoon" as const },
        { time: "17:15 hs", period: "afternoon" as const },
      ],
      dayOffsets: [2, 3, 5, 9, 12, 16],
    },
    {
      doctor: MOCK_DOCTORS[2], // Dra. Lucía Soria (Dermatología)
      venue: MOCK_VENUES[1], // Centro Médico Palermo
      consultorio: "Consultorio 205",
      times: [
        { time: "08:30 hs", period: "morning" as const },
        { time: "10:15 hs", period: "morning" as const },
        { time: "11:00 hs", period: "morning" as const },
        { time: "14:00 hs", period: "afternoon" as const },
        { time: "16:30 hs", period: "afternoon" as const },
      ],
      dayOffsets: [1, 3, 4, 8, 10, 15, 18],
    },
    {
      doctor: MOCK_DOCTORS[3], // Dra. Valeria Méndez (Traumatología)
      venue: MOCK_VENUES[2], // Sede Las Heras
      consultorio: "Consultorio 12",
      times: [
        { time: "09:15 hs", period: "morning" as const },
        { time: "10:45 hs", period: "morning" as const },
        { time: "13:30 hs", period: "afternoon" as const },
        { time: "15:45 hs", period: "afternoon" as const },
      ],
      dayOffsets: [2, 4, 6, 9, 13, 17],
    },
    {
      doctor: MOCK_DOCTORS[4], // Dr. Esteban Benítez (Clínica Médica)
      venue: MOCK_VENUES[0], // Sede Central Belgrano
      consultorio: "Consultorio 102",
      times: [
        { time: "08:00 hs", period: "morning" as const },
        { time: "09:30 hs", period: "morning" as const },
        { time: "11:00 hs", period: "morning" as const },
        { time: "14:15 hs", period: "afternoon" as const },
        { time: "16:45 hs", period: "afternoon" as const },
      ],
      dayOffsets: [1, 2, 3, 5, 8, 9, 12, 15],
    },
    {
      doctor: MOCK_DOCTORS[5], // Dra. Florencia Carrizo (Clínica Médica)
      venue: MOCK_VENUES[3], // Teleconsulta
      consultorio: "Sala Virtual 02",
      times: [
        { time: "10:30 hs", period: "morning" as const },
        { time: "12:00 hs", period: "morning" as const },
        { time: "16:00 hs", period: "afternoon" as const },
        { time: "18:00 hs", period: "afternoon" as const },
      ],
      dayOffsets: [1, 3, 5, 7, 10, 14],
    },
    {
      doctor: MOCK_DOCTORS[6], // Dra. Mariana Rossi (Neurología)
      venue: MOCK_VENUES[1], // Palermo
      consultorio: "Consultorio 301",
      times: [
        { time: "09:45 hs", period: "morning" as const },
        { time: "11:15 hs", period: "morning" as const },
        { time: "15:30 hs", period: "afternoon" as const },
      ],
      dayOffsets: [3, 4, 7, 11, 14, 18],
    },
    {
      doctor: MOCK_DOCTORS[7], // Dr. Martín Paz (Oftalmología)
      venue: MOCK_VENUES[2], // Las Heras
      consultorio: "Consultorio 04",
      times: [
        { time: "10:00 hs", period: "morning" as const },
        { time: "11:45 hs", period: "morning" as const },
        { time: "14:45 hs", period: "afternoon" as const },
        { time: "17:00 hs", period: "afternoon" as const },
      ],
      dayOffsets: [2, 5, 8, 12, 16],
    },
    {
      doctor: MOCK_DOCTORS[8], // Dra. Camila Varela (Pediatría)
      venue: MOCK_VENUES[0], // Belgrano
      consultorio: "Consultorio 110",
      times: [
        { time: "09:00 hs", period: "morning" as const },
        { time: "10:30 hs", period: "morning" as const },
        { time: "14:00 hs", period: "afternoon" as const },
        { time: "15:30 hs", period: "afternoon" as const },
      ],
      dayOffsets: [1, 2, 4, 6, 9, 13],
    },
    {
      doctor: MOCK_DOCTORS[9], // Dra. Paula D'Angelo (Ginecología)
      venue: MOCK_VENUES[0], // Belgrano
      consultorio: "Consultorio 212",
      times: [
        { time: "08:45 hs", period: "morning" as const },
        { time: "10:15 hs", period: "morning" as const },
        { time: "13:45 hs", period: "afternoon" as const },
        { time: "16:15 hs", period: "afternoon" as const },
      ],
      dayOffsets: [2, 3, 5, 8, 11, 15],
    },
  ]

  let slotIdCounter = 1

  doctorConfigs.forEach((cfg) => {
    cfg.dayOffsets.forEach((offset) => {
      const targetDate = new Date(baseDate)
      targetDate.setDate(targetDate.getDate() + offset)

      // Evitar domingos (0) para agendas ambulatorias
      if (targetDate.getDay() === 0) return

      const { dateStr, displayStr } = formatSpanishDate(targetDate)

      cfg.times.forEach((t) => {
        slots.push({
          id: `slot-${slotIdCounter++}`,
          time: t.time,
          period: t.period,
          date: dateStr,
          dateDisplay: displayStr,
          doctorName: cfg.doctor.name,
          doctorLicense: cfg.doctor.license,
          doctorSubtitle: cfg.doctor.subtitle,
          specialty: cfg.doctor.specialty,
          venue: cfg.venue.name,
          venueAddress: cfg.venue.address,
          consultorio: cfg.consultorio,
          isTeleconsulta: cfg.venue.isVirtual,
        })
      })
    })
  })

  // Ordenar cronológicamente por fecha y hora
  return slots.sort((a, b) => {
    if (a.date !== b.date) {
      return a.date.localeCompare(b.date)
    }
    return a.time.localeCompare(b.time)
  })
}

export const INITIAL_MOCK_TURNOS = generateMockTurnos()
