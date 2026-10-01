"use client"

import React, { useState, useEffect, useCallback } from "react"
import { useAuth } from "@/features/auth/hooks/use-auth"
import { UserSettingsData } from "../types/settings"
import { settingsService } from "../services/settings.service"
import { SettingsProfileHeader } from "./settings-profile-header"
import { SettingsIdentityCard } from "./settings-identity-card"
import { SettingsNavSidebar, SettingsTabId } from "./settings-nav-sidebar"
import { SettingsPersonalDataSection } from "./settings-personal-data-section"
import { SettingsCoverageSection } from "./settings-coverage-section"
import { SettingsSecuritySection } from "./settings-security-section"
import { SettingsPreferencesSection } from "./settings-preferences-section"
import { SettingsActionFooter } from "./settings-action-footer"
import { ChangePasswordModal } from "./change-password-modal"
import { DeactivateAccountModal } from "./deactivate-account-modal"

interface SettingsViewProps {
  onShowToast?: (title: string, message: string, icon?: string, type?: "success" | "info" | "warning" | "error") => void
  onNavigate?: (section: "turnos" | "triage" | "historial" | "ayuda") => void
}

export function SettingsView({ onShowToast, onNavigate }: SettingsViewProps) {
  const { user, updateUser } = useAuth()
  const [data, setData] = useState<UserSettingsData>(() => {
    const loaded = settingsService.getSettings()
    if (user) {
      return {
        ...loaded,
        fullName: user.fullName || loaded.fullName,
        dni: user.docNumber || loaded.dni,
        email: user.email || loaded.email,
        phone: user.phone || loaded.phone,
        coverageProvider: user.coverageProvider || loaded.coverageProvider,
        affiliateNumber: user.memberId || loaded.affiliateNumber,
        avatarUrl: user.avatarUrl || loaded.avatarUrl,
      }
    }
    return loaded
  })
  const [activeTab, setActiveTab] = useState<SettingsTabId>("datos-personales")
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Modals state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections: SettingsTabId[] = [
        "datos-personales",
        "cobertura-medica",
        "seguridad-acceso",
        "preferencias-notificaciones",
      ]
      const scrollPosition = window.scrollY + 180

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const top = element.offsetTop
          const height = element.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Form field change handler
  const handleFieldChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }))
  }

  // Update padron simulation
  const handleUpdatePadron = () => {
    onShowToast?.(
      "Padrón Actualizado",
      "Sincronización completada con la base de datos de la Obra Social / Prepaga.",
      "sync",
      "success"
    )
  }

  // Save handler
  const handleSave = useCallback(() => {
    setIsSaving(true)
    setTimeout(() => {
      settingsService.saveSettings(data)
      setIsSaving(false)
      setShowSaveSuccess(true)
      onShowToast?.(
        "Configuración Guardada",
        "Los cambios han sido guardados con éxito en la plataforma clínica.",
        "check_circle",
        "success"
      )
      setTimeout(() => {
        setShowSaveSuccess(false)
      }, 4000)
    }, 400)
  }, [data, onShowToast])

  // Cancel handler
  const handleCancel = () => {
    const reloaded = settingsService.getSettings()
    setData(reloaded)
    onShowToast?.(
      "Cambios Descartados",
      "Se restauraron los valores guardados anteriormente.",
      "restore",
      "info"
    )
  }

  // Avatar change handler (updates local state, auth user context and settings service)
  const handleAvatarChange = (newUrl: string) => {
    setData((prev) => ({ ...prev, avatarUrl: newUrl }))
    updateUser({ avatarUrl: newUrl })
    settingsService.saveSettings({ avatarUrl: newUrl })
  }

  // Deactivate account confirm
  const handleConfirmDeactivate = () => {
    onShowToast?.(
      "Cuenta Desactivada",
      "Tu cuenta ha sido desactivada temporalmente.",
      "no_accounts",
      "warning"
    )
  }

  return (
    <div className="relative w-full max-w-container-max mx-auto px-gutter-mobile lg:px-gutter-desktop py-space-xl animate-in fade-in duration-200">
      {/* Dynamic Gradient Ambient Backdrop & Breadcrumbs */}
      <SettingsProfileHeader onNavigate={onNavigate} />

      {/* Top Identity Card: Avatar, Bio & Digital Card Status */}
      <SettingsIdentityCard
        fullName={data.fullName}
        dni={data.dni}
        hceNumber={data.hceNumber}
        avatarUrl={data.avatarUrl}
        onAvatarChange={handleAvatarChange}
        onShowToast={onShowToast}
      />

      {/* Main Settings Architecture: Tabbed Sidebar + Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
        {/* Quick Anchor Navigation (Sticky Desktop) */}
        <SettingsNavSidebar
          activeTab={activeTab}
          onSelectTab={(tabId) => setActiveTab(tabId)}
        />

        {/* Main Form Settings Area */}
        <form
          className="lg:col-span-9 flex flex-col gap-space-xl"
          id="settings-form"
          onSubmit={(e) => {
            e.preventDefault()
            handleSave()
          }}
        >
          {/* SECTION 1: DATOS PERSONALES */}
          <SettingsPersonalDataSection
            fullName={data.fullName}
            dni={data.dni}
            birthDate={data.birthDate}
            gender={data.gender}
            phone={data.phone}
            email={data.email}
            address={data.address}
            onChange={handleFieldChange}
          />

          {/* SECTION 2: COBERTURA MÉDICA & OBRA SOCIAL */}
          <SettingsCoverageSection
            coverageProvider={data.coverageProvider}
            coveragePlan={data.coveragePlan}
            affiliateNumber={data.affiliateNumber}
            coverageExpiry={data.coverageExpiry}
            onUpdatePadron={handleUpdatePadron}
          />

          {/* SECTION 3: SEGURIDAD Y ACCESO */}
          <SettingsSecuritySection
            passwordLastUpdated={data.passwordLastUpdated}
            twoFactorEnabled={data.twoFactorEnabled}
            sessions={data.sessions}
            onOpenChangePassword={() => setIsPasswordModalOpen(true)}
          />

          {/* SECTION 4: PREFERENCIAS & NOTIFICACIONES */}
          <SettingsPreferencesSection
            whatsappReminders={data.whatsappReminders}
            emailResults={data.emailResults}
            fastSlotAlerts={data.fastSlotAlerts}
          />

          {/* Sticky Bottom Actions Bar & Save Feedback */}
          <SettingsActionFooter
            showSaveSuccess={showSaveSuccess}
            isSaving={isSaving}
            onCancel={handleCancel}
            onSave={handleSave}
            onDeactivateAccount={() => setIsDeactivateModalOpen(true)}
          />
        </form>
      </div>

      {/* Modals */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSuccess={() => {
          setData((prev) => ({
            ...prev,
            passwordLastUpdated: "Recientemente actualizado",
          }))
          onShowToast?.(
            "Contraseña Modificada",
            "Tu contraseña ha sido actualizada con éxito.",
            "check_circle",
            "success"
          )
        }}
      />

      <DeactivateAccountModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
        onConfirm={handleConfirmDeactivate}
      />
    </div>
  )
}
