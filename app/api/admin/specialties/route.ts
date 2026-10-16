import { NextResponse } from "next/server"
import { catalogService } from "@/features/admin/services/catalog.service"
import { CreateSpecialtyInput } from "@/types/admin"

export async function GET() {
  try {
    const specialties = catalogService.getSpecialties()
    return NextResponse.json({
      success: true,
      data: specialties,
      count: specialties.length,
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

export async function POST(request: Request) {
  try {
    const body: CreateSpecialtyInput = await request.json()

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "El nombre de la especialidad es obligatorio.",
        },
        { status: 400 }
      )
    }

    const created = catalogService.createSpecialty(body)
    return NextResponse.json(
      {
        success: true,
        data: created,
        message: `Especialidad '${created.name}' dada de alta exitosamente.`,
      },
      { status: 201 }
    )
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear especialidad"
    const status = msg.includes("Ya existe") ? 409 : 400
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}
