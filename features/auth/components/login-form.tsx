"use client"

import * as React from "react"
import { Mail, LogIn } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { Button } from "@/components/ui/button"
import type { PatientLoginInput } from "@/types/auth"

interface LoginFormProps {
  isLoading: boolean
  onSubmit: (data: PatientLoginInput) => void
}

export function LoginForm({ isLoading, onSubmit }: LoginFormProps) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
      <Input
        label="Correo Electrónico"
        id="login-email"
        name="email"
        type="email"
        required
        placeholder="paciente@email.com"
        leftIcon={<Mail className="h-5 w-5" />}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <PasswordInput
        label="Contraseña"
        id="login-password"
        name="password"
        required
        placeholder="••••••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="flex justify-end">
        <a
          href="#recuperar"
          className="text-label-sm text-primary hover:underline"
        >
          ¿Olvidó su contraseña?
        </a>
      </div>

      <Button
        type="submit"
        isLoading={isLoading}
        leftIcon={<LogIn className="h-5 w-5" />}
        className="w-full mt-space-sm"
      >
        Ingresar al Portal
      </Button>
    </form>
  )
}
