import type {
  PatientRegistrationInput,
  PatientLoginInput,
  AuthResponse,
} from "@/types/auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const REQUEST_TIMEOUT_MS = 10000

async function safeJsonParse(response: Response): Promise<Record<string, unknown>> {
  try {
    const text = await response.text()
    return text ? JSON.parse(text) : {}
  } catch {
    return {
      message: `Respuesta inválida del servidor (${response.status})`,
    }
  }
}

/**
 * Servicio de Autenticación y Registro de Pacientes
 * Desacopla la lógica de red/API de los componentes de UI.
 * Soporta llamadas HTTP reales mediante NEXT_PUBLIC_API_URL y modo mock simulado para desarrollo.
 */
export const authService = {
  async register(data: PatientRegistrationInput): Promise<AuthResponse> {
    if (API_BASE_URL) {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)
        const result = await safeJsonParse(response)

        if (!response.ok) {
          const errorMessage =
            typeof result.error === "string"
              ? result.error
              : typeof result.message === "string"
                ? result.message
                : `Error del servidor (${response.status})`

          return {
            success: false,
            message: (typeof result.message === "string" && result.message) || "Error al procesar el registro",
            error: errorMessage,
            statusCode: response.status,
          }
        }

        return {
          success: true,
          message:
            (typeof result.message === "string" && result.message) ||
            `Ficha clínica creada exitosamente para ${data.fullName}`,
          user: (result.user as AuthResponse["user"]) || {
            id: typeof result.id === "string" ? result.id : crypto.randomUUID(),
            fullName: data.fullName,
            email: data.email,
            docNumber: data.docNumber,
            docType: data.docType,
            phone: data.phone,
            coverageProvider: data.coverageProvider,
            memberId: data.memberId,
          },
          token: typeof result.token === "string" ? result.token : undefined,
          statusCode: response.status,
        }
      } catch (err: unknown) {
        clearTimeout(timeoutId)
        const isAbort = err instanceof DOMException && err.name === "AbortError"
        return {
          success: false,
          message: isAbort
            ? "El servidor tardó demasiado en responder. Intente nuevamente."
            : err instanceof Error
              ? err.message
              : "No se pudo establecer conexión con el servidor de autenticación.",
          error: isAbort ? "Tiempo de espera agotado" : "Error de red",
        }
      }
    }

    // Modo Simulado (Mock) para desarrollo local
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      success: true,
      message: `Ficha clínica creada exitosamente para ${data.fullName}`,
      token: "mock-jwt-token",
      user: {
        id: crypto.randomUUID(),
        fullName: data.fullName,
        email: data.email,
        docNumber: data.docNumber,
        docType: data.docType,
        phone: data.phone,
        coverageProvider: data.coverageProvider,
        memberId: data.memberId,
      },
    }
  },

  async login(credentials: PatientLoginInput): Promise<AuthResponse> {
    if (API_BASE_URL) {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(credentials),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)
        const result = await safeJsonParse(response)

        if (!response.ok) {
          const errorMessage =
            typeof result.error === "string"
              ? result.error
              : typeof result.message === "string"
                ? result.message
                : `Error de autenticación (${response.status})`

          return {
            success: false,
            message: (typeof result.message === "string" && result.message) || "Credenciales incorrectas",
            error: errorMessage,
            statusCode: response.status,
          }
        }

        return {
          success: true,
          message: (typeof result.message === "string" && result.message) || "Autenticación correcta",
          user: (result.user as AuthResponse["user"]) || {
            id: typeof result.id === "string" ? result.id : crypto.randomUUID(),
            fullName: "Paciente Registrado",
            email: credentials.email,
            docNumber: "12.345.678",
          },
          token: typeof result.token === "string" ? result.token : undefined,
          statusCode: response.status,
        }
      } catch (err: unknown) {
        clearTimeout(timeoutId)
        const isAbort = err instanceof DOMException && err.name === "AbortError"
        return {
          success: false,
          message: isAbort
            ? "El servidor tardó demasiado en responder. Intente nuevamente."
            : err instanceof Error
              ? err.message
              : "No se pudo establecer conexión con el servidor de autenticación.",
          error: isAbort ? "Tiempo de espera agotado" : "Error de red",
        }
      }
    }

    // Modo Simulado (Mock) para desarrollo local
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
      success: true,
      message: "Autenticación correcta",
      token: "mock-jwt-token",
      user: {
        id: crypto.randomUUID(),
        fullName: "Paciente Registrado",
        email: credentials.email,
        docNumber: "12.345.678",
      },
    }
  },
}


