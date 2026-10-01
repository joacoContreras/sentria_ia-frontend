"use client"

import * as React from "react"
import { authService } from "../services/auth.service"
import type {
  AuthUser,
  PatientLoginInput,
  PatientRegistrationInput,
  AuthResponse,
} from "@/types/auth"

const DEV_USER: AuthUser = {
    id: "dev-001",
    fullName: "Developer Sentria",
    email: "dev@sentria.ai",
    docNumber: "99.999.999",
    docType: "DNI",
    coverageProvider: "Modo Desarrollador (OSDE 410)",
    phone: "+54 11 9999-9999",
    memberId: "DEV-9999"
}



interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  isHydrated: boolean
  login: (credentials: PatientLoginInput) => Promise<AuthResponse>
  register: (data: PatientRegistrationInput) => Promise<AuthResponse>
  logout: () => void
}

const AuthContext = React.createContext<AuthContextValue | undefined>(undefined)

const STORAGE_KEY = "sentria_patient_session"

interface SessionData {
  user: AuthUser | null
  token: string | null
}

const emptySession: SessionData = { user: null, token: null }
let cachedSession: SessionData | null = null
const listeners = new Set<() => void>()


function parseSafeSession(raw: string | null): SessionData {
  if (!raw) return emptySession
  try {
    const parsed = JSON.parse(raw)
    if (
      parsed &&
      typeof parsed === "object" &&
      parsed.user &&
      typeof parsed.user === "object" &&
      typeof parsed.user.email === "string" &&
      typeof parsed.user.fullName === "string"
    ) {
      return {
        user: parsed.user as AuthUser,
        token: typeof parsed.token === "string" ? parsed.token : null,
      }
    }
  } catch {
    // Si la estructura del JSON es inválida o corrupta, devolver sesión vacía
  }
  return emptySession
}

function getSessionSnapshot(): SessionData {
  if (typeof window === "undefined") return emptySession
  if (cachedSession === null) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      cachedSession = parseSafeSession(saved)
    } catch {
      cachedSession = emptySession
    }
  }
  return cachedSession || emptySession
}

function updateSession(session: SessionData) {
  cachedSession = session
  if (typeof window !== "undefined") {
    try {
      if (session.user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // Manejar posibles errores como almacenamiento lleno o modo privado restringido
    }
  }
  listeners.forEach((listener) => listener())
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cachedSession = parseSafeSession(e.newValue)
      callback()
    }
  }
  window.addEventListener("storage", handleStorage)
  return () => {
    listeners.delete(callback)
    window.removeEventListener("storage", handleStorage)
  }
}

const emptySubscribe = () => () => {}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = React.useSyncExternalStore(
    subscribe,
    getSessionSnapshot,
    () => emptySession
  )
  const isHydrated = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const [isPending, setIsPending] = React.useState(false)

  // En entorno de desarrollo o con variable activada, proveer perfil developer si no hay sesión
  const isDevBypass =
    process.env.NEXT_PUBLIC_DEV_AUTO_LOGIN === "true" ||
    process.env.NODE_ENV === "development"

  const effectiveUser = session.user || (isDevBypass ? DEV_USER : null)
  const effectiveToken = session.token || (isDevBypass ? "dev-mock-token" : null)

  const login = async (credentials: PatientLoginInput): Promise<AuthResponse> => {
    setIsPending(true)
    try {
      const response = await authService.login(credentials)
      if (response.success && response.user) {
        updateSession({
          user: response.user,
          token: response.token || null,
        })
      }
      return response
    } finally {
      setIsPending(false)
    }
  }

  const register = async (
    data: PatientRegistrationInput
  ): Promise<AuthResponse> => {
    setIsPending(true)
    try {
      const response = await authService.register(data)
      if (response.success && response.user) {
        updateSession({
          user: response.user,
          token: response.token || null,
        })
      }
      return response
    } finally {
      setIsPending(false)
    }
  }

  const logout = () => {
    updateSession({ user: null, token: null })
  }

  const value: AuthContextValue = {
    user: effectiveUser,
    token: effectiveToken,
    isAuthenticated: !!effectiveUser,
    isLoading: isPending,
    isHydrated,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un <AuthProvider>")
  }
  return context
}

