import type {
  PatientRegistrationInput,
  PatientLoginInput,
  AuthResponse,
} from "@/types/auth"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

/**
 * Servicio de Autenticación y Registro de Pacientes
 * Desacopla la lógica de red/API de los componentes de UI.
 * Soporta llamadas HTTP reales mediante NEXT_PUBLIC_API_URL y modo mock simulado para desarrollo.
 */
export const authService = {
  async register(data: PatientRegistrationInput): Promise<AuthResponse> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(data),
        })

        const result = await response.json()

        if (!response.ok) {
          return {
            success: false,
            message: result.message || "Error al procesar el registro",
            error: result.error || result.message || `Error del servidor (${response.status})`,
          }
        }

        return {
          success: true,
          message: result.message || `Ficha clínica creada exitosamente para ${data.fullName}`,
          user: result.user,
        }
      } catch (err) {
        throw new Error(
          err instanceof Error
            ? err.message
            : "No se pudo establecer conexión con el servidor de autenticación."
        )
      }
    }

    // Modo Simulado (Mock) para desarrollo local
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      success: true,
      message: `Ficha clínica creada exitosamente para ${data.fullName}`,
      user: {
        id: crypto.randomUUID(),
        fullName: data.fullName,
        email: data.email,
        docNumber: data.docNumber,
        coverageProvider: data.coverageProvider,
      },
    }
  },

  async login(credentials: PatientLoginInput): Promise<AuthResponse> {
    if (API_BASE_URL) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(credentials),
        })

        const result = await response.json()

        if (!response.ok) {
          return {
            success: false,
            message: result.message || "Credenciales incorrectas",
            error: result.error || result.message || `Error de autenticación (${response.status})`,
          }
        }

        return {
          success: true,
          message: result.message || "Autenticación correcta",
          user: result.user,
        }
      } catch (err) {
        throw new Error(
          err instanceof Error
            ? err.message
            : "No se pudo establecer conexión con el servidor de autenticación."
        )
      }
    }

    // Modo Simulado (Mock) para desarrollo local
    await new Promise((resolve) => setTimeout(resolve, 1200))

    return {
      success: true,
      message: "Autenticación correcta",
      user: {
        id: crypto.randomUUID(),
        fullName: "Paciente Registrado",
        email: credentials.email,
        docNumber: "12.345.678",
      },
    }
  },
}

