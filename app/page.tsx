import { SiteHeader } from "@/components/shared/site-header"
import { RegistrationCard } from "@/features/auth/components/registration-card"
import { SiteFooter } from "@/components/shared/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background">
      <SiteHeader />
      <main className="flex-1 flex flex-col items-center justify-center py-space-xl lg:py-space-2xl px-gutter-mobile">
        <div className="w-full max-w-xl mx-auto">
          <RegistrationCard />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
