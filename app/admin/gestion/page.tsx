import type { Metadata } from "next"
import { AdminDashboard } from "@/features/admin/components/admin-dashboard"

export const metadata: Metadata = {
  title: "Sentria AI | Gestión institucional",
  description: "Catálogos médicos, coberturas y asistente de IA para la administración institucional.",
}

export default function ManagementPage() {
  return <AdminDashboard section="gestion" />
}
