/**
 * Herramientas de consulta de catálogo para el Bot conversacional con OpenAI (Function Calling)
 * Sentria AI - Cumple con CA4
 */

import {
  CoverageAcceptedResult,
  OpenAiToolDefinition,
  SpecialtyAvailabilityResult,
} from "@/types/admin"
import { catalogService } from "./catalog.service"

/**
 * Especificaciones de herramientas en formato OpenAI Function Calling
 */
export const OPENAI_CATALOG_TOOLS: OpenAiToolDefinition[] = [
  {
    type: "function",
    function: {
      name: "check_specialty_availability",
      description:
        "Verifica si el centro médico Sentria AI ofrece una especialidad médica específica, si se encuentra activa en el catálogo institucional y qué profesionales activos atienden en ella.",
      parameters: {
        type: "object",
        properties: {
          specialty_name: {
            type: "string",
            description:
              "Nombre o término de la especialidad médica solicitada por el paciente (ej. 'Cardiología', 'Dermatología', 'Traumatología', 'Clínica').",
          },
        },
        required: ["specialty_name"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_coverage_accepted",
      description:
        "Verifica si el centro médico acepta y tiene convenio vigente con una cobertura médica, prepaga u obra social (ej. 'OSDE', 'Swiss Medical', 'Galeno'), indicando planes aceptados, copagos, autorizaciones y especialidades vinculadas.",
      parameters: {
        type: "object",
        properties: {
          coverage_name: {
            type: "string",
            description:
              "Nombre de la obra social, prepaga o entidad de cobertura (ej. 'OSDE', 'Swiss Medical', 'Particular').",
          },
          plan_name: {
            type: "string",
            description:
              "Nombre o código de plan opcional a verificar (ej. '310', 'SMG20', 'Plata 330').",
          },
        },
        required: ["coverage_name"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_active_specialties",
      description:
        "Obtiene la lista completa de todas las especialidades médicas actualmente activas y con profesionales habilitados en Sentria AI.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "list_accepted_coverages",
      description:
        "Obtiene la nómina institucional de todas las obras sociales y empresas de medicina prepaga con convenio activo en el centro médico.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
]

/**
 * Validador de Especialidad Médica para OpenAI Function Calling
 */
export function checkSpecialtyAvailability(
  specialtyName: string
): SpecialtyAvailabilityResult {
  const query = specialtyName.trim().toLowerCase()
  const activeSpecialties = catalogService.getActiveSpecialties()

  const match = activeSpecialties.find((s) => {
    const sName = s.name.toLowerCase()
    return sName.includes(query) || query.includes(sName)
  })

  if (!match) {
    return {
      available: false,
      activeDoctors: [],
      message: `El centro médico Sentria AI actualmente no cuenta con la especialidad '${specialtyName}' en su catálogo operativo activo.`,
    }
  }

  const activeDoctors = catalogService.getActiveDoctors(match.id).map((doc) => ({
    fullName: doc.fullName,
    license: doc.license,
  }))

  return {
    available: true,
    specialty: match,
    activeDoctors,
    message:
      activeDoctors.length > 0
        ? `Sentria AI cuenta con la especialidad de ${match.name}. Contamos con ${activeDoctors.length} profesional(es) activo(s) con agenda disponible: ${activeDoctors.map((d) => `${d.fullName} (${d.license})`).join(", ")}.`
        : `Sentria AI ofrece la especialidad de ${match.name}, aunque en este momento no hay profesionales con turnos inmediatos asignados.`,
  }
}

/**
 * Validador de Cobertura Médica para OpenAI Function Calling
 */
export function checkCoverageAccepted(
  coverageName: string,
  planName?: string
): CoverageAcceptedResult {
  const query = coverageName.trim().toLowerCase()
  const activeCoverages = catalogService.getActiveCoverages()

  const match = activeCoverages.find((c) => {
    const cName = c.name.toLowerCase()
    return cName.includes(query) || query.includes(cName)
  })

  if (!match) {
    return {
      accepted: false,
      availablePlans: [],
      requiresCopay: false,
      requiresAuthorization: false,
      coveredSpecialties: [],
      message: `La institución no posee convenio vigente con '${coverageName}'. Puede optar por atención como Particular con emisión de factura para reintegro.`,
    }
  }

  const allSpecialties = catalogService.getActiveSpecialties()
  const coveredSpecialties =
    match.associatedSpecialties.includes("all")
      ? allSpecialties.map((s) => s.name)
      : allSpecialties
          .filter((s) => match.associatedSpecialties.includes(s.id))
          .map((s) => s.name)

  let planMsg = ""
  if (planName) {
    const planMatch = match.plans.some((p) =>
      p.toLowerCase().includes(planName.trim().toLowerCase())
    )
    planMsg = planMatch
      ? ` El plan '${planName}' está expresamente aceptado.`
      : ` Planes homologados registrados: ${match.plans.join(", ")}.`
  }

  const copayMsg = match.requiresCopay
    ? " Requiere copago en consultorios externos."
    : " No requiere copago (atención 100% cubierta)."

  const authMsg = match.requiresAuthorization
    ? " Requiere orden con autorización previa de la prepaga."
    : " Admite validación directa por credencial/token sin autorización previa."

  return {
    accepted: true,
    coverage: match,
    availablePlans: match.plans,
    requiresCopay: match.requiresCopay,
    requiresAuthorization: match.requiresAuthorization,
    coveredSpecialties,
    message: `Sentria AI mantiene convenio vigente con ${match.name}.${planMsg}${copayMsg}${authMsg} Especialidades cubiertas: ${coveredSpecialties.slice(0, 4).join(", ")}${coveredSpecialties.length > 4 ? " y más" : ""}.`,
  }
}

/**
 * Ejecutor unificado de Function Calling para endpoints de OpenAI
 */
export function executeOpenAiTool(
  toolName: string,
  parameters: Record<string, unknown>
): Record<string, unknown> {
  switch (toolName) {
    case "check_specialty_availability": {
      const name = String(parameters.specialty_name || "")
      return checkSpecialtyAvailability(name) as unknown as Record<string, unknown>
    }
    case "check_coverage_accepted": {
      const cov = String(parameters.coverage_name || "")
      const plan = parameters.plan_name ? String(parameters.plan_name) : undefined
      return checkCoverageAccepted(cov, plan) as unknown as Record<string, unknown>
    }
    case "list_active_specialties": {
      const specialties = catalogService.getActiveSpecialties()
      return {
        count: specialties.length,
        specialties: specialties.map((s) => ({
          id: s.id,
          name: s.name,
          description: s.description,
          doctorsCount: catalogService.getActiveDoctors(s.id).length,
        })),
      }
    }
    case "list_accepted_coverages": {
      const coverages = catalogService.getActiveCoverages()
      return {
        count: coverages.length,
        coverages: coverages.map((c) => ({
          name: c.name,
          type: c.type,
          plans: c.plans,
          requiresCopay: c.requiresCopay,
        })),
      }
    }
    default:
      return {
        error: `Herramienta de Function Calling no reconocida: '${toolName}'`,
      }
  }
}

/**
 * Evaluación conversacional en lenguaje natural para el Bot de Sentria AI
 * Permite responder preguntas sobre especialidades y coberturas usando el catálogo dinámico
 */
export function evaluateConversationalCatalogQuery(userText: string): {
  matched: boolean
  reply: string
  actions?: Array<{ label: string; action: string }>
} | null {
  const query = userText.toLowerCase().trim()

  // 1. Detección de consultas sobre Coberturas / Obras Sociales / Prepagas
  const isCoverageQuery =
    query.includes("obra social") ||
    query.includes("obras sociales") ||
    query.includes("prepaga") ||
    query.includes("prepagas") ||
    query.includes("cobertura") ||
    query.includes("atienden con") ||
    query.includes("reciben") ||
    query.includes("aceptan") ||
    query.includes("convenio")

  const allActiveCoverages = catalogService.getActiveCoverages()

  for (const cov of allActiveCoverages) {
    if (query.includes(cov.name.toLowerCase())) {
      const res = checkCoverageAccepted(cov.name)
      return {
        matched: true,
        reply: `🛡️ **Convenio con ${cov.name}:**\n\n${res.message}\n\n• **Planes vigentes:** ${cov.plans.join(", ")}\n• **Modalidad:** ${cov.requiresCopay ? "Con copago arancelario" : "Sin copago"}\n• **Autorizaciones:** ${cov.requiresAuthorization ? "Requiere autorización previa" : "Validación directa en recepción"}`,
        actions: [
          { label: "Buscar turnos disponibles", action: "buscar_turnos" },
          { label: "Ir al portal de registro", action: "ir_portal" },
        ],
      }
    }
  }

  if (
    isCoverageQuery &&
    (query.includes("que") || query.includes("cuales") || query.includes("listado"))
  ) {
    const list = allActiveCoverages.map((c) => `• **${c.name}** (${c.plans.join(", ")})`).join("\n")
    return {
      matched: true,
      reply: `🛡️ **Obras Sociales y Prepagas Aceptadas en Sentria AI:**\n\n${list}\n\nTambién atendemos consultas **Particulares** con entrega de factura electrónica para trámite de reintegro ante cualquier cobertura médica.`,
      actions: [
        { label: "Buscar turnos con mi cobertura", action: "buscar_turnos" },
        { label: "Registrarme en el portal", action: "ir_portal" },
      ],
    }
  }

  // 2. Detección de consultas sobre Especialidades y Médicos
  const allActiveSpecialties = catalogService.getActiveSpecialties()

  for (const spec of allActiveSpecialties) {
    const specKeywords = spec.name.toLowerCase().split(/\s+/)
    const hasKeyword = specKeywords.some(
      (kw) => kw.length > 4 && query.includes(kw)
    )

    if (query.includes(spec.name.toLowerCase()) || hasKeyword) {
      const res = checkSpecialtyAvailability(spec.name)
      const doctorsList = res.activeDoctors
        .map((d) => `• **${d.fullName}** (${d.license})`)
        .join("\n")

      return {
        matched: true,
        reply: `🩺 **Especialidad de ${spec.name}:**\n\n${spec.description}\n\n👨‍⚕️ **Profesionales disponibles con agenda activa:**\n${doctorsList || "• Consultar en recepción por nuevos cupos"}\n\n¿Desea solicitar un turno para esta especialidad?`,
        actions: [
          { label: `Agendar con ${spec.name}`, action: "buscar_turnos" },
          { label: "Ver sedes de atención", action: "guardia" },
        ],
      }
    }
  }

  if (
    query.includes("especialidades") &&
    (query.includes("que") || query.includes("cuales") || query.includes("lista"))
  ) {
    const list = allActiveSpecialties.map((s) => `• **${s.name}**`).join("\n")
    return {
      matched: true,
      reply: `🩺 **Especialidades Médicas Activas en Sentria AI:**\n\n${list}\n\nTodas cuentan con profesionales habilitados y agendas de consultorio presencial y teleconsulta HD.`,
      actions: [
        { label: "Buscar turnos por especialidad", action: "buscar_turnos" },
      ],
    }
  }

  return null
}
