import React from "react"
import {
  KeyRound,
  ShieldCheck,
  Cpu,
  Server,
  Layers,
  FileCode2,
  Lock,
  Workflow,
} from "lucide-react"

export function CryptoProtocolView() {
  return (
    <div className="w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-xl lg:py-space-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
        {/* Main Content Sections */}
        <div className="lg:col-span-8 space-y-space-xl">
          {/* Top Security Banner */}
          <div className="rounded-2xl bg-surface-container-low border border-outline-variant/20 p-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
            <div className="space-y-1">
              <span className="text-label-xs font-semibold uppercase tracking-wider text-primary">
                Arquitectura de Seguridad Zero-Trust
              </span>
              <h3 className="text-title-lg font-bold text-on-surface">
                Cifrado Militar AES-256-GCM & Zero-Knowledge Proofs
              </h3>
              <p className="text-body-sm text-secondary">
                Toda la información médica es cifrada en el cliente y en reposo antes de tocar cualquier capa de almacenamiento persistente.
              </p>
            </div>
            <div className="flex shrink-0 h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
              <KeyRound className="h-6 w-6" />
            </div>
          </div>

          {/* Section 1 */}
          <section id="cifrado-reposo" className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 space-y-space-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-label-sm uppercase tracking-wider">
              <Lock className="h-4 w-4" />
              <span>Sección 1</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface">
              1. Cifrado en Reposo de Fichas Médicas (AES-256-GCM)
            </h2>
            <div className="text-body-md text-secondary space-y-space-sm leading-relaxed">
              <p>
                Cada registro médico, informe de laboratorio y fragmento de telemetría es procesado mediante el estándar criptográfico <strong>AES (Advanced Encryption Standard)</strong> con longitud de clave de 256 bits en modo <strong>Galois/Counter Mode (GCM)</strong>.
              </p>
              <div className="rounded-xl bg-surface-container-low p-space-md border border-outline-variant/15 space-y-2 text-body-sm">
                <div className="flex items-start gap-2 text-on-surface">
                  <Cpu className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong>Autenticación de Datos Asociados (AEAD):</strong> Garantiza simultáneamente la confidencialidad y la integridad criptográfica de cada bloque de datos, previniendo cualquier alteración o inyección maliciosa.
                  </div>
                </div>
                <div className="flex items-start gap-2 text-on-surface">
                  <Server className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <strong>Derivación de Claves Jerárquicas (HKDF):</strong> Las claves por paciente se derivan mediante funciones seguras basadas en HMAC, asegurando aislamiento absoluto entre fichas clínicas de distintos usuarios.
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="cifrado-transito" className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 space-y-space-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-label-sm uppercase tracking-wider">
              <Workflow className="h-4 w-4" />
              <span>Sección 2</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface">
              2. Cifrado en Tránsito (TLS 1.3 con Perfect Forward Secrecy)
            </h2>
            <div className="text-body-md text-secondary space-y-space-sm leading-relaxed">
              <p>
                Todas las comunicaciones entre el navegador del paciente, el portal web y la API hospitalaria se ejecutan forzosamente a través de <strong>TLS 1.3</strong> con suites de cifrado modernas (ECDHE-ECDSA-AES256-GCM-SHA384).
              </p>
              <p>
                El mecanismo de <em>Perfect Forward Secrecy (PFS)</em> asegura que una hipotética vulnerabilidad de claves a futuro no comprometa las comunicaciones históricas previamente transmitidas.
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="zero-knowledge" className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 space-y-space-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-label-sm uppercase tracking-wider">
              <Layers className="h-4 w-4" />
              <span>Sección 3</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface">
              3. Principio Zero-Knowledge y Aislamiento de Tenant
            </h2>
            <div className="text-body-md text-secondary space-y-space-sm leading-relaxed">
              <p>
                Los motores de inferencia de IA operan sobre entornos de ejecución seguros (<em>Confidential Computing / Enclaves Seguros</em>) donde las variables sintomáticas y la identidad del paciente se procesan de forma transitoria y efímera sin persistencia intermedia en texto plano.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm pt-space-xs">
                <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15">
                  <h4 className="text-label-lg font-semibold text-on-surface">
                    Tokenización Efímera
                  </h4>
                  <p className="text-body-sm text-secondary mt-1">
                    Los identificadores del paciente (DNI, Nombre) son disociados antes del envío a los modelos de triage clínico asistido.
                  </p>
                </div>
                <div className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/15">
                  <h4 className="text-label-lg font-semibold text-on-surface">
                    Bóvedas HSM FIPS 140-3
                  </h4>
                  <p className="text-body-sm text-secondary mt-1">
                    Las claves maestras residen en Hardware Security Modules certificados a prueba de manipulaciones físicas y lógicas.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="auditoria" className="rounded-2xl bg-surface-container-lowest p-space-lg sm:p-space-xl border border-outline-variant/15 space-y-space-sm">
            <div className="flex items-center gap-2 text-primary font-semibold text-label-sm uppercase tracking-wider">
              <FileCode2 className="h-4 w-4" />
              <span>Sección 4</span>
            </div>
            <h2 className="text-headline-md font-bold text-on-surface">
              4. Auditoría Criptográfica Inmutable y Trazabilidad
            </h2>
            <div className="text-body-md text-secondary space-y-space-sm leading-relaxed">
              <p>
                Cada acceso a la historia clínica, ya sea por parte del paciente o del equipo médico tratante, genera una firma digital con timestamp criptográfico no repudiable.
              </p>
              <p>
                Los logs de auditoría son inmutables y permiten al paciente visualizar en tiempo real qué profesional o servicio accedió a sus datos, cuándo y bajo qué autorización clínica.
              </p>
            </div>
          </section>
        </div>

        {/* Sidebar Summary & Table of Contents */}
        <div className="lg:col-span-4 space-y-space-md">
          <div className="sticky top-20 rounded-2xl bg-surface-container-lowest p-space-lg border border-outline-variant/20 shadow-2xs space-y-space-md">
            <h3 className="text-title-md font-bold text-on-surface">
              Índice Criptográfico
            </h3>

            <nav className="flex flex-col space-y-2 text-body-sm">
              <a
                href="#cifrado-reposo"
                className="text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-2"
              >
                1. AES-256-GCM en Reposo
              </a>
              <a
                href="#cifrado-transito"
                className="text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-2"
              >
                2. TLS 1.3 con PFS
              </a>
              <a
                href="#zero-knowledge"
                className="text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-2"
              >
                3. Zero-Knowledge & HSM
              </a>
              <a
                href="#auditoria"
                className="text-on-surface-variant hover:text-primary transition-colors py-1 border-l-2 border-transparent hover:border-primary pl-2"
              >
                4. Auditoría Inmutable
              </a>
            </nav>

            <div className="pt-space-sm border-t border-outline-variant/15 space-y-space-xs text-label-xs text-secondary">
              <div className="flex items-center gap-1 text-primary font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>Estándar FIPS 140-3 Nivel 3</span>
              </div>
              <p>
                Alineado con las especificaciones del NIST y directivas de ciberseguridad sanitaria.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
