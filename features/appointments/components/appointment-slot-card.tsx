"use client"

import React from "react"
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Video,
} from "lucide-react"
import { AvailableTurnoSlot } from "@/types/appointments"

interface AppointmentSlotCardProps {
  doctorName: string
  doctorLicense: string
  doctorSubtitle?: string
  specialty: string
  venue: string
  venueAddress: string
  consultorio: string
  isTeleconsulta?: boolean
  dateGroups: {
    date: string
    dateDisplay: string
    slots: AvailableTurnoSlot[]
  }[]
  onSelectSlot: (slot: AvailableTurnoSlot) => void
}

export function AppointmentSlotCard({
  doctorName,
  doctorLicense,
  doctorSubtitle,
  specialty,
  venue,
  venueAddress,
  consultorio,
  isTeleconsulta = false,
  dateGroups,
  onSelectSlot,
}: AppointmentSlotCardProps) {
  const initials = doctorName
    .replace(/^Dr\.\s*|^Dra\.\s*|^Bioq\.\s*/, "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")

  const totalSlotsCount = dateGroups.reduce((acc, curr) => acc + curr.slots.length, 0)

  return (
    <article
      className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col gap-5"
      aria-label={`Turnos disponibles con ${doctorName}`}
    >
      {/* Encabezado del Profesional y Sede */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-surface-container/80">
        <div className="flex items-start gap-3.5">
          {/* Avatar médico */}
          <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shrink-0 border border-primary/20 shadow-xs">
            {initials || <User className="h-6 w-6" />}
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {doctorName}
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                {doctorLicense}
              </span>
            </div>

            <p className="text-xs font-semibold text-primary mt-0.5">
              {specialty}
            </p>

            {doctorSubtitle && (
              <p className="text-xs text-on-surface-variant mt-1 leading-snug">
                {doctorSubtitle}
              </p>
            )}
          </div>
        </div>

        {/* Badge de Sede y Modalidad */}
        <div className="flex flex-col sm:items-end gap-1 shrink-0 bg-surface-container-low p-2.5 sm:p-0 sm:bg-transparent rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface">
            {isTeleconsulta ? (
              <Video className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            ) : (
              <MapPin className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
            )}
            <span>{venue}</span>
          </div>
          <span className="text-xs text-on-surface-variant">
            {consultorio} • {venueAddress}
          </span>
          <span className="text-xs text-outline font-medium mt-0.5">
            {totalSlotsCount} {totalSlotsCount === 1 ? "horario libre" : "horarios libres"}
          </span>
        </div>
      </div>

      {/* Bloques de Fechas y Horarios Disponibles (Slots) */}
      <div className="flex flex-col gap-4">
        {dateGroups.map((group) => {
          const morningSlots = group.slots.filter((s) => s.period === "morning")
          const afternoonSlots = group.slots.filter((s) => s.period === "afternoon")

          return (
            <div
              key={group.date}
              className="p-4 rounded-xl bg-surface-container-low/70 border border-outline-variant/20 flex flex-col gap-3"
            >
              {/* Etiqueta de la fecha */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" aria-hidden="true" />
                  <span className="text-xs font-bold text-on-surface uppercase tracking-wider">
                    {group.dateDisplay}
                  </span>
                </div>
                <span className="text-xs font-medium text-on-surface-variant">
                  {group.slots.length} turnos
                </span>
              </div>

              {/* Grilla de Slots Mañana */}
              {morningSlots.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-outline uppercase tracking-wider flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Mañana
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {morningSlots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => onSelectSlot(slot)}
                        className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold text-xs border border-outline-variant/30 hover:border-primary transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`Reservar turno el ${group.dateDisplay} a las ${slot.time} con ${doctorName}`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Grilla de Slots Tarde */}
              {afternoonSlots.length > 0 && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-outline uppercase tracking-wider flex items-center gap-1">
                    <Clock className="h-3 w-3" /> Tarde
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {afternoonSlots.map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => onSelectSlot(slot)}
                        className="px-3 py-1.5 rounded-lg bg-surface-container-lowest hover:bg-primary hover:text-on-primary text-on-surface font-label-md text-label-md font-semibold text-xs border border-outline-variant/30 hover:border-primary transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        aria-label={`Reservar turno el ${group.dateDisplay} a las ${slot.time} con ${doctorName}`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </article>
  )
}
