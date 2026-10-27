import type { Metadata } from "next"
import { AdminDashboard } from "@/features/admin/components/admin-dashboard"

export const metadata: Metadata = {
  title: "Sentria AI | Panel de Administración y Catálogos Médicos",
  description:
    "Panel de control institucional para gestionar profesionales médicos, especialidades y obras sociales/prepagas en Sentria AI.",
}

export default function AdminPage() {
  return <AdminDashboard />
}
