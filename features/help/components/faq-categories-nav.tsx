import React from "react"
import { cn } from "@/lib/utils"
import { FAQCategoryId } from "@/types/help"

interface FAQCategoriesNavProps {
  selectedCategory: FAQCategoryId
  onSelectCategory: (cat: FAQCategoryId) => void
  categoryCounts: Record<FAQCategoryId, number>
}

const CATEGORY_ITEMS: {
  id: FAQCategoryId
  label: string
}[] = [
  { id: "all", label: "Todas las Consultas" },
  { id: "guardia", label: "Atención en Guardia" },
  { id: "sedes", label: "Sedes y Estudios" },
  { id: "ia", label: "Asistente Sentria AI" },
]

export function FAQCategoriesNav({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: FAQCategoriesNavProps) {
  return (
    <div className="lg:sticky lg:top-24">
      {/* Category Navigation Card */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-2xs border border-outline-variant/15 space-y-space-md">
        <div className="space-y-space-3xs">
          <span className="text-label-xs text-primary uppercase font-semibold tracking-wider">
            Categorías
          </span>
          <h2 className="text-title-md sm:text-title-lg text-on-surface font-semibold">
            Temas de ayuda
          </h2>
        </div>

        <nav className="flex flex-col gap-space-2xs" aria-label="Categorías de Ayuda">
          {CATEGORY_ITEMS.map(({ id, label }) => {
            const isSelected = selectedCategory === id
            const count = categoryCounts[id] || 0

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectCategory(id)}
                className={cn(
                  "w-full flex items-center justify-between px-space-md py-space-sm rounded-lg text-label-md transition-all text-left cursor-pointer",
                  isSelected
                    ? "bg-surface-container-high text-primary font-semibold shadow-2xs"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                )}
              >
                <span>{label}</span>
                <span
                  className={cn(
                    "text-label-xs px-space-xs py-space-3xs rounded-full font-medium",
                    isSelected
                      ? "bg-surface text-primary"
                      : "bg-surface-container text-secondary"
                  )}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

