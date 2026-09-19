"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import {
  MessageSquare,
  User,
  Send,
  X,
  RotateCcw,
  Headphones,
  Maximize2,
  Minimize2,
  AlertTriangle,
  PhoneCall,
  CheckCircle2,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  sender: "bot" | "user" | "human_agent" | "system"
  text: string
  timestamp: string
  isEmergency?: boolean
  actions?: { label: string; action: string }[]
}

interface HelpChatModalProps {
  isOpen: boolean
  onClose: () => void
  onOpenEmailSupport?: () => void
}

const INITIAL_SUGGESTIONS = [
  "¿Dónde queda la guardia de urgencias?",
  "¿Cómo prepararme para un análisis de sangre?",
  "¿Cómo cancelo o reprogramo un turno?",
  "¿Cómo descargo mis estudios médicos?",
  "Tengo dolor agudo en el pecho",
  "Quiero hablar con un operador",
]

const BOT_KNOWLEDGE_BASE: Record<
  string,
  { reply: string; isEmergency?: boolean; actions?: { label: string; action: string }[] }
> = {
  guardia: {
    reply:
      "Nuestra red hospitalaria cuenta con **Guardia de Emergencias las 24 horas, los 365 días del año**.\n\n📍 **Sede Central:** Av. Libertador 4500 (Guardia General de Adultos y Pediátrica).\n📍 **Sede Norte:** Av. del Trabajo 1240 (Emergencias Generales).\n\n⚠️ *El ingreso se realiza mediante Triage de gravedad (Escala ESI), no por orden de llegada.*",
    actions: [
      { label: "Ver teléfonos de guardia", action: "telefonos_guardia" },
      { label: "Cómo llegar a Sede Central", action: "como_llegar" },
    ],
  },
  laboratorio: {
    reply:
      "Para la mayoría de los análisis clínicos de sangre de rutina:\n\n• **Ayuno requerido:** 8 horas para hemograma básico y química clínica; 12 horas estrictas para perfil lipídico (colesterol/triglicéridos).\n• **Ingesta de agua:** Puede beber pequeñas cantidades de agua pura.\n• **Horario de toma:** Lunes a Viernes de 06:30 a 11:30 hs y Sábados de 07:00 a 10:30 hs (Sin turno previo en Sede Central).\n\n¿Desea consultar por una indicación de estudio específica?",
    actions: [
      { label: "¿Cómo descargo los resultados?", action: "descargar_estudios" },
      { label: "Preparación para Ecografía / TAC", action: "prep_imagenes" },
    ],
  },
  turno: {
    reply:
      "Para gestionar sus citas médicas de forma inmediata:\n\n1. Inicie sesión en el **Portal del Paciente** con su DNI y contraseña.\n2. Ingrese a la sección **'Mis Turnos'**.\n3. Podrá cancelar o reprogramar con hasta 4 horas de anticipación sin penalidad.\n\nTambién puede solicitar turnos de demanda espontánea para consultorios externos en recepción de 08:00 a 20:00 hs.",
    actions: [
      { label: "Ir al Portal de Pacientes", action: "ir_portal" },
      { label: "Contactar a Mesa de Entradas", action: "mesa_entradas" },
    ],
  },
  estudios: {
    reply:
      "Todos sus informes de diagnóstico por imágenes (Radiografías, Resonancias, Tomografías) y análisis de laboratorio se cargan automáticamente en su **Portal del Paciente** dentro de las 24 a 48 hs hábiles posteriores a la realización.\n\nPuede descargarlos en formato PDF con firma digital válida para cualquier obra social o médico particular.",
    actions: [
      { label: "Validar contraseña de acceso", action: "recuperar_clave" },
      { label: "Consultar demora de un estudio", action: "demora_estudios" },
    ],
  },
  emergencia: {
    reply:
      "🚨 **ADVERTENCIA DE PRIORIDAD VITAL INMEDIATA** 🚨\n\nSi usted o un familiar presenta dolor en el pecho, opresión torácica, falta de aire súbita, pérdida de conocimiento o adormecimiento facial/corporal, **NO ESPERE**.\n\n📞 Comuníquese de inmediato al **911** o al servicio de emergencias de su cobertura médica, o acérquese a la guardia más cercana.",
    isEmergency: true,
    actions: [
      { label: "Llamar a Emergencias (911)", action: "llamar_911" },
      { label: "Ver dirección de Guardia Central", action: "guardia" },
    ],
  },
  operador: {
    reply:
      "Con mucho gusto lo derivaré con un operador de nuestra Mesa de Ayuda y Soporte.\n\nConectando con un asesor...",
    actions: [
      { label: "Enviar correo a Soporte", action: "abrir_correo" },
      { label: "Línea Telefónica Administrativa", action: "telefono_admin" },
    ],
  },
}

function getBotResponse(userText: string): {
  reply: string
  isEmergency?: boolean
  actions?: { label: string; action: string }[]
} {
  const query = userText.toLowerCase()

  if (
    query.includes("pecho") ||
    query.includes("infarto") ||
    query.includes("paro") ||
    query.includes("ahogo") ||
    query.includes("inconsciente") ||
    query.includes("convuls") ||
    query.includes("sangrado grave")
  ) {
    return BOT_KNOWLEDGE_BASE.emergencia
  }

  if (
    query.includes("guardia") ||
    query.includes("urgencia") ||
    query.includes("horario") ||
    query.includes("emergencias")
  ) {
    return BOT_KNOWLEDGE_BASE.guardia
  }

  if (
    query.includes("sangre") ||
    query.includes("ayuno") ||
    query.includes("analisis") ||
    query.includes("laboratorio") ||
    query.includes("orina")
  ) {
    return BOT_KNOWLEDGE_BASE.laboratorio
  }

  if (
    query.includes("turno") ||
    query.includes("cancelar") ||
    query.includes("reprogramar") ||
    query.includes("cita") ||
    query.includes("doctor")
  ) {
    return BOT_KNOWLEDGE_BASE.turno
  }

  if (
    query.includes("estudio") ||
    query.includes("resultado") ||
    query.includes("descargar") ||
    query.includes("radiografia") ||
    query.includes("tomografia") ||
    query.includes("tac")
  ) {
    return BOT_KNOWLEDGE_BASE.estudios
  }

  if (
    query.includes("operador") ||
    query.includes("humano") ||
    query.includes("persona") ||
    query.includes("asesor") ||
    query.includes("agente")
  ) {
    return BOT_KNOWLEDGE_BASE.operador
  }

  return {
    reply: `He registrado su consulta: "${userText}".\n\nPuedo orientarlo sobre horarios de guardia, preparación para estudios, uso del portal de pacientes o derivar su mensaje directamente a nuestro equipo de atención. ¿Desea que lo comunique con un asesor o prefiere enviarnos un correo?`,
    actions: [
      { label: "Hablar con un operador", action: "operador" },
      { label: "Enviar correo a soporte", action: "abrir_correo" },
      { label: "Ver preguntas frecuentes", action: "faq" },
    ],
  }
}

function HelpChatContent({
  onClose,
  onOpenEmailSupport,
}: {
  onClose: () => void
  onOpenEmailSupport?: () => void
}) {
  const msgCounterRef = React.useRef(0)

  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "initial-1",
      sender: "bot",
      text: "¡Hola! Bienvenido al centro de atención y orientación de Sentria.\n\nPuedo ayudarte con horarios de guardia, preparación para estudios médicos, gestión de turnos o conectarte con el equipo de soporte. ¿En qué podemos ayudarte hoy?",
      timestamp: "12:00",
    },
  ])

  const [inputVal, setInputVal] = React.useState("")
  const [isTyping, setIsTyping] = React.useState(false)
  const [isMaximized, setIsMaximized] = React.useState(false)
  const [isHumanAssigned, setIsHumanAssigned] = React.useState(false)

  const messagesEndRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    inputRef.current?.focus()
  }, [])

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputVal).trim()
    if (!text || isTyping) return

    msgCounterRef.current += 1
    const currentCount = msgCounterRef.current
    const nowTime = new Intl.DateTimeFormat("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date())

    const userMsg: Message = {
      id: `user-${currentCount}`,
      sender: "user",
      text,
      timestamp: nowTime,
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) {
      setInputVal("")
    }

    setIsTyping(true)

    setTimeout(() => {
      const response = getBotResponse(text)
      msgCounterRef.current += 1
      const botCount = msgCounterRef.current
      const replyTime = new Intl.DateTimeFormat("es-AR", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date())

      if (
        text.toLowerCase().includes("operador") ||
        text.toLowerCase().includes("humano") ||
        response === BOT_KNOWLEDGE_BASE.operador
      ) {
        setIsHumanAssigned(true)
        const botMsg: Message = {
          id: `bot-${botCount}`,
          sender: "bot",
          text: response.reply,
          timestamp: replyTime,
          actions: response.actions,
        }
        setMessages((prev) => [...prev, botMsg])

        setTimeout(() => {
          msgCounterRef.current += 1
          const humanMsg: Message = {
            id: `human-${msgCounterRef.current}`,
            sender: "human_agent",
            text: "👨‍⚕️ **Lic. Martín Vázquez (Atención al Paciente):**\n¡Hola! He tomado tu conversación. Estoy leyendo tu consulta y me encuentro a tu disposición para ayudarte.",
            timestamp: new Intl.DateTimeFormat("es-AR", {
              hour: "2-digit",
              minute: "2-digit",
            }).format(new Date()),
          }
          setMessages((prev) => [...prev, humanMsg])
          setIsTyping(false)
        }, 1200)
        return
      }

      const botMsg: Message = {
        id: `bot-${botCount}`,
        sender: "bot",
        text: response.reply,
        timestamp: replyTime,
        isEmergency: response.isEmergency,
        actions: response.actions,
      }

      setMessages((prev) => [...prev, botMsg])
      setIsTyping(false)
    }, 600)
  }

  const handleActionClick = (action: string) => {
    if (action === "abrir_correo") {
      onClose()
      onOpenEmailSupport?.()
      return
    }

    if (action === "llamar_911") {
      window.open("tel:911", "_self")
      return
    }

    if (action === "guardia" || action === "telefonos_guardia") {
      handleSend("¿Cuáles son los números y horarios de guardia?")
      return
    }

    if (action === "descargar_estudios") {
      handleSend("¿Cómo puedo descargar mis estudios de laboratorio o imágenes?")
      return
    }

    if (action === "prep_imagenes") {
      handleSend("¿Qué preparación necesito para una ecografía o tomografía?")
      return
    }

    if (action === "ir_portal" || action === "recuperar_clave") {
      handleSend("¿Cómo ingreso al portal y cómo recupero mi contraseña?")
      return
    }

    if (action === "operador") {
      handleSend("Quiero hablar con un operador")
      return
    }

    handleSend(`Consulta sobre ${action}`)
  }

  const handleResetChat = () => {
    setIsHumanAssigned(false)
    msgCounterRef.current += 1
    const resetTime = new Intl.DateTimeFormat("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date())

    setMessages([
      {
        id: `initial-${msgCounterRef.current}`,
        sender: "bot",
        text: "Conversación reiniciada. ¿En qué otra consulta puedo orientarte?",
        timestamp: resetTime,
      },
    ])
  }

  return (
    <div
      className={`relative flex flex-col bg-white border border-slate-200/80 shadow-2xl overflow-hidden transition-all duration-300 rounded-2xl ${
        isMaximized
          ? "w-full h-[95vh] max-w-5xl"
          : "w-full max-w-2xl h-[85vh] max-h-[680px]"
      }`}
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-chat-title"
    >
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-4 sm:px-6 py-3.5 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-primary">
            <MessageSquare className="h-4 w-4" />
          </div>
          <div>
            <h2
              id="help-chat-title"
              className="text-sm sm:text-base font-bold text-slate-900 leading-tight"
            >
              Centro de Asistencia Sentria
            </h2>
            <p className="text-xs text-slate-500 flex items-center gap-1.5">
              {isHumanAssigned ? (
                <span className="text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Operador en línea
                </span>
              ) : (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  En línea • Orientación 24/7
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-slate-400">
          <button
            type="button"
            onClick={handleResetChat}
            title="Reiniciar chat"
            className="rounded-lg p-1.5 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsMaximized(!isMaximized)}
            title={isMaximized ? "Reducir ventana" : "Ampliar ventana"}
            className="hidden sm:block rounded-lg p-1.5 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            {isMaximized ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar chat"
            className="rounded-lg p-1.5 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Emergency Notice Pill */}
      <div className="bg-rose-50/80 px-4 py-2 border-b border-rose-100 flex items-center justify-between text-xs text-rose-900 shrink-0">
        <div className="flex items-center gap-2 truncate">
          <AlertTriangle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
          <span className="truncate">
            En emergencias con riesgo de vida llame al <strong>911</strong> o acuda a la guardia.
          </span>
        </div>
        <a
          href="tel:911"
          className="shrink-0 ml-2 font-semibold text-rose-700 hover:underline flex items-center gap-1"
        >
          <PhoneCall className="h-3 w-3" /> 911
        </a>
      </div>

      {/* Message Flow Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40">
        {messages.map((msg) => {
          const isUser = msg.sender === "user"
          const isHuman = msg.sender === "human_agent"

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${
                isUser ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`flex gap-2.5 max-w-[90%] sm:max-w-[82%] ${
                  isUser ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {!isUser && (
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs mt-0.5 ${
                      isHuman
                        ? "bg-slate-700 text-white"
                        : "bg-teal-50 text-primary border border-teal-100"
                    }`}
                  >
                    {isHuman ? (
                      <Headphones className="h-3.5 w-3.5" />
                    ) : (
                      <MessageSquare className="h-3.5 w-3.5" />
                    )}
                  </div>
                )}

                {isUser && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs mt-0.5">
                    <User className="h-3.5 w-3.5" />
                  </div>
                )}

                <div className="flex flex-col gap-1">
                  <div
                    className={`rounded-2xl p-3.5 sm:p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                      isUser
                        ? "bg-primary text-white rounded-tr-xs shadow-2xs"
                        : msg.isEmergency
                        ? "bg-rose-50 border border-rose-200 text-rose-950 rounded-tl-xs shadow-2xs"
                        : isHuman
                        ? "bg-teal-50/80 border border-teal-200/80 text-teal-950 rounded-tl-xs shadow-2xs"
                        : "bg-white border border-slate-200/80 text-slate-800 rounded-tl-xs shadow-2xs"
                    }`}
                  >
                    {msg.text.split("\n").map((line, i) => {
                      const formatted = line.replace(/\*\*(.*?)\*\*/g, "$1")
                      return (
                        <span key={i} className="block">
                          {line.startsWith("• ") ? (
                            <span className="inline-block pl-2">{line}</span>
                          ) : line.includes("**") ? (
                            <strong>{formatted}</strong>
                          ) : (
                            line
                          )}
                        </span>
                      )
                    })}
                  </div>

                  {/* Quick action triggers inside message */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {msg.actions.map((act) => (
                        <button
                          key={act.action}
                          type="button"
                          onClick={() => handleActionClick(act.action)}
                          className="inline-flex items-center gap-1 text-xs bg-white text-slate-700 hover:text-primary hover:border-primary px-3 py-1.5 rounded-full border border-slate-200/80 transition-all font-medium cursor-pointer shadow-2xs"
                        >
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  <span
                    className={`text-[11px] text-slate-400 px-1 ${
                      isUser ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            </div>
          )
        })}

        {isTyping && (
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-primary border border-teal-100 text-xs mt-0.5">
              <MessageSquare className="h-3.5 w-3.5" />
            </div>
            <div className="rounded-2xl rounded-tl-xs bg-white border border-slate-200/80 px-4 py-3 text-xs text-slate-500 flex items-center gap-2 shadow-2xs">
              <div className="flex space-x-1">
                <div className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce" />
                <div className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
              <span>Escribiendo...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Questions Pills */}
      <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-2 overflow-x-auto shrink-0">
        <div className="flex items-center gap-1.5 text-xs no-scrollbar">
          <span className="text-[11px] text-slate-400 font-semibold shrink-0 uppercase tracking-wider">
            Sugerencias:
          </span>
          {INITIAL_SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              type="button"
              onClick={() => handleSend(sug)}
              className="shrink-0 rounded-full bg-white px-3 py-1 text-xs text-slate-600 hover:text-primary hover:border-primary border border-slate-200/80 transition-colors cursor-pointer font-medium shadow-2xs"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="p-3.5 sm:p-4 bg-white border-t border-slate-100 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSend()
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Escriba su consulta..."
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10"
          />

          <Button
            type="submit"
            disabled={!inputVal.trim() || isTyping}
            variant="primary"
            className="h-10 w-10 p-0 rounded-xl flex items-center justify-center text-white shrink-0"
            title="Enviar mensaje"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>

        <p className="mt-2 text-center text-[11px] text-slate-400">
          Información orientativa regida por la Ley de Derechos del Paciente (Ley 26.529).
        </p>
      </div>
    </div>
  )
}

const emptySubscribe = () => () => {}

export function HelpChatModal({ isOpen, onClose, onOpenEmailSupport }: HelpChatModalProps) {
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
      className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <HelpChatContent
        onClose={onClose}
        onOpenEmailSupport={onOpenEmailSupport}
      />
    </div>,
    document.body
  )
}
