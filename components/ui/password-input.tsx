"use client"

import * as React from "react"
import { KeyRound, Eye, EyeOff, Info, Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  showStrengthMeter?: boolean
  containerClassName?: string
}

function calculatePasswordScore(value: string = ""): number {
  let score = 0
  if (value.length >= 8) score++
  if (/[A-Z]/.test(value)) score++
  if (/[0-9]/.test(value)) score++
  if (/[^A-Za-z0-9]/.test(value)) score++
  return score
}

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      className,
      containerClassName,
      label = "Contraseña",
      helperText,
      error,
      showStrengthMeter = false,
      value = "",
      onChange,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const generatedId = React.useId()
    const inputId = id || generatedId

    const passwordString = typeof value === "string" ? value : ""
    const score = React.useMemo(
      () => calculatePasswordScore(passwordString),
      [passwordString]
    )

    const hasMinLength = passwordString.length >= 8
    const hasUppercase = /[A-Z]/.test(passwordString)
    const hasNumber = /[0-9]/.test(passwordString)

    return (
      <div className={cn("flex flex-col gap-space-2xs w-full", containerClassName)}>
        {label && (
          <div className="flex items-center justify-between min-h-[1.5rem]">
            <label htmlFor={inputId} className="text-label-md text-on-surface">
              {label} {required && <span className="text-error">*</span>}
            </label>
            {showStrengthMeter && (
              <div className="group relative flex items-center">
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label="Requisitos de contraseña segura"
                  className="flex items-center gap-1 text-label-xs text-secondary hover:text-primary transition-colors cursor-help p-0.5 rounded focus:outline-none"
                >
                  <Info className="h-4 w-4" aria-hidden="true" />
                  <span className="hidden sm:inline font-medium">Requisitos</span>
                </button>
                <div className="absolute bottom-full right-0 z-30 mb-2 hidden w-64 rounded-xl bg-inverse-surface p-space-sm text-inverse-on-surface shadow-xl group-hover:block group-focus-within:block pointer-events-none">
                  <p className="text-label-sm font-semibold mb-1.5 text-white">
                    Requisitos de contraseña:
                  </p>
                  <ul className="space-y-1 text-label-xs text-inverse-on-surface/90">
                    <li className={cn("flex items-center gap-1.5", hasMinLength && "text-emerald-400 font-medium")}>
                      <Check className={cn("h-3.5 w-3.5 shrink-0", hasMinLength ? "opacity-100" : "opacity-30")} />
                      Mínimo 8 caracteres
                    </li>
                    <li className={cn("flex items-center gap-1.5", hasUppercase && "text-emerald-400 font-medium")}>
                      <Check className={cn("h-3.5 w-3.5 shrink-0", hasUppercase ? "opacity-100" : "opacity-30")} />
                      Al menos una mayúscula (A-Z)
                    </li>
                    <li className={cn("flex items-center gap-1.5", hasNumber && "text-emerald-400 font-medium")}>
                      <Check className={cn("h-3.5 w-3.5 shrink-0", hasNumber ? "opacity-100" : "opacity-30")} />
                      Al menos un número (0-9)
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative flex items-center w-full">
          <KeyRound
            className="pointer-events-none absolute left-space-md h-5 w-5 text-outline"
            aria-hidden="true"
          />

          <input
            id={inputId}
            ref={ref}
            type={showPassword ? "text" : "password"}
            required={required}
            value={value}
            onChange={onChange}
            className={cn(
              "w-full h-12 rounded-xl bg-surface-container-lowest text-body-md text-on-surface placeholder:text-outline shadow-sm pl-12 pr-12 transition-colors focus:outline-none focus:ring-2 focus:ring-primary",
              error ? "ring-2 ring-error focus:ring-error" : "",
              className
            )}
            {...props}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-controls={inputId}
            aria-pressed={showPassword}
            aria-label={
              showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
            }
            className="absolute right-space-md text-secondary hover:text-on-surface focus:outline-none cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>

        {showStrengthMeter && passwordString.length > 0 && (
          <div className="mt-space-2xs grid grid-cols-4 gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-colors duration-200 ${
                  i < score
                    ? score <= 1
                      ? "bg-error"
                      : score <= 2
                      ? "bg-amber-500"
                      : score <= 3
                      ? "bg-primary"
                      : "bg-emerald-600"
                    : "bg-surface-container-highest"
                }`}
              />
            ))}
          </div>
        )}

        {error ? (
          <span className="text-label-sm text-error">{error}</span>
        ) : helperText ? (
          <span className="text-label-sm text-secondary">{helperText}</span>
        ) : null}
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"
