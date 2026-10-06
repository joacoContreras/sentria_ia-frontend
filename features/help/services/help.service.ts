import { apiClient } from "@/lib/api-client"

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

      if (!response.success && response.error) {
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
   * Envía un mensaje al asistente virtual / agente y obtiene respuesta
   * Conecta con POST /api/support/chat/message o devuelve fallback del bot
   */
  async sendChatMessage(
    sessionId: string,
    messageText: string
  ): Promise<{
    success: boolean
    message?: ChatMessageResponse
    error?: string
  }> {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const response = await apiClient<ChatMessageResponse>("/api/support/chat/message", {
        method: "POST",
        requiresAuth: false,
        body: {
          sessionId,
          text: messageText,
        },
      })

      if (response.success && response.data) {
        return {
          success: true,
          message: response.data,
        }
      }
    }

    return {
      success: false,
      error: "Modo mock: responder con base de conocimiento local",
    }
  },
}
