export function DossierCta() {
  return (
    <section className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop pb-space-3xl lg:pb-space-4xl w-full">
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary-container border border-primary/20 p-space-lg sm:p-space-xl text-white shadow-2xs flex flex-col lg:flex-row items-center justify-between gap-space-lg">
        <div className="max-w-2xl space-y-space-2xs">
          <span className="text-label-xs font-semibold uppercase tracking-wider text-primary-fixed">
            Compromiso bioético
          </span>
          <h3 className="text-title-lg sm:text-headline-sm font-bold text-white tracking-tight">
            ¿Desea revisar nuestro dossier técnico para comités asistenciales?
          </h3>
          <p className="text-body-md text-white/90 leading-relaxed">
            Ponemos a disposición de directores médicos, auditores y comités de bioética la documentación completa de validación algorítmica y pruebas de robustez clínica.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-space-sm shrink-0 w-full sm:w-auto">
          <a
            href="#dossier"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-white px-space-lg py-space-sm font-semibold text-label-md text-primary shadow-2xs hover:bg-surface-container transition-all active:scale-[0.98]"
          >
            Descargar dossier clínico (PDF)
          </a>
          <a
            href="#contacto-etico"
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-white/15 border border-white/30 px-space-lg py-space-sm font-semibold text-label-md text-white hover:bg-white/25 transition-all active:scale-[0.98]"
          >
            Contactar al comité ético
          </a>
        </div>
      </div>
    </section>
  )
}

