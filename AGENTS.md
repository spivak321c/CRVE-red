# AGENTS.md

## Package manager

- **Always use bun** for install, scripts, and any package-related command (`bun install`, `bun run dev`, `bun run build`, `bunx`). Never use npm, yarn, or pnpm.

## Animation & design system demos

- **Always demonstrate animations, motion specs, and design systems visually in the browser FIRST with Lavish before implementing** (`npx -y lavish-axi <file>`): create the artifact under `.lavish/`, open a review session, iterate on user feedback via `npx -y lavish-axi poll`, and only implement in the app after the user approves.
- Demo artifacts must match the CRVE design system (bg `#050505`, accent `#FF6B50`, Anton/Archivo fonts, IBM Plex Mono labels) and must render standalone — load GSAP from CDN with a fallback chain (jsdelivr → unpkg) and never depend on the app's build tooling or assets.
- Keep the approved motion values (durations, easings, offsets, triggers) inside the artifact as explicit spec cards so the implementation can be built directly from them.

## Debugging frontend issues (REQUIRED)

- **Always diagnose frontend bugs in a real browser with `chrome-devtools-axi`** (`bunx -y chrome-devtools-axi ...`). Do NOT guess or fix blind — open `http://localhost:3000` (start `bun run dev` first), then probe with `eval`/`snapshot`/`screenshot` (DOM, hit-testing via `document.elementFromPoint`, computed styles/rects, pixel sampling) and verify the fix live before committing.
- Chrome can be slow to open; prefix with `CHROME_DEVTOOLS_AXI_BRIDGE_TIMEOUT_MS=90000` when the bridge takes >30s.
- Rule of thumb for "offscreen/covered/unclickable" symptoms: check element geometry (`getBoundingClientRect`) against `elementFromPoint` hit-testing and confirm the clipping ancestor — a translated element with `overflow-hidden` clips content along with its own origin (fix: use `w-max` on the track, clip on a static parent).
