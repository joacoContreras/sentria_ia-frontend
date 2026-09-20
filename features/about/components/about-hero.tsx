export function AboutHero() {
  return (
    <section className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop pt-space-xl sm:pt-space-2xl pb-space-xl sm:pb-space-2xl">
      <div className="grid grid-cols-1 gap-space-xl lg:grid-cols-12 lg:items-center">
        
        {/* Text Column */}
        <div className="flex flex-col items-start lg:col-span-7 space-y-space-md">
          <div className="space-y-space-3xs">
            <span className="text-label-xs font-semibold text-primary uppercase tracking-wider">
              Manifiesto y misión institucional
            </span>
            <h1 className="text-display-hero text-on-surface font-bold tracking-tight">
              Transformamos el acceso a la salud con inteligencia clínica asistida
            </h1>
          </div>

          <p className="text-body-md sm:text-body-lg text-secondary leading-relaxed max-w-xl">
            Sentria AI nace para resolver las demoras en salas de espera y optimizar el flujo hospitalario inicial mediante la automatización empática, precisa y validada del agendamiento y la clasificación previa.
          </p>

          {/* Quick Trust Tokens */}
          <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
            <span className="rounded-full bg-surface-container-lowest border border-outline-variant/20 px-space-md py-space-3xs text-on-surface text-label-xs font-medium shadow-2xs">
              Validación médica continua
            </span>
            <span className="rounded-full bg-surface-container-lowest border border-outline-variant/20 px-space-md py-space-3xs text-on-surface text-label-xs font-medium shadow-2xs">
              Arquitectura cero-confianza
            </span>
            <span className="rounded-full bg-surface-container-lowest border border-outline-variant/20 px-space-md py-space-3xs text-on-surface text-label-xs font-medium shadow-2xs">
              Diseño centrado en el paciente
            </span>
          </div>
        </div>

        {/* Metric & Visual Hero Mosaic */}
        <div className="flex flex-col gap-space-md lg:col-span-5">
          {/* Main Metric Card */}
          <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/15 p-space-lg sm:p-space-xl shadow-2xs flex flex-col justify-between space-y-space-md">
            <div>
              <span className="text-label-xs font-semibold uppercase tracking-wider text-primary block">
                Eficiencia operativa
              </span>

              <p className="text-display-hero text-primary font-bold tracking-tight leading-none mt-space-xs">
                -75%
              </p>
              <h3 className="text-title-md text-on-surface font-semibold mt-space-2xs">
                Reducción de demoras en mostrador
              </h3>
              <p className="text-body-sm text-secondary leading-relaxed mt-space-3xs">
                Agilización en áreas de admisión de urgencias y turnos ambulatorios mediante pre-triage autónomo.
              </p>
            </div>

            {/* Inline Metric Info */}
            <div className="flex items-center justify-between rounded-xl bg-surface-container-low border border-outline-variant/15 p-space-md">
              <div className="flex flex-col">
                <span className="text-label-xs text-secondary">
                  Tiempo medio en recepción
                </span>
                <span className="text-title-md text-on-surface font-semibold">
                  3.8 min
                </span>
              </div>
              <span className="text-label-xs text-primary font-semibold bg-surface-container px-space-xs py-space-3xs rounded-md">
                Optimizado
              </span>
            </div>
          </div>

          {/* Secondary Metric Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
            <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/15 p-space-md sm:p-space-lg shadow-2xs space-y-space-3xs">
              <span className="text-label-xs font-semibold uppercase tracking-wider text-secondary block">
                Calidad asistencial
              </span>
              <p className="text-display-hero text-primary font-bold tracking-tight leading-none">
                98.4%
              </p>
              <h4 className="text-body-md text-on-surface font-semibold">
                Satisfacción de pacientes
              </h4>
              <p className="text-label-xs text-secondary">
                Evaluación post-atención
              </p>
            </div>

            <div className="rounded-2xl bg-surface-container-lowest border border-outline-variant/15 p-space-md sm:p-space-lg shadow-2xs space-y-space-3xs">
              <span className="text-label-xs font-semibold uppercase tracking-wider text-secondary block">
                Escala de impacto
              </span>
              <p className="text-display-hero text-primary font-bold tracking-tight leading-none">
                +120k
              </p>
              <h4 className="text-body-md text-on-surface font-semibold">
                Turnos gestionados
              </h4>
              <p className="text-label-xs text-secondary">
                Sin demoras presenciales
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

