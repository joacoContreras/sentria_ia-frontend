"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, User, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/features/auth/hooks/use-auth"

export function SiteHeader() {
  const pathname = usePathname()
  const { isAuthenticated, user, isHydrated } = useAuth()

  const navLinks = [
    { href: "/", label: "Inicio", isActive: pathname === "/" },
    { href: "/sobre-nosotros", label: "Sobre Nosotros", isActive: pathname === "/sobre-nosotros" },
    { href: "/ayuda", label: "Ayuda", isActive: pathname === "/ayuda" },
  ]

  const isAccesoActive = pathname === "/acceso"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/40 bg-surface-container-lowest/90 backdrop-blur-md">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-sm">
        <div className="flex items-center justify-between gap-space-md">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-space-xs shrink-0 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-on-primary shadow-xs group-hover:bg-primary-container transition-colors">
              <Activity className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-headline-sm text-on-surface leading-tight font-semibold tracking-tight">
                Sentria <span className="text-primary">AI</span>
              </span>
              <span className="text-[10px] text-secondary font-medium tracking-wide hidden sm:inline">
                Triage & Gestión Clínica
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-space-sm sm:gap-space-md">
            <nav className="flex items-center gap-2 sm:gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-1.5 sm:px-2 py-1 text-label-sm sm:text-label-md transition-all",
                    link.isActive
                      ? "text-primary font-semibold underline underline-offset-6 decoration-2 decoration-primary"
                      : "text-on-surface-variant hover:text-primary hover:underline hover:underline-offset-6 hover:decoration-primary/40 font-medium"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth CTA button */}
            {isHydrated && isAuthenticated && user ? (
              <Link
                href="/portal"
                className="hidden sm:inline-flex items-center gap-1.5 bg-surface-container hover:bg-surface-container-high text-primary border border-outline-variant/30 text-label-sm font-semibold px-3 py-1.5 rounded-lg transition-all"
              >
                <User className="h-3.5 w-3.5" />
                <span className="max-w-[120px] truncate">{user.fullName.split(" ")[0]}</span>
              </Link>
            ) : (
              <Link
                href="/acceso"
                className={cn(
                  "inline-flex items-center gap-1 text-label-xs sm:text-label-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl transition-all active:scale-[0.98] shadow-2xs",
                  isAccesoActive
                    ? "bg-primary-container text-white ring-2 ring-primary/25"
                    : "bg-primary text-white hover:bg-primary-container"
                )}
              >
                <span>Acceso</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
