import type { Metadata } from "next"
import { AdminDashboard } from "@/features/admin/components/admin-dashboard"

export const metadata: Metadata = {
  title: "Sentria AI | Operaciones",
  description: "Agenda de turnos y analíticas operativas del centro médico.",
}

export default function OperationsPage() {
  return <AdminDashboard section="operaciones" />
}
