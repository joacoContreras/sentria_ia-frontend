import { SiteHeader } from "@/components/sentria/site-header"
import { ValuePanel } from "@/components/sentria/value-panel"
import { RegistrationCard } from "@/components/sentria/registration-card"
import { SiteFooter } from "@/components/sentria/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <div className="max-w-container-max mx-auto w-full px-gutter-mobile lg:px-gutter-desktop py-space-xl lg:py-space-2xl">
          <div className="grid grid-cols-1 items-start gap-space-xl lg:grid-cols-12 lg:gap-space-2xl">
            <ValuePanel />
            <RegistrationCard />
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
