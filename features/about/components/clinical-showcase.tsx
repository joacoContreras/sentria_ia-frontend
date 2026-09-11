/* eslint-disable @next/next/no-img-element */

export function ClinicalShowcase() {
  return (
    <section className="mx-auto max-w-container-max px-gutter-mobile lg:px-gutter-desktop py-space-xl w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-stretch">
        
        {/* Main Infrastructure Image */}
        <div className="relative col-span-12 lg:col-span-8 h-[380px] overflow-hidden rounded-2xl border border-outline-variant/20 shadow-md group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1fWvV1TMAVLelpld2kX8-OkKmweiebzlj7FGWLUetCEL7HlEuF2jEQoqmjkdNWqpXSezq9GA0ttNgyW7-I-CntF3b_uJtcAFapzT53D-rQRGfDxBaf2fMlv4_unHHKeJVtWAbIU9A8nS2ndbC9LWl86vOq7RSygiCcuHKSj_woMEB2k5gfwf1puxWqFGBWx09-m5yyraUqd4i-tkDFLIwbOMtpWZq0I_F6G0KMCYp3ovat_Srf6A"
            alt="Infraestructura asistencial moderna de hospital con personal de enfermería y pacientes en un entorno clínico luminoso"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-background/95 via-on-background/50 to-transparent flex flex-col justify-end p-space-lg sm:p-space-xl text-surface-container-lowest">
            <span className="mb-space-2xs text-label-sm font-semibold uppercase tracking-wider text-primary-fixed">
              Infraestructura Asistencial Moderna
            </span>
            <h3 className="text-headline-sm sm:text-headline-md font-semibold text-surface-container-lowest leading-tight max-w-xl">
              Integración fluida en sistemas de admisión hospitalaria
            </h3>
            <p className="mt-space-2xs text-body-md text-surface-container-lowest/90 max-w-xl">
              Reducción comprobada de la fatiga del personal sanitario y priorización de la calidez humana en cada contacto.
            </p>
          </div>
        </div>

        {/* Edge Technology Tablet Image */}
        <div className="relative col-span-12 lg:col-span-4 h-[380px] overflow-hidden rounded-2xl border border-outline-variant/20 shadow-md group">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmrzwU5Ykrd--HXL3tRe-y6MKmXfFDnQvy4CyWo73xPazTZgwcIlXG4zKkkigaPyE7MyXl1DSUNE9kfroR9e3hAm0hxM3-GsJXd_lYwpaqekNbn1jjbOfdygFLaWAwcxIeflrYf_7sGyIgx8UDBlAnEhWKNjbYP5AinH6CiBIUKuSTZbjt1zhT3ZxL6bF5MGEUgJXgjR6rlJ7EmkQ0dUYGU_AJrSQLOav4aPX8zphpiuMWUP9mc-4"
            alt="Interfaz de telemetría y triage en tablet clínica operada por profesional de la salud"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-on-background/95 via-on-background/50 to-transparent flex flex-col justify-end p-space-lg sm:p-space-xl text-surface-container-lowest">
            <span className="mb-space-2xs text-label-sm font-semibold uppercase tracking-wider text-primary-fixed">
              Tecnología de Borde
            </span>
            <h3 className="text-headline-sm sm:text-headline-md font-semibold text-surface-container-lowest leading-tight">
              Telemetría de sala de espera en tiempo real
            </h3>
            <p className="mt-space-2xs text-body-md text-surface-container-lowest/90">
              Supervisión continua del flujo de pacientes para jefaturas médicas y enfermería de triage.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
