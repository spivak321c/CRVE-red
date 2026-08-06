---
name: CRVE Creative Agency
description: Independent AI product & brand studio — dark, glassy, coral-accented agency site.
colors:
  ember: "#FF6B50"
  ember-deep: "#E55A40"
  ember-light: "#FF8F70"
  void: "#050505"
  surface-0: "#0a0a0a"
  surface-1: "#0f0f0f"
  surface-2: "#111111"
  surface-3: "#1a1a1a"
  surface-input: "#181818"
  glass-nav: "rgba(17, 17, 17, 0.85)"
  border-faint: "rgba(255, 255, 255, 0.08)"
  border-line: "rgba(255, 255, 255, 0.12)"
  border-strong: "#333333"
  text-white: "#ffffff"
  text-body: "#ebebeb"
  text-muted: "#a3a3a3"
  text-dim: "#888888"
  text-faint: "#555555"
  emerald-positive: "#34d399"
typography:
  display:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(4rem, 14vw, 16rem)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: "-0.01em"
  label:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.625rem"
    fontWeight: 700
    letterSpacing: "0.3em"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "7rem"
components:
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "#000000"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  button-primary-hover:
    backgroundColor: "{colors.text-white}"
    textColor: "#000000"
  button-ghost:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.text-white}"
    rounded: "{rounded.md}"
    padding: "16px 32px"
  nav-button:
    backgroundColor: "{colors.surface-3}"
    textColor: "{colors.text-white}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  input-field:
    backgroundColor: "{colors.surface-input}"
    textColor: "{colors.text-white}"
    rounded: "{rounded.md}"
    padding: "12px 16px"
  card-surface:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.text-white}"
    rounded: "{rounded.lg}"
  pill-badge:
    backgroundColor: "rgba(255, 255, 255, 0.05)"
    textColor: "{colors.text-muted}"
    rounded: "{rounded.full}"
    padding: "4px 16px"
---

# Design System: CRVE Creative Agency

## Overview

**Creative North Star: "The Midnight Atelier"**

CRVE presents itself as a dark room where premium craft happens: a near-black void (`#050505`) that never competes with the work, one ember-coral accent that reads as heat against the dark, and surfaces built by stacking slightly lighter blacks rather than by lighting. The atmosphere is studio-floor quiet, engineered — the browser-mockup showcase, the live scope estimator, and the mono metadata running throughout signal that this is a shop that builds, not just decorates.

The voice pairs enormous, tight-tracked sans-serif statements (the hero "design" word at up to 10rem) with tiny uppercase monospace annotations, so every section has two registers: the confident claim and the precise spec. Density is editorial — generous `py-28`/`py-32` section rhythm, hairline borders doing the separation work, and hover states that invert to white to reward exploration.

**Key Characteristics:**
- Dark-only; void black backgrounds with stepped surface blacks (`#0a0a0a` → `#1a1a1a`)
- Single saturated accent: ember coral `#FF6B50`, with hover inversion to white/black
- Glass blur reserved for floating chrome (nav, dock) and overlays only
- Mono uppercase microcopy for all metadata; huge tight-tracked sans for claims
- 1px hairline borders (white 8–15% opacity) on every raised surface
- Interactive-everywhere: estimator, tabbed mockups, click-to-open modals

## Colors

The palette is a grayscale ladder over a void base with a single ember accent. Neutrality is the discipline; warmth is the exception.

### Primary
- **Ember** (#FF6B50): The only saturated hue in the system. Used for CTAs, the hero word's "/" glyph, active states, section eyebrows, selection, scrollbar hover, and small icon moments. It is heat, not decoration — see the Ember Rule.

### Neutral
- **Void** (#050505): Page background, modal overlay base, footer base. The default state of the whole experience.
- **Surface 0** (#0a0a0a): Deepest nested interior — browser mockup content pane.
- **Surface 1** (#0f0f0f): Modal/overlay containers.
- **Surface 2** (#111111): Standard cards (benefit cards, service cards, journal rows, gallery image matte).
- **Surface 3** (#1a1a1a): Raised chips, segmented controls, the nav "Get Started" button.
- **Surface Input** (#181818): Form fields.
- **Text White** (#ffffff): Headings, primary claims, the logo "C." block.
- **Text Body** (#ebebeb): Default body text on void.
- **Text Muted** (#a3a3a3): Secondary copy, nav links at rest, placeholder-adjacent prose (neutral-400).
- **Text Dim** (#888888): Tertiary metadata, category labels, email sub-copy.
- **Text Faint** (#555555): Footer legal bar, index numerals, disabled-feeling text.
- **Border Strong** (#333333): Icon buttons, dock divider, nav button border.
- **Glass Nav** (rgba(17,17,17,0.85)): Scrolled nav and floating dock fill.

### Named Rules
**The Ember Rule.** `#FF6B50` is the only saturated hue on the page outside demo mockups. It appears on ≤10% of any given viewport; its rarity is the point. Wherever it is not doing work, the page is monochrome.

**The Hover Inversion Rule.** Interactive ember surfaces invert to white with black text on hover (`hover:bg-white hover:text-black`). Neutral surfaces lift exactly one step up the surface ladder. The inversion is the affordance.

## Typography

**Display Font:** Inter (via `next/font`, with system fallback) — variable weight, `font-feature-settings: "cv02", "cv03", "cv04", "cv11"`
**Body Font:** Inter
**Label/Mono Font:** system monospace stack (`ui-monospace, SFMono-Regular, Menlo, monospace`)

**Character:** A two-register voice — monumental, tightly tracked sans-serif for statements and claims; small, uppercase, wide-tracked monospace for everything factual. The pairing implies an engineered studio: big ideas, precise specs.

### Hierarchy
- **Display** (900, `clamp(4rem, 14vw, 16rem)`, 0.88 lh, -0.05em ls): Reserved for the hero word and the footer "LET'S TALK." — one word per page, never more.
- **Headline** (800, `clamp(1.875rem, 5vw, 4.5rem)`, 1.08 lh, -0.025em ls): Section headers ("Clean, scalable design…", "Case Studies", "End-to-end design & engineering execution.").
- **Title** (700, 1.5rem, 1.2 lh, -0.02em ls): Card titles, project names, modal headings (up to `text-6xl` font-black in project modals).
- **Body** (300–400, 0.875–1rem, 1.6 lh, -0.01em ls): Descriptions, summaries; max width ~`max-w-xl`–`max-w-2xl` (65–75ch).
- **Label** (700, 0.625–0.75rem, 0.2–0.4em ls, uppercase): All eyebrows, section tags, category chips, dates, read-times, metrics, form labels, footer legal. This is the "spec" register of the system.

### Named Rules
**The Monospace Truth Rule.** Any text in mono, uppercase, and wide tracking is data — metadata, metrics, labels, eyebrows. Any text in sans is voice. Never style a claim in mono, and never style a datapoint in sans.

**The One Word Rule.** The display register is exactly one word per surface: "design" in the hero, "TALK." in the footer. Display type does not run sentences.

## Layout

A single centered column (`max-w-7xl`, `px-6` → `md:px-12`) with sections stacked vertically, separated by 1px `border-t border-white/10` hairlines rather than whitespace alone. Sections breathe at `py-28`–`py-32`. Two-column grids (`gap-8`) dominate mid-page content: benefit cards, service cards, and the gallery (`gap-x-16 gap-y-24`). The gallery is deliberately staggered — odd-index items drop `md:mt-24` to create editorial rhythm. Headers within sections use a justified pair (title block left, mono annotation right) with a bottom border, echoing print editorial layout. The hero is fully centered: badge → display word → subline → CTAs → bottom strip (avatars left, email right).

## Elevation & Depth

The system is tonal, not shadowed. Depth is conveyed by stacking slightly lighter blacks (`surface-2` on `void`, `surface-1` on the overlay), never by lifting cards with shadows. Glass blur (`backdrop-blur-md`/`xl`, 12–16px) exists only on floating chrome — the scrolled nav, the floating dock — and on overlay backdrops (`bg-black/90 backdrop-blur-xl`), where it signals "interface above the page."

### Shadow Vocabulary
- **CTA glow** (`shadow-xl`, hover `shadow-[#FF6B50]/20`): Only on primary buttons, as a resting presence that gains an ember halo on hover.
- **Modal lift** (`shadow-2xl`): Only on modal containers and the browser-mockup card, to separate them from the overlay.

### Named Rules
**The Flat-By-Default Rule.** Cards and surfaces are flat at rest. A shadow is a state response (primary CTA) or a container elevation (modal), never a card treatment.

**The Tonal Ladder Rule.** A surface may only step one rung at a time (`#111` on `#050505`, `#0f0f0f` on the overlay). Never jump more than one step for layering; the ladder reads depth.

## Shapes

The form language is a soft radius ladder over hard edges. Buttons and inputs use `rounded-xl` (12px), standard cards `rounded-2xl` (16px), hero containers and modals `rounded-3xl` (24px), the flagship benefit cards `rounded-[2.5rem]` (40px), and everything pill-like — badges, avatars, social buttons, metric chips — `rounded-full`. Every raised shape carries a 1px hairline border: white at 8% (`border-faint`) on cards, 12–15% (`border-line`) on nav, modals, and badges, and solid `#333333` on neutral icon buttons. Corners never mix radii within a component.

## Components

### Buttons
- **Shape:** `rounded-xl` (12px), uppercase `text-xs`, `tracking-wider`, `font-extrabold` — a capsule of engineered confidence.
- **Primary:** Ember fill (#FF6B50) with black text, `px-8 py-4`, `shadow-xl`; hover inverts to white/black (`button-primary-hover`), 300ms all-props transition. Used once per viewport: hero, estimator, modal, dock, mobile drawer.
- **Secondary / Ghost:** `bg-white/5` fill, white text, `border border-white/15`; hover lifts to `bg-white/10`. Paired with primary CTAs ("Explore Projects").
- **Nav button:** `#1a1a1a` fill with `#333333` border; hover inverts to white/black. Arrow icon nudges up-right on hover (`translate-x-0.5 -translate-y-0.5`).

### Pills & Badges
- **Style:** `rounded-full`, `bg-white/5`, 1px `border-white/10`, mono uppercase microcopy; some with a pulsing ember dot (`w-2 h-2 bg-[#FF6B50] animate-pulse`) as a "live" signal.
- **State:** Metric chips invert to solid black with ember text on the active estimator scope option; category eyebrows are ember text, no fill.

### Cards / Containers
- **Corner Style:** `rounded-2xl` (16px) standard; `rounded-[2.5rem]` (40px) for the two flagship benefit cards; `rounded-3xl` (24px) for estimator and modal containers.
- **Background:** Surface 2 (`#111111`), or gradient variants for showcase pieces (benefits mockup card, estimator box).
- **Shadow Strategy:** None at rest — see the Flat-By-Default Rule. Hover raises the border one step (`hover:border-white/20`, or ember at 50% on service cards).
- **Border:** 1px `border-faint` (white 8%).
- **Internal Padding:** `p-8` → `p-12` for flagship cards; `p-8` standard.

### Inputs / Fields
- **Style:** `bg-[#181818]`, 1px `border-white/10`, `rounded-xl` (12px), `px-4 py-3`, mono uppercase labels above (`text-[10px] tracking-widest`).
- **Focus:** Border shifts to ember (`focus:border-[#FF6B50]`), 150ms color transition. No glow, no ring.
- **States:** Placeholder `placeholder-neutral-600`; no error states currently implemented (observed gap).

### Navigation
- Fixed header: transparent at rest, becomes `bg-[#080808]/90 backdrop-blur-md border-b border-white/10` after 20px scroll. Logo is a white "C." square (`rounded-lg`) that rotates 12° and fills ember on hover, with "CRVE." wordmark.
- Desktop links: `text-neutral-400 hover:text-white` with an ember underline that sweeps in (`w-0 group-hover:w-full`, 300ms).
- Mobile: full-screen drawer `bg-[#050505]/98 backdrop-blur-2xl`, staggered link entrance (50ms delay steps), large `text-3xl` bold links with hairline dividers, ember "Menu Navigation" eyebrow, and a full-width ember CTA at the bottom.

### Floating Dock (signature)
A glass capsule (`glass-nav` fill, `rounded-2xl`, `shadow-2xl`, 1px `border-white/10`) fixed at `bottom-8` center on desktop. Icon buttons (`p-3 hover:bg-[#222222] rounded-xl`, icons scale 110% on hover) with an ember "Contact" CTA appended on the right, separated by a `#333333` divider. Hovering an icon raises a mono uppercase tooltip above it (`bg-black/95 border-white/15`).

### Modals (signature)
All modals share one skeleton: fixed inset overlay `bg-black/90 backdrop-blur-xl`, container `bg-[#0f0f0f] border-white/15 rounded-3xl shadow-2xl`, entrance `scale 0.95 → 1` + `y 20 → 0` (framer-motion, 200ms), close button `bg-white/10 rounded-full` top-right. Ember mono eyebrow above the heading ("Start A Collaboration", "Selected Work · 2026"). Used for: project case studies, journal reader, contact form, policy dialogs.

## Do's and Don'ts

### Do:
- **Do** use ember sparingly and with purpose — one primary CTA per viewport, one ember eyebrow per section.
- **Do** step surfaces exactly one rung up the tonal ladder for layering.
- **Do** use the mono uppercase register for every datapoint and label, and only for those.
- **Do** invert interactive elements to white/black on hover — that inversion is the primary affordance language.
- **Do** cap the display register at one monumental word per surface.
- **Do** put 1px hairline borders (white 8–15%) on all raised shapes.

### Don't:
- **Don't** add a second saturated hue to the system (outside demo mockups like the indigo/emerald showcase card).
- **Don't** give cards shadows at rest — depth is tonal, shadows are state.
- **Don't** use display type for sentences or paragraph-length claims.
- **Don't** style claims in monospace, or datapoints in sans-serif.
- **Don't** mix corner radii within a single component.
- **Don't** introduce light-mode surfaces into this dark-only world.
