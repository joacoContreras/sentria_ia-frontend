import React from "react"

export function ClinicalEmergencyAlert() {
  return (
    <section className="w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop mb-space-xl">
      <div className="rounded-xl bg-error-container/40 p-space-md sm:p-space-lg border-l-4 border-l-error border border-error/20 shadow-2xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md">
          <div className="space-y-space-3xs">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="text-label-xs uppercase tracking-wider font-bold text-error bg-error/10 px-space-xs py-space-3xs rounded">
                Emergencia Médica
              </span>
              <h2 className="text-title-md text-on-error-container font-semibold">
                ¿Presenta síntomas graves o riesgo vital?
              </h2>
            </div>
            <p className="text-body-sm text-on-error-container/90 max-w-3xl leading-relaxed">
              Ante dolor opresivo en el pecho, dificultad respiratoria severa, parálisis facial o pérdida de conocimiento,{" "}
              <strong className="font-semibold text-on-error-container">
                no espere una respuesta digital ni consulte por chat
              </strong>
              . Diríjase a una guardia médica o comuníquese de inmediato.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-xs shrink-0 w-full sm:w-auto">
            <a
              href="tel:107"
              className="inline-flex items-center justify-center bg-error text-on-error text-label-md px-space-md py-space-sm rounded-lg hover:opacity-90 transition-all font-semibold shadow-2xs active:scale-[0.98]"
            >
              SAME (107)
            </a>
            <a
              href="tel:911"
              className="inline-flex items-center justify-center bg-error/90 text-on-error text-label-md px-space-md py-space-sm rounded-lg hover:opacity-90 transition-all font-semibold shadow-2xs active:scale-[0.98]"
            >
              Emergencias (911)
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

