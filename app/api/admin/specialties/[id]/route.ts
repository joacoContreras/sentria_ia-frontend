import { NextResponse } from "next/server"
import { catalogService } from "@/features/admin/services/catalog.service"
import { UpdateSpecialtyInput } from "@/types/admin"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const specialty = catalogService.getSpecialtyById(id)
    if (!specialty) {
      return NextResponse.json(
        { success: false, error: `Especialidad con ID '${id}' no encontrada.` },
        { status: 404 }
      )
    }

    const integrity = catalogService.canDeleteSpecialty(id)

    return NextResponse.json({
      success: true,
      data: {
        ...specialty,
        activeDoctorsCount: integrity.activeDoctorsCount,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error al obtener especialidad",
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body: UpdateSpecialtyInput = await request.json()

    const updated = catalogService.updateSpecialty(id, body)
    return NextResponse.json({
      success: true,
      data: updated,
      message: `Especialidad '${updated.name}' actualizada exitosamente.`,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar especialidad"
    const status = msg.includes("no encontrada") ? 404 : msg.includes("Ya existe") ? 409 : 400
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body: UpdateSpecialtyInput = await request.json()

    const updated = catalogService.updateSpecialty(id, body)
    return NextResponse.json({
      success: true,
      data: updated,
      message: `Especialidad '${updated.name}' modificada exitosamente.`,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al modificar especialidad"
    const status = msg.includes("no encontrada") ? 404 : 400
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}

/**
 * DELETE: Respeta regla de Integridad Referencial RNF-02
 * No se permite eliminar si existen profesionales activos vinculados.
 */
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const check = catalogService.canDeleteSpecialty(id)

    if (!check.canDelete) {
      return NextResponse.json(
        {
          success: false,
          error: check.message,
          rule: "RNF-02",
          activeDoctorsCount: check.activeDoctorsCount,
          activeDoctors: check.activeDoctors.map((d) => ({
            id: d.id,
            fullName: d.fullName,
            license: d.license,
          })),
        },
        { status: 409 }
      )
    }

    catalogService.deleteSpecialty(id)
    return NextResponse.json({
      success: true,
      message: `Especialidad '${id}' eliminada exitosamente.`,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar especialidad"
    const status = msg.includes("no encontrada") ? 404 : msg.includes("RNF-02") ? 409 : 400
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}
