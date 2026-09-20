/* eslint-disable @next/next/no-img-element */

export function ClinicalShowcase() {
  return (
    <section className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop py-space-lg w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-stretch">
        
        {/* Main Infrastructure Image */}
        <div className="relative col-span-12 lg:col-span-8 h-[340px] sm:h-[380px] overflow-hidden rounded-2xl border border-outline-variant/15 shadow-2xs">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1fWvV1TMAVLelpld2kX8-OkKmweiebzlj7FGWLUetCEL7HlEuF2jEQoqmjkdNWqpXSezq9GA0ttNgyW7-I-CntF3b_uJtcAFapzT53D-rQRGfDxBaf2fMlv4_unHHKeJVtWAbIU9A8nS2ndbC9LWl86vOq7RSygiCcuHKSj_woMEB2k5gfwf1puxWqFGBWx09-m5yyraUqd4i-tkDFLIwbOMtpWZq0I_F6G0KMCYp3ovat_Srf6A"
            alt="Infraestructura asistencial moderna de hospital"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-background/95 via-on-background/50 to-transparent flex flex-col justify-end p-space-lg sm:p-space-xl text-white">
            <span className="mb-space-3xs text-label-xs font-semibold uppercase tracking-wider text-primary-fixed">
              Infraestructura asistencial moderna
            </span>
            <h3 className="text-title-lg sm:text-headline-sm font-semibold text-white leading-tight max-w-xl">
              Integración fluida en sistemas de admisión hospitalaria
            </h3>
            <p className="mt-space-3xs text-body-sm text-white/90 max-w-xl leading-relaxed">
              Reducción comprobada de la fatiga del personal sanitario y priorización de la calidez humana en cada contacto.
            </p>
          </div>
        </div>

        {/* Edge Technology Tablet Image */}
        <div className="relative col-span-12 lg:col-span-4 h-[340px] sm:h-[380px] overflow-hidden rounded-2xl border border-outline-variant/15 shadow-2xs">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmrzwU5Ykrd--HXL3tRe-y6MKmXfFDnQvy4CyWo73xPazTZgwcIlXG4zKkkigaPyE7MyXl1DSUNE9kfroR9e3hAm0hxM3-GsJXd_lYwpaqekNbn1jjbOfdygFLaWAwcxIeflrYf_7sGyIgx8UDBlAnEhWKNjbYP5AinH6CiBIUKuSTZbjt1zhT3ZxL6bF5MGEUgJXgjR6rlJ7EmkQ0dUYGU_AJrSQLOav4aPX8zphpiuMWUP9mc-4"
            alt="Interfaz de telemetría y triage clínico"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-background/95 via-on-background/50 to-transparent flex flex-col justify-end p-space-lg sm:p-space-xl text-white">
            <span className="mb-space-3xs text-label-xs font-semibold uppercase tracking-wider text-primary-fixed">
              Tecnología de borde
            </span>
            <h3 className="text-title-lg sm:text-headline-sm font-semibold text-white leading-tight">
              Telemetría de sala de espera
            </h3>
            <p className="mt-space-3xs text-body-sm text-white/90 leading-relaxed">
              Supervisión continua del flujo de pacientes para jefaturas médicas y enfermería de triage.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}

