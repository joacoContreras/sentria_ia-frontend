import { NextResponse } from "next/server"
import { catalogService } from "@/features/admin/services/catalog.service"
import { UpdateDoctorInput } from "@/types/admin"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const doctor = catalogService.getDoctorById(id)
    if (!doctor) {
      return NextResponse.json(
        { success: false, error: `Profesional con ID '${id}' no encontrado.` },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: doctor,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error al obtener profesional",
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body: UpdateDoctorInput = await request.json()

    const updated = catalogService.updateDoctor(id, body)
    return NextResponse.json({
      success: true,
      data: updated,
      message: `Profesional '${updated.fullName}' actualizado exitosamente.`,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar profesional"
    const status = msg.includes("no encontrado") ? 404 : msg.includes("ya está registrada") ? 409 : 400
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body: UpdateDoctorInput = await request.json()

    const updated = catalogService.updateDoctor(id, body)
    return NextResponse.json({
      success: true,
      data: updated,
      message: `Estado o datos del profesional '${updated.fullName}' modificados exitosamente.`,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al modificar profesional"
    const status = msg.includes("no encontrado") ? 404 : 400
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}

/**
 * DELETE: Borrado Lógico (RNF-02)
 * Marca el profesional como Inactivo (isActive: false) para preservar el historial
 * de turnos pasados sin romper relaciones en la base de datos relacional.
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const doctor = catalogService.getDoctorById(id)
    if (!doctor) {
      return NextResponse.json(
        { success: false, error: `Profesional con ID '${id}' no encontrado.` },
        { status: 404 }
      )
    }

    const deactivated = catalogService.deactivateDoctor(id)
    return NextResponse.json({
      success: true,
      rule: "RNF-02",
      type: "soft-delete",
      data: deactivated,
      message: `Baja lógica aplicada: El profesional '${deactivated.fullName}' pasó a estado Inactivo. Su historial clínico y turnos pasados se preservan íntegros.`,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al dar de baja profesional"
    return NextResponse.json({ success: false, error: msg }, { status: 400 })
  }
}
