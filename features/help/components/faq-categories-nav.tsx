import React from "react"
import { Layers, Hospital, Building2, Bot, ShieldCheck } from "lucide-react"
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
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { id: "all", label: "Todas las Consultas", icon: Layers },
  { id: "guardia", label: "Atención en Guardia", icon: Hospital },
  { id: "sedes", label: "Sedes y Estudios", icon: Building2 },
  { id: "ia", label: "Asistente Sentria AI", icon: Bot },
]

export function FAQCategoriesNav({
  selectedCategory,
  onSelectCategory,
  categoryCounts,
}: FAQCategoriesNavProps) {
  return (
    <div className="space-y-space-lg lg:sticky lg:top-24">
      {/* Category Navigation */}
      <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xs border border-outline-variant/20 space-y-space-md">
        <div className="space-y-space-2xs">
          <span className="text-label-sm text-primary uppercase font-semibold">
            Directorio temático
          </span>
          <h2 className="text-headline-sm text-on-surface font-semibold">
            Categorías Clínicas
          </h2>
        </div>

        <nav className="flex flex-col gap-space-xs" aria-label="Categorías de Ayuda">
          {CATEGORY_ITEMS.map(({ id, label, icon: Icon }) => {
            const isSelected = selectedCategory === id
            const count = categoryCounts[id] || 0

            return (
              <button
                key={id}
                type="button"
                onClick={() => onSelectCategory(id)}
                className={cn(
                  "w-full flex items-center justify-between px-space-md py-space-sm rounded-lg text-label-lg transition-all text-left cursor-pointer",
                  isSelected
                    ? "bg-surface-container-high text-primary font-semibold shadow-xs"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                )}
              >
                <span className="flex items-center gap-space-xs">
                  <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  <span>{label}</span>
                </span>
                <span
                  className={cn(
                    "text-label-sm px-space-xs py-space-2xs rounded-full font-semibold",
                    isSelected
                      ? "bg-surface text-secondary"
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

      {/* Telemetric Realtime Status Card */}
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-xs border border-outline-variant/20 space-y-space-sm">
        <div className="flex items-center justify-between">
          <span className="text-label-sm text-secondary uppercase font-semibold">
            Estado Operativo
          </span>
          <span className="flex items-center gap-space-2xs text-label-sm text-primary font-semibold">
            <span className="w-2 h-2 rounded-full bg-primary" /> 100% En Línea
          </span>
        </div>

        <div className="flex items-center gap-space-sm pt-space-xs">
          <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
            <ShieldCheck className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <div className="text-body-md text-on-surface font-semibold">
              Validación Clínica Activa
            </div>
            <div className="text-label-md text-secondary">
              Protocolos ESI certificados 2024
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
