"use client"

import React, { useState } from "react"
import { HelpHero } from "./help-hero"
import { ClinicalEmergencyAlert } from "./clinical-emergency-alert"
import { FAQSection } from "./faq-section"
import { SupportContactPanel } from "./support-contact-panel"
import { useHelpChat } from "../hooks/use-help-chat"

export function HelpView() {
  const [searchQuery, setSearchQuery] = useState("")
  const { openChat, openEmailSupport } = useHelpChat()

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
        onOpenChat={openChat}
        onOpenEmail={openEmailSupport}
      />
    </div>
  )
}
