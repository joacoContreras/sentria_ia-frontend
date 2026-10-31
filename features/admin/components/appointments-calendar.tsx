"use client"

import { useMemo, useState } from "react"
import { ChevronLeft, ChevronRight, Clock3, MapPin, Search, UserRound, X } from "lucide-react"
import type { Doctor } from "@/types/admin"

type CalendarView = "day" | "week"
type AppointmentStatus = "Reservado" | "En espera" | "Atendido" | "Ausente" | "Cancelado"

type Appointment = {
  id: string
  time: string
  duration: string
  patient: string
  dni: string
  phone: string
  doctor: string
  specialty: string
  room: string
  coverage: string
  memberId: string
  reason: string
  status: AppointmentStatus
  day: number
}

const statusStyles: Record<AppointmentStatus, string> = {
  Reservado: "bg-blue-50 text-blue-700 border-blue-200",
  "En espera": "bg-amber-50 text-amber-800 border-amber-200",
  Atendido: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Ausente: "bg-rose-50 text-rose-700 border-rose-200",
  Cancelado: "bg-slate-100 text-slate-500 border-slate-200",
}

const seedAppointments: Appointment[] = [
  { id: "a1", time: "08:30", duration: "30 min", patient: "Mariana López", dni: "28.445.219", phone: "+54 9 11 4567-8832", doctor: "Dra. Valentina Rossi", specialty: "Clínica Médica", room: "Consultorio 02", coverage: "OSDE", memberId: "OS-448921", reason: "Control clínico anual", status: "Atendido", day: 0 },
  { id: "a2", time: "09:15", duration: "30 min", patient: "Julián Ferreyra", dni: "32.118.604", phone: "+54 9 11 6123-1098", doctor: "Dr. Martín Acosta", specialty: "Cardiología", room: "Consultorio 05", coverage: "Swiss Medical", memberId: "SM-220184", reason: "Seguimiento de presión arterial", status: "En espera", day: 0 },
  { id: "a3", time: "10:00", duration: "45 min", patient: "Camila Benítez", dni: "35.902.761", phone: "+54 9 11 5032-7761", doctor: "Dra. Valentina Rossi", specialty: "Clínica Médica", room: "Consultorio 02", coverage: "Galeno", memberId: "GA-781244", reason: "Dolor abdominal recurrente", status: "Reservado", day: 0 },
  { id: "a4", time: "11:30", duration: "30 min", patient: "Roberto Sosa", dni: "21.784.110", phone: "+54 9 11 4001-2288", doctor: "Dra. Laura Méndez", specialty: "Dermatología", room: "Consultorio 01", coverage: "Particular", memberId: "No aplica", reason: "Consulta dermatológica", status: "Ausente", day: 0 },
  { id: "a5", time: "13:00", duration: "30 min", patient: "Sofía Gutiérrez", dni: "30.556.019", phone: "+54 9 11 4771-3320", doctor: "Dr. Martín Acosta", specialty: "Cardiología", room: "Consultorio 05", coverage: "OSDE", memberId: "OS-994218", reason: "Electrocardiograma de control", status: "Reservado", day: 0 },
  { id: "a6", time: "14:30", duration: "45 min", patient: "Nicolás Paredes", dni: "34.001.442", phone: "+54 9 11 5890-4421", doctor: "Dra. Valentina Rossi", specialty: "Clínica Médica", room: "Consultorio 02", coverage: "Medifé", memberId: "ME-552091", reason: "Primera consulta", status: "Reservado", day: 1 },
  { id: "a7", time: "16:00", duration: "30 min", patient: "Paula Ibarra", dni: "27.772.880", phone: "+54 9 11 4012-9280", doctor: "Dra. Laura Méndez", specialty: "Dermatología", room: "Consultorio 01", coverage: "Sancor Salud", memberId: "SC-180290", reason: "Control de tratamiento", status: "Cancelado", day: 3 },
]

const weekDays = ["Lun 17", "Mar 18", "Mié 19", "Jue 20", "Vie 21", "Sáb 22", "Dom 23"]
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]

export function AppointmentsCalendar({ doctors }: { doctors: Doctor[] }) {
  const [view, setView] = useState<CalendarView>("day")
  const [selectedDay, setSelectedDay] = useState(0)
  const [doctor, setDoctor] = useState("Todos los profesionales")
  const [room, setRoom] = useState("Todos los consultorios")
  const [appointments, setAppointments] = useState(seedAppointments)
  const [selected, setSelected] = useState<Appointment | null>(null)

  const filtered = useMemo(() => appointments.filter((item) => (view === "day" ? item.day === selectedDay : true) && (doctor === "Todos los profesionales" || item.doctor === doctor) && (room === "Todos los consultorios" || item.room === room)), [appointments, doctor, room, selectedDay, view])
  const updateStatus = (id: string, status: AppointmentStatus) => {
    setAppointments((current) => current.map((item) => item.id === id ? { ...item, status } : item))
    setSelected((current) => current?.id === id ? { ...current, status } : current)
  }

  return (
    <section className="flex flex-col gap-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Operación en tiempo real</p>
          <h1 className="font-headline-lg text-on-surface">Agenda de turnos</h1>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-on-surface-variant">Organizá la atención del día y actualizá el estado de cada paciente desde una única vista.</p>
        </div>
        <div className="flex items-center gap-1 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-1.5 shadow-sm">
          <button type="button" aria-pressed={view === "day"} onClick={() => setView("day")} className={`rounded-xl px-4 py-2 text-xs font-bold ${view === "day" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>Día</button>
          <button type="button" aria-pressed={view === "week"} onClick={() => setView("week")} className={`rounded-xl px-4 py-2 text-xs font-bold ${view === "week" ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}>Semana</button>
        </div>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-3 shadow-sm lg:flex-row lg:items-center">
        <div className="flex items-center gap-2"><button type="button" className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-low" aria-label="Día anterior"><ChevronLeft className="size-4" /></button><button type="button" className="rounded-xl bg-primary/10 px-3 py-2 text-xs font-bold text-primary">Hoy</button><button type="button" className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-low" aria-label="Día siguiente"><ChevronRight className="size-4" /></button></div>
        <div className="flex items-center gap-2 text-sm font-bold text-on-surface"><Clock3 className="size-4 text-primary" /> 18 de junio, 2024 <span className="font-normal text-on-surface-variant">· 12 turnos</span></div>
        <div className="flex flex-1 flex-wrap gap-2 lg:justify-end">
          <select aria-label="Filtrar por profesional" value={doctor} onChange={(e) => setDoctor(e.target.value)} className="rounded-xl border border-outline-variant/60 bg-surface-container-low px-3 py-2 text-xs font-medium text-on-surface"><option>Todos los profesionales</option>{doctors.filter((item) => item.isActive).map((item) => <option key={item.id}>{item.fullName}</option>)}</select>
          <select aria-label="Filtrar por consultorio" value={room} onChange={(e) => setRoom(e.target.value)} className="rounded-xl border border-outline-variant/60 bg-surface-container-low px-3 py-2 text-xs font-medium text-on-surface"><option>Todos los consultorios</option><option>Consultorio 01</option><option>Consultorio 02</option><option>Consultorio 05</option></select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-on-surface-variant">{(Object.keys(statusStyles) as AppointmentStatus[]).map((status) => <span key={status} className={`rounded-full border px-2.5 py-1 ${statusStyles[status]}`}>{status}</span>)}</div>

      {view === "day" ? <DayView appointments={filtered} onSelect={setSelected} onStatus={updateStatus} /> : <WeekView appointments={filtered} onSelect={setSelected} />}
      {!filtered.length && <div className="rounded-2xl border border-dashed border-outline-variant bg-surface-container-lowest p-12 text-center"><Search className="mx-auto size-8 text-on-surface-variant/50" /><h2 className="mt-3 text-sm font-bold text-on-surface">No hay turnos registrados para este profesional en el período seleccionado</h2><p className="mt-1 text-xs text-on-surface-variant">Probá cambiar el profesional, consultorio o período.</p></div>}
      {selected && <QuickAppointment appointment={selected} onClose={() => setSelected(null)} onStatus={updateStatus} />}
    </section>
  )
}

function DayView({ appointments, onSelect, onStatus }: { appointments: Appointment[]; onSelect: (a: Appointment) => void; onStatus: (id: string, s: AppointmentStatus) => void }) {
  return <div className="overflow-hidden rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm"><div className="grid grid-cols-[64px_1fr] border-b border-outline-variant/40 bg-surface-container-low px-4 py-3 text-xs font-bold text-on-surface-variant"><span>Hora</span><span>Agenda del día</span></div><div className="divide-y divide-outline-variant/30">{hours.map((hour) => { const items = appointments.filter((item) => item.time.startsWith(hour.slice(0, 2))); return <div key={hour} className="grid min-h-20 grid-cols-[64px_1fr] px-4 py-2"><div className="pt-2 text-[11px] font-semibold text-on-surface-variant">{hour}</div><div className="flex flex-col gap-2">{items.map((item) => <AppointmentCard key={item.id} appointment={item} onSelect={onSelect} onStatus={onStatus} />)}</div></div> })}</div></div>
}

function WeekView({ appointments, onSelect }: { appointments: Appointment[]; onSelect: (a: Appointment) => void }) {
  return <div className="overflow-x-auto rounded-2xl border border-outline-variant/50 bg-surface-container-lowest shadow-sm"><div className="min-w-[900px]"><div className="grid grid-cols-[64px_repeat(7,1fr)] border-b border-outline-variant/40 bg-surface-container-low px-4 py-3 text-center text-xs font-bold text-on-surface-variant"><span />{weekDays.map((day, index) => <span key={day} className={index === 1 ? "text-primary" : ""}>{day}</span>)}</div><div className="grid grid-cols-[64px_repeat(7,1fr)]">{hours.map((hour) => <div className="contents" key={hour}><div className="border-b border-r border-outline-variant/30 px-2 py-4 text-[10px] text-on-surface-variant">{hour}</div>{weekDays.map((_, day) => { const item = appointments.find((appointment) => appointment.day === day && appointment.time.startsWith(hour.slice(0, 2))); return <div key={`${hour}-${day}`} className="min-h-20 border-b border-outline-variant/30 p-1">{item && <button type="button" onClick={() => onSelect(item)} className={`w-full rounded-lg border p-2 text-left text-[10px] ${statusStyles[item.status]}`}><strong className="block truncate">{item.patient}</strong><span>{item.specialty}</span></button>}</div> })}</div>)}</div></div></div>
}

function AppointmentCard({ appointment, onSelect, onStatus }: { appointment: Appointment; onSelect: (a: Appointment) => void; onStatus: (id: string, s: AppointmentStatus) => void }) {
  return <div className="flex flex-col gap-3 rounded-xl border border-outline-variant/50 bg-background p-3 sm:flex-row sm:items-center sm:justify-between"><button type="button" onClick={() => onSelect(appointment)} className="flex min-w-0 items-center gap-3 text-left"><span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><UserRound className="size-4" /></span><span className="min-w-0"><strong className="block truncate text-sm text-on-surface">{appointment.patient}</strong><span className="block truncate text-xs text-on-surface-variant">{appointment.doctor} · {appointment.specialty} · {appointment.duration}</span></span></button><select aria-label={`Estado de ${appointment.patient}`} value={appointment.status} onChange={(e) => onStatus(appointment.id, e.target.value as AppointmentStatus)} className={`w-full rounded-full border px-2.5 py-1.5 text-[11px] font-bold outline-none sm:w-auto ${statusStyles[appointment.status]}`}>{(Object.keys(statusStyles) as AppointmentStatus[]).map((status) => <option key={status}>{status}</option>)}</select></div>
}

function QuickAppointment({ appointment, onClose, onStatus }: { appointment: Appointment; onClose: () => void; onStatus: (id: string, s: AppointmentStatus) => void }) {
  return <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/25" role="dialog" aria-modal="true" aria-label="Ficha rápida del turno"><div className="flex h-full w-full max-w-md flex-col bg-surface-container-lowest shadow-2xl"><div className="flex items-start justify-between border-b border-outline-variant/40 p-5"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Ficha rápida</p><h2 className="mt-1 text-xl font-bold text-on-surface">{appointment.patient}</h2><p className="mt-1 text-xs text-on-surface-variant">{appointment.time} · {appointment.duration} · {appointment.room}</p></div><button type="button" onClick={onClose} className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-container-low" aria-label="Cerrar ficha"><X className="size-5" /></button></div><div className="flex-1 overflow-y-auto p-5"><div className="mb-5 rounded-xl border border-primary/20 bg-primary/5 p-3"><p className="text-[11px] font-bold uppercase tracking-wider text-primary">Estado del turno</p><select aria-label="Actualizar estado" value={appointment.status} onChange={(e) => onStatus(appointment.id, e.target.value as AppointmentStatus)} className={`mt-2 w-full rounded-xl border bg-surface-container-lowest px-3 py-2 text-xs font-bold ${statusStyles[appointment.status]}`}>{(Object.keys(statusStyles) as AppointmentStatus[]).map((status) => <option key={status}>{status}</option>)}</select></div><DetailSection title="Datos de contacto"><Detail label="DNI" value={appointment.dni} /><Detail label="Teléfono" value={appointment.phone} /></DetailSection><DetailSection title="Cobertura médica"><Detail label="Obra social / prepaga" value={appointment.coverage} /><Detail label="N.º de afiliado" value={appointment.memberId} /></DetailSection><DetailSection title="Datos del turno"><Detail label="Profesional" value={appointment.doctor} /><Detail label="Especialidad" value={appointment.specialty} /><Detail label="Motivo / indicaciones previas" value={appointment.reason} /></DetailSection><div className="mt-5 flex items-center gap-2 rounded-xl bg-surface-container-low p-3 text-xs text-on-surface-variant"><MapPin className="size-4 shrink-0 text-primary" /> Información administrativa del turno. No incluye historia clínica ni prescripciones.</div></div></div></div>
}

function DetailSection({ title, children }: { title: string; children: React.ReactNode }) { return <section className="border-b border-outline-variant/40 py-4 first:pt-0"><h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-on-surface-variant">{title}</h3><div className="flex flex-col gap-3">{children}</div></section> }
function Detail({ label, value }: { label: string; value: string }) { return <div><dt className="text-[11px] text-on-surface-variant">{label}</dt><dd className="mt-0.5 text-sm font-semibold text-on-surface">{value}</dd></div> }
