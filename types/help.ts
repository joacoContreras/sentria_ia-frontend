import React from "react"

export type FAQCategoryId = "all" | "guardia" | "sedes" | "ia"

export interface FAQCategory {
  id: FAQCategoryId
  label: string
}

export interface FAQItem {
  id: string
  categories: FAQCategoryId[]
  title: string
  badgeLabel: string
  badgeSubLabel?: string
  keywords: string[]
  content: React.ReactNode
}
