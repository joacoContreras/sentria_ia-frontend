import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "emergency" | "urgent" | "routine"
  size?: "sm" | "md"
}

const variantStyles = {
  default: "bg-surface-container text-on-surface-variant",
  primary: "bg-primary-fixed text-on-primary-fixed-variant",
  secondary: "bg-secondary-fixed text-on-secondary-fixed-variant",
  emergency: "bg-[#FFE4E6] text-[#9F1239]",
  urgent: "bg-[#FFEDD5] text-[#9A3412]",
  routine: "bg-[#D1FAE5] text-[#065F46]",
}

const sizeStyles = {
  sm: "px-space-xs py-0.5 text-label-sm h-6",
  md: "px-space-sm py-1 text-label-md h-7",
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-space-2xs rounded-full font-semibold transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
