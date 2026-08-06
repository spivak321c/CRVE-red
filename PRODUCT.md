# Product

<!-- impeccable:product-schema 1 -->

> Inference note: the init interview was skipped (probe aborted, user instructed to continue). Facts below that are inferred from the repository and site copy rather than confirmed by the owner are explicitly labeled `(inferred)`. Confirm or correct them when convenient.

## Platform

web

## Stack

Existing codebase (not a greenfield decision): Next.js App Router + React 19 + TypeScript, Tailwind CSS v4, framer-motion, lucide-react, gsap, lenis. No backend or database. Source of truth for the visual system is `app/globals.css` plus hardcoded arbitrary-value classes in `components/`; `styles/globals.css` is the unused default shadcn scaffold and should not be treated as normative.

## Users

- Primary (inferred): founders and product leaders at startups who arrive with a build in mind — brand, web product, or AI integration — and need to qualify a studio quickly: capability, pricing, timeline.
- Secondary (inferred): design and engineering leads comparing studios on portfolio and technical depth.

## Product Purpose

CRVE is an independent AI product & brand studio. The website's job is to qualify and convert visitors into booked discovery calls / project inquiries, primarily through the contact modal and `hello@crve.studio`. Success = inquiries from high-fit prospects with a pre-qualified scope.

## Positioning

One in-house team delivers brand systems, product design, full-stack engineering, and AI-native interfaces end-to-end, with transparent instant scope and pricing via an interactive estimator. (Claim derived from site copy: "Independent AI Product & Brand Studio", "End-to-end design & engineering execution". Competitor uniqueness is not independently verified.)

## Operating Context

- Single-page site with anchored sections: hero, benefits, selected work, services + estimator, journal, contact.
- The scope estimator pre-fills the contact modal with a summary string of the selected modules, total estimate, and timeline.
- The contact form is client-side only: submission is simulated with a `setTimeout`; no backend integration exists yet (observed).
- Footer social links point to placeholder URLs (instagram.com, x.com, linkedin.com) (observed).
- Site copy references "Next.js 15" while dependencies resolve to latest / React 19 (observed; treat as aspirational copy, not pinned).

## Capabilities and Constraints

- Sections: Hero, Benefits (interactive browser mockup with tabbed demo panels), Project Gallery (4 case studies with detail modal), Services (4 service cards), Interactive Scope Estimator (6 selectable modules, real-time total + timeline), Journal (3 articles with reader modal), Footer with policy modals, Floating Dock (desktop), Contact Modal with form.
- Dark-only theme; no light mode implemented (`next-themes` installed but unused).
- Portfolio imagery is stock (Unsplash remote URLs); local images in `public/images/` cover backgrounds/team/service visuals.
- Modals are framer-motion overlays with `bg-black/90 backdrop-blur-xl`.
- Smooth scrolling is native (`scroll-smooth`); `lenis` and `gsap` are installed but not wired into the current page.

## Brand Commitments

- Name: CRVE — nav logo "C." + "CRVE.", `metadata.json`, footer "© 2026 CRVE Agency".
- De-facto identity observed in the implementation, not yet owner-confirmed as binding (inferred): coral accent `#FF6B50`, near-black background `#050505`, dark-only glass aesthetic, uppercase mono microcopy voice.

## Evidence on Hand

- `metadata.json`: name + description.
- `public/crve.svg` (logo) and 11 images in `public/images/`.
- Real copy: hero headline "design", benefits metrics (2.4x faster MVP, +184% ARR, 4.8% opt-in), estimator pricing (US$2k–8k modules, 1–4 weeks), 3 journal articles, 4 case-study entries.
- Absences: no verified client case studies, testimonials, or press; portfolio imagery is stock; the form has no backend. Future work must not fabricate verified client results or live testimonials.

## Product Principles

1. **Speed is the promise.** Every surface should communicate velocity — fast MVPs, sub-100ms UI, instant estimates.
2. **Transparency before contact.** Pricing and timeline are shown before any conversation begins.
3. **End-to-end ownership.** One team for strategy, design, engineering, and AI; no handoff story.
4. **Distinct craft over generic SaaS aesthetics.** The dark + coral identity is the differentiation (stated in journal copy: "The Death of Generic SaaS Branding").
5. **Interaction is evidence.** Interactive elements (estimator, tabbed mockup, modals) demonstrate capability rather than claim it.

## Accessibility & Inclusion

No product-specific accessibility requirement established. Observed gaps: reduced-motion preference is not handled for framer-motion entrances; form fields have labels but no error states or `aria-describedby`; some decorative images lack `alt=""` (observed; whether to fix is undecided).
