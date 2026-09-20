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
    const errorId = `${inputId}-error`
    const helperId = `${inputId}-helper`
    const describedBy = error
      ? errorId
      : helperText
        ? helperId
        : props["aria-describedby"]

    const passwordString = typeof value === "string" ? value : ""
    const score = React.useMemo(
      () => calculatePasswordScore(passwordString),
      [passwordString]
    )

    const hasMinLength = passwordString.length >= 8
    const hasUppercase = /[A-Z]/.test(passwordString)
    const hasNumber = /[0-9]/.test(passwordString)

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <div className="flex items-center justify-between min-h-[1.25rem]">
            <label
              htmlFor={inputId}
              className="text-xs font-semibold text-slate-600 tracking-wide uppercase"
            >
              {label} {required && <span className="text-error font-bold ml-0.5">*</span>}
            </label>
            {showStrengthMeter && (
              <div className="group relative flex items-center">
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label="Requisitos de contraseña segura"
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-primary transition-colors cursor-help py-0.5 rounded focus:outline-none"
                >
                  <Info className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline font-medium">Requisitos</span>
                </button>
                <div className="absolute bottom-full right-0 z-30 mb-2 hidden w-60 rounded-xl bg-slate-900/95 backdrop-blur-md p-3 text-white shadow-xl group-hover:block group-focus-within:block pointer-events-none text-xs">
                  <p className="font-semibold mb-1.5 text-slate-200">
                    Requisitos mínimos:
                  </p>
                  <ul className="space-y-1 text-slate-300">
                    <li className={cn("flex items-center gap-1.5", hasMinLength && "text-emerald-400 font-medium")}>
                      <Check className={cn("h-3.5 w-3.5 shrink-0", hasMinLength ? "opacity-100" : "opacity-40")} />
                      Mínimo 8 caracteres
                    </li>
                    <li className={cn("flex items-center gap-1.5", hasUppercase && "text-emerald-400 font-medium")}>
                      <Check className={cn("h-3.5 w-3.5 shrink-0", hasUppercase ? "opacity-100" : "opacity-40")} />
                      Al menos una mayúscula
                    </li>
                    <li className={cn("flex items-center gap-1.5", hasNumber && "text-emerald-400 font-medium")}>
                      <Check className={cn("h-3.5 w-3.5 shrink-0", hasNumber ? "opacity-100" : "opacity-40")} />
                      Al menos un número
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="relative flex items-center w-full">
          <KeyRound
            className="pointer-events-none absolute left-3.5 h-4 w-4 text-slate-400"
            aria-hidden="true"
          />

          <input
            id={inputId}
            ref={ref}
            type={showPassword ? "text" : "password"}
            required={required}
            value={value}
            onChange={onChange}
            aria-invalid={error ? "true" : props["aria-invalid"]}
            aria-describedby={describedBy}
            className={cn(
              "w-full h-11 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 pl-10 pr-10 transition-all duration-150 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
              error
                ? "border-error text-error placeholder:text-error/40 focus:border-error focus:ring-error/10"
                : "hover:border-slate-300",
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
            className="absolute right-3.5 text-slate-400 hover:text-slate-700 focus:outline-none cursor-pointer p-0.5 rounded transition-colors"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {showStrengthMeter && passwordString.length > 0 && (
          <div className="mt-1 grid grid-cols-4 gap-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className={`h-1 rounded-full transition-colors duration-200 ${
                  i < score
                    ? score <= 1
                      ? "bg-rose-500"
                      : score <= 2
                      ? "bg-amber-500"
                      : score <= 3
                      ? "bg-primary"
                      : "bg-emerald-500"
                    : "bg-slate-200"
                }`}
              />
            ))}
          </div>
        )}

        {error ? (
          <p id={errorId} role="alert" className="text-xs font-medium text-error mt-0.5">{error}</p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-slate-500 mt-0.5">{helperText}</p>
        ) : null}
      </div>
    )
  }
)

PasswordInput.displayName = "PasswordInput"
