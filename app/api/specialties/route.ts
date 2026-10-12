import { NextResponse } from "next/server"
import { catalogService } from "@/features/admin/services/catalog.service"

/**
 * Endpoint público consumido por el buscador de turnos (RF-02)
 * Devuelve solo especialidades médicas activas con cupo/profesionales
 */
export async function GET() {
  try {
    const activeSpecialties = catalogService.getActiveSpecialties()
    const formatted = activeSpecialties.map((s) => ({
      value: s.name,
      label: s.name,
      id: s.id,
      count: catalogService.getActiveDoctors(s.id).length,
    }))

    return NextResponse.json({
      success: true,
      data: formatted,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error al obtener especialidades",
      },
      { status: 500 }
    )
  }
}
