"use client"

import React from "react"
import { UserCheck, Lock, CheckCircle2 } from "lucide-react"

interface SettingsPersonalDataSectionProps {
  fullName: string
  dni: string
  birthDate: string
  gender: string
  phone: string
  email: string
  address: string
  onChange: (field: string, value: string) => void
}

export function SettingsPersonalDataSection({
  fullName,
  dni,
  birthDate,
  gender,
  phone,
  email,
  address,
  onChange,
}: SettingsPersonalDataSectionProps) {
  return (
    <section
      aria-labelledby="heading-datos-personales"
      className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-xs border border-surface-container/60 flex flex-col gap-space-lg"
      id="datos-personales"
    >
      <div className="flex items-center justify-between pb-space-sm border-b border-surface-container/50">
        <div className="flex items-center gap-space-sm">
          <span className="p-2.5 rounded-xl bg-surface-container-low text-primary flex items-center justify-center">
            <UserCheck className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold" id="heading-datos-personales">
              Datos Personales
            </h2>
            <p className="font-body-md text-body-md text-slate-500">
              Información para tu ficha clínica y validación en turnos presenciales.
            </p>
          </div>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 font-label-sm text-label-sm text-slate-500">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Datos Sincronizados
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
        {/* Full Name */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="font-label-lg text-label-lg text-slate-800 font-medium" htmlFor="input-fullname">
            Nombre completo
          </label>
          <div className="relative">
            <input
              className="w-full h-12 px-space-md bg-surface-container-lowest rounded-xl font-body-lg text-on-surface shadow-2xs border border-surface-container focus:bg-surface focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all placeholder:text-slate-400"
              id="input-fullname"
              name="fullname"
              required
              type="text"
              value={fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
            />
          </div>
          <p className="font-label-sm text-label-sm text-slate-500">
            Tal como figura en tu DNI oficial para la emisión de recetas electrónicas.
          </p>
        </div>

        {/* DNI (Locked) */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="font-label-lg text-label-lg text-slate-800 font-medium" htmlFor="input-dni">
              DNI / Documento de Identidad
            </label>
            <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              Protegido
            </span>
          </div>
          <div className="relative">
            <input
              className="w-full h-12 px-space-md bg-surface-container-low/70 rounded-xl font-body-lg text-slate-600 border border-surface-container/60 cursor-not-allowed select-all"
              id="input-dni"
              name="dni"
              readOnly
              type="text"
              value={dni}
            />
          </div>
          <p className="font-label-sm text-label-sm text-slate-500">
            Para modificar tu documento, acércate a la Mesa de Entradas con credencial física.
          </p>
        </div>

        {/* Birth Date & Gender (Protected by RENAPER) */}
        <div className="grid grid-cols-2 gap-space-md">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-label-lg text-label-lg text-slate-800 font-medium" htmlFor="input-birthdate">
                Nacimiento
              </label>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                RENAPER
              </span>
            </div>
            <input
              className="w-full h-12 px-space-md bg-surface-container-low/70 rounded-xl font-body-lg text-slate-600 border border-surface-container/60 cursor-not-allowed select-all"
              id="input-birthdate"
              name="birthdate"
              readOnly
              disabled
              type="text"
              value={birthDate}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="font-label-lg text-label-lg text-slate-800 font-medium" htmlFor="select-gender">
                Género
              </label>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <Lock className="h-3.5 w-3.5" aria-hidden="true" />
                RENAPER
              </span>
            </div>
            <select
              className="w-full h-12 px-space-md bg-surface-container-low/70 rounded-xl font-body-lg text-slate-600 border border-surface-container/60 cursor-not-allowed"
              id="select-gender"
              name="gender"
              disabled
              value={gender}
            >
              <option value="femenino">Femenino</option>
              <option value="masculino">Masculino</option>
              <option value="no-binario">No binario</option>
              <option value="otro">Otro / Prefiero no decir</option>
            </select>
          </div>
          <div className="col-span-2">
            <p className="font-label-sm text-label-sm text-slate-500">
              Fecha de nacimiento y género obtenidos y validados automáticamente mediante RENAPER con tu DNI.
            </p>
          </div>
        </div>

        {/* Phone Number with Verification Pill */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="font-label-lg text-label-lg text-slate-800 font-medium" htmlFor="input-phone">
              Teléfono móvil (WhatsApp)
            </label>
            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 fill-primary text-on-primary" aria-hidden="true" />
              Verificado
            </span>
          </div>
          <input
            className="w-full h-12 px-space-md bg-surface-container-lowest rounded-xl font-body-lg text-on-surface shadow-2xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            id="input-phone"
            name="phone"
            required
            type="tel"
            value={phone}
            onChange={(e) => onChange("phone", e.target.value)}
          />
          <p className="font-label-sm text-label-sm text-slate-500">
            Utilizado para recordatorios de citas e inicio seguro en 2 pasos.
          </p>
        </div>

        {/* Email with Verification Pill */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="font-label-lg text-label-lg text-slate-800 font-medium" htmlFor="input-email">
              Correo Electrónico
            </label>
            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-primary font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5 fill-primary text-on-primary" aria-hidden="true" />
              Verificado
            </span>
          </div>
          <input
            className="w-full h-12 px-space-md bg-surface-container-lowest rounded-xl font-body-lg text-on-surface shadow-2xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            id="input-email"
            name="email"
            required
            type="email"
            value={email}
            onChange={(e) => onChange("email", e.target.value)}
          />
          <p className="font-label-sm text-label-sm text-slate-500">
            Recepción de estudios de laboratorio, recetas y comprobantes.
          </p>
        </div>

        {/* Habitual Address */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="font-label-lg text-label-lg text-slate-800 font-medium" htmlFor="input-address">
            Domicilio Habitual
          </label>
          <div className="relative">
            <input
              className="w-full h-12 px-space-md bg-surface-container-lowest rounded-xl font-body-lg text-on-surface shadow-2xs border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              id="input-address"
              name="address"
              required
              type="text"
              value={address}
              onChange={(e) => onChange("address", e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
