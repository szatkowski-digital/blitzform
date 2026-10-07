<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Architecture & Shared Components Context

## Tech Stack & i18n Routing Rules

- **Framework:** Next.js (App Router) + TypeScript
- **Internationalization:** `next-intl`
  - Default locale: `pl` (routes do NOT contain prefix, e.g., `/about`, `/offer`).
  - Secondary locale: `en` (routes contain prefix, e.g., `/en/about`, `/en/offer`).
- **Styling:** Tailwind CSS v4 + Framer Motion.
- **Theme Colors (globals.css `@theme`):**
  - Surface Background: `--color-surface-dark` (`#0D0D0D`)
  - Primary Accent: `--color-primary` (`#CDEB69`)
  - Dark Accent / Hover text: `--color-primary-dark` (`#8AB028`)
  - Text Muted / Dimmed: `--color-text-muted` (`text-zinc-400`), `--color-text-dimmed` (`text-zinc-500`)
  - Borders & Separators: `--color-border-muted` (`border-zinc-800/80`)
  - Inactive Icons: `--color-icon-inactive` (`text-zinc-500`), hover: `--color-icon-hover` (`text-zinc-300`)
- **Typography:** Text inside navigation links/buttons uses uppercase `TextReveal` with smooth stagger animations.

## Directory Structure Strategy

- `@/config/` - Shared global configurations (e.g., `navigation.ts`).
- `@/hooks/` - Reusable app-level hooks (e.g., `useActiveRoute.ts`, `useStickyScroll.ts`).
- `@/components/` - Global layout & shared UI components (`/ui`, `/header`, `/footer`).
- `@/features/` - Feature-based/page-specific components and hooks (e.g., `/features/home`, `/features/about`, `/features/offer`).

## Existing Reusable Components & Modules

### 1. Navigation Config (`@/config/navigation.ts`)

- Exports `NAV_ITEMS` array and TypeScript interfaces (`NavItem`, `SubItem`).
- Routes defined:
  - `/offer` (Sub-items: `/offer/box-systems`, `/offer/container-factories`)
  - `/about`
  - `/contact`

### 2. Custom Hooks (`@/hooks/`)

- `useActiveRoute()`: Normalizes paths by stripping the `/en` locale prefix (since `pl` is the default locale without a prefix, e.g. `/en/about` -> `/about`). Provides helper functions: `isLinkActive(item)` and `isPathActive(href)`.
- `useIsMobile(breakpoint?: number)`: Tracks window viewport width against a breakpoint (default: `1024`px). Returns a `boolean` indicating if the current screen is mobile/tablet.
- `useStickyScroll(sectionPrefix, featuresLength)`: Manages smooth programmatic scrolling, scroll-spy calculations, and mobile accordion toggle states for sticky scroll sections.

### 3. Core UI Components (`@/components/ui/`)

- `Button`: Reusable motion-animated CTA button component with hover/tap wave background pulse (`scaleX: 2`).
  - Props: `children: ReactNode`, `variant?: "primary" | "secondary"` (default: `"primary"`), `className?: string`, `icon?: ReactNode`, plus standard HTML motion button props.
  - Variants:
    - `"primary"`: White background (`bg-white`), dark text (`text-zinc-950`), white border, hover overlay (`bg-zinc-200`).
    - `"secondary"`: Dark background (`bg-zinc-900`), light text (`text-zinc-200`), border (`border-zinc-700/80`), hover overlay (`bg-zinc-800`).
- `TextReveal`: Staggered letter-by-letter vertical reveal animation.
  - Props: `children: string`, `className?: string`, `duration?: number`, `stagger?: number`, `isActive?: boolean`.
  - When `isActive={true}`, text stays revealed in `primary-dark` color (`#8AB028`).
- `Badge`: Reusable tag/badge component with an accent dot.
  - Props: `children: ReactNode`, `variant?: "dark" | "light" | "ghost"` (default: `"dark"`), `className?: string`, `dotClassName?: string`.
  - Variants:
    - `"dark"`: Dark background (`bg-zinc-900`), border, light text (`text-zinc-300`).
    - `"light"`: Light background (`bg-zinc-200/80`), border, dark text (`text-zinc-900`).
    - `"ghost"`: Transparent background, all text in primary accent color (`text-primary`).
- `LanguageSwitcher`: Switches language/locale.

### 4. Feature Components (`@/features/`)

- `StickyScrollFeature`: Minimalist accordion/sticky-scroll feature list with high-contrast text on `#0D0D0D` background, SEO semantics (`<section>`, `<ul>`, `aria-expanded`), separated by subtle bottom borders (`border-b`). Displays title-only in collapsed state, revealing summary, description, and tag upon expansion.

### 5. Header Components (`@/components/header/`)

- `Header.tsx`: Sticky container with background blur on scroll.
- `DesktopNav.tsx`: Desktop navbar with active state tracking and hover dropdown menus.
- `MobileNav.tsx`: Fullscreen mobile navigation overlay using Framer Motion (`y` slide + fade) with nested sub-items.
- `AnimatedLogo.tsx` & `MenuToggle.tsx`.

## Instructions for AI

- Always check `@/components/ui/`, `@/hooks/`, and `@/config/` before writing new code to avoid code duplication.
- Reuse `Button` for all CTA actions, link buttons, and interactive triggers across the app.
- Reuse `useActiveRoute()` when checking current path or active links.
- Reuse `useIsMobile()` when conditional rendering or layout animations depend on viewport width.
- Reuse `useStickyScroll()` for programmatic sticky-scroll mechanics.
- Reuse `TextReveal` for animated text/heading reveals.
- Reuse `Badge` for category tags, section labels, and bulleted tags instead of recreating custom `div` structures.
