"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import {
  Appointment,
  AppointmentTab,
  PortalSection,
  AvailableDateOption,
  ToastNotification,
} from "@/types/appointments"
import { appointmentService } from "../services/appointment.service"

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [availableDates, setAvailableDates] = useState<AvailableDateOption[]>([])
  const [activeSection, setActiveSection] = useState<PortalSection>("turnos")
  const [activeTab, setActiveTab] = useState<AppointmentTab>("upcoming")
  const [isLoading, setIsLoading] = useState(true)

  // Modals state
  const [cancelModalAppointment, setCancelModalAppointment] = useState<Appointment | null>(null)
  const [rescheduleModalAppointment, setRescheduleModalAppointment] = useState<Appointment | null>(null)

  // Toast state
  const [toast, setToast] = useState<ToastNotification | null>(null)

  const showToast = useCallback(
    (title: string, message: string, icon = "check_circle", type: "success" | "info" | "warning" | "error" = "success") => {
      setToast({ title, message, icon, type })
    },
    []
  )

  const dismissToast = useCallback(() => {
    setToast(null)
  }, [])

  // Auto-dismiss toast after 4.2s
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      setToast(null)
    }, 4200)
    return () => clearTimeout(timer)
  }, [toast])

  // Load initial appointments and available slots
  useEffect(() => {
    let isMounted = true

    async function loadData() {
      try {
        const [apts, dates] = await Promise.all([
          appointmentService.getAppointments(),
          appointmentService.getAvailableSlots(),
        ])
        if (isMounted) {
          setAppointments(apts)
          setAvailableDates(dates)
          setIsLoading(false)
        }
      } catch {
        if (isMounted) {
          setIsLoading(false)
          showToast("Error", "No se pudieron cargar los turnos", "error", "error")
        }
      }
    }

    loadData()
    return () => {
      isMounted = false
    }
  }, [showToast])

  // Split appointments by categories
  const upcomingAppointments = useMemo(() => {
    return appointments.filter(
      (a) => a.status === "confirmado" || a.status === "pendiente" || a.isCancelledInSession
    )
  }, [appointments])

  const activeAppointmentsCount = useMemo(() => {
    return appointments.filter(
      (a) => (a.status === "confirmado" || a.status === "pendiente") && !a.isCancelledInSession
    ).length
  }, [appointments])

  const historyAppointments = useMemo(() => {
    return appointments.filter((a) => a.status === "atendido" || a.status === "completado")
  }, [appointments])

  const canceledAppointments = useMemo(() => {
    return appointments.filter((a) => a.status === "cancelado" && !a.isCancelledInSession)
  }, [appointments])

  const canceledCount = useMemo(() => {
    return appointments.filter((a) => a.status === "cancelado").length
  }, [appointments])

  // Closest next appointment
  const nextAppointment = useMemo(() => {
    return appointments.find(
      (a) => a.isNext && !a.isCancelledInSession && a.status === "confirmado"
    ) || appointments.find((a) => a.status === "confirmado" && !a.isCancelledInSession)
  }, [appointments])

  // Section switcher
  const handleSwitchSection = useCallback((section: PortalSection) => {
    setActiveSection(section)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  // Tab switching with feedback
  const handleSwitchTab = useCallback(
    (tab: AppointmentTab) => {
      setActiveSection("turnos")
      setActiveTab(tab)
      if (tab === "canceled") {
        showToast(
          "Filtro Aplicado",
          "Mostrando citas canceladas registradas en el período actual.",
          "filter_list",
          "info"
        )
      }
    },
    [showToast]
  )

  // Navigate to history tab directly
  const handleNavigateToHistory = useCallback(() => {
    setActiveSection("turnos")
    setActiveTab("history")
  }, [])

  // Cancel flow
  const handleOpenCancelModal = useCallback((appointment: Appointment) => {
    setCancelModalAppointment(appointment)
  }, [])

  const handleCloseCancelModal = useCallback(() => {
    setCancelModalAppointment(null)
  }, [])

  const handleConfirmCancel = useCallback(
    async (appointmentId: string, reason: string) => {
      try {
        const { appointment: updated } = await appointmentService.cancelAppointment({
          appointmentId,
          reason,
        })
        setAppointments((prev) =>
          prev.map((a) => (a.id === appointmentId ? updated : a))
        )
        setCancelModalAppointment(null)
        showToast(
          "Turno Cancelado con Éxito",
          "El profesional ha sido notificado y el espacio ha sido liberado para lista de espera.",
          "event_busy",
          "warning"
        )
      } catch {
        showToast("Error", "No se pudo cancelar el turno", "error", "error")
      }
    },
    [showToast]
  )

  // Undo cancellation flow
  const handleRestoreAppointment = useCallback(
    async (appointmentId: string) => {
      try {
        const { appointment: updated } = await appointmentService.restoreAppointment(
          appointmentId
        )
        setAppointments((prev) =>
          prev.map((a) => (a.id === appointmentId ? updated : a))
        )
        showToast(
          "Turno Restablecido",
          "Se restauró la cita médica para pruebas.",
          "restore",
          "success"
        )
      } catch {
        showToast("Error", "No se pudo restablecer el turno", "error", "error")
      }
    },
    [showToast]
  )

  // Reschedule flow
  const handleOpenRescheduleModal = useCallback((appointment: Appointment) => {
    setRescheduleModalAppointment(appointment)
  }, [])

  const handleCloseRescheduleModal = useCallback(() => {
    setRescheduleModalAppointment(null)
  }, [])

  const handleConfirmReschedule = useCallback(
    async (appointmentId: string, newDate: string, newTime: string) => {
      try {
        const { appointment: updated } = await appointmentService.rescheduleAppointment({
          appointmentId,
          newDate,
          newTime,
        })
        setAppointments((prev) =>
          prev.map((a) => (a.id === appointmentId ? updated : a))
        )
        setRescheduleModalAppointment(null)
        showToast(
          "Cita Reprogramada",
          `Nuevo turno confirmado para ${newDate} - ${newTime}.`,
          "verified",
          "success"
        )
      } catch {
        showToast("Error", "No se pudo reprogramar el turno", "error", "error")
      }
    },
    [showToast]
  )

  // Notice for new appointment / triage
  const handleTriggerNewAppointmentNotice = useCallback(() => {
    setActiveSection("ayuda")
    showToast(
      "Asistente Clínico IA",
      "Iniciando triaje clínico inteligente para asignación de especialista...",
      "smart_toy",
      "info"
    )
  }, [showToast])

  return {
    appointments,
    availableDates,
    activeSection,
    activeTab,
    isLoading,
    upcomingAppointments,
    activeAppointmentsCount,
    historyAppointments,
    canceledAppointments,
    canceledCount,
    nextAppointment,
    cancelModalAppointment,
    rescheduleModalAppointment,
    toast,
    switchSection: handleSwitchSection,
    switchTab: handleSwitchTab,
    navigateToHistory: handleNavigateToHistory,
    openCancelModal: handleOpenCancelModal,
    closeCancelModal: handleCloseCancelModal,
    confirmCancel: handleConfirmCancel,
    restoreAppointment: handleRestoreAppointment,
    openRescheduleModal: handleOpenRescheduleModal,
    closeRescheduleModal: handleCloseRescheduleModal,
    confirmReschedule: handleConfirmReschedule,
    triggerNewAppointmentNotice: handleTriggerNewAppointmentNotice,
    dismissToast,
    showToast,
  }
}
