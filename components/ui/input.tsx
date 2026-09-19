import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
  error?: string
  leftIcon?: React.ReactNode
  containerClassName?: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
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
    const generatedId = React.useId()
    const inputId = id || generatedId

    return (
      <div className={cn("flex flex-col gap-1.5 w-full", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-slate-600 tracking-wide uppercase"
          >
            {label} {required && <span className="text-error font-bold ml-0.5">*</span>}
          </label>
        )}

        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3.5 flex items-center text-slate-400">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            required={required}
            className={cn(
              "w-full h-11 rounded-xl bg-white border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 focus:outline-none focus:border-primary focus:ring-3 focus:ring-primary/10 disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed",
              leftIcon ? "pl-10 pr-3.5" : "px-3.5",
              error
                ? "border-error text-error placeholder:text-error/40 focus:border-error focus:ring-error/10"
                : "hover:border-slate-300",
              className
            )}
            {...props}
          />
        </div>

        {error ? (
          <p className="text-xs font-medium text-error mt-0.5">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-slate-500 mt-0.5">{helperText}</p>
        ) : null}
      </div>
    )
  }
)

Input.displayName = "Input"

