"use client"

import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Bot,
  CalendarCheck2,
  CalendarDays,
  CircleAlert,
  Clock3,
  Filter,
  Globe2,
  MoveDown,
  Users,
} from "lucide-react"
import { Doctor, Specialty } from "@/types/admin"

type AnalyticsDashboardProps = { doctors: Doctor[]; specialties: Specialty[] }
type Period = "7d" | "month" | "custom"

const channelData = [
  { name: "Bot IA", value: 684, fill: "#22c7b8" },
  { name: "Portal web", value: 428, fill: "#7890d7" },
]

const lifecycleData = [
  { day: "01 Jun", attended: 46, cancelled: 7, absent: 5 },
  { day: "03 Jun", attended: 52, cancelled: 6, absent: 4 },
  { day: "05 Jun", attended: 49, cancelled: 8, absent: 6 },
  { day: "07 Jun", attended: 63, cancelled: 5, absent: 3 },
  { day: "09 Jun", attended: 59, cancelled: 7, absent: 4 },
  { day: "11 Jun", attended: 68, cancelled: 4, absent: 3 },
  { day: "13 Jun", attended: 72, cancelled: 5, absent: 2 },
  { day: "15 Jun", attended: 70, cancelled: 6, absent: 3 },
  { day: "17 Jun", attended: 78, cancelled: 4, absent: 2 },
  { day: "19 Jun", attended: 74, cancelled: 5, absent: 2 },
  { day: "21 Jun", attended: 82, cancelled: 4, absent: 2 },
  { day: "23 Jun", attended: 86, cancelled: 3, absent: 1 },
  { day: "25 Jun", attended: 91, cancelled: 4, absent: 1 },
  { day: "27 Jun", attended: 88, cancelled: 3, absent: 1 },
  { day: "29 Jun", attended: 96, cancelled: 4, absent: 1 },
]

const tooltipStyle = {
  background: "#13243a",
  border: "1px solid #29405b",
  borderRadius: 10,
  color: "#f2f7ff",
  fontSize: 12,
}

export function AnalyticsDashboard({ doctors, specialties }: AnalyticsDashboardProps) {
  const [period, setPeriod] = useState<Period>("month")
  const [specialty, setSpecialty] = useState("Todas las especialidades")
  const [doctor, setDoctor] = useState("Todos los profesionales")
  const totalAppointments = channelData.reduce((sum, item) => sum + item.value, 0)
  const periodLabel = period === "7d" ? "Últimos 7 días" : period === "custom" ? "01 Jun — 30 Jun 2024" : "Junio 2024"
  const activeDoctors = useMemo(() => doctors.filter((item) => item.isActive), [doctors])

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <Activity className="h-3.5 w-3.5" /> Inteligencia operativa
          </p>
          <h1 className="font-headline-lg text-on-surface">Analíticas de turnos</h1>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-on-surface-variant">
            Entendé cómo se comporta la demanda y el impacto del Agente de IA en tu centro médico.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-1.5 shadow-sm">
          {([['7d', '7 días'], ['month', 'Este mes'], ['custom', 'Rango personalizado']] as const).map(([value, label]) => (
            <button key={value} type="button" onClick={() => setPeriod(value)} className={`rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${period === value ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-container-low"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Turnos concretados" value="1.112" detail="de 1.284 solicitados" trend="+12,8%" positive icon={<CalendarCheck2 />} />
        <MetricCard label="Conversión global" value="86,6%" detail="sesiones que reservaron" trend="+4,2%" positive icon={<MoveDown />} />
        <MetricCard label="Autonomía de la IA" value="78,4%" detail="meta institucional > 75%" trend="+6,1%" positive icon={<Bot />} highlight />
        <MetricCard label="Cancelaciones y ausentes" value="7,2%" detail="90 de 1.248 turnos" trend="-25,4%" positive icon={<CircleAlert />} />
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-3 shadow-sm">
        <div className="flex items-center gap-2 pr-2 text-xs font-bold text-on-surface"><Filter className="h-4 w-4 text-primary" /> Filtros</div>
        <select aria-label="Filtrar por especialidad" value={specialty} onChange={(event) => setSpecialty(event.target.value)} className="rounded-xl border border-outline-variant/60 bg-surface-container-low px-3 py-2 text-xs font-medium text-on-surface outline-none focus:border-primary">
          <option>Todas las especialidades</option>{specialties.map((item) => <option key={item.id}>{item.name}</option>)}
        </select>
        <select aria-label="Filtrar por profesional" value={doctor} onChange={(event) => setDoctor(event.target.value)} className="rounded-xl border border-outline-variant/60 bg-surface-container-low px-3 py-2 text-xs font-medium text-on-surface outline-none focus:border-primary">
          <option>Todos los profesionales</option>{activeDoctors.map((item) => <option key={item.id}>{item.fullName}</option>)}
        </select>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-on-surface-variant"><CalendarDays className="h-3.5 w-3.5" /> {periodLabel}</span>
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <article className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4"><div><h2 className="font-headline-sm text-on-surface">Efectividad de los turnos</h2><p className="mt-1 text-xs text-on-surface-variant">Evolución del ciclo de vida · {periodLabel}</p></div><span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-bold text-primary"><ArrowUpRight className="h-3.5 w-3.5" /> Ausentismo -25%</span></div>
          <div className="h-[270px] w-full"><ResponsiveContainer width="100%" height="100%"><AreaChart data={lifecycleData} margin={{ left: -16, right: 4, top: 8, bottom: 0 }}><defs><linearGradient id="attendedFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#22c7b8" stopOpacity={0.28} /><stop offset="100%" stopColor="#22c7b8" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="#29405b" strokeOpacity={0.35} /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#91a2b8", fontSize: 10 }} interval={2} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#91a2b8", fontSize: 10 }} /><Tooltip contentStyle={tooltipStyle} /><Area type="monotone" dataKey="attended" name="Atendidos" stroke="#22c7b8" strokeWidth={2.5} fill="url(#attendedFill)" /><Area type="monotone" dataKey="cancelled" name="Cancelados" stroke="#e9ae56" strokeWidth={2} fill="none" /><Area type="monotone" dataKey="absent" name="Ausentes" stroke="#ef7777" strokeWidth={2} fill="none" /></AreaChart></ResponsiveContainer></div>
          <div className="mt-4 flex flex-wrap gap-5 border-t border-outline-variant/40 pt-4 text-xs text-on-surface-variant"><LegendDot color="bg-primary" label="Atendidos" /><LegendDot color="bg-[#e9ae56]" label="Cancelados" /><LegendDot color="bg-[#ef7777]" label="Ausentes" /></div>
        </article>

        <article className="rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-5 shadow-sm"><div className="mb-1"><h2 className="font-headline-sm text-on-surface">Origen de los turnos</h2><p className="mt-1 text-xs text-on-surface-variant">Volumen por canal de reserva</p></div><div className="relative h-[210px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={channelData} dataKey="value" nameKey="name" innerRadius={63} outerRadius={86} paddingAngle={4} stroke="none">{channelData.map((item) => <Cell key={item.name} fill={item.fill} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart></ResponsiveContainer><div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center"><span className="font-vital-metric text-on-surface">{totalAppointments.toLocaleString("es-AR")}</span><span className="text-[11px] text-on-surface-variant">turnos totales</span></div></div><div className="flex flex-col gap-3 pt-2">{channelData.map((item) => <div key={item.name} className="flex items-center justify-between text-xs"><span className="flex items-center gap-2 text-on-surface-variant"><span className="size-2.5 rounded-full" style={{ backgroundColor: item.fill }} /> {item.name}</span><span className="font-bold text-on-surface">{item.value} <span className="ml-1 font-normal text-on-surface-variant">({Math.round(item.value / totalAppointments * 100)}%)</span></span></div>)}</div></article>
      </div>

      <div className="grid gap-4 lg:grid-cols-3"><InsightCard icon={<Bot />} title="La IA gana autonomía" copy="El Bot completó 3 de cada 4 reservas sin intervención humana." tone="teal" /><InsightCard icon={<Clock3 />} title="Pico de demanda" copy="Los martes entre 9:00 y 11:00 concentran el 18% de las solicitudes." tone="blue" /><InsightCard icon={<Users />} title="Especialidad líder" copy="Clínica Médica registra el mayor volumen de turnos del período." tone="amber" /></div>
    </section>
  )
}

function MetricCard({ label, value, detail, trend, positive, icon, highlight }: { label: string; value: string; detail: string; trend: string; positive: boolean; icon: ReactNode; highlight?: boolean }) {
  return <div className={`rounded-2xl border p-4 shadow-sm ${highlight ? "border-primary/45 bg-primary/[0.06]" : "border-outline-variant/50 bg-surface-container-lowest"}`}><div className="mb-4 flex items-center justify-between"><span className="text-xs font-semibold text-on-surface-variant">{label}</span><span className={`flex size-8 items-center justify-center rounded-xl ${highlight ? "bg-primary text-on-primary" : "bg-surface-container text-primary"}`}>{icon}</span></div><div className="flex items-end justify-between gap-2"><div><div className="font-vital-metric text-on-surface">{value}</div><div className="mt-1 text-[11px] text-on-surface-variant">{detail}</div></div><span className={`flex items-center gap-0.5 rounded-full px-2 py-1 text-[10px] font-bold ${positive ? "bg-primary/10 text-primary" : "bg-error/10 text-error"}`}>{positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}{trend}</span></div></div>
}

function LegendDot({ color, label }: { color: string; label: string }) { return <span className="flex items-center gap-2"><span className={`size-2 rounded-full ${color}`} /> {label}</span> }
function InsightCard({ icon, title, copy, tone }: { icon: ReactNode; title: string; copy: string; tone: "teal" | "blue" | "amber" }) { const tones = { teal: "bg-primary/10 text-primary", blue: "bg-tertiary/10 text-tertiary", amber: "bg-secondary/15 text-secondary" }; return <article className="flex gap-3 rounded-2xl border border-outline-variant/50 bg-surface-container-lowest p-4 shadow-sm"><span className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>{icon}</span><div><h3 className="text-sm font-bold text-on-surface">{title}</h3><p className="mt-1 text-xs leading-5 text-on-surface-variant">{copy}</p></div></article> }
