export function TechnologyPrivacy() {
  return (
    <section className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop py-space-2xl lg:py-space-3xl w-full">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center mb-space-2xl">
        <span className="mb-space-3xs block text-label-xs font-semibold uppercase tracking-wider text-primary">
          Arquitectura de confianza
        </span>
        <h2 className="text-headline-lg font-bold text-on-surface tracking-tight">
          Tecnología de triage responsable y privacidad integral
        </h2>
        <p className="mt-space-2xs text-body-md text-secondary leading-relaxed">
          Modelos clínicos estandarizados y estrictos protocolos de seguridad para proteger los datos médicos.
        </p>
      </div>

      {/* Two-Column Rich Spec Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg items-stretch">
        
        {/* Columna A: Triage Orientativo Asistido con IA */}
        <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest border border-outline-variant/15 p-space-lg sm:p-space-xl shadow-2xs space-y-space-lg">
          <div className="space-y-space-md">
            <div>
              <span className="text-label-xs font-semibold uppercase tracking-wider text-primary block">
                Algoritmia clínica
              </span>
              <h3 className="text-title-lg text-on-surface font-semibold mt-space-3xs">
                Triage orientativo con protocolos ESI
              </h3>
            </div>

            <p className="text-body-md leading-relaxed text-secondary">
              Nuestros modelos se basan en los árboles de decisión de la escala internacional{" "}
              <strong className="text-on-surface font-semibold">
                Emergency Severity Index (ESI v4)
              </strong>
              , interpretando lenguaje natural para priorizar la atención sin generar alarmismos.
            </p>

            <div className="space-y-space-sm pt-space-xs">
              <div className="rounded-xl bg-surface-container-low/70 border border-outline-variant/15 p-space-md space-y-space-3xs">
                <h4 className="text-label-lg font-semibold text-on-surface">
                  Detección de señales de alarma
                </h4>
                <p className="text-body-sm text-secondary leading-relaxed">
                  Identificación prioritaria de síntomas de riesgo cardiovascular, neurológico o respiratorio para derivación inmediata.
                </p>
              </div>

              <div className="rounded-xl bg-surface-container-low/70 border border-outline-variant/15 p-space-md space-y-space-3xs">
                <h4 className="text-label-lg font-semibold text-on-surface">
                  Comunicación accesible y clara
                </h4>
                <p className="text-body-sm text-secondary leading-relaxed">
                  Interacción amigable y comprensible para adultos mayores y personas que necesitan orientación rápida.
                </p>
              </div>

              <div className="rounded-xl bg-surface-container-low/70 border border-outline-variant/15 p-space-md space-y-space-3xs">
                <h4 className="text-label-lg font-semibold text-on-surface">
                  Derivación inteligente a especialidades
                </h4>
                <p className="text-body-sm text-secondary leading-relaxed">
                  Asignación al área médica pertinente, evitando trámites innecesarios o reasignaciones de turnos.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-surface-container-low border border-outline-variant/15 px-space-md py-space-sm">
            <span className="text-label-sm font-medium text-secondary">
              Protocolo clínico
            </span>
            <span className="text-label-xs font-semibold text-primary">
              ESI niveles 1 al 5
            </span>
          </div>
        </div>

        {/* Columna B: Privacidad y Ciberseguridad Médica */}
        <div className="flex flex-col justify-between rounded-2xl bg-surface-container-lowest border border-outline-variant/15 p-space-lg sm:p-space-xl shadow-2xs space-y-space-lg">
          <div className="space-y-space-md">
            <div>
              <span className="text-label-xs font-semibold uppercase tracking-wider text-primary block">
                Seguridad de la información
              </span>
              <h3 className="text-title-lg text-on-surface font-semibold mt-space-3xs">
                Privacidad y protección de datos médicos
              </h3>
            </div>

            <p className="text-body-md leading-relaxed text-secondary">
              La información de salud exige el estándar más estricto de resguardo. Nuestra plataforma preserva el secreto profesional y la confidencialidad de cada registro.
            </p>

            <div className="space-y-space-sm pt-space-xs">
              <div className="rounded-xl bg-surface-container-low/70 border border-outline-variant/15 p-space-md space-y-space-3xs">
                <h4 className="text-label-lg font-semibold text-on-surface">
                  Cifrado de extremo a extremo (AES-256)
                </h4>
                <p className="text-body-sm text-secondary leading-relaxed">
                  Toda la información médica viaja y se almacena encriptada, inaccesible para terceros no autorizados.
                </p>
              </div>

              <div className="rounded-xl bg-surface-container-low/70 border border-outline-variant/15 p-space-md space-y-space-3xs">
                <h4 className="text-label-lg font-semibold text-on-surface">
                  Disociación y resguardo de identidad
                </h4>
                <p className="text-body-sm text-secondary leading-relaxed">
                  Separación estricta entre datos demográficos y respuestas del cuestionario de orientación.
                </p>
              </div>

              <div className="rounded-xl bg-surface-container-low/70 border border-outline-variant/15 p-space-md space-y-space-3xs">
                <h4 className="text-label-lg font-semibold text-on-surface">
                  Apego a la Ley de Protección de Datos
                </h4>
                <p className="text-body-sm text-secondary leading-relaxed">
                  Cumplimiento pleno de la normativa de habeas data y derecho de acceso y supresión de información.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-surface-container-low border border-outline-variant/15 px-space-md py-space-sm">
            <span className="text-label-sm font-medium text-secondary">
              Estándar de seguridad
            </span>
            <span className="text-label-xs font-semibold text-primary">
              HIPAA & HITECH
            </span>
          </div>
        </div>

      </div>

      {/* Certificaciones Institucionales */}
      <div className="mt-space-xl rounded-2xl bg-surface-container-low border border-outline-variant/15 p-space-lg">
        <div className="flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div>
            <span className="block text-label-xs font-semibold uppercase tracking-wider text-secondary">
              Marcos de auditoría
            </span>
            <h4 className="text-title-md font-semibold text-on-surface">
              Cumplimiento y validación asistencial
            </h4>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/15 px-space-md py-space-xs shadow-2xs">
              <span className="text-label-sm font-semibold text-on-surface block">HIPAA Compliant</span>
              <span className="text-label-xs text-secondary">Health Data Security</span>
            </div>
            <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/15 px-space-md py-space-xs shadow-2xs">
              <span className="text-label-sm font-semibold text-on-surface block">Protocolo ESI v4</span>
              <span className="text-label-xs text-secondary">Triage estandarizado</span>
            </div>
            <div className="rounded-xl bg-surface-container-lowest border border-outline-variant/15 px-space-md py-space-xs shadow-2xs">
              <span className="text-label-sm font-semibold text-on-surface block">ISO 27001 Ready</span>
              <span className="text-label-xs text-secondary">Seguridad informática</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

