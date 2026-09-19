"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import {
  Mail,
  X,
  Send,
  Paperclip,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Clock,
  FileText,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { validateEmail } from "@/features/auth/schemas/auth.schema"

interface SupportEmailModalProps {
  isOpen: boolean
  onClose: () => void
}

const CATEGORIES = [
  { value: "turnos", label: "Gestión de Turnos y Citas Médicas" },
  { value: "acceso", label: "Acceso, Login y Contraseñas del Portal" },
  { value: "cobertura", label: "Validación de Cobertura y Obras Sociales" },
  { value: "laboratorio", label: "Retiro y Consultas de Estudios/Laboratorio" },
  { value: "triage", label: "Consultas de Triage y Orientación Clínica" },
  { value: "facturacion", label: "Facturación y Copagos" },
  { value: "otro", label: "Otras Consultas Administrativas" },
]

function SupportEmailContent({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    category: "turnos",
    priority: "normal",
    subject: "",
    message: "",
  })

  const [attachedFile, setAttachedFile] = React.useState<File | null>(null)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [ticketResult, setTicketResult] = React.useState<{
    ticketId: string
    timestamp: string
  } | null>(null)

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          file: "El archivo no debe superar los 10MB.",
        }))
        return
      }
      setAttachedFile(file)
      if (errors.file) {
        setErrors((prev) => {
          const next = { ...prev }
          delete next.file
          return next
        })
      }
    }
  }

  const handleRemoveFile = () => {
    setAttachedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Por favor ingrese su nombre y apellido."
    }

    const emailError = validateEmail(formData.email)
    if (emailError) {
      newErrors.email = emailError
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Por favor ingrese el asunto del correo."
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "El asunto debe tener al menos 5 caracteres."
    }

    if (!formData.message.trim()) {
      newErrors.message = "Por favor redacte el cuerpo del mensaje."
    } else if (formData.message.trim().length < 15) {
      newErrors.message = "Por favor detalle su consulta con mayor claridad (mínimo 15 caracteres)."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    setIsSubmitting(true)

    // Simulate sending network request
    await new Promise((resolve) => setTimeout(resolve, 1200))

    const generatedTicket = `TKT-${Math.floor(100000 + Math.random() * 900000)}`
    const now = new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    })

    setTicketResult({
      ticketId: generatedTicket,
      timestamp: now,
    })
    setIsSubmitting(false)
  }

  return (
    <div
      className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-2xl bg-white border border-slate-200/80 shadow-2xl overflow-hidden my-auto"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="support-email-title"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-primary">
            <Mail className="h-4 w-4" />
          </div>
          <div>
            <h2
              id="support-email-title"
              className="text-base font-bold text-slate-900"
            >
              Enviar correo a Soporte
            </h2>
            <p className="text-xs text-slate-500">
              Mesa de ayuda y atención al paciente
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana de correo"
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content Area */}
      {ticketResult ? (
        <div className="flex flex-col items-center text-center p-8 overflow-y-auto space-y-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-primary">
            <CheckCircle2 className="h-7 w-7" />
          </div>

          <div className="space-y-1 max-w-md">
            <span className="inline-block rounded-full bg-teal-100/70 px-3 py-0.5 text-xs font-semibold text-teal-800">
              Ticket #{ticketResult.ticketId}
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Mensaje enviado con éxito
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Hemos recibido su consulta. Se envió una copia de confirmación a{" "}
              <strong className="text-slate-800 font-semibold">{formData.email}</strong>.
            </p>
          </div>

          {/* Ticket Info Card */}
          <div className="w-full max-w-md rounded-xl bg-slate-50 p-4 border border-slate-200/60 text-left space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
              <span className="text-slate-500 font-medium">Asunto:</span>
              <span className="text-slate-900 font-semibold truncate max-w-[220px]">
                {formData.subject}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
              <span className="text-slate-500 font-medium">Categoría:</span>
              <span className="text-slate-900">
                {CATEGORIES.find((c) => c.value === formData.category)?.label || formData.category}
              </span>
            </div>
            <div className="flex justify-between border-b border-slate-200/50 pb-1.5">
              <span className="text-slate-500 font-medium">Respuesta estimada:</span>
              <span className="text-primary font-semibold flex items-center gap-1">
                <Clock className="h-3 w-3" /> &lt; 2 a 4 horas hábiles
              </span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="text-slate-500 font-medium">Hora de recepción:</span>
              <span className="text-slate-900">{ticketResult.timestamp} hs</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-white p-2 rounded-lg border border-slate-100">
            <ShieldCheck className="h-3.5 w-3.5 text-primary/70 shrink-0" />
            <span>Datos protegidos bajo protocolos de privacidad clínica (Ley 25.326).</span>
          </div>

          <div className="w-full max-w-md pt-2">
            <Button
              type="button"
              variant="primary"
              onClick={onClose}
              className="w-full text-white"
            >
              Cerrar
            </Button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col flex-1 overflow-y-auto p-6 space-y-4"
        >
          {/* Email Metadata Envelope Bar */}
          <div className="rounded-xl bg-slate-50 border border-slate-200/60 p-3 text-xs flex flex-col sm:flex-row sm:items-center gap-2 text-slate-600">
            <span className="w-20 shrink-0 font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
              Destino:
            </span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 font-medium text-xs w-fit border border-teal-100">
              <Mail className="h-3 w-3" />
              soporte@sentria.ai
              <span className="text-slate-400">• Mesa de Ayuda Central</span>
            </div>
          </div>

          {/* Sender details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Nombre y apellido"
              id="support-name"
              name="name"
              type="text"
              required
              placeholder="Ej. Juan Manuel Pérez"
              value={formData.name}
              onChange={handleInputChange}
              error={errors.name}
            />

            <Input
              label="Correo electrónico de contacto"
              id="support-email"
              name="email"
              type="email"
              required
              placeholder="paciente@correo.com"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </div>

          {/* Categoría y Prioridad */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-7">
              <Select
                label="Categoría de la consulta"
                id="support-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                options={CATEGORIES}
              />
            </div>

            <div className="sm:col-span-5 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
                Prioridad
              </label>
              <div className="flex gap-2 h-11 items-center">
                <label
                  className={`flex-1 flex items-center justify-center h-full rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                    formData.priority === "normal"
                      ? "bg-teal-50 border-primary text-primary font-semibold"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    value="normal"
                    checked={formData.priority === "normal"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  Normal (24h)
                </label>
                <label
                  className={`flex-1 flex items-center justify-center h-full rounded-xl border text-xs font-medium cursor-pointer transition-all ${
                    formData.priority === "urgente"
                      ? "bg-rose-50 border-rose-400 text-rose-700 font-semibold"
                      : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="radio"
                    name="priority"
                    value="urgente"
                    checked={formData.priority === "urgente"}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  Urgente
                </label>
              </div>
            </div>
          </div>

          {/* Subject */}
          <Input
            label="Asunto"
            id="support-subject"
            name="subject"
            type="text"
            required
            placeholder="Ej. Consulta sobre turno para ecografía"
            value={formData.subject}
            onChange={handleInputChange}
            error={errors.subject}
          />

          {/* Message Body */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center min-h-[1.25rem]">
              <label
                htmlFor="support-message"
                className="text-xs font-semibold text-slate-600 tracking-wide uppercase"
              >
                Mensaje <span className="text-error font-bold ml-0.5">*</span>
              </label>
              <span className="text-[11px] text-slate-400">
                {formData.message.length} caracteres
              </span>
            </div>
            <textarea
              id="support-message"
              name="message"
              rows={4}
              required
              placeholder="Detalle su consulta o solicitud..."
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full rounded-xl border bg-white p-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:ring-3 ${
                errors.message
                  ? "border-error focus:border-error focus:ring-error/10"
                  : "border-slate-200 hover:border-slate-300 focus:border-primary focus:ring-primary/10"
              }`}
            />
            {errors.message && (
              <div className="flex items-center gap-1 text-xs font-medium text-error mt-0.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.message}</span>
              </div>
            )}
          </div>

          {/* File Attachment */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-600 tracking-wide uppercase">
              Adjunto (Opcional)
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="hidden"
              id="file-attachment-input"
            />

            {attachedFile ? (
              <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 border border-slate-200/80">
                <div className="flex items-center gap-2 truncate">
                  <FileText className="h-4 w-4 text-primary shrink-0" />
                  <div className="truncate text-xs">
                    <p className="font-medium text-slate-800 truncate">
                      {attachedFile.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {(attachedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="p-1 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                  title="Quitar adjunto"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 border border-dashed border-slate-200 rounded-xl p-3 text-xs text-slate-500 hover:border-primary hover:text-primary hover:bg-teal-50/30 transition-colors cursor-pointer"
              >
                <Paperclip className="h-3.5 w-3.5" />
                <span>Adjuntar comprobante o estudio (PDF, PNG, JPG - Máx 10MB)</span>
              </button>
            )}
            {errors.file && (
              <div className="flex items-center gap-1 text-xs font-medium text-error mt-0.5">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{errors.file}</span>
              </div>
            )}
          </div>

          {/* Footer Notice & Actions */}
          <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <ShieldCheck className="h-3.5 w-3.5 text-primary/70 shrink-0" />
              <span>Canal seguro y confidencial</span>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                isLoading={isSubmitting}
                variant="primary"
                className="w-full sm:w-auto text-white flex items-center justify-center gap-2"
              >
                <Send className="h-4 w-4" />
                Enviar correo
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

const emptySubscribe = () => () => {}

export function SupportEmailModal({ isOpen, onClose }: SupportEmailModalProps) {
  const isClient = React.useSyncExternalStore(emptySubscribe, () => true, () => false)

  React.useEffect(() => {
    if (!isOpen) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen || !isClient) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-space-sm sm:p-space-md bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto"
      onClick={onClose}
    >
      <SupportEmailContent onClose={onClose} />
    </div>,
    document.body
  )
}
