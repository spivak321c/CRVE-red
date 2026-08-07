"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  { name: "Wireframe", say: "Boxes only. We argue about what goes where while it costs nothing." },
  { name: "Structure", say: "Your words, at their real sizes. If the hierarchy is wrong you can see it." },
  { name: "Finished", say: "Colour, photography, motion. The last thing we add, not the first." },
]

const INK = "#1b1a18"
const ACCENT = "#FF6B50"
const WASH = "#EDEBE6"

type SlotProps = {
  className?: string
  real: string
  realClassName?: string
  barClassName?: string
  children?: React.ReactNode
}

function Slot({ className = "", real, realClassName = "", barClassName = "h-[0.62em]", children }: SlotProps) {
  return (
    <span className={`ms relative grid items-center justify-items-start ${className}`}>
      <span
        data-wire
        aria-hidden="true"
        className={`block w-full rounded-[2px] bg-black/15 ${barClassName} [grid-area:1/1]`}
      />
      {children && <span className="[grid-area:1/1]">{children}</span>}
      <span data-real className={`block max-w-full overflow-hidden whitespace-nowrap text-ellipsis leading-[1.15] duration-500 ease-out ${realClassName} [grid-area:1/1]`}>
        {real}
      </span>
    </span>
  )
}

export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRefs = useRef<(HTMLLIElement | null)[]>([])
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const wires = section.querySelectorAll<HTMLElement>("[data-wire]")
    const reals = section.querySelectorAll<HTMLElement>("[data-real]")
    const colours = section.querySelectorAll<HTMLElement>("[data-colour]")
    const liEls = section.querySelectorAll<HTMLElement>("[data-stage-label]")

    const syncStages = (idx: number) => {
      stageRefs.current.forEach((li, i) => {
        if (li) li.setAttribute("data-active", i === idx ? "true" : "false")
      })
    }

    const syncBar = (progress: number) => {
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }

    const setStage = (p: number) => {
      const idx = p < 0.34 ? 0 : p < 0.67 ? 1 : 2
      syncStages(idx)
      syncBar(p)
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    gsap.set(reals, { autoAlpha: 0 })
    gsap.set(colours, { autoAlpha: 0 })
    setStage(0)

    if (reduced) {
      gsap.set(wires, { autoAlpha: 0 })
      gsap.set(reals, { autoAlpha: 1 })
      gsap.set(colours, { autoAlpha: 1 })
      setStage(1)
      return
    }

    const tween = gsap
      .timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=3000",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => setStage(self.progress),
        },
      })
      .to(wires, { autoAlpha: 0, duration: 0.16, stagger: 0.01 }, 0.34)
      .to(reals, { autoAlpha: 1, duration: 0.18, stagger: 0.01 }, 0.33)
      .to(colours, { autoAlpha: 1, duration: 0.17, stagger: 0.04 }, 0.67)

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="relative border-t border-white/10 bg-[#0b0a09] overflow-hidden"
    >
      {/* build-pin: exactly one viewport tall, everything inside */}
      <div className="min-h-[100svh] flex items-center py-[clamp(2rem,5vh,4rem)]">
        <div className="shell w-full max-w-[1248px] mx-auto px-[clamp(18px,4vw,52px)] grid gap-[clamp(1.1rem,2.4vh,2rem)]">
          {/* HEAD : title + note */}
          <div className="grid grid-cols-1 gap-[clamp(1rem,3vw,3rem)] md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:items-end">
            <div>
              <p className="flex items-center gap-2.5 font-mono text-xs tracking-[1.5px] uppercase text-[#FF6B50] mb-3">
                <span className="h-px w-[22px] bg-[#FF6B50]" aria-hidden="true" />
                How a page gets made
              </p>
              <h2 className="font-display uppercase leading-[1.05] tracking-[0.01em] text-[#F5F3EE] text-[clamp(1.55rem,3.1vw,2.5rem)]">
                From boxes to brand.
              </h2>
            </div>
            <p className="font-sans text-[15px] leading-[1.55] text-white/70 max-w-[34ch]">
              Scroll. The same page at the three points where we&apos;d show it to you — and where
              changing your mind is cheap.
            </p>
          </div>

          {/* MOCK : white browser frame, capped to 54svh so it never overshoots the pinned viewport */}
          <div
            className="flex flex-col mx-auto rounded-md bg-white overflow-hidden border border-white/20"
            style={{
              width: "min(100%, calc(54svh * 1.6))",
              aspectRatio: "16 / 10",
              containerType: "inline-size",
            }}
          >
            {/* chrome */}
            <div className="flex-none flex items-center gap-[1cqw] px-[1.6cqw] bg-[#EDEBE6] border-b border-black/10 min-h-[20px]" style={{ height: "5.2cqw" }}>
              <span className="w-[1.1cqw] h-[1.1cqw] min-w-[4px] min-h-[4px] rounded-full bg-black/20 flex-none" />
              <span className="w-[1.1cqw] h-[1.1cqw] min-w-[4px] min-h-[4px] rounded-full bg-black/15 flex-none" />
              <span className="w-[1.1cqw] h-[1.1cqw] min-w-[4px] min-h-[4px] rounded-full bg-black/10 flex-none" />
              <span className="flex-1 ml-[1.2cqw] bg-white rounded-full py-[0.35cqw] px-[1.2cqw] max-w-[26cqw]">
                <Slot
                  real="store-example.com"
                  barClassName="h-[0.72em]"
                  realClassName="font-mono text-[1.7cqw] font-medium text-black/60"
                />
              </span>
            </div>

            {/* page */}
            <div className="flex-1 min-h-0 p-[1.8cqw_2.6cqw] flex flex-col gap-[2cqw] bg-white text-[#1b1a18]">
              {/* nav */}
              <div className="flex items-center justify-between gap-[2cqw] pb-[1.4cqw] border-b border-black/10">
                <span className="flex items-center gap-[1cqw]">
                  <span className="relative w-[2.2cqw] h-[2.2cqw] flex-none bg-[#1b1a18]" style={{ clipPath: "polygon(0 100%, 50% 0, 100% 100%)" }}>
                    <span data-colour className="absolute inset-0 bg-[#FF6B50]" />
                    <span data-wire className="absolute inset-0 bg-[#D6D3CD]" />
                  </span>
                  <Slot
                    className="w-[17cqw] font-display font-bold text-[2.1cqw] tracking-[-0.03em] text-[#1b1a18]"
                    real="MERIDIAN & CO"
                  />
                </span>
                <span className="flex gap-[2.4cqw]">
                  {["Shop", "Lookbook", "About", "Journal"].map((l) => (
                    <Slot
                      key={l}
                      className="w-[10cqw] text-[1.65cqw] font-sans"
                      realClassName="font-medium text-black/65"
                      real={l}
                    />
                  ))}
                </span>
              </div>

              {/* hero */}
              <div className="grid grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] gap-[3cqw] items-center flex-1 min-h-0">
                <div className="grid gap-[0.85cqw] justify-items-start align-content-center">
                  <span className="flex items-center gap-[1cqw] w-full">
                    <span data-colour className="w-[3.6cqw] h-[2px] bg-[#FF6B50] flex-none" />
                    <Slot
                      className="w-[34cqw] font-mono text-[1.35cqw] tracking-[0.12em] uppercase text-black/55"
                      real="New · Drop 2026"
                    />
                  </span>
                  <Slot
                    className="w-full font-display text-[4cqw] leading-[1.05] tracking-[-0.035em] text-[#1b1a18]"
                    barClassName="h-[0.68em]"
                    real="Summer Drop."
                  />
                  <Slot
                    className="w-full font-sans text-[1.6cqw] text-black/65"
                    realClassName="whitespace-normal leading-[1.4]"
                    real="Premium streetwear essentials — limited runs, restocked once."
                  />
                  <span className="relative inline-flex items-center justify-center mt-[0.5cqw] px-[2.2cqw] py-[0.85cqw] rounded-[3px] bg-[#1b1a18] overflow-hidden">
                    <span data-colour className="absolute inset-0 bg-[#FF6B50]" />
                    <span data-wire className="absolute inset-0 bg-[#DCD9D3]" />
                    <span data-real className="relative font-mono text-[1.5cqw] font-bold text-white whitespace-nowrap">
                      Shop now →
                    </span>
                  </span>
                </div>

                {/* media */}
                <div className="relative h-full min-h-[12cqw] rounded-[3px] overflow-hidden bg-[#1b1a18]">
                  <span
                    data-wire
                    aria-hidden="true"
                    className="absolute inset-0 block"
                    style={{
                      backgroundImage:
                        "linear-gradient(to top right, transparent calc(50% - 0.5px), rgba(27,26,24,0.22) 50%, transparent calc(50% + 0.5px)), linear-gradient(to bottom right, transparent calc(50% - 0.5px), rgba(27,26,24,0.22) 50%, transparent calc(50% + 0.5px)), #E9E7E2",
                    }}
                  />
                  <span data-colour className="absolute inset-0 overflow-hidden bg-[#FF6B50]">
                    <span className="absolute block w-[34%] aspect-square right-[12%] top-[14%] rounded-full bg-[#FDF3ED]" />
                    <span className="absolute block left-[-6%] bottom-[-14%] w-[76%] aspect-[3/2] rounded-[50%_50%_0_0] bg-black/80" />
                    <span className="absolute block right-0 bottom-[22%] w-[46%] h-[8%] bg-[#FDF3ED]/55" />
                  </span>
                </div>
              </div>

              {/* cards */}
              <div className="grid grid-cols-[repeat(3,minmax(0,1fr))] gap-[2.2cqw] flex-none">
                {[
                  { t: "Overshirt", d: "Premium cotton twill", g: "linear-gradient(120deg, #FF6B50 0 55%, rgba(27,26,24,0.9) 55% 100%)" },
                  { t: "Hoodie", d: "Heavyweight fleece", g: "rgba(27,26,24,0.9)" },
                  { t: "Tee", d: "Boxy drop cut", g: "linear-gradient(0deg, #FF6B50 0 40%, rgba(27,26,24,0.88) 40% 100%)" },
                ].map((c) => (
                  <span key={c.t} className="grid gap-[0.7cqw] justify-items-start">
                    <span className="relative w-full aspect-[16/6] rounded-[3px] overflow-hidden bg-[#1b1a18]">
                      <span data-wire className="absolute inset-0 block bg-[#E9E7E2]" />
                      <span data-colour className="absolute inset-0 block" style={{ background: c.g }} />
                    </span>
                    <Slot className="w-full font-display text-[2cqw] tracking-[-0.02em] text-[#1b1a18]" real={c.t} />
                    <Slot className="w-full font-sans text-[1.45cqw] text-black/70 [@media(max-width:560px)]:hidden" real={c.d} />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* READOUT : stages + progress */}
          <div className="grid gap-4">
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(0.75rem,2vw,2rem)] list-none">
              {STAGES.map((s, i) => (
                <li
                  key={s.name}
                  ref={(el) => {
                    stageRefs.current[i] = el
                  }}
                  data-stage-label
                  data-active={i === 0 ? "true" : "false"}
                  className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-[0.5rem_0.7rem] border-t border-white/15 pt-[0.9rem] transition-colors duration-500 ease-out"
                >
                  <span className="build-stage-n font-mono text-[11px] font-semibold tracking-[0.06em] rounded px-[0.45rem] py-[0.2rem] text-white/40 bg-white/5 transition-colors duration-500 ease-out group-data-[active=true]:bg-[#FF6B50] group-data-[active=true]:text-black">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-base font-semibold tracking-[-0.02em] text-white/60 transition-colors duration-500 ease-out group-data-[active=true]:text-[#F5F3EE]">
                    {s.name}
                  </span>
                  <span className="build-stage-say col-span-2 font-sans text-[13px] leading-[1.45] text-white/50 transition-colors duration-500 ease-out group-data-[active=true]:text-white/75">
                    {s.say}
                  </span>
                </li>
              ))}
            </ol>
            <div className="relative h-[2px] bg-white/15 overflow-hidden" aria-hidden="true">
              <span ref={barRef} className="absolute inset-0 bg-[#FF6B50] origin-[0_50%] block" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}