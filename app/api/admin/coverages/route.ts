import { NextResponse } from "next/server"
import { catalogService } from "@/features/admin/services/catalog.service"
import { CreateCoverageInput } from "@/types/admin"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status") // "active" | "inactive" | "all"
    const type = searchParams.get("type")
    const search = searchParams.get("search")?.toLowerCase().trim()

    let coverages = catalogService.getCoverages()

    if (status === "active") {
      coverages = coverages.filter((c) => c.isActive)
    } else if (status === "inactive") {
      coverages = coverages.filter((c) => !c.isActive)
    }

    if (type && type !== "all") {
      coverages = coverages.filter((c) => c.type === type)
    }

    if (search) {
      coverages = coverages.filter(
        (c) =>
          c.name.toLowerCase().includes(search) ||
          c.plans.some((p) => p.toLowerCase().includes(search))
      )
    }

    return NextResponse.json({
      success: true,
      data: coverages,
      count: coverages.length,
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

export async function POST(request: Request) {
  try {
    const body: CreateCoverageInput = await request.json()

    if (!body.name || !body.name.trim()) {
      return NextResponse.json(
        { success: false, error: "El nombre de la cobertura u obra social es obligatorio." },
        { status: 400 }
      )
    }

    if (!body.type) {
      return NextResponse.json(
        { success: false, error: "El tipo de entidad (prepaga/obra_social/particular) es obligatorio." },
        { status: 400 }
      )
    }

    const created = catalogService.createCoverage(body)
    return NextResponse.json(
      {
        success: true,
        data: created,
        message: `Cobertura '${created.name}' dada de alta exitosamente.`,
      },
      { status: 201 }
    )
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear cobertura"
    const status = msg.includes("ya se encuentra registrada") ? 409 : 400
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}
