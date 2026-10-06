"use client"

import React, { useState, useRef, useEffect } from "react"
import { User, Settings, LogOut, CheckCircle2 } from "lucide-react"
import { AuthUser } from "@/types/auth"
import { cn } from "@/lib/utils"

interface UserMenuDropdownProps {
  user: AuthUser | null
  onNavigateToSettings: () => void
  onLogout: () => void
  className?: string
}

export function UserMenuDropdown({
  user,
  onNavigateToSettings,
  onLogout,
  className,
}: UserMenuDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const displayName = user?.fullName || "María Florencia Gómez"
  const displayDocNumber = user?.docNumber ? `DNI ${user.docNumber}` : "DNI 38.452.901"

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const handleSettingsClick = () => {
    setIsOpen(false)
    onNavigateToSettings()
  }

  const handleLogoutClick = () => {
    setIsOpen(false)
    onLogout()
  }

  return (
    <div ref={menuRef} className={cn("relative inline-block text-left", className)}>
      {/* Trigger: User info + Circular avatar */}
      <button
        type="button"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`Menú de usuario para ${displayName}`}
        className="flex items-center gap-space-sm pl-space-xs rounded-full hover:bg-surface-container-high/60 p-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer group"
      >
        <div className="hidden sm:flex flex-col text-right pr-1">
          <span className="font-body-md-medium text-body-md-medium text-on-surface font-semibold leading-tight truncate max-w-[180px]">
            {displayName}
          </span>
          <span className="font-label-sm text-label-sm text-slate-500">
            {displayDocNumber}
          </span>
        </div>

        {/* Circular avatar icon */}
        <div className="relative shrink-0">
          <div
            aria-hidden="true"
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-2xs group-hover:bg-primary-container transition-colors overflow-hidden ring-1 ring-surface-container"
          >
            {user?.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarUrl}
                alt={`Avatar de ${displayName}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="h-4 w-4" aria-hidden="true" />
            )}
          </div>
          {/* Online status indicator */}
          <span
            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-primary-fixed ring-2 ring-surface-container-lowest"
            title="En línea"
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="menu"
          aria-orientation="vertical"
          aria-label="Opciones de cuenta"
          className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 origin-top-right focus:outline-none"
        >
          {/* User Brief Section */}
          <div className="px-4 py-3 border-b border-surface-container/60">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 overflow-hidden ring-1 ring-surface-container">
                {user?.avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.avatarUrl}
                    alt={`Avatar de ${displayName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-5 w-5" aria-hidden="true" />
                )}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="font-body-md-medium text-body-md-medium text-on-surface font-semibold truncate">
                    {displayName}
                  </span>
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full font-label-sm text-[10px] bg-primary-fixed text-on-primary-fixed-variant font-semibold shrink-0">
                    <CheckCircle2 className="h-3 w-3" />
                    Paciente
                  </span>
                </div>
                <p className="font-label-sm text-label-sm text-slate-500 truncate">
                  {user?.email || "florencia.gomez@email.com"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation & Action Items */}
          <div className="p-1.5 flex flex-col gap-1">
            {/* Configuración */}
            <button
              type="button"
              role="menuitem"
              onClick={handleSettingsClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-slate-700 hover:text-on-surface hover:bg-surface-container-low transition-colors rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container text-slate-700 group-hover:bg-primary/10 group-hover:text-primary flex items-center justify-center shrink-0 transition-colors">
                <Settings className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-body-md-medium font-medium leading-none">
                  Configuración
                </span>
                <span className="font-label-sm text-slate-500 text-[11px] mt-0.5">
                  Datos personales, cobertura y 2FA
                </span>
              </div>
            </button>

            {/* Cerrar sesión (No emphasis, standard menu item) */}
            <button
              type="button"
              role="menuitem"
              onClick={handleLogoutClick}
              className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-slate-700 hover:text-on-surface hover:bg-surface-container-low transition-colors rounded-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
            >
              <div className="w-8 h-8 rounded-lg bg-surface-container text-slate-700 group-hover:bg-surface-container-high flex items-center justify-center shrink-0 transition-colors">
                <LogOut className="h-4 w-4" aria-hidden="true" />
              </div>
              <div className="flex flex-col">
                <span className="font-body-md-medium font-medium leading-none">
                  Cerrar sesión
                </span>
                <span className="font-label-sm text-slate-500 text-[11px] mt-0.5">
                  Finalizar sesión actual
                </span>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
