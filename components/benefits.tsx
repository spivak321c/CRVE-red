"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ShoppingBagIcon } from "./icons"

gsap.registerPlugin(ScrollTrigger)

const STAGES = [
  { name: "Wireframe", url: "store-example.com/wireframe" },
  { name: "Structure", url: "store-example.com/structure" },
  { name: "Finished", url: "store-example.com" },
]

const STEPS = [
  { index: "01", name: "Wireframe", desc: "Structure & layout" },
  { index: "02", name: "Structure", desc: "Blocks & hierarchy" },
  { index: "03", name: "Finished", desc: "Brand & motion" },
]

export function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const browserRef = useRef<HTMLDivElement>(null)
  const wfRef = useRef<HTMLDivElement>(null)
  const stRef = useRef<HTMLDivElement>(null)
  const finRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLSpanElement>(null)
  const urlRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const stageNameRef = useRef<HTMLSpanElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])
  const fillRefs = useRef<(HTMLDivElement | null)[]>([])

useEffect(() => {
    const section = sectionRef.current
    const panel = panelRef.current
    const browser = browserRef.current
    const wf = wfRef.current
    const st = stRef.current
    const fin = finRef.current
    if (!section || !panel || !browser || !wf || !st || !fin) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const syncHud = (progress: number) => {
      const idx = progress < 0.34 ? 0 : progress < 0.67 ? 1 : 2
      if (pillRef.current) pillRef.current.textContent = `STAGE 0${idx + 1} / 03`
      if (urlRef.current) urlRef.current.textContent = STAGES[idx].url
      if (stageNameRef.current) stageNameRef.current.textContent = STAGES[idx].name
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
      stepRefs.current.forEach((step, i) => {
        if (!step) return
        step.setAttribute("data-active", i === idx ? "true" : "false")
        const fill = fillRefs.current[i]
        if (fill) {
          const start = i / 3
          const end = (i + 1) / 3
          const v = Math.min(1, Math.max(0, (progress - start) / (end - start)))
          fill.style.transform = `scaleX(${v})`
        }
      })
    }

    if (reduced) {
      wf.style.opacity = "0"
      st.style.opacity = "0"
      syncHud(1)
      return
    }

    const build = (pinned: boolean, triggerEl: HTMLElement, start: string, end: string) => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: triggerEl,
          start,
          end,
          pin: pinned,
          pinSpacing: pinned,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => syncHud(self.progress),
        },
      })
      tl.set(fin, { autoAlpha: 0 })
        .set(st, { autoAlpha: 0 })
        .to(wf, { autoAlpha: 0, y: -14, filter: "blur(5px)", duration: 0.17 }, 0.33)
        .to(st, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.17 }, 0.33)
        .to(st, { autoAlpha: 0, y: -14, filter: "blur(5px)", duration: 0.17 }, 0.66)
        .to(fin, { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 0.17 }, 0.66)
      return tl
    }

    const mm = gsap.matchMedia()
    let desktopTl: gsap.core.Timeline | null = null
    let mobileTl: gsap.core.Timeline | null = null
    mm.add("(min-width: 768px)", () => {
      desktopTl = build(true, panel, "top 86px", "+=1600")
      return () => {
        desktopTl?.scrollTrigger?.kill()
        desktopTl?.kill()
        desktopTl = null
      }
    })
    mm.add("(max-width: 767px)", () => {
      mobileTl = build(false, browser, "top 78%", "bottom 55%")
      return () => {
        mobileTl?.scrollTrigger?.kill()
        mobileTl?.kill()
        mobileTl = null
      }
    })

    const entrance = gsap.fromTo(
      stepRefs.current.filter(Boolean) as HTMLDivElement[],
      { y: 24, autoAlpha: 0 },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 80%" },
      }
    )

    return () => {
      mm.revert()
      entrance.scrollTrigger?.kill()
      entrance.kill()
    }
  }, [])

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="py-16 md:py-28 px-5 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10"
    >
      <h2 className="text-[34px] sm:text-4xl md:text-7xl font-bold leading-[1.08] tracking-tight text-white max-w-5xl mb-10 sm:mb-12 md:mb-20">
        Clean, scalable design that helps you <span className="text-neutral-500">ship faster</span> and grow your revenue.
      </h2>

      <div ref={panelRef}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {/* Card 1: The Process — synced to the morph */}
        <div className="order-2 md:order-1 bg-[#111111] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12 min-h-[420px] md:min-h-[520px] flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all duration-500">
          <div>
            <span className="text-[#FF6B50] text-[10px] font-mono font-bold uppercase tracking-[0.24em]">
              The process
            </span>
            <h3 className="text-[34px] sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mt-3 mb-6 md:mb-8">
              How a page<br />
              gets <span className="text-[#666666]">made.</span>
            </h3>

            <div className="space-y-3">
              {STEPS.map((step, i) => (
                <div
                  key={step.index}
                  ref={(el) => {
                    stepRefs.current[i] = el
                  }}
                  data-active={i === 0}
                  className="flex items-center gap-3 sm:gap-4 bg-[#161616] border border-[#262626] rounded-xl sm:rounded-2xl px-3 sm:px-4 py-3 sm:py-3.5 transition-colors duration-300 data-[active=true]:border-[#FF6B50]/45 data-[active=true]:bg-[#FF6B50]/5"
                >
                  <span className="text-[10px] font-mono font-bold text-[#555555] data-[active=true]:text-[#FF6B50] w-5 shrink-0">
                    {step.index}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-mono font-bold tracking-[0.14em] uppercase text-neutral-300">
                      {step.name}
                    </div>
                    <div className="text-[9px] font-mono text-[#888888] mt-0.5">{step.desc}</div>
                  </div>
                  <div className="w-8 h-[3px] rounded-full bg-[#2a2a2a] overflow-hidden shrink-0">
                    <div
                      ref={(el) => {
                        fillRefs.current[i] = el
                      }}
                      className="h-full w-full bg-[#FF6B50] origin-left scale-x-0"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.18em] text-[#666666]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B50] animate-pulse" />
            Live · synced to scroll
          </div>
        </div>

        {/* Card 2: Browser mockup — Wireframe → Structure → Finished */}
        <div ref={browserRef} className="order-1 md:order-2 bg-gradient-to-br from-[#161110] via-[#111111] to-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-4 sm:p-5 md:p-10 min-h-[420px] md:min-h-[520px] flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-32 right-0 w-[400px] h-[400px] bg-[#FF6B50]/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Browser chrome */}
          <div className="w-full max-w-[420px] mx-auto bg-[#0d0d0d] rounded-2xl border border-white/15 shadow-2xl overflow-hidden my-auto">
            <div className="bg-[#181818] px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/10 flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 h-[22px] bg-white/10 rounded-full text-[9px] font-mono text-center text-neutral-400 flex items-center justify-center overflow-hidden whitespace-nowrap">
                <span ref={urlRef}>store-example.com/wireframe</span>
              </div>
              <span
                ref={pillRef}
                className="text-[9px] font-mono font-bold tracking-[0.16em] uppercase text-[#FF6B50] bg-[#FF6B50]/10 border border-[#FF6B50]/30 rounded-full px-2.5 py-1 whitespace-nowrap"
              >
                Stage 01 / 03
              </span>
            </div>

            {/* Browser body */}
            <div className="relative h-[340px] md:h-auto md:aspect-[10/7] bg-[#0a0a0a] overflow-hidden" aria-hidden="true">
              {/* STAGE 0 · WIREFRAME */}
              <div ref={wfRef} className="absolute inset-0 p-3 sm:p-5 flex flex-col">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-mono text-[26px] sm:text-[30px] tracking-[0.5em] text-white/[0.045] font-bold -rotate-8 select-none">
                    WIREFRAME
                  </span>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-5">
                  <div className="w-[26px] sm:w-[30px] h-[26px] sm:h-[30px] rounded-lg border-[1.5px] border-dashed border-white/30" />
                  <div className="flex-1 flex gap-1.5">
                    <div className="h-2 w-[40px] sm:w-[46px] rounded bg-white/10" />
                    <div className="h-2 w-[64px] sm:w-[74px] rounded bg-white/10" />
                    <div className="h-2 w-[50px] sm:w-[58px] rounded bg-white/10" />
                  </div>
                  <div className="w-[26px] sm:w-[30px] h-[26px] sm:h-[30px] rounded-lg border-[1.5px] border-dashed border-white/30 flex items-center justify-center text-white/40">
                    <ShoppingBagIcon size={13} />
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 mb-3 sm:mb-5">
                  <div className="flex-1 min-w-0 flex flex-col gap-2 sm:gap-3">
                    <div className="self-start w-14 sm:w-16 h-4 rounded-full border-[1.5px] border-dashed border-white/30" />
                    <div className="h-[13px] sm:h-[15px] w-[92%] rounded border-[1.5px] border-dashed border-white/30" />
                    <div className="h-[13px] sm:h-[15px] w-[55%] rounded border-[1.5px] border-dashed border-white/30" />
                    <div className="h-5 sm:h-6 rounded border-[1.5px] border-dashed border-white/30" />
                    <div className="flex gap-2">
                      <div className="h-7 sm:h-8 flex-1 rounded-lg border-[1.5px] border-dashed border-white/30" />
                      <div className="h-7 sm:h-8 flex-1 rounded-lg border-[1.5px] border-dashed border-white/30" />
                    </div>
                  </div>
                  <div className="flex-[0_0_42%] sm:flex-[0_0_40%] aspect-[4/3] rounded-xl border-[1.5px] border-dashed border-white/30 relative">
                    <span className="absolute -top-2.5 left-2.5 bg-[#0a0a0a] px-1.5 font-mono text-[8px] tracking-[0.18em] uppercase text-[#8a8a8a]">
                      Product shot
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {["Product 01", "Product 02", "Product 03"].map((label) => (
                    <div key={label} className="relative aspect-square rounded-xl border-[1.5px] border-dashed border-white/30">
                      <span className="absolute -top-2.5 left-2.5 bg-[#0a0a0a] px-1.5 font-mono text-[8px] tracking-[0.18em] uppercase text-[#8a8a8a]">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* STAGE 1 · STRUCTURE */}
              <div ref={stRef} className="absolute inset-0 p-3 sm:p-5 flex flex-col opacity-0 invisible">
                <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-5">
                  <div className="w-[26px] sm:w-[30px] h-[26px] sm:h-[30px] rounded-lg bg-[#262626]" />
                  <div className="flex-1 flex gap-1.5">
                    <div className="h-2 w-[40px] sm:w-[46px] rounded bg-[#262626]" />
                    <div className="h-2 w-[64px] sm:w-[74px] rounded bg-[#262626]" />
                    <div className="h-2 w-[50px] sm:w-[58px] rounded bg-[#262626]" />
                  </div>
                  <div className="w-[26px] sm:w-[30px] h-[26px] sm:h-[30px] rounded-lg bg-[#262626] flex items-center justify-center text-[#8a8a8a]">
                    <ShoppingBagIcon size={13} />
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 mb-3 sm:mb-5">
                  <div className="flex-1 min-w-0 flex flex-col gap-2 sm:gap-3">
                    <div className="self-start rounded-full border border-[#333333] px-3 py-1 font-mono text-[8px] tracking-[0.2em] uppercase text-[#777777]">
                      New · Drop 2026
                    </div>
                    <div className="flex flex-col gap-2 sm:gap-2.5">
                      <div className="h-[13px] sm:h-[15px] w-[92%] rounded bg-[#262626]" />
                      <div className="h-[13px] sm:h-[15px] w-[55%] rounded bg-[#262626]" />
                    </div>
                    <div>
                      <div className="h-1.5 w-full rounded bg-[#222222] mb-1.5" />
                      <div className="h-1.5 w-[70%] rounded bg-[#222222]" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-7 sm:h-8 flex-1 rounded-lg bg-[#262626]" />
                      <div className="h-7 sm:h-8 flex-1 rounded-lg bg-[#262626]" />
                    </div>
                  </div>
                  <div className="flex-[0_0_42%] sm:flex-[0_0_40%] aspect-[4/3] rounded-xl bg-[#161616] border border-white/10 overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {[
                    { name: "Product 01", price: "$48" },
                    { name: "Product 02", price: "$64" },
                    { name: "Product 03", price: "$39" },
                  ].map((p) => (
                    <div key={p.name} className="relative aspect-square rounded-xl bg-[#1a1a1a] border border-white/10 flex flex-col justify-end p-1.5 sm:p-2">
                      <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.14em] uppercase text-[#777777]">{p.name}</span>
                      <span className="font-mono text-[8px] sm:text-[9px] font-bold text-[#999999]">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* STAGE 2 · FINISHED */}
              <div ref={finRef} className="absolute inset-0 p-3 sm:p-5 flex flex-col opacity-0 invisible">
                <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-5">
                  <div className="w-[26px] sm:w-[30px] h-[26px] sm:h-[30px] rounded-lg bg-white text-black flex items-center justify-center font-display text-[13px] sm:text-[15px]">
                    M
                  </div>
                  <div className="flex-1 flex gap-1.5">
                    <div className="h-2 w-[40px] sm:w-[46px] rounded bg-[#2c2c2c]" />
                    <div className="h-2 w-[64px] sm:w-[74px] rounded bg-[#2c2c2c]" />
                    <div className="h-2 w-[50px] sm:w-[58px] rounded bg-[#2c2c2c]" />
                  </div>
                  <div className="w-[26px] sm:w-[30px] h-[26px] sm:h-[30px] rounded-lg bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-white relative">
                    <ShoppingBagIcon size={13} />
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#FF6B50]" />
                  </div>
                </div>

                <div className="flex items-center gap-4 sm:gap-6 mb-3 sm:mb-5">
                  <div className="flex-1 min-w-0 flex flex-col gap-2 sm:gap-2.5">
                    <div className="self-start rounded-full bg-[#FF6B50]/10 border border-[#FF6B50]/35 px-2.5 sm:px-3 py-0.5 sm:py-1 font-mono text-[7px] sm:text-[8px] font-bold tracking-[0.2em] uppercase text-[#FF6B50]">
                      New · Drop 2026
                    </div>
                    <h4 className="font-display uppercase text-[22px] sm:text-[26px] md:text-[30px] leading-[0.95] tracking-[0.01em] text-white">
                      Summer<br />
                      <span className="text-[#FF6B50]">Drop.</span>
                    </h4>
                    <p className="text-[10px] sm:text-[11px] leading-relaxed text-neutral-400 max-w-[220px] sm:max-w-[260px]">
                      Premium streetwear essentials — limited runs.
                    </p>
                    <div className="flex gap-2">
                      <div className="flex-1 h-7 sm:h-8 rounded-lg bg-[#FF6B50] flex items-center justify-center font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-black">
                        Shop now →
                      </div>
                      <div className="flex-1 h-7 sm:h-8 rounded-lg border border-white/15 flex items-center justify-center font-mono text-[8px] sm:text-[9px] font-bold tracking-[0.12em] uppercase text-white">
                        Lookbook
                      </div>
                    </div>
                  </div>
                  <div className="flex-[0_0_42%] sm:flex-[0_0_40%] aspect-[4/3] rounded-xl bg-gradient-to-br from-[#241a16] to-[#0d0d0d] border border-[#262626] flex items-center justify-center overflow-hidden">
                    <div className="w-[58%] h-[42%] bg-[#171717] border border-[#333333] rounded-[10px] flex flex-col gap-1.5 p-2.5">
                      <div className="h-1.5 rounded bg-[#2c2c2c]" />
                      <div className="h-1.5 rounded bg-[#2c2c2c]" />
                      <div className="h-1.5 rounded bg-[#2c2c2c]" />
                      <div className="h-1.5 w-[55%] rounded bg-[#FF6B50]" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                  {[
                    { name: "Overshirt", price: "$48", g: "bg-gradient-to-br from-[#2a1e18] to-[#131313]" },
                    { name: "Hoodie", price: "$64", g: "bg-gradient-to-br from-[#1c2326] to-[#101313]" },
                    { name: "Tee", price: "$39", g: "bg-gradient-to-br from-[#25181d] to-[#131014]" },
                  ].map((p) => (
                    <div
                      key={p.name}
                      className={`relative aspect-square rounded-xl border border-[#262626] flex flex-col justify-end p-1.5 sm:p-2 ${p.g}`}
                    >
                      <span className="font-mono text-[7px] sm:text-[8px] tracking-[0.14em] uppercase text-[#aaaaaa]">{p.name}</span>
                      <span className="font-mono text-[8px] sm:text-[9px] font-bold text-white">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* HUD */}
        <div className="mt-10 md:mt-14 flex items-center gap-4">
          <div className="flex-1 h-[2px] bg-[#232323] rounded-full overflow-hidden">
            <div ref={barRef} className="h-full w-full bg-[#FF6B50] origin-left scale-x-0" />
          </div>
          <span className="text-[#666666] text-[10px] font-mono uppercase tracking-widest whitespace-nowrap">
            <span ref={stageNameRef} className="text-white font-bold">
              Wireframe
            </span>{" "}
            / 03 · scroll
          </span>
        </div>
      </div>
    </section>
  )
}
