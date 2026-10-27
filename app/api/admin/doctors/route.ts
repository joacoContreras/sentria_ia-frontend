import { NextResponse } from "next/server"
import { catalogService } from "@/features/admin/services/catalog.service"
import { CreateDoctorInput } from "@/types/admin"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const specialty = searchParams.get("specialty")
    const search = searchParams.get("search")?.toLowerCase().trim()
    const status = searchParams.get("status") // "active" | "inactive" | "all"

    let doctors = catalogService.getDoctors()

    if (status === "active") {
      doctors = doctors.filter((d) => d.isActive)
    } else if (status === "inactive") {
      doctors = doctors.filter((d) => !d.isActive)
    }

    if (specialty && specialty !== "all") {
      doctors = doctors.filter(
        (d) =>
          d.specialtyId === specialty ||
          d.specialtyName.toLowerCase() === specialty.toLowerCase()
      )
    }

    if (search) {
      doctors = doctors.filter(
        (d) =>
          d.fullName.toLowerCase().includes(search) ||
          d.license.toLowerCase().includes(search) ||
          d.specialtyName.toLowerCase().includes(search)
      )
    }

    return NextResponse.json({
      success: true,
      data: doctors,
      count: doctors.length,
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

export async function POST(request: Request) {
  try {
    const body: CreateDoctorInput = await request.json()

    if (!body.fullName || !body.fullName.trim()) {
      return NextResponse.json(
        { success: false, error: "El nombre completo del profesional es obligatorio." },
        { status: 400 }
      )
    }

    if (!body.license || !body.license.trim()) {
      return NextResponse.json(
        { success: false, error: "El número de matrícula es obligatorio." },
        { status: 400 }
      )
    }

    if (!body.specialtyId || !body.specialtyId.trim()) {
      return NextResponse.json(
        { success: false, error: "La especialidad asociada es obligatoria." },
        { status: 400 }
      )
    }

    const created = catalogService.createDoctor(body)
    return NextResponse.json(
      {
        success: true,
        data: created,
        message: `Profesional '${created.fullName}' dado de alta exitosamente.`,
      },
      { status: 201 }
    )
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Error al crear profesional"
    const status = msg.includes("ya se encuentra registrada") ? 409 : 400
    return NextResponse.json({ success: false, error: msg }, { status })
  }
}
