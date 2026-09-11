import React from "react"
import Link from "next/link"
import { Headphones, Clock, Lock, MessageSquare, Mail } from "lucide-react"

export function SupportContactPanel() {
  return (
    <section className="w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop pb-space-4xl">
      <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-xl shadow-md border border-outline-variant/20">
        {/* Decorative Backdrop Graphic */}
        <div
          className="pointer-events-none absolute -right-16 -bottom-16 h-80 w-80 rounded-full bg-primary-fixed/20 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-xl">
          <div className="space-y-space-xs max-w-2xl">
            <div className="flex items-center gap-space-2xs text-primary">
              <Headphones className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span className="text-label-sm uppercase tracking-wider font-semibold">
                Mesa de Ayuda Telemétrica
              </span>
            </div>

            <h3 className="text-headline-md text-on-surface font-bold">
              ¿No encontró la respuesta que buscaba?
            </h3>

            <p className="text-body-lg text-secondary leading-relaxed">
              Nuestro equipo de ingenieros de soporte y coordinadores médicos está
              activo de forma ininterrumpida para asistirlo con problemas de acceso,
              sincronización de historias clínicas o autenticación de prepagas.
            </p>

            <div className="flex flex-wrap items-center gap-space-lg pt-space-xs">
              <div className="flex items-center gap-space-2xs text-secondary text-label-md">
                <Clock className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <span>
                  Tiempo de respuesta estimado:{" "}
                  <strong className="text-on-surface font-semibold">
                    &lt; 5 min
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-space-2xs text-secondary text-label-md">
                <Lock className="h-4 w-4 text-primary shrink-0" aria-hidden="true" />
                <span>Comunicaciones encriptadas TLS 1.3</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-space-md w-full lg:w-auto shrink-0">
            <Link
              href="#chat-soporte"
              className="w-full sm:w-auto flex items-center justify-center gap-space-xs bg-surface-container-high text-primary text-label-lg px-space-lg py-space-md rounded-xl hover:bg-surface-container transition-all active:scale-98 font-semibold"
            >
              <MessageSquare className="h-5 w-5" aria-hidden="true" />
              <span>Abrir Chat con Soporte</span>
            </Link>

            <Link
              href="mailto:soporte@sentria.ai"
              className="w-full sm:w-auto flex items-center justify-center gap-space-xs bg-primary text-on-primary text-label-lg px-space-lg py-space-md rounded-xl hover:bg-primary-container transition-all shadow-md active:scale-98 font-semibold"
            >
              <Mail className="h-5 w-5" aria-hidden="true" />
              <span>Contactar Soporte Técnico</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
