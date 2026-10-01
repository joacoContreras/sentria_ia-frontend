"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  Building2,
  Calendar,
  CalendarCheck,
  Check,
  CheckCircle2,
  ChevronDown,
  MailCheck,
  MapPin,
  Shield,
  Video,
  X,
  Loader2,
} from "lucide-react"
import { BookAppointmentInput } from "@/types/appointments"
import { cn } from "@/lib/utils"

interface BookAppointmentModalProps {
  isOpen: boolean
  initialSpecialty?: string
  initialDoctor?: string
  onClose: () => void
  onConfirm: (input: BookAppointmentInput) => Promise<void> | void
}

const SPECIALTIES = [
  { value: "Cardiología Clínica", label: "Cardiología Clínica" },
  { value: "Dermatología", label: "Dermatología" },
  { value: "Traumatología", label: "Traumatología" },
  { value: "Clínica Médica", label: "Clínica Médica" },
  { value: "Neurología", label: "Neurología" },
]

const DOCTORS_BY_SPECIALTY: Record<string, { name: string; license: string; subtitle: string }[]> = {
  "Cardiología Clínica": [
    { name: "Dr. Alejandro Rossi", license: "M.N. 104.892", subtitle: "Especialista en Evaluación Miocárdica y Arritmias • Valoración 4.9/5" },
    { name: "Dra. Silvina Katz", license: "M.N. 98.412", subtitle: "Cardiología Preventiva y Ergometría • Valoración 4.8/5" },
    { name: "Cualquier profesional disponible (Primer turno libre)", license: "Red Sentria", subtitle: "Asignación inteligente según disponibilidad inmediata" },
  ],
  "Dermatología": [
    { name: "Dra. Lucía Soria", license: "M.N. 87.210", subtitle: "Dermatología General y Control de Lunares • Valoración 4.9/5" },
    { name: "Cualquier profesional disponible (Primer turno libre)", license: "Red Sentria", subtitle: "Asignación inteligente según disponibilidad inmediata" },
  ],
  "Traumatología": [
    { name: "Dra. Valeria Méndez", license: "M.N. 104.551", subtitle: "Traumatología Deportiva y Artroscopía • Valoración 5.0/5" },
    { name: "Cualquier profesional disponible (Primer turno libre)", license: "Red Sentria", subtitle: "Asignación inteligente según disponibilidad inmediata" },
  ],
  "Clínica Médica": [
    { name: "Dr. Esteban Benítez", license: "M.N. 87.319", subtitle: "Medicina Familiar y Chequeos Preventivos • Valoración 4.9/5" },
    { name: "Cualquier profesional disponible (Primer turno libre)", license: "Red Sentria", subtitle: "Asignación inteligente según disponibilidad inmediata" },
  ],
  "Neurología": [
    { name: "Dra. Mariana Rossi", license: "M.N. 112.940", subtitle: "Cefaleas, Migrañas y Trastornos Cognitivos • Valoración 4.9/5" },
    { name: "Cualquier profesional disponible (Primer turno libre)", license: "Red Sentria", subtitle: "Asignación inteligente según disponibilidad inmediata" },
  ],
}

const MODALITY_OPTIONS = [
  { id: "belgrano", title: "Sede Belgrano", subtitle: "Av. Cabildo 1840", icon: MapPin },
  { id: "las-heras", title: "Sede Las Heras", subtitle: "Av. Las Heras 2900", icon: Building2 },
  { id: "teleconsulta", title: "Teleconsulta", subtitle: "Atención Virtual HD", icon: Video },
]

const BOOKING_DATES = [
  { id: "d-31-oct", dayName: "Jueves", dateMetric: "31 Oct", count: "3 disponibles", fullDate: "Jueves 31 de Octubre" },
  { id: "d-01-nov", dayName: "Viernes", dateMetric: "01 Nov", count: "2 disponibles", fullDate: "Viernes 01 de Noviembre" },
  { id: "d-04-nov", dayName: "Lunes", dateMetric: "04 Nov", count: "5 disponibles", fullDate: "Lunes 04 de Noviembre" },
]

const BOOKING_TIMES = ["09:30 hs", "10:15 hs", "11:00 hs", "15:30 hs", "16:15 hs"]

function BookAppointmentContent({
  initialSpecialty,
  initialDoctor,
  onClose,
  onConfirm,
}: {
  initialSpecialty?: string
  initialDoctor?: string
  onClose: () => void
  onConfirm: (input: BookAppointmentInput) => Promise<void> | void
}) {
  const defaultSpecialty = initialSpecialty || "Cardiología Clínica"
  const doctorsForSpec = DOCTORS_BY_SPECIALTY[defaultSpecialty] || DOCTORS_BY_SPECIALTY["Cardiología Clínica"]
  const defaultDoctor =
    initialDoctor && doctorsForSpec.some((d) => d.name.includes(initialDoctor))
      ? initialDoctor
      : doctorsForSpec[0].name

  const [specialty, setSpecialty] = useState<string>(defaultSpecialty)
  const [selectedDoctor, setSelectedDoctor] = useState<string>(defaultDoctor)
  const [modality, setModality] = useState<string>("belgrano")
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0)
  const [selectedTime, setSelectedTime] = useState<string>("10:15 hs")
  const [reason, setReason] = useState<string>("Control rutinario / Chequeo anual")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const closeBtn = modalRef.current?.querySelector<HTMLElement>(
      'button[aria-label="Cerrar ventana de agendar turno"]'
    )
    closeBtn?.focus()
  }, [])

  // Handle specialty change -> update doctor selection
  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    setSpecialty(val)
    const doctors = DOCTORS_BY_SPECIALTY[val] || DOCTORS_BY_SPECIALTY["Cardiología Clínica"]
    setSelectedDoctor(doctors[0].name)
  }

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (!isSubmitting) onClose()
        return
      }

      if (e.key === "Tab" && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        if (focusables.length === 0) return

        const first = focusables[0]
        const last = focusables[focusables.length - 1]

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose, isSubmitting])

  const currentDoctorObj =
    DOCTORS_BY_SPECIALTY[specialty]?.find((d) => d.name === selectedDoctor) ||
    DOCTORS_BY_SPECIALTY[specialty]?.[0] || {
      name: selectedDoctor,
      license: "M.N. 104.892",
      subtitle: "Especialista en Evaluación Clínica • Valoración 4.9/5",
    }

  const selectedVenueObj = MODALITY_OPTIONS.find((m) => m.id === modality) || MODALITY_OPTIONS[0]
  const selectedDateObj = BOOKING_DATES[selectedDateIndex]

  const handleConfirm = async () => {
    if (isSubmitting) return
    setIsSubmitting(true)
    try {
      await onConfirm({
        specialty,
        doctorName: currentDoctorObj.name,
        doctorLicense: currentDoctorObj.license,
        venue: selectedVenueObj.title,
        venueAddress: selectedVenueObj.subtitle,
        dateDisplay: selectedDateObj.fullDate,
        timeDisplay: selectedTime,
        coverageProvider: "OSDE 310 • Copago $0",
        reason,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      ref={modalRef}
      className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-xl my-auto flex flex-col max-h-[92vh] overflow-hidden border border-outline-variant/30"
    >
      {/* HEADER */}
      <div className="flex items-start justify-between px-space-xl pt-space-xl pb-space-md bg-surface-container-lowest flex-shrink-0 border-b border-surface-container">
        <div className="flex items-start gap-space-md">
          <div className="w-12 h-12 rounded-xl bg-surface-container-low text-primary flex items-center justify-center flex-shrink-0 shadow-sm">
            <Calendar className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div className="flex flex-col">
            <h2
              className="font-headline-md text-headline-md text-on-surface tracking-tight"
              id="modal-agendar-title"
            >
              Agendar Nuevo Turno Médico
            </h2>
            <p
              className="font-body-md text-body-md text-on-surface-variant mt-0.5"
              id="modal-agendar-desc"
            >
              Selecciona la especialidad, el profesional de tu preferencia y la fecha deseada.
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Cerrar ventana de agendar turno"
          onClick={onClose}
          disabled={isSubmitting}
          className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors -mr-2 -mt-2 cursor-pointer disabled:opacity-50"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* BODY */}
      <div className="px-space-xl py-space-md overflow-y-auto flex flex-col gap-space-lg flex-1">
        {/* STEP 1: Especialidad Médica */}
        <div className="flex flex-col gap-space-xs">
          <label
            htmlFor="select-especialidad"
            className="font-label-lg text-label-lg text-on-surface flex items-center gap-space-2xs font-semibold"
          >
            <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-[11px] flex items-center justify-center font-bold">
              1
            </span>
            Especialidad Médica
          </label>
          <div className="relative">
            <select
              id="select-especialidad"
              value={specialty}
              onChange={handleSpecialtyChange}
              className="w-full h-12 px-space-md pr-10 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface appearance-none focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all cursor-pointer border-0 ring-1 ring-outline-variant/40 focus:ring-2 focus:ring-primary"
            >
              {SPECIALTIES.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-space-md pointer-events-none text-on-surface-variant">
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* STEP 2: Profesional / Especialista */}
        <div className="flex flex-col gap-space-xs">
          <label
            htmlFor="select-profesional"
            className="font-label-lg text-label-lg text-on-surface flex items-center gap-space-2xs font-semibold"
          >
            <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-[11px] flex items-center justify-center font-bold">
              2
            </span>
            Profesional / Especialista
          </label>
          <div className="relative">
            <select
              id="select-profesional"
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="w-full h-12 px-space-md pr-10 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface appearance-none focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all cursor-pointer border-0 ring-1 ring-outline-variant/40 focus:ring-2 focus:ring-primary"
            >
              {(DOCTORS_BY_SPECIALTY[specialty] || DOCTORS_BY_SPECIALTY["Cardiología Clínica"]).map((doc) => (
                <option key={doc.name} value={doc.name}>
                  {doc.name} {doc.license !== "Red Sentria" ? `(${doc.license})` : ""}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-space-md pointer-events-none text-on-surface-variant">
              <ChevronDown className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          <div className="flex items-center gap-space-2xs mt-0.5">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
            <span className="font-label-sm text-label-sm text-outline">
              {currentDoctorObj.subtitle}
            </span>
          </div>
        </div>

        {/* STEP 3: Sede o Modalidad */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-lg text-label-lg text-on-surface flex items-center gap-space-2xs font-semibold">
            <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-[11px] flex items-center justify-center font-bold">
              3
            </span>
            Sede o Modalidad
          </span>
          <div
            aria-label="Seleccionar sede o modalidad de atención"
            className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs"
            role="radiogroup"
          >
            {MODALITY_OPTIONS.map((opt) => {
              const isSelected = modality === opt.id
              const IconComponent = opt.icon
              return (
                <label
                  key={opt.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  className="cursor-pointer select-none"
                  onClick={() => setModality(opt.id)}
                >
                  <input
                    type="radio"
                    name="modalidad"
                    value={opt.id}
                    checked={isSelected}
                    onChange={() => setModality(opt.id)}
                    className="sr-only"
                  />
                  <div
                    className={cn(
                      "h-full p-space-md rounded-xl transition-all flex flex-col justify-between gap-space-2xs border",
                      isSelected
                        ? "bg-primary-container text-on-primary-container border-primary shadow-sm"
                        : "bg-surface-container-low hover:bg-surface-container text-on-surface border-transparent"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <IconComponent className="h-5 w-5" aria-hidden="true" />
                      {isSelected && (
                        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                      )}
                    </div>
                    <div>
                      <div className="font-label-lg text-label-lg leading-snug font-semibold">
                        {opt.title}
                      </div>
                      <div
                        className={cn(
                          "font-label-sm text-label-sm mt-0.5",
                          isSelected ? "opacity-90" : "text-on-surface-variant"
                        )}
                      >
                        {opt.subtitle}
                      </div>
                    </div>
                  </div>
                </label>
              )
            })}
          </div>
        </div>

        {/* STEP 4: Selección de Fecha y Turno Disponible */}
        <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="font-label-lg text-label-lg text-on-surface flex items-center gap-space-2xs font-semibold">
              <span
                aria-hidden="true"
                className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-[11px] flex items-center justify-center font-bold"
              >
                4
              </span>
              Selección de Fecha y Turno Disponible
            </span>
            <span className="font-label-sm text-label-sm text-outline">
              Octubre - Noviembre 2024
            </span>
          </div>

          {/* Date buttons */}
          <div
            aria-label="Seleccionar fecha"
            className="grid grid-cols-3 gap-space-xs"
            role="radiogroup"
          >
            {BOOKING_DATES.map((dateObj, idx) => {
              const isSelected = selectedDateIndex === idx
              return (
                <button
                  key={dateObj.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => setSelectedDateIndex(idx)}
                  className={cn(
                    "py-2.5 px-space-xs rounded-xl flex flex-col items-center justify-center text-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary",
                    isSelected
                      ? "bg-surface-container-lowest shadow-sm border-2 border-primary"
                      : "bg-surface-container text-on-surface-variant opacity-75 hover:opacity-100 border border-transparent"
                  )}
                >
                  <span
                    className={cn(
                      "font-label-sm text-label-sm",
                      isSelected ? "text-primary font-bold" : "text-outline"
                    )}
                  >
                    {dateObj.dayName}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface leading-tight mt-0.5 font-semibold">
                    {dateObj.dateMetric}
                  </span>
                  <span
                    className={cn(
                      "font-label-sm text-[10px]",
                      isSelected ? "text-primary font-semibold" : "text-outline"
                    )}
                  >
                    {dateObj.count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Time slots */}
          <div className="flex flex-col gap-space-2xs mt-1">
            <span
              id="label-horarios"
              className="font-label-sm text-label-sm text-outline uppercase tracking-wider font-semibold"
            >
              Horarios Matutinos y Vespertinos
            </span>
            <div
              aria-labelledby="label-horarios"
              className="grid grid-cols-3 sm:grid-cols-5 gap-space-2xs"
              role="radiogroup"
            >
              {BOOKING_TIMES.map((timeStr) => {
                const isSelected = selectedTime === timeStr
                return (
                  <button
                    key={timeStr}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setSelectedTime(timeStr)}
                    className={cn(
                      "h-10 rounded-lg font-label-md text-label-md flex items-center justify-center transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary",
                      isSelected
                        ? "bg-primary text-on-primary font-semibold gap-1 shadow-sm"
                        : "bg-surface-container-lowest text-on-surface hover:bg-surface-container"
                    )}
                  >
                    {isSelected && (
                      <Check className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span>{timeStr}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* STEP 5: Cobertura Médica Asociada */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-label-lg text-label-lg text-on-surface flex items-center gap-space-2xs font-semibold">
            <span className="w-5 h-5 rounded-full bg-primary-container text-on-primary-container font-label-sm text-[11px] flex items-center justify-center font-bold">
              5
            </span>
            Cobertura Médica Asociada
          </span>
          <div className="p-space-md rounded-xl bg-surface-container-low flex items-start gap-space-sm border border-outline-variant/30">
            <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0 mt-0.5">
              <Shield className="h-4 w-4 text-on-primary-container" aria-hidden="true" />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex flex-wrap items-center justify-between gap-space-2xs">
                <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                  Cobertura automática: OSDE 310
                </span>
                <span className="px-2 py-0.5 rounded-full font-label-sm text-label-sm bg-primary text-on-primary font-semibold">
                  Copago $0
                </span>
              </div>
              <p className="font-label-sm text-label-sm text-outline mt-0.5">
                Autorización en línea al instante validada por sistema con DNI 38.452.901.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-space-2xs">
            <label
              htmlFor="step-motivo"
              className="font-label-md text-label-md text-on-surface-variant font-medium"
            >
              Motivo de consulta (opcional)
            </label>
            <input
              id="step-motivo"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Ej: Control de rutina, dolor torácico leve, renovación de receta"
              className="w-full h-12 px-space-md rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all border-0 ring-1 ring-outline-variant/40 focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-space-xl py-space-md bg-surface-container-low flex flex-col gap-space-xs flex-shrink-0 shadow-[0_-2px_10px_rgba(0,0,0,0.03)] border-t border-surface-container">
        <div className="flex items-center justify-end gap-space-sm">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="h-12 px-space-lg rounded-xl bg-surface-container-highest text-on-surface font-label-lg text-label-lg hover:bg-surface-container transition-all cursor-pointer disabled:opacity-50 font-medium"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="h-12 px-space-xl rounded-xl bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-space-xs shadow-md hover:bg-primary-container transition-all cursor-pointer font-semibold disabled:opacity-75"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
                <span>Procesando reserva...</span>
              </>
            ) : (
              <>
                <CalendarCheck className="h-5 w-5" aria-hidden="true" />
                <span>Confirmar y Agendar Turno</span>
              </>
            )}
          </button>
        </div>
        <div className="flex items-center gap-space-2xs text-center justify-center sm:justify-start">
          <MailCheck className="h-4 w-4 text-outline shrink-0" aria-hidden="true" />
          <p className="font-label-sm text-label-sm text-outline">
            Recibirás la confirmación inmediata en tu email y recordatorio por WhatsApp 48 hs antes.
          </p>
        </div>
      </div>
    </div>
  )
}

export function BookAppointmentModal({
  isOpen,
  initialSpecialty,
  initialDoctor,
  onClose,
  onConfirm,
}: BookAppointmentModalProps) {
  if (!isOpen) return null

  return (
    <div
      id="modal-agendar-turno"
      aria-labelledby="modal-agendar-title"
      aria-describedby="modal-agendar-desc"
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center p-space-sm sm:p-space-lg bg-slate-900/40 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
    >
      <BookAppointmentContent
        initialSpecialty={initialSpecialty}
        initialDoctor={initialDoctor}
        onClose={onClose}
        onConfirm={onConfirm}
      />
    </div>
  )
}
