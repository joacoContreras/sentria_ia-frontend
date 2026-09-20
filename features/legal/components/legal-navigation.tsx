"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Shield, KeyRound } from "lucide-react"
import { cn } from "@/lib/utils"

export function LegalNavigation() {
  const pathname = usePathname()

  const tabs = [
    {
      href: "/terminos-clinicos",
      label: "Términos Clínicos",
      icon: FileText,
      description: "Consentimiento informado y alcance asistencial",
    },
    {
      href: "/privacidad-medica",
      label: "Privacidad Médica",
      icon: Shield,
      description: "Ley 25.326, HIPAA y resguardo de datos sensibles",
    },
    {
      href: "/protocolo-criptografico",
      label: "Protocolo Criptográfico",
      icon: KeyRound,
      description: "Cifrado AES-256-GCM, Zero-Knowledge y HSM",
    },
  ]

  return (
    <nav className="w-full bg-surface-container-low/80 border-b border-outline-variant/20 py-space-xs">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-space-xs sm:gap-space-sm overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href
            const Icon = tab.icon
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  "flex items-center gap-2 px-space-md py-2 rounded-xl text-label-md transition-all font-medium whitespace-nowrap",
                  isActive
                    ? "bg-primary text-white shadow-2xs"
                    : "bg-surface-container-lowest text-on-surface-variant hover:text-primary hover:bg-surface-container border border-outline-variant/15"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-primary")} />
                <span>{tab.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
