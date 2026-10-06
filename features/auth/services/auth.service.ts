import { apiClient } from "@/lib/api-client"
import type {
  PatientRegistrationInput,
  PatientLoginInput,
  AuthResponse,
  AuthUser,
} from "@/types/auth"

interface BackendAuthPayload {
  token?: string
  jwt?: string
  accessToken?: string
  user?: AuthUser
  id?: string
  fullName?: string
  email?: string
  docNumber?: string
  docType?: string
  phone?: string
  coverageProvider?: string
  memberId?: string
  message?: string
}

/**
 * Servicio de Autenticación y Registro de Pacientes
 * Desacopla la lógica de red/API de los componentes de UI.
 * Soporta llamadas HTTP reales mediante apiClient (Java REST API) y modo mock simulado de contingencia.
 */
export const authService = {
  /**
   * Registro de nuevo paciente
   */
  async register(data: PatientRegistrationInput): Promise<AuthResponse> {
    const isApiConfigured = Boolean(process.env.NEXT_PUBLIC_API_URL)

    if (isApiConfigured) {
      const response = await apiClient<BackendAuthPayload>("/api/auth/register", {
        method: "POST",
        requiresAuth: false,
        body: {
          fullName: data.fullName,
          docType: data.docType,
          docNumber: data.docNumber,
          phone: data.phone,
          email: data.email,
          password: data.password,
          coverageProvider: data.coverageProvider,
          memberId: data.memberId,
          acceptTerms: data.acceptTerms,
        },
      })

      if (!response.success || !response.data) {
        return {
          success: false,
          message: response.message || "Error al procesar el registro",
          error: response.error || "No se pudo registrar la ficha clínica",
          statusCode: response.statusCode,
        }
      }

      const resData = response.data
      const user: AuthUser = resData.user || {
        id: resData.id || crypto.randomUUID(),
        fullName: resData.fullName || data.fullName,
        email: resData.email || data.email,
        docNumber: resData.docNumber || data.docNumber,
        docType: resData.docType || data.docType,
        phone: resData.phone || data.phone,
        coverageProvider: resData.coverageProvider || data.coverageProvider,
        memberId: resData.memberId || data.memberId,
      }

      return {
        success: true,
        message: response.message || `Ficha clínica creada exitosamente para ${data.fullName}`,
        user,
        token: resData.token || resData.jwt || resData.accessToken,
        statusCode: response.statusCode,
      }
    }

    // Modo Simulado (Mock) de contingencia para desarrollo local
    await new Promise((resolve) => setTimeout(resolve, 800))

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

  /**
   * Inicio de sesión de paciente
   */
  async login(credentials: PatientLoginInput): Promise<AuthResponse> {
    const isApiConfigured = Boolean(process.env.NEXT_PUBLIC_API_URL)

    if (isApiConfigured) {
      const response = await apiClient<BackendAuthPayload>("/api/auth/login", {
        method: "POST",
        requiresAuth: false,
        body: credentials,
      })

      if (!response.success || !response.data) {
        return {
          success: false,
          message: response.message || "Error de autenticación",
          error: response.error || "Credenciales incorrectas",
          statusCode: response.statusCode,
        }
      }

      const resData = response.data
      const parsedUser = resData.user || (resData.id || resData.email ? {
        id: resData.id || crypto.randomUUID(),
        fullName: resData.fullName || credentials.email.split("@")[0],
        email: resData.email || credentials.email,
        docNumber: resData.docNumber || "",
        docType: resData.docType,
        phone: resData.phone,
        coverageProvider: resData.coverageProvider,
        memberId: resData.memberId,
      } : undefined)

      if (!parsedUser) {
        return {
          success: false,
          message: "Respuesta de autenticación incompleta del servidor.",
          error: "Formato de respuesta inválido: faltan datos del paciente.",
          statusCode: response.statusCode,
        }
      }

      return {
        success: true,
        message: response.message || "Autenticación correcta",
        user: parsedUser,
        token: resData.token || resData.jwt || resData.accessToken,
        statusCode: response.statusCode,
      }
    }

    // Modo Simulado (Mock) de contingencia para desarrollo local
    await new Promise((resolve) => setTimeout(resolve, 600))

    return {
      success: true,
      message: "Autenticación correcta",
      token: "mock-jwt-token",
      user: {
        id: crypto.randomUUID(),
        fullName: "Paciente Registrado",
        email: credentials.email,
        docNumber: "38.452.901",
        docType: "DNI",
        coverageProvider: "OSDE 310",
        phone: "+54 11 4892-1200",
        memberId: "492-3849102-01",
      },
    }
  },

  /**
   * Solicitud de restablecimiento de contraseña
   */
  async forgotPassword(email: string): Promise<{ success: boolean; message: string; error?: string }> {
    const isApiConfigured = Boolean(process.env.NEXT_PUBLIC_API_URL)

    if (isApiConfigured) {
      const response = await apiClient<{ message?: string }>("/api/auth/forgot-password", {
        method: "POST",
        requiresAuth: false,
        body: { email },
      })

      return {
        success: response.success,
        message: response.message || (response.success ? "Instrucciones enviadas al correo" : "Error al procesar solicitud"),
        error: response.error,
      }
    }

    // Modo Simulado (Mock)
    await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      success: true,
      message: "Hemos enviado las instrucciones de recuperación a su correo electrónico.",
    }
  },

  /**
   * Obtiene los datos del perfil actual a partir del token de sesión
   */
  async getProfile(): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
    const isApiConfigured = Boolean(process.env.NEXT_PUBLIC_API_URL)

    if (isApiConfigured) {
      const response = await apiClient<AuthUser>("/api/patient/me", {
        method: "GET",
        requiresAuth: true,
      })

      return {
        success: response.success,
        user: response.data,
        error: response.error,
      }
    }

    return {
      success: true,
      user: {
        id: "mock-user-01",
        fullName: "María Florencia Gómez",
        email: "florencia.gomez@sentria.ai",
        docNumber: "38.452.901",
        docType: "DNI",
        coverageProvider: "OSDE 310",
        memberId: "492-3849102-01",
      },
    }
  },
}
