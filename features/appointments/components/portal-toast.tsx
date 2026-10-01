"use client"

import React from "react"
import { CheckCircle2, AlertCircle, AlertTriangle, Info, Sparkles, X } from "lucide-react"
import { ToastNotification } from "@/types/appointments"
import { cn } from "@/lib/utils"

interface PortalToastProps {
  toast: ToastNotification | null
  onDismiss: () => void
}

export function PortalToast({ toast, onDismiss }: PortalToastProps) {
  if (!toast) return null

  const getIcon = () => {
    switch (toast.icon) {
      case "event_busy":
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-300 shrink-0" />
      case "filter_list":
      case "info":
        return <Info className="h-5 w-5 text-sky-300 shrink-0" />
      case "smart_toy":
        return <Sparkles className="h-5 w-5 text-teal-300 shrink-0" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-rose-300 shrink-0" />
      case "check_circle":
      case "verified":
      case "restore":
      default:
        return <CheckCircle2 className="h-5 w-5 text-primary-fixed shrink-0" />
    }
  }

  return (
    <div
      aria-atomic="true"
      aria-live="polite"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-space-sm bg-inverse-surface text-inverse-on-surface px-space-lg py-space-md rounded-xl shadow-2xl border-l-4 border-primary transition-all duration-300 max-w-md pointer-events-auto animate-in fade-in slide-in-from-bottom-5"
      )}
      role="status"
    >
      {getIcon()}
      <div className="flex flex-col flex-1 pr-2">
        <p className="font-body-md-medium text-body-md-medium text-surface-bright font-semibold">
          {toast.title}
        </p>
        <p className="font-label-sm text-label-sm text-surface-container-high leading-snug">
          {toast.message}
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        className="text-surface-container-high hover:text-white p-1 rounded-md transition-colors"
        aria-label="Cerrar notificación"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
