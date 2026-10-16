import { NextResponse } from "next/server"
import { catalogService } from "@/features/admin/services/catalog.service"

/**
 * Endpoint público consumido por el formulario de registro (RF-01)
 * Devuelve coberturas médicas y prepagas actualmente vigentes
 */
export async function GET() {
  try {
    const activeCoverages = catalogService.getActiveCoverages()
    const formatted = activeCoverages.map((c) => ({
      value: c.name,
      label: c.type === "particular" ? `${c.name} / Sin Cobertura` : c.name,
      plans: c.plans,
      type: c.type,
      requiresCopay: c.requiresCopay,
    }))

    return NextResponse.json({
      success: true,
      data: formatted,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error al obtener coberturas",
      },
      { status: 500 }
    )
  }
}
