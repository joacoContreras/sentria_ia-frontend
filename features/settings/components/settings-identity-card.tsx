"use client"

import React, { useRef } from "react"
import { Camera, Trash2, CheckCircle2, CreditCard } from "lucide-react"

interface SettingsIdentityCardProps {
  fullName: string
  dni: string
  hceNumber: string
  avatarUrl: string
  onAvatarChange: (newUrl: string) => void
  onShowToast?: (title: string, message: string, icon?: string, type?: "success" | "info" | "warning" | "error") => void
}

export function SettingsIdentityCard({
  fullName,
  dni,
  hceNumber,
  avatarUrl,
  onAvatarChange,
  onShowToast,
}: SettingsIdentityCardProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        onShowToast?.("Archivo demasiado grande", "El tamaño máximo permitido es de 5MB.", "error", "error")
        return
      }
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          onAvatarChange(event.target.result as string)
          onShowToast?.(
            "Fotografía Actualizada",
            "Tu nueva fotografía de credencial médica se ha cargado correctamente.",
            "check_circle",
            "success"
          )
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeletePhoto = () => {
    onAvatarChange("")
    onShowToast?.(
      "Fotografía Eliminada",
      "Se ha restablecido el avatar clínico predeterminado.",
      "delete",
      "info"
    )
  }

  return (
    <section
      aria-label="Identidad y Fotografía de Credencial"
      className="bg-surface-container-lowest rounded-2xl p-space-xl shadow-xs mb-space-2xl border border-surface-container/60"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        aria-hidden="true"
      />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-space-lg text-center sm:text-left">
          {/* Avatar + Camera Badge */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 rounded-2xl overflow-hidden bg-surface-container shadow-md flex items-center justify-center">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={avatarUrl}
                  alt={`Fotografía médica de ${fullName}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-primary/10 text-primary flex items-center justify-center font-bold text-3xl">
                  {fullName
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              )}
            </div>
            <span
              className="absolute -bottom-2 -right-2 bg-primary text-on-primary p-1.5 rounded-xl shadow-md ring-4 ring-surface-container-lowest"
              title="Paciente con identidad biométrica validada"
            >
              <CheckCircle2 className="h-4 w-4 block fill-primary text-on-primary" aria-hidden="true" />
            </span>
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-space-xs mb-1">
              <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
                {fullName}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold tracking-wide uppercase">
                Paciente Activa
              </span>
            </div>
            <p className="font-body-md text-body-md text-slate-500 mb-space-sm">
              DNI {dni} • Historia Clínica Electrónica #{hceNumber}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-space-sm">
              <button
                type="button"
                onClick={handleUploadClick}
                className="h-10 px-space-md bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-xl transition-all shadow-xs flex items-center gap-space-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-95 cursor-pointer"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                Subir nueva foto
              </button>
              <button
                type="button"
                onClick={handleDeletePhoto}
                className="h-10 px-space-md bg-surface-container hover:bg-surface-container-high text-slate-700 font-label-lg text-label-lg rounded-xl transition-all flex items-center gap-space-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 cursor-pointer"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
                Eliminar foto
              </button>
            </div>
          </div>
        </div>

        {/* Credential Hint Note */}
        <div className="max-w-md bg-surface-container-low rounded-xl p-space-md flex items-start gap-space-sm border border-surface-container/50">
          <CreditCard className="h-6 w-6 text-tertiary shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <h3 className="font-body-md-medium text-body-md-medium text-slate-800 font-semibold mb-0.5">
              Requisito de Fotografía Clínica
            </h3>
            <p className="font-body-md text-body-md text-slate-600 text-xs leading-relaxed">
              Utiliza un retrato frontal nítido y sin filtros. Esta imagen se replica automáticamente en tu credencial digital médica y en la pantalla de admisión de guardia.
            </p>
            <span className="inline-block mt-1 font-label-sm text-label-sm text-slate-500">
              Formatos permitidos: JPG, PNG o WebP (Máx. 5MB)
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
