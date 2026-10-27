import { NextResponse } from "next/server"
import { catalogService } from "@/features/admin/services/catalog.service"
import { UpdateCoverageInput } from "@/types/admin"

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const coverage = catalogService.getCoverageById(id)
    if (!coverage) {
      return NextResponse.json(
        { success: false, error: `Cobertura con ID '${id}' no encontrada.` },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: coverage,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error al obtener cobertura",
      },
      { status: 500 }
    )
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body: UpdateCoverageInput = await request.json()

    const updated = catalogService.updateCoverage(id, body)
    return NextResponse.json({
      success: true,
      data: updated,
      message: `Cobertura '${updated.name}' actualizada exitosamente.`,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al actualizar cobertura"
    const status = msg.includes("no encontrada") ? 404 : msg.includes("Ya existe") ? 409 : 400
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const body: UpdateCoverageInput = await request.json()

    const updated = catalogService.updateCoverage(id, body)
    return NextResponse.json({
      success: true,
      data: updated,
      message: `Estado o datos de la cobertura '${updated.name}' modificados exitosamente.`,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al modificar cobertura"
    const status = msg.includes("no encontrada") ? 404 : 400
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params
    const coverage = catalogService.getCoverageById(id)
    if (!coverage) {
      return NextResponse.json(
        { success: false, error: `Cobertura con ID '${id}' no encontrada.` },
        { status: 404 }
      )
    }

    catalogService.deleteCoverage(id)
    return NextResponse.json({
      success: true,
      message: `Cobertura '${coverage.name}' eliminada exitosamente.`,
    })
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al eliminar cobertura"
    return NextResponse.json({ success: false, error: msg }, { status: 400 })
  }
}
