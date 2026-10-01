import { UserSettingsData } from "../types/settings"

const SETTINGS_STORAGE_KEY = "sentria_patient_settings"

export const DEFAULT_SETTINGS: UserSettingsData = {
  fullName: "María Florencia Gómez",
  dni: "38.452.901",
  birthDate: "14/05/1994",
  gender: "femenino",
  phone: "+54 9 11 4589-2210",
  email: "florencia.gomez@email.com",
  address: "Av. Cabildo 1845, Piso 4 B, CABA (C1428AAE)",
  avatarUrl:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBwmdIBDTsdmh-7ASi7R-cesxbsLdC6MYc7RQ58gYBq9BqJM7Y9q91dVmL3x2GSntiqRELL7s4-vYiSuoJLqk_g6jqMwXufQ2NngDFDbxHJ0sua3hQl6a8Tsr9JUHUGXraFdso9nuIf55qTKXMYZvBSXBM3bndUy0O02139COPIJDsF5kxmzCmT7-0rmI9BK5dntzFLrgTWPWMGdCeOWrYrRBfnmF2Jhp0fppHtQ8lFnWsLzI-7BJ0",
  hceNumber: "HCE-9924-B",
  isIdentityValidated: true,

  coverageProvider: "OSDE Medicina Prepaga",
  coveragePlan: "Plan 310 (Con Copago Cero)",
  affiliateNumber: "48920184-01",
  coverageStatus: "Validación Automática Vigente",
  coverageExpiry: "12/2026",

  twoFactorEnabled: true,
  passwordLastUpdated: "hace 3 meses (Nivel de seguridad: Alto)",
  sessions: [
    {
      id: "sess-1",
      device: 'MacBook Pro 14"',
      location: "Buenos Aires, Argentina",
      activity: "Sesión actual en Chrome 124 • En línea ahora",
      isCurrent: true,
      type: "laptop",
    },
    {
      id: "sess-2",
      device: "iPhone 14 Pro",
      location: "Sentria App iOS",
      activity: "Última actividad: Ayer, 19:42 hs",
      isCurrent: false,
      type: "smartphone",
    },
  ],

  whatsappReminders: true,
  emailResults: true,
  fastSlotAlerts: true,
}

export const settingsService = {
  getSettings(): UserSettingsData {
    if (typeof window === "undefined") return DEFAULT_SETTINGS
    try {
      const stored = localStorage.getItem(SETTINGS_STORAGE_KEY)
      if (stored) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) }
      }
    } catch {
      // Fallback to default
    }
    return DEFAULT_SETTINGS
  },

  saveSettings(data: Partial<UserSettingsData>): UserSettingsData {
    if (typeof window === "undefined") return DEFAULT_SETTINGS
    try {
      const current = settingsService.getSettings()
      const updated = { ...current, ...data }
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated))
      return updated
    } catch {
      return DEFAULT_SETTINGS
    }
  },

  resetSettings(): UserSettingsData {
    if (typeof window !== "undefined") {
      localStorage.removeItem(SETTINGS_STORAGE_KEY)
    }
    return DEFAULT_SETTINGS
  },
}
