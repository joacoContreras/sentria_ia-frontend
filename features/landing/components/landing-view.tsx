import { LandingHero } from "./landing-hero"
import { LandingHowItWorks } from "./landing-how-it-works"
import { LandingPillars } from "./landing-pillars"
import { LandingCta } from "./landing-cta"
import { LandingQuickNav } from "./landing-quick-nav"

export function LandingView() {
  return (
    <div className="flex flex-col w-full">
      <LandingHero />
      <LandingHowItWorks />
      <LandingPillars />
      <LandingCta />
      <LandingQuickNav />
    </div>
  )
}
