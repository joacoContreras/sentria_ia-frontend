"use client"

import React, { useState, useMemo } from "react"
import { SearchX, RotateCcw } from "lucide-react"
import { FAQCategoryId } from "@/types/help"
import { FAQ_ITEMS } from "../data/faq-data"
import { FAQCategoriesNav } from "./faq-categories-nav"
import { FAQAccordionItem } from "./faq-accordion-item"
import { Button } from "@/components/ui/button"

interface FAQSectionProps {
  searchQuery: string
  onResetSearch: () => void
}

export function FAQSection({ searchQuery, onResetSearch }: FAQSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<FAQCategoryId>("all")
  const [openItemId, setOpenItemId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null)

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<FAQCategoryId, number> = {
      all: FAQ_ITEMS.length,
      guardia: 0,
      sedes: 0,
      ia: 0,
    }

    FAQ_ITEMS.forEach((item) => {
      item.categories.forEach((cat) => {
        if (cat in counts) {
          counts[cat]++
        }
      })
    })

    return counts
  }, [])

  // Filter items based on category and search query
  const filteredItems = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()

    return FAQ_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.categories.includes(selectedCategory)

      if (!matchesCategory) return false

      if (!query) return true

      const matchesTitle = item.title.toLowerCase().includes(query)
      const matchesBadge = item.badgeLabel.toLowerCase().includes(query)
      const matchesSubBadge = item.badgeSubLabel
        ? item.badgeSubLabel.toLowerCase().includes(query)
        : false
      const matchesKeywords = item.keywords.some((kw) =>
        kw.toLowerCase().includes(query)
      )

      return matchesTitle || matchesBadge || matchesSubBadge || matchesKeywords
    })
  }, [selectedCategory, searchQuery])

  const handleToggle = (id: string) => {
    setOpenItemId((prev) => (prev === id ? null : id))
  }

  const handleResetFilters = () => {
    onResetSearch()
    setSelectedCategory("all")
  }

  return (
    <section className="w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pb-space-3xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Left Column: Category Navigation & Realtime Status */}
        <div className="lg:col-span-4 w-full">
          <FAQCategoriesNav
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
          />
        </div>

        {/* Right Column: Accordions or Empty Fallback */}
        <div className="lg:col-span-8 space-y-space-md w-full">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <FAQAccordionItem
                key={item.id}
                id={item.id}
                title={item.title}
                badgeLabel={item.badgeLabel}
                badgeSubLabel={item.badgeSubLabel}
                icon={item.icon}
                isOpen={openItemId === item.id}
                onToggle={() => handleToggle(item.id)}
              >
                {item.content}
              </FAQAccordionItem>
            ))
          ) : (
            /* No Results Fallback Item */
            <div className="bg-surface-container-lowest rounded-xl p-space-2xl text-center shadow-xs border border-outline-variant/20 space-y-space-md">
              <div className="w-16 h-16 rounded-full bg-surface-container mx-auto flex items-center justify-center text-secondary">
                <SearchX className="h-8 w-8" aria-hidden="true" />
              </div>

              <div className="space-y-space-2xs">
                <h4 className="text-headline-sm text-on-surface font-semibold">
                  No encontramos coincidencias para esa búsqueda
                </h4>
                <p className="text-body-md text-secondary max-w-md mx-auto leading-relaxed">
                  Intente con términos más generales como &quot;turnos&quot;,
                  &quot;guardia&quot;, &quot;estudios&quot; o consulte
                  directamente a nuestra mesa de ayuda.
                </p>
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={handleResetFilters}
                leftIcon={<RotateCcw className="h-4 w-4" />}
                className="mx-auto"
              >
                Restablecer Filtros
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
