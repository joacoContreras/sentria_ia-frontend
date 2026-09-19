import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost"
  size?: "sm" | "md" | "lg"
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  isLoading?: boolean
}

const variantStyles = {
  primary:
    "bg-primary text-white shadow-2xs hover:bg-primary-container active:scale-[0.985] font-medium transition-all duration-150",
  secondary:
    "bg-slate-100/80 text-slate-800 border border-slate-200/80 hover:bg-slate-200/60 hover:text-slate-900 active:scale-[0.985] font-medium transition-all duration-150",
  danger:
    "bg-error text-white shadow-2xs hover:bg-red-700 active:scale-[0.985] font-medium transition-all duration-150",
  ghost:
    "text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium transition-all duration-150",
}

const sizeStyles = {
  sm: "h-9 px-3 text-xs rounded-lg gap-1.5",
  md: "h-10 px-4 text-sm rounded-xl gap-2",
  lg: "h-11 px-5 text-sm font-semibold rounded-xl gap-2",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "lg",
      leftIcon,
      rightIcon,
      isLoading = false,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  }
)

Button.displayName = "Button"
