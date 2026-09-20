import React from "react"
import {
  AlertTriangle,
  FileCheck2,
  Stethoscope,
  HeartPulse,
  Scale,
  Clock,
  CheckCircle2,
  UserCheck,
} from "lucide-react"

export function ClinicalTermsView() {
  return (
    <div className="w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-xl lg:py-space-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
        {/* Main Content Sections */}
        <div className="lg:col-span-8 space-y-space-xl">
          {/* Emergency Alert Banner */}
          <div className="rounded-xl border border-error/30 bg-error-container/30 p-space-md flex items-start gap-space-sm">
            <AlertTriangle className="h-6 w-6 text-error shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="text-label-lg font-bold text-on-error-container">
                Aviso Médico Crítico y Exclusión de Emergencias
              </h3>
              <p className="text-body-md text-on-error-container/90 leading-relaxed">
                Sentria AI y sus herramientas telemétricas brindan asistencia y orientación inicial estandarizada. <strong>No constituyen un servicio de atención médica de urgencias en tiempo real ni reemplazan el juicio clínico de un médico presencial.</strong> Ante sospecha de paro cardíaco, accidente cerebrovascular, asfixia o traumatismo severo, llame inmediatamente al 911 o acuda a la guardia hospitalaria más cercana.
              </p>
            </div>
          </div>

          {/* Section 1 */}
          <section id="alcance" className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 space-y-space-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-label-sm uppercase tracking-wider">
              <Stethoscope className="h-4 w-4" />
              <span>Sección 1</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface">
              1. Alcance del Ecosistema Asistencial y Telemetría
            </h2>
            <div className="text-body-md text-secondary space-y-space-sm leading-relaxed">
              <p>
                Sentria AI Health Systems opera como una plataforma integral de gestión clínica hospitalaria orientada a la optimización de los flujos de pacientes, digitalización del historial médico, agendamiento de turnos y clasificación preliminar de riesgo sintomático.
              </p>
              <p>
                Los servicios asistenciales provistos a través del portal y de sus módulos de interacción tienen por finalidad:
              </p>
              <ul className="list-disc pl-space-md space-y-1 text-on-surface-variant">
                <li>Facilitar el acceso centralizado y seguro a historias clínicas, informes radiológicos y análisis de laboratorio.</li>
                <li>Proveer algoritmos de auto-triage fundamentados en el índice de severidad de emergencias (ESI v4) para orientar el nivel de atención adecuado.</li>
                <li>Validar la cobertura con financiadores y obras sociales en tiempo real mediante integraciones de padrón institucional.</li>
                <li>Automatizar recordatorios y recomendaciones profilácticas pre-estudio.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section id="naturaleza-ia" className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 space-y-space-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-label-sm uppercase tracking-wider">
              <HeartPulse className="h-4 w-4" />
              <span>Sección 2</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface">
              2. Carácter Orientativo de la Inteligencia Artificial
            </h2>
            <div className="text-body-md text-secondary space-y-space-sm leading-relaxed">
              <p>
                El motor de inteligencia clínica de Sentria AI analiza los datos provistos por el usuario (síntomas, antecedentes y parámetros fisiológicos) aplicando árboles de decisión médica estandarizados. 
              </p>
              <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15 space-y-2">
                <h4 className="text-label-lg font-semibold text-on-surface">
                  Pautas fundamentales de la interacción algorítmica:
                </h4>
                <p className="text-body-sm text-secondary">
                  1. Las sugerencias emitidas por el asistente <strong>no constituyen diagnóstico médico vinculante ni prescripción farmacológica</strong>.
                </p>
                <p className="text-body-sm text-secondary">
                  2. La decisión terapéutica final y el tratamiento definitivo corresponden de manera exclusiva al profesional médico matriculado actuante.
                </p>
                <p className="text-body-sm text-secondary">
                  3. El paciente no debe suspender, modificar ni iniciar tratamientos médicos basándose únicamente en las respuestas del asistente virtual sin consulta médica previa.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="derechos-paciente" className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 space-y-space-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-label-sm uppercase tracking-wider">
              <Scale className="h-4 w-4" />
              <span>Sección 3</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface">
              3. Consentimiento Informado y Ley 26.529 de Derechos del Paciente
            </h2>
            <div className="text-body-md text-secondary space-y-space-sm leading-relaxed">
              <p>
                En estricto cumplimiento con la <strong>Ley Nacional 26.529 (Derechos del Paciente en su Relación con los Profesionales e Instituciones de la Salud)</strong> de la República Argentina y directivas sanitarias internacionales:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm pt-space-xs">
                <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15">
                  <h4 className="text-label-lg font-semibold text-on-surface flex items-center gap-2">
                    <UserCheck className="h-4 w-4 text-primary" /> Autonomía de la Voluntad
                  </h4>
                  <p className="text-body-sm text-secondary mt-1">
                    El paciente tiene derecho inalienable a aceptar o rechazar cualquier recomendación clínica o procedimiento propuesto tras recibir información clara y suficiente.
                  </p>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15">
                  <h4 className="text-label-lg font-semibold text-on-surface flex items-center gap-2">
                    <FileCheck2 className="h-4 w-4 text-primary" /> Titularidad de la Ficha Clínica
                  </h4>
                  <p className="text-body-sm text-secondary mt-1">
                    El paciente es el único titular de su historia clínica electrónica, teniendo acceso irrestricto y gratuito a sus copias digitales y registros evolutivos.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="responsabilidades" className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 space-y-space-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-label-sm uppercase tracking-wider">
              <Clock className="h-4 w-4" />
              <span>Sección 4</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface">
              4. Obligaciones y Deber de Veracidad del Usuario
            </h2>
            <div className="text-body-md text-secondary space-y-space-sm leading-relaxed">
              <p>
                Para garantizar la seguridad clínica del servicio, el usuario se compromete a:
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-on-surface-variant">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Proporcionar datos filiatorios y antecedentes de salud veraces, completos y actualizados (alergias a medicamentos, cirugías previas, tratamientos crónicos).</span>
                </li>
                <li className="flex items-start gap-2 text-on-surface-variant">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Custodiar las credenciales de acceso (contraseña y factores de autenticación) sin compartirlas con terceros no autorizados.</span>
                </li>
                <li className="flex items-start gap-2 text-on-surface-variant">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>Notificar de inmediato al centro de soporte ante cualquier sospecha de uso indebido de su cuenta o alteración en sus registros.</span>
                </li>
              </ul>
            </div>
          </section>
        </div>

        {/* Sidebar Summary & Table of Contents */}
        <div className="lg:col-span-4 space-y-space-md">
          <div className="sticky top-20 rounded-2xl bg-surface-container-lowest p-space-lg border border-outline-variant/20 shadow-2xs space-y-space-md">
            <h3 className="text-title-md font-bold text-on-surface">
              Índice de Términos
            </h3>

            <nav className="flex flex-col space-y-2 text-body-sm">
              <a
                href="#alcance"
                className="text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-2"
              >
                1. Alcance y Telemetría
              </a>
              <a
                href="#naturaleza-ia"
                className="text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-2"
              >
                2. Carácter Orientativo de la IA
              </a>
              <a
                href="#derechos-paciente"
                className="text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-2"
              >
                3. Consentimiento y Ley 26.529
              </a>
              <a
                href="#responsabilidades"
                className="text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-2"
              >
                4. Deber de Veracidad
              </a>
            </nav>

            <div className="pt-space-sm border-t border-outline-variant/15 space-y-space-xs text-label-xs text-secondary">
              <div className="flex items-center gap-1 text-primary font-semibold">
                <FileCheck2 className="h-4 w-4" />
                <span>Documento Jurídico Vinculante</span>
              </div>
              <p>
                Al registrarse en la plataforma, el usuario declara haber leído, comprendido y aceptado en su totalidad estos Términos Clínicos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
