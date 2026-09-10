"use client"

import * as React from "react"
import { KeyRound, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  showStrengthMeter?: boolean
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

    return (
      <div className="flex flex-col gap-space-2xs w-full">
        {label && (
          <div className="flex items-center justify-between">
            <label htmlFor={inputId} className="text-label-md text-on-surface">
              {label} {required && <span className="text-error">*</span>}
            </label>
            {showStrengthMeter && (
              <span className="text-label-sm text-primary">
                Segura: 8+ car., mayúscula y número
              </span>
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

        {showStrengthMeter && (
          <div className="mt-space-2xs grid grid-cols-4 gap-space-2xs">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-colors ${
                  i < score ? "bg-primary" : "bg-surface-container-highest"
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
