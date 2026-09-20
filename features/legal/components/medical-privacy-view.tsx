import React from "react"
import {
  ShieldCheck,
  Lock,
  EyeOff,
  UserCheck,
  Database,
  FileSpreadsheet,
  Mail,
} from "lucide-react"

export function MedicalPrivacyView() {
  return (
    <div className="w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-xl lg:py-space-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
        {/* Main Content Sections */}
        <div className="lg:col-span-8 space-y-space-xl">
          {/* Privacy Guarantee Card */}
          <div className="rounded-2xl bg-primary/10 border border-primary/20 p-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
            <div className="space-y-1">
              <span className="text-label-xs font-semibold uppercase tracking-wider text-primary">
                Garantía Institucional de Confidencialidad
              </span>
              <h3 className="text-title-lg font-bold text-on-surface">
                Cumplimiento de la Ley 25.326 y Normas HIPAA / HITECH
              </h3>
              <p className="text-body-sm text-secondary">
                Los datos de salud son categorizados como datos sensibles de máxima reserva legal y secreto profesional médico.
              </p>
            </div>
            <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
              <Lock className="h-6 w-6" />
            </div>
          </div>

          {/* Section 1 */}
          <section id="marco-normativo" className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 space-y-space-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-label-sm uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4" />
              <span>Sección 1</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface">
              1. Marco Normativo y Principios Rectores
            </h2>
            <div className="text-body-md text-secondary space-y-space-sm leading-relaxed">
              <p>
                Sentria AI Health Systems se rige por la <strong>Ley Nacional N° 25.326 de Protección de los Datos Personales</strong>, su Decreto Reglamentario 1558/2001, y complementariamente por los estándares del <em>Health Insurance Portability and Accountability Act</em> (HIPAA) y la Directiva Europea GDPR (Reglamento UE 2016/679).
              </p>
              <p>
                La recolección y tratamiento de la información clínica se efectúa bajo los siguientes postulados esenciales:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 space-y-1">
                  <h4 className="text-label-lg font-semibold text-on-surface flex items-center gap-2">
                    <EyeOff className="h-4 w-4 text-primary" /> Finalidad Exclusiva
                  </h4>
                  <p className="text-body-sm text-secondary">
                    Los datos jamás son comercializados, cedidos ni transferidos a empresas de marketing, aseguradoras o terceros no autorizados por el paciente.
                  </p>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 space-y-1">
                  <h4 className="text-label-lg font-semibold text-on-surface flex items-center gap-2">
                    <Database className="h-4 w-4 text-primary" /> Minimización de Datos
                  </h4>
                  <p className="text-body-sm text-secondary">
                    Únicamente se solicitan y almacenan los datos indispensables para la correcta prestación asistencial y validación ante financiadores de salud.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="derechos-arco" className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 space-y-space-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-label-sm uppercase tracking-wider">
              <UserCheck className="h-4 w-4" />
              <span>Sección 2</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface">
              2. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
            </h2>
            <div className="text-body-md text-secondary space-y-space-sm leading-relaxed">
              <p>
                El titular de los datos personales tiene la facultad de ejercer el derecho de acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un interés legítimo al efecto (art. 14, Ley 25.326).
              </p>
              <div className="space-y-space-xs pt-space-xs">
                <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                  <span className="font-bold text-primary text-label-lg w-8 shrink-0">A</span>
                  <div>
                    <h5 className="font-semibold text-on-surface">Acceso</h5>
                    <p className="text-body-sm text-secondary">Conocer la información almacenada en su ficha clínica digital y los registros de consulta.</p>
                  </div>
                </div>
                <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                  <span className="font-bold text-primary text-label-lg w-8 shrink-0">R</span>
                  <div>
                    <h5 className="font-semibold text-on-surface">Rectificación y Actualización</h5>
                    <p className="text-body-sm text-secondary">Modificar datos inexactos, erróneos o desactualizados mediante validación de identidad.</p>
                  </div>
                </div>
                <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                  <span className="font-bold text-primary text-label-lg w-8 shrink-0">C</span>
                  <div>
                    <h5 className="font-semibold text-on-surface">Cancelación y Supresión</h5>
                    <p className="text-body-sm text-secondary">Solicitar la eliminación de la cuenta, respetando el plazo legal de guarda de historias clínicas (10 años según Ley 26.529).</p>
                  </div>
                </div>
                <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                  <span className="font-bold text-primary text-label-lg w-8 shrink-0">O</span>
                  <div>
                    <h5 className="font-semibold text-on-surface">Oposición</h5>
                    <p className="text-body-sm text-secondary">Negarse al tratamiento de datos no esenciales para fines epidemiológicos anonimizados.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="conservacion" className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 space-y-space-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-label-sm uppercase tracking-wider">
              <FileSpreadsheet className="h-4 w-4" />
              <span>Sección 3</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface">
              3. Resguardo Legal y Retención de Historias Clínicas
            </h2>
            <div className="text-body-md text-secondary space-y-space-sm leading-relaxed">
              <p>
                Por disposición del Artículo 18 de la Ley 26.529, las historias clínicas electrónicas e imágenes diagnósticas deben ser custodiadas por las instituciones de salud durante un plazo mínimo de <strong>diez (10) años</strong> computados desde la última actuación registrada.
              </p>
              <p>
                Durante dicho período, los repositorios de datos permanecen en bóvedas criptográficas inmutables con copias de seguridad georredundantes en centros de datos con certificación <strong>Tier III / ISO 27001</strong>.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="contacto-dpo" className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 space-y-space-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-label-sm uppercase tracking-wider">
              <Mail className="h-4 w-4" />
              <span>Sección 4</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface">
              4. Delegado de Protección de Datos (DPO) y Contacto
            </h2>
            <div className="text-body-md text-secondary space-y-space-sm leading-relaxed">
              <p>
                Para consultas relativas al tratamiento de datos personales, ejercicio de derechos ARCO o denuncias de privacidad, nuestro Oficial de Privacidad está a su disposición:
              </p>
              <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 space-y-1">
                <p className="text-on-surface font-semibold">Oficina de Privacidad y Cumplimiento Médico Sentria AI</p>
                <p className="text-body-sm text-secondary">Correo directo: <a href="mailto:privacidad@sentria.ai" className="text-primary hover:underline font-medium">privacidad@sentria.ai</a></p>
                <p className="text-body-sm text-secondary">Dirección: Av. Libertador 4500, Edificio Policlínico Central, CABA.</p>
                <p className="text-label-xs text-secondary pt-2">
                  Órgano de Control en Argentina: Agencia de Acceso a la Información Pública (AAIP), Av. Pte. Gral. Julio A. Roca 710, CABA.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Summary & Quick Links */}
        <div className="lg:col-span-4 space-y-space-md">
          <div className="sticky top-20 rounded-2xl bg-surface-container-lowest p-space-lg border border-outline-variant/20 shadow-2xs space-y-space-md">
            <h3 className="text-title-md font-bold text-on-surface">
              Índice de Privacidad
            </h3>

            <nav className="flex flex-col space-y-2 text-body-sm">
              <a
                href="#marco-normativo"
                className="text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-2"
              >
                1. Marco Normativo (Ley 25.326)
              </a>
              <a
                href="#derechos-arco"
                className="text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-2"
              >
                2. Derechos ARCO
              </a>
              <a
                href="#conservacion"
                className="text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-2"
              >
                3. Retención de 10 Años
              </a>
              <a
                href="#contacto-dpo"
                className="text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-2"
              >
                4. Contacto de Privacidad / DPO
              </a>
            </nav>

            <div className="pt-space-sm border-t border-outline-variant/15 space-y-space-xs text-label-xs text-secondary">
              <div className="flex items-center gap-1 text-primary font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>Protección HIPAA y Ley 25.326</span>
              </div>
              <p>
                Sus datos están segregados y bajo estrictas medidas de aislamiento de tenant.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
