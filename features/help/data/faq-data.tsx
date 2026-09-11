import React from "react"
import {
  Hospital,
  Building2,
  FileText,
  Bot,
  AlertTriangle,
  CloudDownload,
  CheckCircle2,
  MapPin,
} from "lucide-react"
import { FAQItem, FAQCategory } from "@/types/help"

export const FAQ_CATEGORIES: FAQCategory[] = [
  { id: "all", label: "Todas las Consultas" },
  { id: "guardia", label: "Atención en Guardia" },
  { id: "sedes", label: "Sedes y Estudios" },
  { id: "ia", label: "Asistente Sentria AI" },
]

export const QUICK_SEARCH_PILLS = [
  "Horarios de guardia",
  "Cancelar turno",
  "Retiro de laboratorio",
  "Triage digital",
  "Obras sociales",
]

export const FAQ_ITEMS: (Omit<FAQItem, "icon"> & {
  icon: React.ComponentType<{ className?: string }>
})[] = [
  {
    id: "guardias-horarios",
    categories: ["guardia"],
    title: "¿Cuáles son los horarios de atención de la guardia general y pediátrica?",
    badgeLabel: "Atención en Guardia",
    badgeSubLabel: "Actualizado hace 2 días",
    icon: Hospital,
    keywords: [
      "horarios",
      "guardia",
      "pediatrica",
      "general",
      "adultos",
      "urgencias",
      "24 horas",
      "atencion",
      "triage",
    ],
    content: (
      <div className="space-y-space-sm text-body-md text-on-surface-variant">
        <p>
          La atención médica de urgencias en nuestra red funciona bajo régimen
          permanente de{" "}
          <strong className="font-medium text-on-surface">
            24 horas, los 365 días del año
          </strong>
          , sin interrupciones.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-space-2xs">
          <div className="p-space-sm rounded-lg bg-surface-container">
            <div className="text-label-lg text-on-surface">
              Guardia General de Adultos
            </div>
            <div className="text-label-md text-secondary mt-space-2xs">
              Sede Central y Sede Norte. Triage continuo con médicos emergentólogos
              y equipo quirúrgico de guardia activa.
            </div>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container">
            <div className="text-label-lg text-on-surface">
              Guardia Pediátrica Especializada
            </div>
            <div className="text-label-md text-secondary mt-space-2xs">
              Sede Central Exclusiva (Acceso Pabellón Materno-Infantil, Calle Los
              Álamos 450). Con sala de espera diferenciada.
            </div>
          </div>
        </div>

        <p className="text-secondary text-label-md">
          Nota: El orden de ingreso no es por orden de llegada, sino
          estrictamente por severidad biológica evaluada en el puesto de triage
          inicial.
        </p>
      </div>
    ),
  },
  {
    id: "sedes-ubicacion",
    categories: ["sedes"],
    title: "¿Dónde están ubicadas las sedes hospitalarias y cómo acceder?",
    badgeLabel: "Sedes y Estudios",
    badgeSubLabel: "Infraestructura",
    icon: Building2,
    keywords: [
      "sedes",
      "ubicacion",
      "direcciones",
      "hospital",
      "favaloro",
      "sede norte",
      "consultorios",
      "acceso",
      "colectivo",
      "metrobus",
      "estacionamiento",
    ],
    content: (
      <div className="space-y-space-md text-body-md text-on-surface-variant">
        <p>
          Nuestra institución cuenta con tres nodos principales diseñados para
          minimizar traslados innecesarios:
        </p>

        <div className="space-y-space-xs">
          <div className="p-space-sm rounded-lg bg-surface-container flex flex-col md:flex-row md:items-center justify-between gap-space-xs">
            <div>
              <span className="text-label-lg text-on-surface">
                Sede Central & Policlínico Alta Complejidad
              </span>
              <p className="text-body-md text-secondary">
                Av. Dr. Favaloro 1820 — Acceso ambulancias por rampa lateral este.
              </p>
            </div>
            <span className="text-label-sm text-primary bg-surface px-space-xs py-space-2xs rounded-md self-start md:self-auto font-medium">
              Guardia 24h + Lab Continuo
            </span>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container flex flex-col md:flex-row md:items-center justify-between gap-space-xs">
            <div>
              <span className="text-label-lg text-on-surface">
                Sede Norte & Centro de Diagnóstico por Imágenes
              </span>
              <p className="text-body-md text-secondary">
                Camino Real Norte 4102 — Estacionamiento libre para pacientes
                ambulatorios.
              </p>
            </div>
            <span className="text-label-sm text-on-surface-variant bg-surface px-space-xs py-space-2xs rounded-md self-start md:self-auto font-medium">
              Lunes a Sábado 07:00 - 21:00
            </span>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container flex flex-col md:flex-row md:items-center justify-between gap-space-xs">
            <div>
              <span className="text-label-lg text-on-surface">
                Consultorios Externos y Medicina Preventiva
              </span>
              <p className="text-body-md text-secondary">
                Bvd. de la Salud 310, Pisos 1 al 4 — Metrobus Estación Policlínico
                (Líneas 34, 166).
              </p>
            </div>
            <span className="text-label-sm text-on-surface-variant bg-surface px-space-xs py-space-2xs rounded-md self-start md:self-auto font-medium">
              Lunes a Viernes 08:00 - 20:00
            </span>
          </div>
        </div>

        {/* Location Geoassisted Preview */}
        <div className="pt-space-xs">
          <div
            className="w-full h-48 bg-cover bg-center rounded-xl relative overflow-hidden shadow-xs flex items-end p-space-md"
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDNzgXcD-D2sYcFMnm988rlgdL8GNTkYZD9W0gdLUnvTujZnlafMDH9So6hJOqvaC9mUt4bcKWY8W-Ehq3GC3eg1pkYY_TJugDXyep_nZuQ02TYvkRzWK-xVQ9ICLkzqFTYWeHrqjqKrXmsxhzcM2Qapy56aDx9eIz8kpzIqtXsYKMA0kTxwvdNm25OG2Vcjo_0xDoDgS7dFbkUKYW7XP-2b14E8AxJSfAxBIA1-ahSZG-g-7xyAq4')`,
            }}
          >
            <div className="bg-surface-container-lowest/90 backdrop-blur-md px-space-md py-space-xs rounded-lg shadow-xs flex items-center gap-space-xs">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span className="text-label-md text-on-surface">
                Ubicación Geoasistida: Sede Central Sentria AI
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "estudios-requisitos",
    categories: ["sedes"],
    title:
      "¿Qué requisitos y documentación necesito para retirar estudios o historias clínicas?",
    badgeLabel: "Sedes y Estudios",
    badgeSubLabel: "Gestión de Documentos",
    icon: FileText,
    keywords: [
      "estudios",
      "requisitos",
      "documentacion",
      "retirar",
      "historias clinicas",
      "dni",
      "terceros",
      "laboratorio",
      "informes",
      "descarga",
      "pdf",
    ],
    content: (
      <div className="space-y-space-sm text-body-md text-on-surface-variant">
        <p>
          Por normativas de resguardo de datos médicos (Ley de Protección de Datos
          Personales e HIPAA/HITECH), el retiro presencial o digital exige
          validación fehaciente de identidad:
        </p>

        <ul className="space-y-space-xs list-disc list-inside">
          <li>
            <strong className="font-medium text-on-surface">
              Retiro por el titular:
            </strong>{" "}
            DNI o Pasaporte físico original y credencial médica vigente.
          </li>
          <li>
            <strong className="font-medium text-on-surface">
              Retiro por terceros autorizados:
            </strong>{" "}
            Nota simple firmada por el titular, copia del DNI del titular y
            documento original de la persona autorizada.
          </li>
          <li>
            <strong className="font-medium text-on-surface">
              Retiro de estudios de menores:
            </strong>{" "}
            Partida de nacimiento o Libreta de Matrimonio que acredite filiación,
            junto con el DNI del padre/madre/tutor legal.
          </li>
        </ul>

        <div className="p-space-md rounded-xl bg-surface-container flex items-center gap-space-md">
          <CloudDownload className="h-7 w-7 text-primary shrink-0" />
          <div className="flex-1">
            <span className="text-label-lg text-on-surface font-semibold block">
              Descarga Inmediata en Portal Pacientes
            </span>
            <p className="text-body-md text-secondary">
              El 94% de los informes de laboratorio e imágenes radiológicas
              cuentan con firma digital homologada y pueden descargarse
              directamente en formato PDF desde su panel personal.
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "ia-agente-turnos",
    categories: ["ia"],
    title:
      "¿Cómo interactúo con el agente conversacional inteligente para agendar o cancelar un turno?",
    badgeLabel: "Asistente Sentria AI",
    badgeSubLabel: "Turnos & Reprogramaciones",
    icon: Bot,
    keywords: [
      "asistente",
      "ia",
      "inteligencia artificial",
      "agente",
      "turnos",
      "agendar",
      "cancelar",
      "reprogramar",
      "whatsapp",
      "triage digital",
    ],
    content: (
      <div className="space-y-space-md text-body-md text-on-surface-variant">
        <p>
          El asistente clínico Sentria AI está disponible las 24 horas para
          gestionar turnos sin esperas telefónicas ni burocracia administrativa:
        </p>

        {/* 3-step timeline UI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
          <div className="p-space-sm rounded-lg bg-surface-container space-y-space-2xs">
            <span className="text-label-sm text-primary font-bold">Paso 01</span>
            <div className="text-label-lg text-on-surface font-semibold">
              Expresión natural
            </div>
            <p className="text-body-md text-secondary">
              Escriba o dicte su síntoma o la especialidad deseada (ej.
              &quot;Necesito turno con cardiología el jueves por la mañana&quot;).
            </p>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container space-y-space-2xs">
            <span className="text-label-sm text-primary font-bold">Paso 02</span>
            <div className="text-label-lg text-on-surface font-semibold">
              Matcheo de agendas
            </div>
            <p className="text-body-md text-secondary">
              El motor coteja disponibilidad médica real y le presenta 3 opciones
              horarias con el profesional correspondiente.
            </p>
          </div>

          <div className="p-space-sm rounded-lg bg-surface-container space-y-space-2xs">
            <span className="text-label-sm text-primary font-bold">Paso 03</span>
            <div className="text-label-lg text-on-surface font-semibold">
              Confirmación omnicanal
            </div>
            <p className="text-body-md text-secondary">
              Recibirá voucher y recordatorio vía WhatsApp con botón para
              reprogramar o cancelar en 2 clics.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-space-xs text-primary text-label-md pt-space-xs">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>
            Sin costos adicionales. Admite cambios automáticos hasta 3 horas
            antes del turno.
          </span>
        </div>
      </div>
    ),
  },
  {
    id: "ia-triage-emergencia",
    categories: ["guardia", "ia"],
    title:
      "¿Qué ocurre si el asistente detecta que mis síntomas requieren atención inmediata?",
    badgeLabel: "Atención en Guardia",
    badgeSubLabel: "Asistente Sentria AI",
    icon: AlertTriangle,
    keywords: [
      "sintomas",
      "emergencia",
      "urgencia",
      "esi",
      "shockroom",
      "riesgo vital",
      "protocolo",
      "inmediata",
      "primeros auxilios",
    ],
    content: (
      <div className="space-y-space-md text-body-md text-on-surface-variant">
        <p>
          Sentria AI cuenta con un modelo de clasificación clínica basado en la
          escala internacional{" "}
          <strong className="font-medium text-on-surface">
            Emergency Severity Index (ESI Niveles 1 al 5)
          </strong>
          . Si sus respuestas sugieren riesgo vital o urgencia médica no
          diferible:
        </p>

        <div className="space-y-space-xs">
          <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container">
            <span className="w-3 h-3 rounded-full bg-error mt-1 flex-shrink-0" />
            <div>
              <div className="text-label-lg text-on-surface font-semibold">
                Interrupción preventiva del flujo de turnos
              </div>
              <div className="text-body-md text-secondary">
                El sistema bloquea la opción de espera domiciliaria y despliega de
                inmediato la alerta de derivación de emergencia.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container">
            <span className="w-3 h-3 rounded-full bg-tertiary mt-1 flex-shrink-0" />
            <div>
              <div className="text-label-lg text-on-surface font-semibold">
                Preaviso telemétrico al Shockroom de Guardia
              </div>
              <div className="text-body-md text-secondary">
                Si confirma que se dirige a nuestra Sede Central, se genera un
                código de pre-arribo que informa al equipo de triage médico sobre
                el motivo de consulta prioritario.
              </div>
            </div>
          </div>

          <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container">
            <span className="w-3 h-3 rounded-full bg-primary mt-1 flex-shrink-0" />
            <div>
              <div className="text-label-lg text-on-surface font-semibold">
                Guía de primeros auxilios y geonavegación
              </div>
              <div className="text-body-md text-secondary">
                Se le brinda la ruta vial más rápida con estado de tránsito en
                tiempo real hacia la guardia más cercana.
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
]
