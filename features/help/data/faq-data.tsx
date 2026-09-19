import React from "react"
import { FAQItem, FAQCategory } from "@/types/help"

export const FAQ_CATEGORIES: FAQCategory[] = [
  { id: "all", label: "Todas las Consultas" },
  { id: "guardia", label: "Atención en Guardia" },
  { id: "sedes", label: "Sedes y Estudios" },
  { id: "ia", label: "Asistencia Digital" },
]

export const QUICK_SEARCH_PILLS = [
  "Horarios de guardia",
  "Cancelar turno",
  "Retiro de laboratorio",
  "Triage digital",
  "Obras sociales",
]

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "guardias-horarios",
    categories: ["guardia"],
    title: "¿Cuáles son los horarios de atención de la guardia general y pediátrica?",
    badgeLabel: "Atención en Guardia",
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
      <div className="space-y-space-sm text-body-md text-on-surface-variant leading-relaxed">
        <p>
          La atención médica de urgencias en nuestra red funciona bajo régimen permanente de{" "}
          <strong className="font-semibold text-on-surface">
            24 horas, los 365 días del año
          </strong>
          , sin interrupciones.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-space-2xs">
          <div className="p-space-md rounded-lg bg-surface-container/60 border border-outline-variant/10">
            <h4 className="text-label-lg text-on-surface font-semibold">
              Guardia General de Adultos
            </h4>
            <p className="text-body-sm text-secondary mt-space-2xs leading-relaxed">
              Sede Central y Sede Norte. Triage continuo con médicos emergentólogos y equipo quirúrgico de guardia activa.
            </p>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container/60 border border-outline-variant/10">
            <h4 className="text-label-lg text-on-surface font-semibold">
              Guardia Pediátrica Especializada
            </h4>
            <p className="text-body-sm text-secondary mt-space-2xs leading-relaxed">
              Sede Central (Acceso Pabellón Materno-Infantil, Calle Los Álamos 450) con sala de espera diferenciada.
            </p>
          </div>
        </div>

        <p className="text-secondary text-body-sm pt-space-2xs">
          Nota: El ingreso no es por orden de llegada, sino estrictamente por prioridad clínica evaluada en el puesto de triage inicial.
        </p>
      </div>
    ),
  },
  {
    id: "sedes-ubicacion",
    categories: ["sedes"],
    title: "¿Dónde están ubicadas las sedes hospitalarias y cómo acceder?",
    badgeLabel: "Sedes y Estudios",
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
      <div className="space-y-space-md text-body-md text-on-surface-variant leading-relaxed">
        <p>
          Nuestra institución cuenta con tres sedes principales:
        </p>

        <div className="space-y-space-xs">
          <div className="p-space-md rounded-lg bg-surface-container/60 border border-outline-variant/10 flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div>
              <h4 className="text-label-lg text-on-surface font-semibold">
                Sede Central & Policlínico Alta Complejidad
              </h4>
              <p className="text-body-sm text-secondary mt-space-3xs">
                Av. Dr. Favaloro 1820 — Acceso ambulancias por rampa lateral este.
              </p>
            </div>
            <span className="text-label-sm text-primary font-medium shrink-0">
              Guardia 24h
            </span>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container/60 border border-outline-variant/10 flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div>
              <h4 className="text-label-lg text-on-surface font-semibold">
                Sede Norte & Diagnóstico por Imágenes
              </h4>
              <p className="text-body-sm text-secondary mt-space-3xs">
                Camino Real Norte 4102 — Estacionamiento para pacientes.
              </p>
            </div>
            <span className="text-label-sm text-secondary shrink-0">
              Lun a Sáb 07:00 - 21:00
            </span>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container/60 border border-outline-variant/10 flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
            <div>
              <h4 className="text-label-lg text-on-surface font-semibold">
                Consultorios Externos y Medicina Preventiva
              </h4>
              <p className="text-body-sm text-secondary mt-space-3xs">
                Bvd. de la Salud 310, Pisos 1 al 4 — Metrobus Estación Policlínico (Líneas 34, 166).
              </p>
            </div>
            <span className="text-label-sm text-secondary shrink-0">
              Lun a Vie 08:00 - 20:00
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "estudios-requisitos",
    categories: ["sedes"],
    title: "¿Qué requisitos y documentación necesito para retirar estudios o historias clínicas?",
    badgeLabel: "Sedes y Estudios",
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
      <div className="space-y-space-sm text-body-md text-on-surface-variant leading-relaxed">
        <p>
          Por normativas de resguardo de datos médicos, el retiro presencial o digital exige validación de identidad:
        </p>

        <ul className="space-y-space-xs list-disc list-inside text-body-sm pl-space-xs">
          <li>
            <strong className="font-semibold text-on-surface">Retiro por el titular:</strong> DNI o Pasaporte original y credencial médica vigente.
          </li>
          <li>
            <strong className="font-semibold text-on-surface">Retiro por terceros autorizados:</strong> Nota simple de autorización firmada por el titular, copia de su DNI y documento original de quien retira.
          </li>
          <li>
            <strong className="font-semibold text-on-surface">Retiro de estudios de menores:</strong> DNI del menor y partida de nacimiento o libreta que acredite filiación, junto al DNI del tutor/a.
          </li>
        </ul>

        <div className="p-space-md rounded-lg bg-surface-container/60 border border-outline-variant/10 mt-space-sm">
          <h4 className="text-label-lg text-on-surface font-semibold">
            Descarga digital desde el Portal de Pacientes
          </h4>
          <p className="text-body-sm text-secondary mt-space-3xs leading-relaxed">
            La mayoría de los estudios de laboratorio e imágenes radiológicas están disponibles directamente en formato digital con firma electrónica en su cuenta del portal, sin necesidad de retiro presencial.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "ia-agente-turnos",
    categories: ["ia"],
    title: "¿Cómo interactúo con el asistente para agendar o cancelar un turno?",
    badgeLabel: "Asistencia Digital",
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
      <div className="space-y-space-md text-body-md text-on-surface-variant leading-relaxed">
        <p>
          El asistente de Sentria AI le permite gestionar turnos de forma guiada y sin esperas telefónicas:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
          <div className="p-space-md rounded-lg bg-surface-container/60 border border-outline-variant/10 space-y-space-2xs">
            <span className="text-label-xs text-primary font-semibold uppercase tracking-wider">Paso 1</span>
            <h4 className="text-label-lg text-on-surface font-semibold">
              Indique su necesidad
            </h4>
            <p className="text-body-sm text-secondary leading-relaxed">
              Escriba o hable sobre su síntoma o la especialidad médica que necesita consultar.
            </p>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container/60 border border-outline-variant/10 space-y-space-2xs">
            <span className="text-label-xs text-primary font-semibold uppercase tracking-wider">Paso 2</span>
            <h4 className="text-label-lg text-on-surface font-semibold">
              Seleccione día y hora
            </h4>
            <p className="text-body-sm text-secondary leading-relaxed">
              El sistema buscará la disponibilidad de profesionales y le sugerirá las mejores opciones horarias.
            </p>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container/60 border border-outline-variant/10 space-y-space-2xs">
            <span className="text-label-xs text-primary font-semibold uppercase tracking-wider">Paso 3</span>
            <h4 className="text-label-lg text-on-surface font-semibold">
              Confirmación inmediata
            </h4>
            <p className="text-body-sm text-secondary leading-relaxed">
              Recibirá la confirmación con los datos del turno y la posibilidad de reprogramar si lo necesita.
            </p>
          </div>
        </div>

        <p className="text-body-sm text-secondary">
          Puede realizar cambios o cancelaciones automáticas hasta 3 horas antes del turno desde el portal.
        </p>
      </div>
    ),
  },
  {
    id: "ia-triage-emergencia",
    categories: ["guardia", "ia"],
    title: "¿Qué ocurre si el asistente detecta síntomas que requieren atención médica urgente?",
    badgeLabel: "Atención en Guardia",
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
      <div className="space-y-space-md text-body-md text-on-surface-variant leading-relaxed">
        <p>
          Sentria AI aplica protocolos clínicos de triage para evaluar la gravedad de los síntomas. Si identifica signos de alarma o riesgo:
        </p>

        <div className="space-y-space-xs">
          <div className="p-space-md rounded-lg bg-surface-container/60 border border-outline-variant/10">
            <h4 className="text-label-lg text-on-surface font-semibold">
              Priorización de urgencia
            </h4>
            <p className="text-body-sm text-secondary mt-space-3xs leading-relaxed">
              Se interrumpe la espera de turnos regulares y se orienta al paciente hacia la guardia médica de inmediato.
            </p>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container/60 border border-outline-variant/10">
            <h4 className="text-label-lg text-on-surface font-semibold">
              Notificación a la guardia
            </h4>
            <p className="text-body-sm text-secondary mt-space-3xs leading-relaxed">
              Si se dirige a la Sede Central, se genera un pre-registro para que el equipo de guardia esté al tanto del motivo de consulta.
            </p>
          </div>

          <div className="p-space-md rounded-lg bg-surface-container/60 border border-outline-variant/10">
            <h4 className="text-label-lg text-on-surface font-semibold">
              Indicaciones de primeros cuidados
            </h4>
            <p className="text-body-sm text-secondary mt-space-3xs leading-relaxed">
              Se ofrecen pautas claras de qué hacer durante el traslado y cuál es el centro asistencial más cercano.
            </p>
          </div>
        </div>
      </div>
    ),
  },
]

