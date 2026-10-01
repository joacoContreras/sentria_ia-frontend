"use client"

import React from "react"
import { useAppointments } from "../hooks/use-appointments"
import { PortalHeader } from "./portal-header"
import { PatientHeroBanner } from "./patient-hero-banner"
import { AppointmentTabs } from "./appointment-tabs"
import { AppointmentCard } from "./appointment-card"
import { AppointmentHistoryCard } from "./appointment-history-card"
import { AppointmentCanceledCard } from "./appointment-canceled-card"
import { ClinicalSidebar } from "./clinical-sidebar"
import { CancelAppointmentModal } from "./cancel-appointment-modal"
import { RescheduleAppointmentModal } from "./reschedule-appointment-modal"
import { PortalToast } from "./portal-toast"
import { PortalFooter } from "./portal-footer"
import { HelpView } from "@/features/help/components/help-view"
import { ClinicalTermsView } from "@/features/legal/components/clinical-terms-view"
import { MedicalPrivacyView } from "@/features/legal/components/medical-privacy-view"
import { CryptoProtocolView } from "@/features/legal/components/crypto-protocol-view"
import { AboutHero } from "@/features/about/components/about-hero"
import { ClinicalShowcase } from "@/features/about/components/clinical-showcase"
import { EthicalBoundaries } from "@/features/about/components/ethical-boundaries"
import { TechnologyPrivacy } from "@/features/about/components/technology-privacy"
import { DossierCta } from "@/features/about/components/dossier-cta"

export function PortalDashboard() {
  const {
    availableDates,
    activeSection,
    activeTab,
    upcomingAppointments,
    activeAppointmentsCount,
    historyAppointments,
    canceledAppointments,
    canceledCount,
    nextAppointment,
    cancelModalAppointment,
    rescheduleModalAppointment,
    toast,
    switchSection,
    switchTab,
    openCancelModal,
    closeCancelModal,
    confirmCancel,
    restoreAppointment,
    openRescheduleModal,
    closeRescheduleModal,
    confirmReschedule,
    triggerNewAppointmentNotice,
    dismissToast,
  } = useAppointments()

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary/20 selection:text-primary">
      {/* Accessibility Skip Link */}
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        href="#main-content"
      >
        Saltar al contenido principal
      </a>

      {/* Global Header inside Portal context */}
      <PortalHeader
        activeSection={activeSection}
        activeTab={activeTab}
        onSelectSection={switchSection}
        onSelectTab={switchTab}
      />

      {/* Main Content Area */}
      <main
        id="main-content"
        className="w-full pt-20 bg-surface flex-1 flex flex-col"
        role="main"
      >
        {/* Toast Notification Container */}
        <PortalToast toast={toast} onDismiss={dismissToast} />

        {/* SECTION 1: TURNOS Y CONSULTAS */}
        {activeSection === "turnos" && (
          <div className="flex flex-col w-full animate-in fade-in duration-200">
            {/* Hero & Patient Context Banner */}
            <PatientHeroBanner
              activeCount={activeAppointmentsCount}
              nextAppointment={nextAppointment}
              onNewAppointment={triggerNewAppointmentNotice}
            />

            {/* Main Body: Filtered Queue & Clinical Details */}
            <section className="max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-2xl w-full">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
                {/* Left Column: Appointments List (8 cols) */}
                <div className="lg:col-span-8 flex flex-col gap-space-lg">
                  {/* Tab Navigation */}
                  <AppointmentTabs
                    activeTab={activeTab}
                    upcomingCount={activeAppointmentsCount}
                    historyCount={historyAppointments.length}
                    canceledCount={canceledCount}
                    onTabChange={switchTab}
                  />

                  {/* TAB PANEL 1: Próximos Turnos (CA1, CA2, CA3, CA4) */}
                  {activeTab === "upcoming" && (
                    <div
                      id="panel-upcoming"
                      role="tabpanel"
                      aria-labelledby="tab-upcoming"
                      className="flex flex-col gap-space-lg animate-in fade-in duration-150"
                    >
                      {upcomingAppointments.length === 0 ? (
                        <div className="p-space-xl text-center bg-surface-container-lowest rounded-2xl border border-surface-container-high text-slate-600">
                          <p className="font-body-lg">
                            No tienes turnos pendientes en este momento.
                          </p>
                        </div>
                      ) : (
                        upcomingAppointments.map((appointment) => (
                          <AppointmentCard
                            key={appointment.id}
                            appointment={appointment}
                            onOpenCancel={openCancelModal}
                            onOpenReschedule={openRescheduleModal}
                            onRestore={restoreAppointment}
                          />
                        ))
                      )}
                    </div>
                  )}

                  {/* TAB PANEL 2: Historial y Pasados */}
                  {activeTab === "history" && (
                    <div
                      id="panel-history"
                      role="tabpanel"
                      aria-labelledby="tab-history"
                      className="flex flex-col gap-space-md animate-in fade-in duration-150"
                    >
                      {historyAppointments.length === 0 ? (
                        <div className="p-space-xl text-center bg-surface-container-lowest rounded-2xl border border-surface-container-high text-slate-600">
                          <p className="font-body-lg">
                            No tienes historial de consultas pasadas.
                          </p>
                        </div>
                      ) : (
                        historyAppointments.map((appointment) => (
                          <AppointmentHistoryCard
                            key={appointment.id}
                            appointment={appointment}
                          />
                        ))
                      )}
                    </div>
                  )}

                  {/* TAB PANEL 3: Cancelados */}
                  {activeTab === "canceled" && (
                    <div
                      id="panel-canceled"
                      role="tabpanel"
                      aria-labelledby="tab-canceled"
                      className="flex flex-col gap-space-md animate-in fade-in duration-150"
                    >
                      {canceledAppointments.length === 0 ? (
                        <div className="p-space-xl text-center bg-surface-container-lowest rounded-2xl border border-surface-container-high text-slate-600">
                          <p className="font-body-lg">
                            No hay citas canceladas registradas en el período.
                          </p>
                        </div>
                      ) : (
                        canceledAppointments.map((appointment) => (
                          <AppointmentCanceledCard
                            key={appointment.id}
                            appointment={appointment}
                          />
                        ))
                      )}
                    </div>
                  )}
                </div>

                {/* Right Column: Clinical Instructions & Guidelines (4 cols) */}
                <ClinicalSidebar />
              </div>
            </section>
          </div>
        )}

        {/* SECTION 2: CENTRO DE AYUDA Y ASISTENCIA DENTRO DEL PORTAL */}
        {activeSection === "ayuda" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <HelpView />
          </div>
        )}

        {/* SECTION 3: SEDE MÉDICA Y TELEMÉTRICA CENTRAL */}
        {activeSection === "sede" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <AboutHero />
            <ClinicalShowcase />
            <EthicalBoundaries />
            <TechnologyPrivacy />
            <DossierCta />
          </div>
        )}

        {/* SECTION 4: TÉRMINOS CLÍNICOS */}
        {activeSection === "terminos" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <ClinicalTermsView />
          </div>
        )}

        {/* SECTION 5: PRIVACIDAD MÉDICA */}
        {activeSection === "privacidad" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <MedicalPrivacyView />
          </div>
        )}

        {/* SECTION 6: PROTOCOLO CRIPTOGRÁFICO */}
        {activeSection === "protocolo" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <CryptoProtocolView />
          </div>
        )}
      </main>

      {/* Global Footer con navegación contextual */}
      <PortalFooter onSelectSection={switchSection} />

      {/* Modals for Appointments */}
      <CancelAppointmentModal
        isOpen={Boolean(cancelModalAppointment)}
        appointment={cancelModalAppointment}
        onClose={closeCancelModal}
        onConfirm={confirmCancel}
      />

      <RescheduleAppointmentModal
        isOpen={Boolean(rescheduleModalAppointment)}
        appointment={rescheduleModalAppointment}
        availableDates={availableDates}
        onClose={closeRescheduleModal}
        onConfirm={confirmReschedule}
      />
    </div>
  )
}
