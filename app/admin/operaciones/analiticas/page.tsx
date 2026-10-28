import type { Metadata } from "next"
import { AdminDashboard } from "@/features/admin/components/admin-dashboard"

export const metadata: Metadata = {
  title: "Sentria AI | Analíticas",
  description: "Analíticas operativas del centro médico.",
}

export default function AnalyticsPage() {
  return <AdminDashboard section="operaciones" />
}
