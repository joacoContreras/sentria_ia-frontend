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
  containerClassName?: string
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      containerClassName,
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
    const errorId = `${selectId}-error`
    const helperId = `${selectId}-helper`
    const describedBy = error
      ? errorId
      : helperText
        ? helperId
        : props["aria-describedby"]

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-xs font-semibold text-slate-600 tracking-wide uppercase"
          >
            {label} {required && <span className="text-error font-bold ml-0.5">*</span>}
          </label>
        )}

        <div className="relative flex items-center w-full">
          <select
            id={selectId}
            ref={ref}
            required={required}
            aria-invalid={error ? "true" : props["aria-invalid"]}
            aria-describedby={describedBy}
            className={cn(
              "w-full h-11 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 appearance-none cursor-pointer pl-3.5 pr-10 transition-all duration-150 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
              error
                ? "border-error text-error focus:border-error focus:ring-error/10"
                : "hover:border-slate-300",
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
            className="pointer-events-none absolute right-3.5 h-4 w-4 text-slate-400"
            aria-hidden="true"
          />
        </div>

        {error ? (
          <p id={errorId} role="alert" className="text-xs font-medium text-error mt-0.5">{error}</p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-slate-500 mt-0.5">{helperText}</p>
        ) : null}
      </div>
    )
  }
)

Select.displayName = "Select"
