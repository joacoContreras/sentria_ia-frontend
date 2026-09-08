"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RegistrationSuccessProps {
  tab: "login" | "register"
  fullName?: string
  coverageProvider?: string
  email?: string
  onReset: () => void
}

export function RegistrationSuccess({
  tab,
  fullName,
  coverageProvider,
  email,
  onReset,
}: RegistrationSuccessProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-space-md py-space-xl text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <CheckCircle2 className="h-10 w-10" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-space-2xs">
        <h3 className="text-headline-md text-on-surface">
          {tab === "register" ? "¡Ficha Clínica Creada!" : "¡Bienvenido de vuelta!"}
        </h3>
        <p className="text-body-md text-secondary max-w-md">
          {tab === "register"
            ? `Se ha registrado exitosamente a ${fullName || "el paciente"}. Su credencial ${
                coverageProvider || "médica"
              } está siendo validada.`
            : `Has iniciado sesión correctamente con ${email}.`}
        </p>
      </div>
      <Button variant="secondary" onClick={onReset}>
        Realizar otra operación
      </Button>
    </div>
  )
}
