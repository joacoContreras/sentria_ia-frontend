"use client"

import React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQAccordionItemProps {
  id: string
  title: string
  badgeLabel?: string
  badgeSubLabel?: string
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

export function FAQAccordionItem({
  id,
  title,
  badgeLabel,
  badgeSubLabel,
  isOpen,
  onToggle,
  children,
}: FAQAccordionItemProps) {
  const contentId = `faq-content-${id}`
  const buttonId = `faq-button-${id}`

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-2xs border border-outline-variant/15 transition-all duration-200 overflow-hidden">
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full flex items-center justify-between p-space-md sm:p-space-lg text-left gap-space-md cursor-pointer hover:bg-surface-container-low/50 transition-colors"
      >
        <div className="space-y-space-3xs pr-space-xs">
          {badgeLabel && (
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="text-label-xs font-semibold text-primary uppercase tracking-wider">
                {badgeLabel}
              </span>
              {badgeSubLabel && (
                <span className="text-label-xs text-secondary">
                  • {badgeSubLabel}
                </span>
              )}
            </div>
          )}

          <h3 className="text-body-lg sm:text-headline-sm text-on-surface font-semibold leading-snug">
            {title}
          </h3>
        </div>

        <ChevronDown
          className={cn(
            "h-5 w-5 text-secondary shrink-0 transform transition-transform duration-200",
            isOpen && "rotate-180 text-primary"
          )}
          aria-hidden="true"
        />
      </button>

      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-space-md sm:px-space-lg pb-space-lg pt-0">
            <div className="pt-space-xs border-t border-outline-variant/10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

