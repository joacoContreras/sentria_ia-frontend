import {
  Brain,
  Shield,
  Activity,
  MessageSquare,
  GitFork,
  KeyRound,
  Fingerprint,
  Scale,
  ShieldCheck,
  HeartPulse,
} from "lucide-react"

export function TechnologyPrivacy() {
  return (
    <section className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop py-space-3xl lg:py-space-4xl w-full">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center mb-space-3xl">
        <span className="mb-space-xs block text-label-sm font-semibold uppercase tracking-widest text-primary">
          Arquitectura de Alta Confianza
        </span>
        <h2 className="text-headline-lg font-bold text-on-surface tracking-tight">
          Tecnología de Triage Responsable & Privacidad Integral
        </h2>
        <p className="mt-space-2xs text-body-lg text-secondary">
          Combinación sinérgica de modelos adaptativos clínicos con los estándares más restrictivos de ciberseguridad sanitaria.
        </p>
      </div>

      {/* Two-Column Rich Spec Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-2xl items-stretch">
        
        {/* Columna A: Triage Orientativo Asistido con IA */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-surface-container-lowest border border-outline-variant/20 p-space-xl sm:p-space-2xl shadow-md">
          <div 
            className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-primary/5" 
            aria-hidden="true" 
          />
          <div>
            <div className="mb-space-lg flex items-center gap-space-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container shadow-xs">
                <Brain className="h-8 w-8" aria-hidden="true" />
              </div>
              <div>
                <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
                  Algoritmia Clínica
                </span>
                <h3 className="text-headline-md font-semibold text-on-surface">
                  Triage Orientativo Asistido con IA
                </h3>
              </div>
            </div>

            <p className="mb-space-xl text-body-lg leading-relaxed text-secondary">
              Nuestros modelos están rigurosamente fundamentados en los árboles de decisión y guías del{" "}
              <strong className="text-on-surface font-semibold">
                Emergency Severity Index (ESI v4)
              </strong>
              , procesando lenguaje natural para desentrañar síntomas confusos sin generar alarmismos infundados.
            </p>

            <div className="space-y-space-md mb-space-xl">
              <div className="flex items-start gap-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-md">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest text-primary">
                  <Activity className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-body-lg-medium font-semibold text-on-surface">
                    Detección de Señales de Alarma Críticas
                  </h4>
                  <p className="text-body-md text-secondary mt-0.5">
                    Identificación prioritaria de síntomas cardinales de riesgo cardiovascular, neurológico y respiratorio para derivación física inmediata.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-md">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest text-primary">
                  <MessageSquare className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-body-lg-medium font-semibold text-on-surface">
                    Procesamiento Conversacional Empático
                  </h4>
                  <p className="text-body-md text-secondary mt-0.5">
                    Interacción accesible para adultos mayores o pacientes con dolor agudo, adaptando el tono de manera serena y asertiva.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-md">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest text-primary">
                  <GitFork className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-body-lg-medium font-semibold text-on-surface">
                    Enrutamiento Clínico Inteligente
                  </h4>
                  <p className="text-body-md text-secondary mt-0.5">
                    Derivación automática hacia la subespecialidad pertinente, mitigando reasignaciones de turnos erróneas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-surface-container border border-outline-variant/20 px-space-lg py-space-md">
            <span className="text-label-md font-medium text-secondary">
              Protocolo de Referencia
            </span>
            <span className="rounded-full bg-surface-container-lowest border border-outline-variant/20 px-space-md py-space-2xs text-label-md font-bold text-primary shadow-xs">
              ESI Nivel 1 a 5 Certificado
            </span>
          </div>
        </div>

        {/* Columna B: Privacidad y Ciberseguridad Médica */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl bg-surface-container-lowest border border-outline-variant/20 p-space-xl sm:p-space-2xl shadow-md">
          <div 
            className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-primary/5" 
            aria-hidden="true" 
          />
          <div>
            <div className="mb-space-lg flex items-center gap-space-md">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container shadow-xs">
                <ShieldCheck className="h-8 w-8" aria-hidden="true" />
              </div>
              <div>
                <span className="text-label-sm font-bold uppercase tracking-wider text-primary">
                  Blindaje Institucional
                </span>
                <h3 className="text-headline-md font-semibold text-on-surface">
                  Privacidad y Ciberseguridad Médica
                </h3>
              </div>
            </div>

            <p className="mb-space-xl text-body-lg leading-relaxed text-secondary">
              Los datos de salud demandan el nivel máximo de resguardo existente. Implementamos infraestructura soberana diseñada para blindar el secreto médico y la trazabilidad auditada de cada interacción.
            </p>

            <div className="space-y-space-md mb-space-xl">
              <div className="flex items-start gap-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-md">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest text-primary">
                  <KeyRound className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-body-lg-medium font-semibold text-on-surface">
                    Cifrado Criptográfico E2E (AES-256)
                  </h4>
                  <p className="text-body-md text-secondary mt-0.5">
                    Tanto en tránsito como en reposo, toda la información de salud protegida (PHI) permanece inaccesible para terceros y operadores.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-md">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest text-primary">
                  <Fingerprint className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-body-lg-medium font-semibold text-on-surface">
                    Anonimización y Disociación Estricta
                  </h4>
                  <p className="text-body-md text-secondary mt-0.5">
                    Desacople criptográfico inmediato entre los datos demográficos personales y las respuestas clínicas del triaje orientativo.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-md">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-container-highest text-primary">
                  <Scale className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h4 className="text-body-lg-medium font-semibold text-on-surface">
                    Soberanía de Datos & Habeas Data
                  </h4>
                  <p className="text-body-md text-secondary mt-0.5">
                    Alineación absoluta con leyes locales de protección de datos de salud y derecho irrestricto de rectificación y supresión.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-surface-container border border-outline-variant/20 px-space-lg py-space-md">
            <span className="text-label-md font-medium text-secondary">
              Estándar de Cumplimiento
            </span>
            <span className="rounded-full bg-surface-container-lowest border border-outline-variant/20 px-space-md py-space-2xs text-label-md font-bold text-primary shadow-xs">
              HIPAA & HITECH Compliant
            </span>
          </div>
        </div>

      </div>

      {/* Certificaciones y Sellos Visuales Institucionales */}
      <div className="mt-space-3xl rounded-2xl bg-surface-container-low border border-outline-variant/20 p-space-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div>
            <span className="block text-label-sm font-semibold uppercase tracking-widest text-secondary">
              Marcos de Auditoría y Certificación Activa
            </span>
            <h4 className="text-headline-sm font-semibold text-on-surface">
              Sellos de Calidad y Cumplimiento Hospitalario
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-space-md">
            {/* Seal 1 */}
            <div className="flex items-center gap-space-sm rounded-xl bg-surface-container-lowest border border-outline-variant/20 px-space-lg py-space-sm shadow-xs">
              <ShieldCheck className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="text-label-sm font-bold text-on-surface">
                  HIPAA Compliant
                </span>
                <span className="text-label-sm text-secondary">
                  Health Data Security
                </span>
              </div>
            </div>

            {/* Seal 2 */}
            <div className="flex items-center gap-space-sm rounded-xl bg-surface-container-lowest border border-outline-variant/20 px-space-lg py-space-sm shadow-xs">
              <HeartPulse className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="text-label-sm font-bold text-on-surface">
                  Protocolo ESI v4
                </span>
                <span className="text-label-sm text-secondary">
                  Emergency Severity Index
                </span>
              </div>
            </div>

            {/* Seal 3 */}
            <div className="flex items-center gap-space-sm rounded-xl bg-surface-container-lowest border border-outline-variant/20 px-space-lg py-space-sm shadow-xs">
              <Shield className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
              <div className="flex flex-col">
                <span className="text-label-sm font-bold text-on-surface">
                  ISO 27001 Ready
                </span>
                <span className="text-label-sm text-secondary">
                  Information Security
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
