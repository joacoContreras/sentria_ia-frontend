"use client"

import React, { useState, useEffect } from "react"
import { MessageSquare } from "lucide-react"
import { HelpHero } from "./help-hero"
import { ClinicalEmergencyAlert } from "./clinical-emergency-alert"
import { FAQSection } from "./faq-section"
import { SupportContactPanel } from "./support-contact-panel"
import { HelpChatModal } from "./help-chat-modal"
import { SupportEmailModal } from "./support-email-modal"

export function HelpView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false)

  // Listen to hash changes if navigated via URL #chat-soporte or #correo-soporte
  useEffect(() => {
    const handleHashCheck = () => {
      if (window.location.hash === "#chat-soporte") {
        setIsChatOpen(true)
      } else if (window.location.hash === "#correo-soporte") {
        setIsEmailModalOpen(true)
      }
    }

    handleHashCheck()
    window.addEventListener("hashchange", handleHashCheck)
    return () => window.removeEventListener("hashchange", handleHashCheck)
  }, [])

  const handleSelectPill = (pill: string) => {
    setSearchQuery(pill)
  }

  const handleResetSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="relative flex flex-col w-full">
      <HelpHero
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectPill={handleSelectPill}
      />
      <ClinicalEmergencyAlert />
      <FAQSection
        searchQuery={searchQuery}
        onResetSearch={handleResetSearch}
      />
      <SupportContactPanel
        onOpenChat={() => setIsChatOpen(true)}
        onOpenEmail={() => setIsEmailModalOpen(true)}
      />

      {/* Floating Interactive Chat Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          className="group relative flex items-center gap-2.5 rounded-full bg-primary px-4 py-3 text-white shadow-lg hover:bg-primary-container transition-all active:scale-95 cursor-pointer border border-white/10"
          aria-label="Abrir chat de asistencia"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <MessageSquare className="h-4 w-4" />
          <span className="text-sm font-medium tracking-tight">
            Chat de Ayuda
          </span>
        </button>
      </div>

      {/* Modals */}
      <HelpChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onOpenEmailSupport={() => setIsEmailModalOpen(true)}
      />

      <SupportEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
      />
    </div>
  )
}
