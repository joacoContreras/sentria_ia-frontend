"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity } from "lucide-react"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Acceso", isActive: pathname === "/" },
    { href: "/sobre-nosotros", label: "Sobre Nosotros", isActive: pathname === "/sobre-nosotros" },
    { href: "/ayuda", label: "Ayuda", isActive: pathname === "/ayuda" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/40 bg-surface-container-lowest/90 backdrop-blur-md">
      <div className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-sm">
        <div className="flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-lg">
            <Link href="/" className="flex items-center gap-space-xs shrink-0">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-on-primary shadow-xs">
                <Activity className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-headline-sm text-on-surface leading-tight font-semibold tracking-tight">
                Sentria <span className="text-primary">AI</span>
              </span>
            </Link>

            
          </div>

          <div className="flex items-center gap-space-md">
            <nav className="flex items-center gap-space-xs">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "px-space-md py-space-xs rounded-lg text-label-md transition-colors",
                    link.isActive
                      ? "bg-secondary-container text-on-secondary-fixed font-semibold"
                      : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
