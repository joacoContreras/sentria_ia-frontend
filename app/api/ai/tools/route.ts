import { NextResponse } from "next/server"
import {
  OPENAI_CATALOG_TOOLS,
  executeOpenAiTool,
} from "@/features/admin/services/ai-catalog-tools"

/**
 * GET: Devuelve los esquemas de herramientas para OpenAI Function Calling
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    tools: OPENAI_CATALOG_TOOLS,
    count: OPENAI_CATALOG_TOOLS.length,
  })
}

/**
 * POST: Ejecuta una función llamada por el bot conversacional de OpenAI
 * Body: { toolName: string, arguments: Record<string, unknown> }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { toolName, arguments: toolArgs } = body

    if (!toolName) {
      return NextResponse.json(
        { success: false, error: "El campo 'toolName' es requerido." },
        { status: 400 }
      )
    }

    const result = executeOpenAiTool(toolName, toolArgs || {})
    return NextResponse.json({
      success: true,
      toolName,
      result,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error ejecutando OpenAI tool",
      },
      { status: 500 }
    )
  }
}
