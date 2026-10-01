import { apiClient } from "@/lib/api-client"
import { MedicalConsultation, PatientClinicalProfile } from "@/types/medical-history"
import {
  INITIAL_CONSULTATIONS,
  ADDITIONAL_2023_CONSULTATIONS,
  PATIENT_CLINICAL_PROFILE,
} from "../data/medical-history-data"

export const medicalHistoryService = {
  /**
   * Obtiene el listado de consultas e historial clínico del paciente
   * Conecta con GET /api/patient/records o devuelve datos mock locales
   */
  async getConsultations(year?: string): Promise<{
    success: boolean
    consultations: MedicalConsultation[]
    error?: string
  }> {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const url = year ? `/api/patient/records?year=${year}` : "/api/patient/records"
      const response = await apiClient<MedicalConsultation[]>(url, {
        method: "GET",
      })

      if (response.success && Array.isArray(response.data)) {
        return {
          success: true,
          consultations: response.data,
        }
      }
    }

    // Modo Simulado (Mock)
    await new Promise((resolve) => setTimeout(resolve, 80))
    if (year === "2023") {
      return {
        success: true,
        consultations: [...ADDITIONAL_2023_CONSULTATIONS],
      }
    }

    return {
      success: true,
      consultations: [...INITIAL_CONSULTATIONS],
    }
  },

  /**
   * Obtiene el perfil clínico del paciente (alergias, grupo sanguíneo, medicación)
   * Conecta con GET /api/patient/profile o devuelve datos mock locales
   */
  async getClinicalProfile(): Promise<{
    success: boolean
    profile: PatientClinicalProfile
    error?: string
  }> {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const response = await apiClient<PatientClinicalProfile>("/api/patient/profile", {
        method: "GET",
      })

      if (response.success && response.data) {
        return {
          success: true,
          profile: response.data,
        }
      }
    }

    return {
      success: true,
      profile: PATIENT_CLINICAL_PROFILE,
    }
  },

  /**
   * Obtiene la URL de descarga firmada o genera el blob del informe clínico
   */
  async getRecordDownloadUrl(recordId: string): Promise<{
    success: boolean
    downloadUrl?: string
    error?: string
  }> {
    if (process.env.NEXT_PUBLIC_API_URL) {
      const response = await apiClient<{ downloadUrl: string }>(
        `/api/patient/records/${recordId}/download`,
        { method: "GET" }
      )

      if (response.success && response.data?.downloadUrl) {
        return {
          success: true,
          downloadUrl: response.data.downloadUrl,
        }
      }
    }

    return {
      success: true,
      downloadUrl: `#download-${recordId}`,
    }
  },
}
