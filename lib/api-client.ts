/**
 * Cliente HTTP unificado para Sentria AI
 * Maneja llamadas a la API REST del backend Java / Spring Boot con:
 * - Inyección automática de token JWT (Authorization: Bearer <token>)
 * - Timeout configurable con AbortController
 * - Normalización de errores de red y respuestas del backend (Spring ProblemDetail / ErrorResponse)
 * - Soporte para JSON y FormData (subida de archivos)
 */

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  error?: string
  statusCode?: number
}

export interface ApiClientOptions extends Omit<RequestInit, "body"> {
  body?: unknown
  timeoutMs?: number
  requiresAuth?: boolean
  customHeaders?: Record<string, string>
}

const DEFAULT_TIMEOUT_MS = 15000
const STORAGE_KEY = "sentria_patient_session"

/**
 * Obtiene el token JWT actual almacenado en la sesión del cliente
 */
export function getStoredAuthToken(): string | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return typeof parsed?.token === "string" ? parsed.token : null
  } catch {
    return null
  }
}

/**
 * Parsea de forma segura el cuerpo de la respuesta HTTP
 */
async function parseResponseBody(response: Response): Promise<Record<string, unknown>> {
  const contentType = response.headers.get("content-type") || ""
  if (contentType.includes("application/json")) {
    try {
      const text = await response.text()
      return text ? JSON.parse(text) : {}
    } catch {
      return { message: `Error al procesar JSON del servidor (${response.status})` }
    }
  }

  try {
    const text = await response.text()
    return text ? { message: text } : {}
  } catch {
    return {}
  }
}

/**
 * Extrae un mensaje de error legible a partir de la respuesta del servidor Java
 */
function extractErrorMessage(
  body: Record<string, unknown>,
  statusCode: number,
  statusText: string
): string {
  // Manejo de estándar Spring Boot 3 ProblemDetail / RFC 7807 (detail, title)
  if (typeof body.detail === "string" && body.detail.trim()) {
    return body.detail
  }
  if (typeof body.title === "string" && body.title.trim() && !body.message) {
    return body.title
  }

  // Manejo de estructura estándar de Spring ErrorResponse (error, message)
  if (typeof body.error === "string" && body.error.trim()) {
    return body.error
  }
  if (typeof body.message === "string" && body.message.trim()) {
    return body.message
  }

  // Manejo de errores de validación (@Valid Spring: errors / fieldErrors)
  if (Array.isArray(body.errors) && body.errors.length > 0) {
    const firstErr = body.errors[0]
    if (typeof firstErr === "string") return firstErr
    if (typeof firstErr === "object" && firstErr !== null && "defaultMessage" in firstErr) {
      return String((firstErr as { defaultMessage: unknown }).defaultMessage)
    }
  }

  if (statusCode === 401) return "Sesión expirada o credenciales no válidas."
  if (statusCode === 403) return "No posee permisos para realizar esta acción."
  if (statusCode === 404) return "El recurso solicitado no fue encontrado en el servidor."
  if (statusCode >= 500) return "Error interno en el servidor asistencial. Intente más tarde."

  return statusText || `Error HTTP ${statusCode}`
}

/**
 * Cliente HTTP principal para consumir endpoints de Sentria AI
 */
export async function apiClient<T = unknown>(
  endpoint: string,
  options: ApiClientOptions = {}
): Promise<ApiResponse<T>> {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")

  // Si no hay URL base configurada, retornamos error de conexión no configurada
  if (!apiBaseUrl) {
    return {
      success: false,
      message: "API backend no configurada (NEXT_PUBLIC_API_URL ausente).",
      error: "NEXT_PUBLIC_API_URL is not defined",
      statusCode: 0,
    }
  }

  const {
    body,
    timeoutMs = Number(process.env.NEXT_PUBLIC_REQUEST_TIMEOUT_MS) || DEFAULT_TIMEOUT_MS,
    requiresAuth = true,
    customHeaders = {},
    headers: initHeaders,
    ...fetchOptions
  } = options

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${apiBaseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`

  const headers: Record<string, string> = {
    Accept: "application/json",
    ...customHeaders,
  }

  // Inyectar token de autorización si corresponde
  if (requiresAuth) {
    const token = getStoredAuthToken()
    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
  }

  // Preparar cuerpo de la petición
  let requestBody: BodyInit | undefined = undefined

  if (body !== undefined && body !== null) {
    if (body instanceof FormData) {
      // Dejar que el navegador configure automáticamente multipart/form-data con boundary
      requestBody = body
    } else if (typeof body === "string") {
      headers["Content-Type"] = headers["Content-Type"] || "application/json"
      requestBody = body
    } else {
      headers["Content-Type"] = "application/json"
      requestBody = JSON.stringify(body)
    }
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        ...headers,
        ...(initHeaders as Record<string, string>),
      },
      body: requestBody,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    const parsedBody = await parseResponseBody(response)

    if (!response.ok) {
      const errorMessage = extractErrorMessage(parsedBody, response.status, response.statusText)
      return {
        success: false,
        message: (typeof parsedBody.message === "string" && parsedBody.message) || errorMessage,
        error: errorMessage,
        statusCode: response.status,
      }
    }

    return {
      success: true,
      message: typeof parsedBody.message === "string" ? parsedBody.message : undefined,
      data: (parsedBody.data !== undefined ? parsedBody.data : parsedBody) as T,
      statusCode: response.status,
    }
  } catch (err: unknown) {
    clearTimeout(timeoutId)
    const isAbort = err instanceof DOMException && err.name === "AbortError"

    return {
      success: false,
      message: isAbort
        ? "El servidor tardó demasiado en responder (Tiempo de espera agotado)."
        : err instanceof Error
          ? err.message
          : "No se pudo establecer conexión con el servidor asistencial.",
      error: isAbort ? "Timeout" : "NetworkError",
      statusCode: 0,
    }
  }
}
