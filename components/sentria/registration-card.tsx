"use client"

import { useMemo, useState } from "react"
import {
  LogIn,
  UserPlus,
  IdCard,
  Lock,
  Mail,
  KeyRound,
  ShieldPlus,
  ChevronDown,
  Info,
  CheckCircle2,
  Shield,
  Eye,
  EyeOff,
} from "lucide-react"

const inputClass =
  "w-full h-12 rounded-xl bg-surface-container-lowest text-body-md text-on-surface placeholder:text-outline shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"

function passwordScore(value: string) {
  let score = 0
  if (value.length >= 8) score++
  if (/[A-Z]/.test(value)) score++
  if (/[0-9]/.test(value)) score++
  if (/[^A-Za-z0-9]/.test(value)) score++
  return score
}

export function RegistrationCard() {
  const [tab, setTab] = useState<"login" | "register">("register")
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState("SaludSegura2024!")

  const score = useMemo(() => passwordScore(password), [password])

  return (
    <div className="lg:col-span-7">
      <div className="flex flex-col gap-space-lg rounded-2xl bg-surface-container-lowest p-space-lg lg:p-space-xl shadow-xl">
        {/* Tab switch */}
        <div className="flex w-full rounded-xl bg-surface-container-low p-1">
          {(
            [
              { id: "login", label: "Iniciar Sesión", icon: LogIn },
              { id: "register", label: "Registrarse", icon: UserPlus },
            ] as const
          ).map(({ id, label, icon: Icon }) => {
            const active = tab === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTab(id)}
                aria-pressed={active}
                className={`flex flex-1 items-center justify-center gap-space-xs rounded-lg py-space-xs text-label-lg transition-all ${
                  active
                    ? "bg-primary text-on-primary shadow-sm"
                    : "text-secondary hover:text-on-surface"
                }`}
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                {label}
              </button>
            )
          })}
        </div>

        {/* Header */}
        <div className="flex flex-col gap-space-2xs">
          <span className="text-label-sm uppercase text-primary">
            Registro de Paciente (RF-01)
          </span>
          <h2 className="text-headline-md text-on-surface">
            Crear Ficha de Paciente
          </h2>
          <p className="text-body-md text-secondary">
            Complete sus datos para vincular su historia clínica y validar su
            cobertura médica institucional.
          </p>
        </div>

        <form
          className="flex flex-col gap-space-lg"
          onSubmit={(e) => e.preventDefault()}
        >
          {/* Section 1: Personal data */}
          <fieldset className="flex flex-col gap-space-md rounded-xl bg-surface-container-low/40 p-space-md">
            <legend className="mb-space-2xs flex items-center gap-space-xs">
              <IdCard className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-headline-sm text-on-surface">
                1. Datos Personales
              </span>
            </legend>

            <div className="flex flex-col gap-space-2xs">
              <label
                className="text-label-md text-on-surface"
                htmlFor="full-name"
              >
                Nombre y Apellido completo <span className="text-error">*</span>
              </label>
              <input
                id="full-name"
                type="text"
                required
                placeholder="ej. María Florencia Gómez"
                className={`${inputClass} px-space-md`}
              />
            </div>

            <div className="grid grid-cols-1 gap-space-md sm:grid-cols-12">
              <div className="flex flex-col gap-space-2xs sm:col-span-7">
                <label
                  className="text-label-md text-on-surface"
                  htmlFor="doc-number"
                >
                  Tipo y Nº de Documento <span className="text-error">*</span>
                </label>
                <div className="flex gap-space-xs">
                  <select
                    id="doc-type"
                    className="h-12 shrink-0 rounded-xl bg-surface-container-lowest px-space-sm text-label-md text-on-surface shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="DNI">DNI</option>
                    <option value="LC">LC</option>
                    <option value="LE">LE</option>
                    <option value="PAS">Pasaporte</option>
                  </select>
                  <input
                    id="doc-number"
                    type="text"
                    required
                    maxLength={11}
                    placeholder="38.452.901"
                    className={`${inputClass} px-space-md`}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-space-2xs sm:col-span-5">
                <label
                  className="text-label-md text-on-surface"
                  htmlFor="phone-mobile"
                >
                  Teléfono Móvil <span className="text-error">*</span>
                </label>
                <input
                  id="phone-mobile"
                  type="tel"
                  required
                  placeholder="+54 9 11 4821 0000"
                  className={`${inputClass} px-space-md`}
                />
                <span className="text-label-sm text-secondary">
                  Para confirmación vía WhatsApp
                </span>
              </div>
            </div>
          </fieldset>

          {/* Section 2: Credentials */}
          <fieldset className="flex flex-col gap-space-md rounded-xl bg-surface-container-low/40 p-space-md">
            <legend className="mb-space-2xs flex items-center gap-space-xs">
              <Lock className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-headline-sm text-on-surface">
                2. Credenciales de Acceso
              </span>
            </legend>

            <div className="flex flex-col gap-space-2xs">
              <label
                className="text-label-md text-on-surface"
                htmlFor="email-address"
              >
                Correo Electrónico <span className="text-error">*</span>
              </label>
              <div className="relative flex items-center">
                <Mail
                  className="pointer-events-none absolute left-space-md h-5 w-5 text-outline"
                  aria-hidden="true"
                />
                <input
                  id="email-address"
                  type="email"
                  required
                  placeholder="paciente@email.com"
                  className={`${inputClass} pl-12 pr-space-md`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-space-2xs">
              <div className="flex items-center justify-between">
                <label
                  className="text-label-md text-on-surface"
                  htmlFor="password-field"
                >
                  Contraseña <span className="text-error">*</span>
                </label>
                <span className="text-label-sm text-primary">
                  Segura: 8+ caracteres, mayúscula y número
                </span>
              </div>
              <div className="relative flex items-center">
                <KeyRound
                  className="pointer-events-none absolute left-space-md h-5 w-5 text-outline"
                  aria-hidden="true"
                />
                <input
                  id="password-field"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className={`${inputClass} pl-12 pr-12`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={
                    showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                  }
                  className="absolute right-space-md text-secondary hover:text-on-surface focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
              <div className="mt-space-2xs grid grid-cols-4 gap-space-2xs">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full ${
                      i < score ? "bg-primary" : "bg-surface-container-highest"
                    }`}
                  />
                ))}
              </div>
            </div>
          </fieldset>

          {/* Section 3: Coverage */}
          <fieldset className="flex flex-col gap-space-md rounded-xl bg-surface-container-low/40 p-space-md">
            <legend className="mb-space-2xs flex items-center gap-space-xs">
              <ShieldPlus className="h-5 w-5 text-primary" aria-hidden="true" />
              <span className="text-headline-sm text-on-surface">
                3. Cobertura Sanitaria
              </span>
            </legend>

            <div className="grid grid-cols-1 gap-space-md sm:grid-cols-12">
              <div className="flex flex-col gap-space-2xs sm:col-span-6">
                <label
                  className="text-label-md text-on-surface"
                  htmlFor="coverage-provider"
                >
                  Obra Social o Prepaga <span className="text-error">*</span>
                </label>
                <div className="relative">
                  <select
                    id="coverage-provider"
                    required
                    defaultValue=""
                    className={`${inputClass} cursor-pointer appearance-none px-space-md`}
                  >
                    <option value="" disabled>
                      Seleccione entidad...
                    </option>
                    <option value="OSDE">OSDE</option>
                    <option value="Swiss Medical">Swiss Medical</option>
                    <option value="Galeno">Galeno</option>
                    <option value="Medife">Medifé</option>
                    <option value="Omint">Omint</option>
                    <option value="Particular">
                      Particular / Sin Cobertura
                    </option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-space-md top-1/2 h-5 w-5 -translate-y-1/2 text-secondary"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-space-2xs sm:col-span-6">
                <div className="flex items-center justify-between">
                  <label
                    className="text-label-md text-on-surface"
                    htmlFor="member-id"
                  >
                    Nº Afiliado / Credencial{" "}
                    <span className="text-error">*</span>
                  </label>
                  <div className="group relative flex cursor-pointer items-center">
                    <Info
                      className="h-4 w-4 text-secondary hover:text-primary"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-full right-0 z-20 mb-2 hidden w-64 rounded-lg bg-inverse-surface p-space-xs text-label-sm text-inverse-on-surface shadow-xl group-hover:block">
                      Ubicado al frente de su credencial plástica o digital
                      (generalmente de 10 a 16 dígitos).
                    </div>
                  </div>
                </div>
                <input
                  id="member-id"
                  type="text"
                  required
                  placeholder="02-12345678-01"
                  className={`${inputClass} px-space-md`}
                />
              </div>
            </div>

            <div className="flex items-start gap-space-xs rounded-xl bg-primary-fixed/30 p-space-sm">
              <CheckCircle2
                className="h-5 w-5 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span className="text-body-md text-on-primary-fixed-variant">
                Tu cobertura se verificará automáticamente al guardar con el
                padrón del financiador. No requiere copias físicas.
              </span>
            </div>
          </fieldset>

          {/* Terms */}
          <div className="flex items-start gap-space-sm pt-space-xs">
            <input
              id="terms-check"
              type="checkbox"
              defaultChecked
              required
              className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded accent-primary"
            />
            <label
              htmlFor="terms-check"
              className="cursor-pointer select-none text-body-md text-on-surface-variant"
            >
              Acepto los{" "}
              <a href="#" className="font-medium text-primary underline">
                Términos de Servicio
              </a>{" "}
              y la{" "}
              <a href="#" className="font-medium text-primary underline">
                Política de Privacidad de Datos Médicos (Ley 25.326)
              </a>{" "}
              para el resguardo de información clínica sensible.
            </label>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-space-sm pt-space-xs">
            <button
              type="submit"
              className="flex h-12 w-full items-center justify-center gap-space-xs rounded-xl bg-primary text-label-lg text-on-primary shadow-md transition-all hover:bg-primary-container active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <Shield className="h-5 w-5" aria-hidden="true" />
              Crear Cuenta
            </button>
            <div className="pt-space-2xs text-center">
              <span className="text-body-md text-secondary">
                ¿Ya tienes cuenta?{" "}
              </span>
              <button
                type="button"
                onClick={() => setTab("login")}
                className="text-label-lg text-primary hover:underline"
              >
                Inicia sesión
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
