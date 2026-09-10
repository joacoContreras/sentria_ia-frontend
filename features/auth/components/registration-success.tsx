"use client"

import { CheckCircle2, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
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
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center gap-space-md py-space-xl text-center animate-fade-in">
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

      <div className="flex flex-col sm:flex-row items-center gap-space-sm w-full max-w-xs mt-space-xs">
        <Button
          variant="primary"
          onClick={() => router.push("/portal")}
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className="w-full"
        >
          Ingresar a mi Portal
        </Button>
        <Button variant="secondary" onClick={onReset} className="w-full">
          Cerrar
        </Button>
      </div>
    </div>
  )
}

