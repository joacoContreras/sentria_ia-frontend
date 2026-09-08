import type {
  PatientRegistrationInput,
  PatientLoginInput,
  AuthResponse,
} from "@/types/auth"

/**
 * Servicio de Autenticación y Registro de Pacientes
 * Desacopla la lógica de red/API de los componentes de UI.
 */
export const authService = {
  async register(data: PatientRegistrationInput): Promise<AuthResponse> {
    // Simulación de latencia de red para ambiente local / mock
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
    // Simulación de llamada a endpoint de autenticación
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
