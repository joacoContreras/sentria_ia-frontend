"use client"

import React, { useState } from "react"
import { HelpHero } from "./help-hero"
import { ClinicalEmergencyAlert } from "./clinical-emergency-alert"
import { FAQSection } from "./faq-section"
import { SupportContactPanel } from "./support-contact-panel"

export function HelpView() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSelectPill = (pill: string) => {
    setSearchQuery(pill)
  }

  const handleResetSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="flex flex-col w-full">
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
      <SupportContactPanel />
    </div>
  )
}
