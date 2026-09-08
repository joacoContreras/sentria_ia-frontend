import * as React from "react"

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
    "bg-primary text-on-primary shadow-md hover:bg-primary-container active:scale-[0.99]",
  secondary:
    "bg-surface-container-low text-secondary hover:text-on-surface active:scale-[0.99]",
  danger:
    "bg-error text-on-error shadow-sm hover:opacity-95 active:scale-[0.99]",
  ghost:
    "text-secondary hover:text-on-surface hover:bg-surface-container/50",
}

const sizeStyles = {
  sm: "h-9 px-space-sm text-label-sm rounded-lg gap-space-2xs",
  md: "h-11 px-space-md text-label-md rounded-xl gap-space-xs",
  lg: "h-12 px-space-lg text-label-lg rounded-xl gap-space-xs",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
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
        className={`inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none cursor-pointer ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
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
