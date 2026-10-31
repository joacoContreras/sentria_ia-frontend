import { apiClient, isEndpointUnavailable } from "@/lib/api-client"

export interface SupportTicketInput {
  name: string
  email: string
  category: string
  priority: string
  subject: string
  message: string
  attachment?: File | null
}

export interface SupportTicketResponse {
  ticketCode: string
  createdAt: string
  message?: string
}

export interface ChatMessageResponse {
  id: string
  sender: "bot" | "user" | "human_agent" | "system"
  text: string
  timestamp: string
  isEmergency?: boolean
  actions?: { label: string; action: string }[]
  suggestedSpecialty?: string
}

/** Mensaje del historial local que se reenvía al backend */
export interface ChatHistoryEntry {
  sender: "bot" | "user" | "human_agent" | "system"
  text: string
}

/** Respuesta de POST /api/v1/ia/chat (record RespuestaChat del backend) */
export interface AssistantChatResponse {
  tipo:
    | "administrativo"
    | "triage"
    | "emergencia"
    | "rechazo_clinico"
    | "fuera_de_dominio"
    | "intento_manipulacion"
  respuesta: string
  alertaEmergencia: boolean
  reservaHabilitada: boolean
  especialidadSugerida: string | null
}

export const helpService = {
  /**
   * Crea un nuevo ticket de soporte con o sin archivo adjunto
   * Conecta con POST /api/support/tickets o genera ticket simulado
   */
  async createTicket(input: SupportTicketInput): Promise<{
    success: boolean
    ticketCode: string
    timestamp: string
    error?: string
  }> {
    if (process.env.NEXT_PUBLIC_API_URL) {
      let body: FormData | Record<string, unknown>

      if (input.attachment) {
        const formData = new FormData()
        formData.append("name", input.name)
        formData.append("email", input.email)
        formData.append("category", input.category)
        formData.append("priority", input.priority)
        formData.append("subject", input.subject)
        formData.append("message", input.message)
        formData.append("file", input.attachment)
        body = formData
      } else {
        body = {
          name: input.name,
          email: input.email,
          category: input.category,
          priority: input.priority,
          subject: input.subject,
          message: input.message,
        }
      }

      const response = await apiClient<SupportTicketResponse>("/api/support/tickets", {
        method: "POST",
        requiresAuth: false,
        body,
      })

      if (response.success && response.data) {
        return {
          success: true,
          ticketCode: response.data.ticketCode,
          timestamp: response.data.createdAt || new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }),
        }
      }

      if (!response.success && response.error && !isEndpointUnavailable(response)) {
        return {
          success: false,
          ticketCode: "",
          timestamp: "",
          error: response.error,
        }
      }
    }

    // Modo Simulado (Mock)
    await new Promise((resolve) => setTimeout(resolve, 900))
    const generatedTicket = `TKT-${Math.floor(100000 + Math.random() * 900000)}`
    const now = new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
    })

    return {
      success: true,
      ticketCode: generatedTicket,
      timestamp: now,
    }
  },

  /**
   * Envía la conversación al asistente IA del backend Java (RF-06 / RF-07)
   * Conecta con POST /api/v1/ia/chat. El backend recibe el historial completo
   * (roles "usuario" / "asistente") y agrega el system prompt por su cuenta.
   */
  async sendChatMessage(
    history: ChatHistoryEntry[]
  ): Promise<{
    success: boolean
    message?: ChatMessageResponse
    error?: string
  }> {
    if (!process.env.NEXT_PUBLIC_API_URL) {
      return {
        success: false,
        error: "Modo mock: responder con base de conocimiento local",
      }
    }

    const mensajes = history
      .filter((m) => (m.sender === "user" || m.sender === "bot") && m.text.trim())
      .map((m) => ({
        rol: m.sender === "user" ? "usuario" : "asistente",
        contenido: m.text,
      }))

    const response = await apiClient<AssistantChatResponse>("/api/v1/ia/chat", {
      method: "POST",
      requiresAuth: false,
      body: { mensajes },
    })

    if (!response.success || !response.data || typeof response.data.respuesta !== "string") {
      return {
        success: false,
        error: response.error || "El asistente IA no está disponible",
      }
    }

    const data = response.data
    const actions: { label: string; action: string }[] = []
    if (data.alertaEmergencia) {
      actions.push(
        { label: "Llamar a Emergencias (911)", action: "llamar_911" },
        { label: "Ver dirección de Guardia Central", action: "guardia" }
      )
    } else if (data.reservaHabilitada && data.especialidadSugerida) {
      actions.push({
        label: `Buscar turnos de ${data.especialidadSugerida}`,
        action: "buscar_turnos",
      })
    }

    return {
      success: true,
      message: {
        id: `ia-${Date.now()}`,
        sender: "bot",
        text: data.respuesta,
        timestamp: new Intl.DateTimeFormat("es-AR", { hour: "2-digit", minute: "2-digit" }).format(new Date()),
        isEmergency: data.alertaEmergencia,
        actions: actions.length ? actions : undefined,
        suggestedSpecialty: data.especialidadSugerida || undefined,
      },
    }
  },
}
