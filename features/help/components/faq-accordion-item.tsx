"use client"

import React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQAccordionItemProps {
  id: string
  title: string
  badgeLabel: string
  badgeSubLabel?: string
  icon: React.ComponentType<{ className?: string }>
  isOpen: boolean
  onToggle: () => void
  children: React.ReactNode
}

export function FAQAccordionItem({
  id,
  title,
  badgeLabel,
  badgeSubLabel,
  icon: Icon,
  isOpen,
  onToggle,
  children,
}: FAQAccordionItemProps) {
  const contentId = `faq-content-${id}`
  const buttonId = `faq-button-${id}`

  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-outline-variant/20 transition-all duration-200 overflow-hidden">
      <button
        id={buttonId}
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="w-full flex items-center justify-between p-space-lg text-left gap-space-md cursor-pointer hover:bg-surface/50 transition-colors"
      >
        <div className="flex items-start gap-space-md">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high shrink-0 flex items-center justify-center text-primary">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>

          <div className="space-y-space-2xs">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="px-space-xs py-space-2xs rounded-full bg-surface-container text-primary text-label-sm font-semibold">
                {badgeLabel}
              </span>
              {badgeSubLabel && (
                <span className="text-label-sm text-secondary">
                  {badgeSubLabel}
                </span>
              )}
            </div>

            <h3 className="text-headline-sm text-on-surface font-semibold">
              {title}
            </h3>
          </div>
        </div>

        <ChevronDown
          className={cn(
            "h-6 w-6 text-secondary shrink-0 transform transition-transform duration-200",
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
          <div className="px-space-lg pb-space-lg pt-0">
            <div className="pt-space-sm pl-0 sm:pl-14">{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
