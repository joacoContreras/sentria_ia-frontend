import * as React from "react"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = "",
      label,
      helperText,
      error,
      leftIcon,
      id,
      required,
      ...props
    },
    ref
  ) => {
    // Generamos un id por defecto si no se pasa uno, para asegurar accesibilidad (label -> input)
    const generatedId = React.useId()
    const inputId = id || generatedId

    return (
      <div className="flex flex-col gap-space-2xs w-full">
        {label && (
          <label htmlFor={inputId} className="text-label-md text-on-surface">
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="pointer-events-none absolute left-space-md flex items-center text-outline">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            required={required}
            className={`w-full h-12 rounded-xl bg-surface-container-lowest text-body-md text-on-surface placeholder:text-outline shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
              leftIcon ? "pl-12 pr-space-md" : "px-space-md"
            } ${error ? "ring-2 ring-error focus:ring-error" : ""} ${className}`}
            {...props}
          />
        </div>

        {error ? (
          <span className="text-label-sm text-error">{error}</span>
        ) : helperText ? (
          <span className="text-label-sm text-secondary">{helperText}</span>
        ) : null}
      </div>
    )
  }
)

Input.displayName = "Input"
