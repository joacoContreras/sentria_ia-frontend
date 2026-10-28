"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Activity, BarChart3, Bot, Building2, CreditCard, LogOut, RotateCcw, ShieldAlert, ShieldCheck, Stethoscope, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/hooks/use-auth"
import type { Coverage, Doctor, Specialty } from "@/types/admin"
import { CATALOG_UPDATE_EVENT, catalogService } from "../services/catalog.service"
import { AiIntegrationPanel } from "./ai-integration-panel"
import { AnalyticsDashboard } from "./analytics-dashboard"
import { AppointmentsCalendar } from "./appointments-calendar"
import { CoveragesTable } from "./coverages-table"
import { DoctorsTable } from "./doctors-table"
import { SpecialtiesTable } from "./specialties-table"

export type AdminSection = "operaciones" | "gestion"

type AdminDashboardProps = { section: AdminSection }

const operationItems = [
  { href: "/admin/operaciones", label: "Agenda de turnos", icon: Activity },
  { href: "/admin/operaciones/analiticas", label: "Analíticas", icon: BarChart3 },
]

const managementItems = [
  { id: "specialties", label: "Especialidades médicas", icon: Stethoscope },
  { id: "doctors", label: "Profesionales médicos", icon: Users },
  { id: "coverages", label: "Obras sociales", icon: CreditCard },
  { id: "ai", label: "Asistente e integración IA", icon: Bot },
]

export function AdminDashboard({ section }: AdminDashboardProps) {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, isHydrated, logout } = useAuth()
  const [managementTab, setManagementTab] = useState("specialties")
  const [specialties, setSpecialties] = useState<Specialty[]>(() => catalogService.getSpecialties())
  const [doctors, setDoctors] = useState<Doctor[]>(() => catalogService.getDoctors())
  const [coverages, setCoverages] = useState<Coverage[]>(() => catalogService.getCoverages())
  const [showResetConfirm, setShowResetConfirm] = useState(false)

  const refreshData = useCallback(() => {
    setSpecialties(catalogService.getSpecialties())
    setDoctors(catalogService.getDoctors())
    setCoverages(catalogService.getCoverages())
  }, [])

  useEffect(() => {
    const handleUpdate = () => refreshData()
    window.addEventListener(CATALOG_UPDATE_EVENT, handleUpdate)
    window.addEventListener("storage", handleUpdate)
    return () => {
      window.removeEventListener(CATALOG_UPDATE_EVENT, handleUpdate)
      window.removeEventListener("storage", handleUpdate)
    }
  }, [refreshData])

  if (!isHydrated || isLoading) return <div className="flex min-h-screen items-center justify-center bg-background"><Activity className="size-8 animate-spin text-primary" /></div>

  if (!isAuthenticated || !user) return <AccessCard title="Acceso a la administración" description="Iniciá sesión con una cuenta institucional para acceder al panel de administrador." action="Iniciar sesión" onClick={() => router.push("/acceso")} />
  if (user.role !== "admin") return <AccessCard title="Acceso restringido" description="Esta sección es exclusiva para la administración del centro médico." action="Ir a mi portal" onClick={() => router.push("/portal")} restricted />

  const handleLogout = () => { logout(); router.push("/acceso") }
  const handleReset = () => { catalogService.resetToDefaults(); refreshData(); setShowResetConfirm(false) }

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="sticky top-0 z-30 border-b border-outline-variant/50 bg-surface-container-lowest/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3"><div className="flex size-9 items-center justify-center rounded-xl bg-primary text-on-primary"><Activity className="size-5" /></div><div><div className="flex items-center gap-2"><span className="font-bold tracking-tight text-on-surface">Sentria <span className="text-primary">AI</span></span><span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">Administrador</span></div><span className="hidden text-[11px] text-on-surface-variant sm:block">Centro de Inteligencia Operativa</span></div></div>
          <div className="flex items-center gap-3"><button type="button" onClick={() => setShowResetConfirm(true)} className="hidden items-center gap-1.5 rounded-xl border border-outline-variant/60 px-3 py-1.5 text-xs font-medium text-on-surface-variant hover:bg-surface-container-low md:inline-flex"><RotateCcw className="size-3.5" />Restablecer datos demo</button><div className="hidden h-5 w-px bg-outline-variant sm:block" /><div className="flex items-center gap-2"><div className="flex size-8 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary"><ShieldCheck className="size-4" /></div><div className="hidden lg:block"><p className="text-xs font-semibold text-on-surface">{user.fullName || "Administrador"}</p><p className="max-w-[160px] truncate text-[11px] text-on-surface-variant">{user.email}</p></div><button type="button" onClick={handleLogout} className="rounded-xl px-2.5 py-1.5 text-xs font-medium text-on-surface-variant hover:bg-error/10 hover:text-error"><LogOut className="inline size-4 sm:mr-1" /><span className="hidden sm:inline">Salir</span></button></div></div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pt-8 sm:px-6 lg:px-8">
        <div><p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">Control institucional</p><h1 className="font-headline-lg text-on-surface">Panel de administrador</h1><p className="mt-1 max-w-2xl text-sm leading-6 text-on-surface-variant">Gestioná la operación diaria y los catálogos que sostienen la atención del centro médico.</p></div>
        <nav aria-label="Secciones de administración" className="grid gap-3 rounded-2xl border border-outline-variant/50 bg-surface-container-low p-2 sm:grid-cols-2"><NavCard active={section === "operaciones"} href="/admin/operaciones" icon={Activity} title="Operaciones" description="Agenda y rendimiento de turnos" /><NavCard active={section === "gestion"} href="/admin/gestion" icon={Building2} title="Gestión institucional" description="Catálogos, coberturas e IA" /></nav>

        {section === "operaciones" ? <OperationsSection doctors={doctors} specialties={specialties} /> : <ManagementSection activeTab={managementTab} setActiveTab={setManagementTab} specialties={specialties} doctors={doctors} coverages={coverages} refreshData={refreshData} />}
      </main>

      {showResetConfirm && <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"><div className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-6 shadow-2xl"><h2 className="font-headline-md text-on-surface">¿Restablecer datos demo?</h2><p className="mt-2 text-sm text-on-surface-variant">Se reemplazarán los cambios locales de especialidades, profesionales y coberturas.</p><div className="mt-6 flex justify-end gap-3"><Button variant="danger" onClick={() => setShowResetConfirm(false)}>Cancelar</Button><Button onClick={handleReset}>Restablecer</Button></div></div></div>}
    </div>
  )
}

function OperationsSection({ doctors, specialties }: { doctors: Doctor[]; specialties: Specialty[] }) {
  const isAnalytics = typeof window !== "undefined" && window.location.pathname.includes("analiticas")
  return <section className="flex flex-col gap-5"><div className="flex flex-wrap gap-2 border-b border-outline-variant/50 pb-2">{operationItems.map((item) => <a key={item.href} href={item.href} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${((isAnalytics && item.href.includes("analiticas")) || (!isAnalytics && item.href.endsWith("operaciones"))) ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}><item.icon className="size-4" />{item.label}</a>)}</div>{isAnalytics ? <AnalyticsDashboard doctors={doctors} specialties={specialties} /> : <AppointmentsCalendar doctors={doctors} />}</section>
}

function ManagementSection({ activeTab, setActiveTab, specialties, doctors, coverages, refreshData }: { activeTab: string; setActiveTab: (tab: string) => void; specialties: Specialty[]; doctors: Doctor[]; coverages: Coverage[]; refreshData: () => void }) {
  return <section className="flex flex-col gap-5"><div className="flex flex-wrap gap-2 border-b border-outline-variant/50 pb-2">{managementItems.map((item) => <button type="button" key={item.id} onClick={() => setActiveTab(item.id)} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${activeTab === item.id ? "bg-primary text-on-primary" : "text-on-surface-variant hover:bg-surface-container-low"}`}><item.icon className="size-4" />{item.label}</button>)}</div>{activeTab === "specialties" && <SpecialtiesTable specialties={specialties} doctors={doctors} onRefresh={refreshData} />}{activeTab === "doctors" && <DoctorsTable doctors={doctors} specialties={specialties} coverages={coverages} onRefresh={refreshData} />}{activeTab === "coverages" && <CoveragesTable coverages={coverages} specialties={specialties} doctors={doctors} onRefresh={refreshData} />}{activeTab === "ai" && <AiIntegrationPanel specialties={specialties} doctors={doctors} coverages={coverages} />}</section>
}

function NavCard({ active, href, icon: Icon, title, description }: { active: boolean; href: string; icon: typeof Activity; title: string; description: string }) { return <a href={href} className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${active ? "bg-surface-container-lowest shadow-sm ring-1 ring-primary/20" : "hover:bg-surface-container-lowest/70"}`}><span className={`flex size-10 items-center justify-center rounded-xl ${active ? "bg-primary text-on-primary" : "bg-primary/10 text-primary"}`}><Icon className="size-5" /></span><span><span className="block text-sm font-bold text-on-surface">{title}</span><span className="block text-xs text-on-surface-variant">{description}</span></span></a> }

function AccessCard({ title, description, action, onClick, restricted = false }: { title: string; description: string; action: string; onClick: () => void; restricted?: boolean }) { return <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="w-full max-w-md rounded-2xl border border-outline-variant/60 bg-surface-container-lowest p-8 text-center shadow-md"><div className={`mx-auto flex size-14 items-center justify-center rounded-2xl ${restricted ? "border border-amber-200 bg-amber-50 text-amber-700" : "bg-primary/10 text-primary"}`}><ShieldAlert className="size-7" /></div><h2 className="mt-4 font-headline-md text-on-surface">{title}</h2><p className="mt-2 text-sm leading-relaxed text-on-surface-variant">{description}</p><Button onClick={onClick} className="mt-6 w-full">{action}</Button></div></div> }
