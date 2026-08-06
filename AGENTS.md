# AGENTS.md

## Package manager

- **Always use bun** for install, scripts, and any package-related command (`bun install`, `bun run dev`, `bun run build`, `bunx`). Never use npm, yarn, or pnpm.

## Animation & design system demos

- **Always demonstrate animations, motion specs, and design systems visually in the browser FIRST with Lavish before implementing** (`npx -y lavish-axi <file>`): create the artifact under `.lavish/`, open a review session, iterate on user feedback via `npx -y lavish-axi poll`, and only implement in the app after the user approves.
- Demo artifacts must match the CRVE design system (bg `#050505`, accent `#FF6B50`, Anton/Archivo fonts, IBM Plex Mono labels) and must render standalone — load GSAP from CDN with a fallback chain (jsdelivr → unpkg) and never depend on the app's build tooling or assets.
- Keep the approved motion values (durations, easings, offsets, triggers) inside the artifact as explicit spec cards so the implementation can be built directly from them.
