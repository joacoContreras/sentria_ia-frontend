"use client"

import * as React from "react"
import { authService } from "../services/auth.service"
import type {
  AuthUser,
  PatientLoginInput,
  PatientRegistrationInput,
  AuthResponse,
} from "@/types/auth"

interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
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

function getSessionSnapshot(): SessionData {
  if (typeof window === "undefined") return emptySession
  if (cachedSession === null) {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      cachedSession = saved ? JSON.parse(saved) : emptySession
    } catch {
      cachedSession = emptySession
    }
  }
  return cachedSession || emptySession
}

function updateSession(session: SessionData) {
  cachedSession = session
  if (typeof window !== "undefined") {
    if (session.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }
  listeners.forEach((listener) => listener())
}

function subscribe(callback: () => void) {
  listeners.add(callback)
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      try {
        cachedSession = e.newValue ? JSON.parse(e.newValue) : emptySession
      } catch {
        cachedSession = emptySession
      }
      callback()
    }
  }
  window.addEventListener("storage", handleStorage)
  return () => {
    listeners.delete(callback)
    window.removeEventListener("storage", handleStorage)
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const session = React.useSyncExternalStore(
    subscribe,
    getSessionSnapshot,
    () => emptySession
  )
  const [isPending, setIsPending] = React.useState(false)

  const login = async (credentials: PatientLoginInput): Promise<AuthResponse> => {
    setIsPending(true)
    try {
      const response = await authService.login(credentials)
      if (response.success && response.user) {
        updateSession({ user: response.user, token: "mock-jwt-token" })
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
        updateSession({ user: response.user, token: "mock-jwt-token" })
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
    user: session.user,
    token: session.token,
    isAuthenticated: !!session.user,
    isLoading: isPending,
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
