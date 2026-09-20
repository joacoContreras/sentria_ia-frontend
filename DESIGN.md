---
name: Sentriage Clinical
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3d4947'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7a77'
  outline-variant: '#bcc9c6'
  surface-tint: '#006a61'
  primary: '#00685f'
  on-primary: '#ffffff'
  primary-container: '#008378'
  on-primary-container: '#f4fffc'
  inverse-primary: '#6bd8cb'
  secondary: '#565e74'
  on-secondary: '#ffffff'
  secondary-container: '#dae2fd'
  on-secondary-container: '#5c647a'
  tertiary: '#006577'
  on-tertiary: '#ffffff'
  tertiary-container: '#008096'
  on-tertiary-container: '#f9fdff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#89f5e7'
  primary-fixed-dim: '#6bd8cb'
  on-primary-fixed: '#00201d'
  on-primary-fixed-variant: '#005049'
  secondary-fixed: '#dae2fd'
  secondary-fixed-dim: '#bec6e0'
  on-secondary-fixed: '#131b2e'
  on-secondary-fixed-variant: '#3f465c'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 52px
    letterSpacing: -0.025em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-xl:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-lg-medium:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-md-medium:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  vital-metric:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  space-2xs: 0.25rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
  space-2xl: 2.5rem
  space-3xl: 3rem
  space-4xl: 4rem
  gutter-mobile: 1rem
  gutter-desktop: 1.5rem
  container-max: 80rem
---

## Brand & Style

This design system serves a dual-audience mission: reassuring, empowering patients experiencing vulnerable health episodes while providing clinicians with rapid, unambiguous decision support. The design movement marries **Corporate / Modern** clinical precision with humane **Tactile Minimalism**—eschewing cold institutionalism in favor of tranquil confidence, clinical clarity, and high-trust accessibility.

### Personality & Values
- **Sentinel Vigilance:** Methodical, sharp, authoritative without being intimidating.
- **Therapeutic Calm:** Softened backgrounds, breathable whitespace, and balanced contrast eliminate visual fatigue and lower patient anxiety.
- **Diagnostic Precision:** Uncompromising typography metrics, distinct data density tiers, and deterministic alert state semaphores.

### Target Audience & Accessibility
- **Patients & Caregivers:** Diverse physical, cognitive, and language capabilities. Demands AAA compliance targets for core workflows, large hit targets (minimum 48×48px), intuitive multi-step form journeys, and seamless English/Spanish bilingual support.
- **Triage Nurses & Physicians:** Requires immediate scannability, deterministic triage coding (Emergency, Urgent, Routine), and zero-latency visual validation.

## Colors

The palette balances authoritative deep slates with luminous sentinel teals and hyper-differentiated triage semaphores.

### Core Application Roles
- **Primary Sentinel Teal (`#0D9488` / `#14B8A6`):** Drives interactive actions, confirmed active states, key navigation indicators, and primary patient progress tracking.
- **Deep Clinical Slate (`#0F172A` / `#1E293B`):** Acts as the high-contrast structural anchor for headers, primary clinical data, and critical structural navigation.
- **Clinical Ice & Mint Canvas (`#F8FAFC` base with `#F0FDFA` panels):** Replaces harsh standard whites with subdued, calming surfaces that soothe ocular strain during long bedside or night shifts.
- **Triage Alert Spectrum:**
  - **Level 1 Critical/Emergency:** Rose/Coral Red (`#E11D48`) reserved strictly for life-threatening acute warnings.
  - **Level 2 Urgent:** Deep Amber/Orange (`#EA580C`) for rapid-intervention physiological risks.
  - **Level 3 Elevated:** Warm Honey (`#D97706`) for priority monitoring.
  - **Level 4 Routine:** Emerald/Clinical Green (`#059669`) for stable evaluations.

All text combinations against their associated surface tokens exceed WCAG 2.1 AA standards (minimum 4.5:1 for body copy; 7:1 for data readouts).

## Typography

Typography establishes an unwavering hierarchy through two complementary typefaces:

1. **Plus Jakarta Sans (Headings & Metrics):** Provides geometric warmth, contemporary authority, and clear terminal stroke endings that retain legibility across distances and high-stress encounters.
2. **Inter (Interface & Clinical Body):** Serves as the clinical workhorse with tall x-height, distinct character shapes (`I` vs `l` vs `1`), and superior rendering across mobile and desktop displays.

### Bilingual Typesetting Rules
All components accommodate text expansion for Spanish translations (averaging 15–25% longer strings compared to English). Ensure headers and buttons do not truncate; dynamic line wrapping and auto-flowing containers are mandatory. Never rely on capitalized acronyms alone for medical instructions.

## Layout & Spacing

The layout is built on a responsive 8pt geometric grid with fluid column adaptation tailored to bedside tablets, clinical triage workstations, and mobile patient check-in screens.

### Grid & Breakpoints
- **Mobile (`< 640px`):** 4-column layout, 16px margins, 12px gutters. Primary actions pin to a persistent safe-area bottom dock.
- **Tablet / Clinical Cart (`640px - 1024px`):** 8-column layout, 24px margins, 16px gutters. Triage queue and patient summary view sit in split 3:5 panes.
- **Desktop / Workstation (`> 1024px`):** 12-column layout capped at `80rem` (1280px) max content width, 32px margins, 24px gutters. Tri-pane triage layout (Queue, Active Record, Vitals/Timeline Stream).

### Spacing Principles
- Density is contextual: **High density** for clinical tables and timeline trackers (`space-xs` to `space-sm`), and **Low, breathable density** for patient triage questionnaires and intake forms (`space-lg` to `space-2xl`).

## Elevation & Depth

This system avoids heavy drop shadows, opting for **Tactile Tonal Layering** paired with subtle, ambient teal-tinted shadows to evoke pristine cleanliness.

### Depth Hierarchy
1. **Canvas Surface (`Level 0`):** Default background `#F8FAFC`.
2. **Card & Card Tier (`Level 1`):** Solid `#FFFFFF` or `#F0FDFA` bounded by a 1px clinical border (`#E2E8F0` or `#CCFBF1`). Shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
3. **Interactive Hover & Triage Priority (`Level 2`):** Lifted state for interactive symptom cards and urgent rows. Shadow: `0 8px 20px -4px rgba(13, 148, 136, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.03)`.
4. **Modals, Drawers & Critical Alerts (`Level 3`):** Floating clinical decision drawers and emergency confirmation modals. Shadow: `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.06)`. Backdrops employ a calm, frosted slate blur: `background: rgba(15, 23, 42, 0.45); backdrop-filter: blur(8px)`.

## Shapes

The design system standardizes on **Rounded (Level 2)** with strategic scaling:
- **Base Components (Inputs, Buttons, Badges):** `rounded-xl` (12px) to ensure soft, human touchpoints that reduce clinical friction.
- **Containers & Surfaces (Cards, Triage Panels, Modals):** `rounded-2xl` (16px to 20px) to craft friendly visual envelopes.
- **Triage Status Indicators & Avatars:** Full pill (`rounded-full`) for immediate recognition and fluid scanning.

## Components

### Buttons & Interactive Triggers
- **Primary Action (e.g., "Confirm Triage / Confirmar Triaje"):** Background `#0D9488`, text `#FFFFFF`, font `label-lg`, 48px height, 12px border radius. Hover: `#0F766E`. Active: Scale down to 98% with `#134E4A`.
- **Secondary Action (e.g., "Review Vitals / Revisar Signos"):** Background `#F0FDFA`, border 1px solid `#14B8A6`, text `#0F766E`.
- **Critical / Emergency Action:** Background `#E11D48`, text `#FFFFFF`. Never used for generic negative actions; strictly for critical escalations.
- **Focus Ring:** 3px ring with offset: `box-shadow: 0 0 0 2px #FFFFFF, 0 0 0 4px #0D9488`.

### Input Fields & Intake Controls
- Minimum height of 48px with 16px internal padding.
- Rest state: `#FFFFFF` surface with `#CBD5E1` border.
- Active/Focus: `#FFFFFF` surface with `#0D9488` border and light cyan aura (`rgba(13, 148, 136, 0.15)`).
- Error/Validation: `#FFF1F2` surface, `#E11D48` border, icon-backed bilingual helper text below input.

### Triage Chips & Severity Badges
- **Format:** Pill-shaped (`rounded-full`), height 28px, uppercase `label-sm`, displaying paired status icon and text.
- **Emergency (ESI 1):** Solid `#FFE4E6` background, `#9F1239` label, `#E11D48` pulsing ping indicator.
- **Urgent (ESI 2-3):** Solid `#FFEDD5` background, `#9A3412` label.
- **Routine (ESI 4-5):** Solid `#D1FAE5` background, `#065F46` label.

### Cards & Clinical Panels
- Constructed using `rounded-2xl` geometry on pure `#FFFFFF` or `#F0FDFA` surfaces.
- Segmented internal headers with subtle border dividers (`#F1F5F9`).
- Prominent vital sign readouts display metric values using `vital-metric` paired with muted unit subtext (`label-md` in `#64748B`).

### Checkboxes & Radios
- Size: 22×22px hit box with 44×44px interactive tap zone.
- Selected state: `#0D9488` background featuring an optical-centered white checkmark or radio dot.
- Unchecked: 1.5px border `#94A3B8` over `#FFFFFF`.

### Specialized Clinical Additions
- **Symptom Severity Slider:** Dual-color graduated track transitioning from `#14B8A6` to `#EA580C` with prominent numerical step bubbles.
- **Bilingual Toggle Switch:** Accessible compact segment control allowing instantaneous flipping between `EN` and `ES` without loss of input form progress.