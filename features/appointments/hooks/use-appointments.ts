"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import {
  Appointment,
  AppointmentTab,
  PortalSection,
  AvailableDateOption,
  BookAppointmentInput,
  ToastNotification,
} from "@/types/appointments"
import { appointmentService } from "../services/appointment.service"

export function useAppointments(initialSection: PortalSection = "turnos") {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [availableDates, setAvailableDates] = useState<AvailableDateOption[]>([])
  const [activeSection, setActiveSection] = useState<PortalSection>(initialSection)
  const [activeTab, setActiveTab] = useState<AppointmentTab>("upcoming")
  const [isLoading, setIsLoading] = useState(true)

  // Modals state
  const [cancelModalAppointment, setCancelModalAppointment] = useState<Appointment | null>(null)
  const [rescheduleModalAppointment, setRescheduleModalAppointment] = useState<Appointment | null>(null)
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)
  const [bookModalSpecialty, setBookModalSpecialty] = useState<string | undefined>(undefined)
  const [bookModalDoctor, setBookModalDoctor] = useState<string | undefined>(undefined)

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

  // Auto-dismiss toast after 4.5s
  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => {
      setToast(null)
    }, 4500)
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
    return (
      appointments.find(
        (a) => a.isNext && !a.isCancelledInSession && a.status === "confirmado"
      ) || appointments.find((a) => a.status === "confirmado" && !a.isCancelledInSession)
    )
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

  // Navigate to history section directly
  const handleNavigateToHistory = useCallback(() => {
    setActiveSection("historial")
    window.scrollTo({ top: 0, behavior: "smooth" })
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
          "Cita Reprogramada con Éxito",
          `Nuevo turno confirmado para ${newDate} - ${newTime}. Se envió confirmación por SMS y correo electrónico.`,
          "verified",
          "success"
        )
      } catch {
        showToast("Error", "No se pudo reprogramar el turno", "error", "error")
      }
    },
    [showToast]
  )

  // Book new appointment flow
  const handleOpenBookModal = useCallback((specialty?: string, doctor?: string) => {
    setBookModalSpecialty(specialty)
    setBookModalDoctor(doctor)
    setIsBookModalOpen(true)
  }, [])

  const handleCloseBookModal = useCallback(() => {
    setIsBookModalOpen(false)
    setBookModalSpecialty(undefined)
    setBookModalDoctor(undefined)
  }, [])

  const handleConfirmBookAppointment = useCallback(
    async (input: BookAppointmentInput) => {
      try {
        const { appointment: newApt } = await appointmentService.bookAppointment(input)
        setAppointments((prev) => [newApt, ...prev])
        setIsBookModalOpen(false)
        setActiveSection("turnos")
        setActiveTab("upcoming")
        showToast(
          "Turno Agendado con Éxito",
          `Cita médica confirmada con ${newApt.doctorName} para ${newApt.displayDate} a las ${newApt.displayTime}.`,
          "event_available",
          "success"
        )
      } catch {
        showToast("Error", "No se pudo agendar el turno", "error", "error")
      }
    },
    [showToast]
  )

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
    isBookModalOpen,
    bookModalSpecialty,
    bookModalDoctor,
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
    openBookModal: handleOpenBookModal,
    closeBookModal: handleCloseBookModal,
    confirmBookAppointment: handleConfirmBookAppointment,
    dismissToast,
    showToast,
  }
}
