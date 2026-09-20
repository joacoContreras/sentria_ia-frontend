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
    <div className="flex flex-col items-center justify-center gap-4 py-8 text-center animate-fade-in">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-50 text-primary">
        <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
      </div>
      <div className="flex flex-col gap-1.5">
        <h3 className="text-xl font-bold text-slate-900">
          {tab === "register" ? "Ficha creada con éxito" : "Sesión iniciada"}
        </h3>
        <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
          {tab === "register"
            ? `Se ha registrado exitosamente a ${fullName || "el paciente"}${
                coverageProvider ? ` (${coverageProvider})` : ""
              }. Ya puede acceder a su portal.`
            : `Ha ingresado correctamente con la cuenta ${email}.`}
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full max-w-xs mt-2">
        <Button
          variant="primary"
          onClick={() => router.push("/portal")}
          rightIcon={<ArrowRight className="h-4 w-4" />}
          className="w-full text-white"
        >
          Ingresar al Portal
        </Button>
        <Button variant="secondary" onClick={onReset} className="w-full">
          Cerrar
        </Button>
      </div>
    </div>
  )
}

