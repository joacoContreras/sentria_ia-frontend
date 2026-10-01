"use client"

import React from "react"
import { FileText, ArrowRight } from "lucide-react"
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
import { BookAppointmentModal } from "./book-appointment-modal"
import { PortalToast } from "./portal-toast"
import { PortalFooter } from "./portal-footer"
import { MedicalHistoryView } from "@/features/medical-history/components/medical-history-view"
import { TriageView } from "@/features/triage/components/triage-view"
import { HelpView } from "@/features/help/components/help-view"
import { ClinicalTermsView } from "@/features/legal/components/clinical-terms-view"
import { MedicalPrivacyView } from "@/features/legal/components/medical-privacy-view"
import { CryptoProtocolView } from "@/features/legal/components/crypto-protocol-view"
import { AboutHero } from "@/features/about/components/about-hero"
import { ClinicalShowcase } from "@/features/about/components/clinical-showcase"
import { EthicalBoundaries } from "@/features/about/components/ethical-boundaries"
import { TechnologyPrivacy } from "@/features/about/components/technology-privacy"
import { DossierCta } from "@/features/about/components/dossier-cta"
import { SettingsView } from "@/features/settings/components/settings-view"
import { PortalSection } from "@/types/appointments"

interface PortalDashboardProps {
  initialSection?: PortalSection
}

export function PortalDashboard({ initialSection = "turnos" }: PortalDashboardProps) {
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
    isBookModalOpen,
    bookModalSpecialty,
    bookModalDoctor,
    toast,
    switchSection,
    switchTab,
    navigateToHistory,
    openCancelModal,
    closeCancelModal,
    confirmCancel,
    restoreAppointment,
    openRescheduleModal,
    closeRescheduleModal,
    confirmReschedule,
    openBookModal,
    closeBookModal,
    confirmBookAppointment,
    dismissToast,
    showToast,
  } = useAppointments(initialSection)

  // Simplified history in Mis Turnos showing the last 2-3 items
  const simplifiedHistory = historyAppointments.slice(0, 3)

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

        {/* SECTION 1: MIS TURNOS */}
        {activeSection === "turnos" && (
          <div className="flex flex-col w-full animate-in fade-in duration-200">
            {/* Hero & Patient Context Banner */}
            <PatientHeroBanner
              activeCount={activeAppointmentsCount}
              nextAppointment={nextAppointment}
              onNewAppointment={() => openBookModal()}
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

                  {/* TAB PANEL 1: Próximos Turnos */}
                  {activeTab === "upcoming" && (
                    <div
                      id="panel-upcoming"
                      role="tabpanel"
                      aria-labelledby="tab-upcoming"
                      className="flex flex-col gap-space-lg animate-in fade-in duration-150"
                    >
                      {upcomingAppointments.length === 0 ? (
                        <div className="p-space-xl text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/30 text-on-surface-variant">
                          <p className="font-body-lg">
                            No tienes turnos pendientes en este momento.
                          </p>
                          <button
                            type="button"
                            onClick={() => openBookModal()}
                            className="mt-3 inline-flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold hover:bg-primary-container transition-all cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                          >
                            Agendar un Turno
                          </button>
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

                  {/* TAB PANEL 2: Historial y Pasados (Simplificado con enlace a Historial Clínico completo) */}
                  {activeTab === "history" && (
                    <div
                      id="panel-history"
                      role="tabpanel"
                      aria-labelledby="tab-history"
                      className="flex flex-col gap-space-md animate-in fade-in duration-150"
                    >
                      {simplifiedHistory.length === 0 ? (
                        <div className="p-space-xl text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/30 text-on-surface-variant">
                          <p className="font-body-lg">
                            No tienes historial de consultas pasadas.
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between px-1">
                            <span className="font-label-sm text-label-sm text-outline font-semibold uppercase tracking-wider">
                              Últimas consultas registradas ({simplifiedHistory.length})
                            </span>
                            <button
                              type="button"
                              onClick={navigateToHistory}
                              className="font-label-sm text-label-sm text-primary font-bold hover:underline cursor-pointer inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                            >
                              Ver Historia Clínica Completa
                              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                            </button>
                          </div>

                          {simplifiedHistory.map((appointment) => (
                            <AppointmentHistoryCard
                              key={appointment.id}
                              appointment={appointment}
                              onViewSummary={() => navigateToHistory()}
                            />
                          ))}

                          {/* Banner explicativo y CTA a Historia Clínica */}
                          <div className="mt-space-sm p-space-lg rounded-2xl bg-surface-container-low border border-outline-variant/40 flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                            <div className="flex items-start gap-space-md">
                              <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 mt-0.5">
                                <FileText className="h-5 w-5" aria-hidden="true" />
                              </div>
                              <div className="flex flex-col">
                                <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                                  Expediente Clínico Digital Completo
                                </h3>
                                <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
                                  Consulta diagnósticos, evoluciones, recetas descargables, órdenes médicas e informes de laboratorio en tu Historia Clínica.
                                </p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={navigateToHistory}
                              className="px-space-lg h-11 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-semibold inline-flex items-center justify-center gap-space-2xs transition-all shadow-sm shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                            >
                              <span>Ver Historial Clínico</span>
                              <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </div>
                        </>
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
                        <div className="p-space-xl text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/30 text-on-surface-variant">
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

        {/* SECTION 2: TRIAGE Y SÍNTOMAS */}
        {activeSection === "triage" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <TriageView
              onOpenBookAppointment={openBookModal}
              onShowToast={showToast}
            />
          </div>
        )}

        {/* SECTION 3: HISTORIAL CLÍNICO */}
        {activeSection === "historial" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <MedicalHistoryView
              onBookAppointmentWithDoctor={openBookModal}
              onShowToast={showToast}
            />
          </div>
        )}

        {/* SECTION 4: CENTRO DE AYUDA Y ASISTENCIA DENTRO DEL PORTAL */}
        {activeSection === "ayuda" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <HelpView />
          </div>
        )}

        {/* SECTION 5: SEDE MÉDICA Y TELEMÉTRICA CENTRAL */}
        {activeSection === "sede" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <AboutHero />
            <ClinicalShowcase />
            <EthicalBoundaries />
            <TechnologyPrivacy />
            <DossierCta />
          </div>
        )}

        {/* SECTION 6: TÉRMINOS CLÍNICOS */}
        {activeSection === "terminos" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <ClinicalTermsView />
          </div>
        )}

        {/* SECTION 7: PRIVACIDAD MÉDICA */}
        {activeSection === "privacidad" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <MedicalPrivacyView />
          </div>
        )}

        {/* SECTION 8: PROTOCOLO CRIPTOGRÁFICO */}
        {activeSection === "protocolo" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <CryptoProtocolView />
          </div>
        )}

        {/* SECTION 9: CONFIGURACIÓN DE LA CUENTA */}
        {activeSection === "configuracion" && (
          <div className="flex flex-col w-full flex-1 animate-in fade-in duration-200">
            <SettingsView
              onShowToast={showToast}
              onNavigate={(sec) => switchSection(sec)}
            />
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

      <BookAppointmentModal
        isOpen={isBookModalOpen}
        initialSpecialty={bookModalSpecialty}
        initialDoctor={bookModalDoctor}
        onClose={closeBookModal}
        onConfirm={confirmBookAppointment}
      />
    </div>
  )
}
