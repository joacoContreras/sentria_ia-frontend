import { Download, HelpCircle } from "lucide-react"

export function DossierCta() {
  return (
    <section className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop pb-space-3xl lg:pb-space-4xl w-full">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary-container p-space-xl sm:p-space-2xl text-on-primary shadow-xl flex flex-col lg:flex-row items-center justify-between gap-space-xl">
        <div 
          className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-surface-container-lowest/10 blur-2xl" 
          aria-hidden="true" 
        />
        
        <div className="max-w-2xl">
          <span className="text-label-md font-semibold uppercase tracking-wider text-primary-fixed">
            Compromiso Bioético
          </span>
          <h3 className="mt-space-2xs mb-space-sm text-headline-md sm:text-headline-lg font-bold text-on-primary tracking-tight">
            ¿Desea revisar nuestro dossier técnico para comités asistenciales?
          </h3>
          <p className="text-body-md sm:text-body-lg text-on-primary/90 leading-relaxed">
            Ponemos a disposición de directores médicos, auditores y comités de bioética la documentación completa de validación algorítmica y pruebas de robustez clínica.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-space-md shrink-0 w-full sm:w-auto">
          <a
            href="#dossier"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs rounded-xl bg-surface-container-lowest px-space-xl py-space-md font-medium text-label-lg text-primary shadow-md hover:bg-surface-container transition-all active:scale-[0.99]"
          >
            <Download className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Descargar Dossier Clínico (PDF)</span>
          </a>
          <a
            href="#contacto-etico"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs rounded-xl bg-primary-fixed/20 px-space-xl py-space-md font-medium text-label-lg text-on-primary hover:bg-primary-fixed/30 transition-all active:scale-[0.99]"
          >
            <HelpCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Contactar al Comité Ético</span>
          </a>
        </div>
      </div>
    </section>
  )
}
