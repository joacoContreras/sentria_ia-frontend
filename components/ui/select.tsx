import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  helperText?: string
  error?: string
  options?: SelectOption[]
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      options,
      children,
      id,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId()
    const selectId = id || generatedId

    return (
      <div className="flex flex-col gap-space-2xs w-full">
        {label && (
          <label htmlFor={selectId} className="text-label-md text-on-surface">
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}

        <div className="relative flex items-center w-full">
          <select
            id={selectId}
            ref={ref}
            required={required}
            className={cn(
              "w-full h-12 rounded-xl bg-surface-container-lowest text-body-md text-on-surface shadow-sm appearance-none cursor-pointer px-space-md pr-10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary",
              error ? "ring-2 ring-error focus:ring-error" : "",
              className
            )}
            {...props}
          >
            {options
              ? options.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                  >
                    {opt.label}
                  </option>
                ))
              : children}
          </select>

          <ChevronDown
            className="pointer-events-none absolute right-space-md h-5 w-5 text-secondary"
            aria-hidden="true"
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

Select.displayName = "Select"
