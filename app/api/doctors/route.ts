import { NextResponse } from "next/server"
import { catalogService } from "@/features/admin/services/catalog.service"

/**
 * Endpoint público consumido por el buscador y reserva de turnos (RF-02)
 * Devuelve solo profesionales activos (respetando borrado lógico RNF-02)
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get("specialty") || undefined

    const activeDoctors = catalogService.getActiveDoctors(specialty)
    const formatted = activeDoctors.map((d) => ({
      name: d.fullName,
      license: d.license,
      specialty: d.specialtyName,
      subtitle: d.subtitle || `Especialista en ${d.specialtyName}`,
      acceptedCoverages: d.acceptedCoverages,
    }))

    return NextResponse.json({
      success: true,
      data: formatted,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error al obtener profesionales",
      },
      { status: 500 }
    )
  }
}
