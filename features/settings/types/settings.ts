export interface UserSession {
  id: string
  device: string
  location: string
  activity: string
  isCurrent: boolean
  type: "laptop" | "smartphone"
}

export interface UserSettingsData {
  // Personal info
  fullName: string
  dni: string
  birthDate: string
  gender: "femenino" | "masculino" | "no-binario" | "otro"
  phone: string
  email: string
  address: string
  avatarUrl: string
  hceNumber: string
  isIdentityValidated: boolean

  // Medical coverage
  coverageProvider: string
  coveragePlan: string
  affiliateNumber: string
  coverageStatus: string
  coverageExpiry: string

  // Security
  twoFactorEnabled: boolean
  passwordLastUpdated: string
  sessions: UserSession[]

  // Preferences & notifications
  whatsappReminders: boolean
  emailResults: boolean
  fastSlotAlerts: boolean
}
