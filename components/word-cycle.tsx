"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface WordCycleProps {
  trigger: React.RefObject<HTMLElement | null>
}

const WORDS = ["/design", "/development", "/motion"]

const CONFIG = {
  enter: 0.55,
  hold: 1.25,
  exit: 0.38,
  gap: 0.14,
  lineDur: 0.75,
  lineGap: 0.14,
}

export function WordCycle({ trigger }: WordCycleProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const stage = stageRef.current
    const triggerEl = trigger?.current
    if (!stage) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const wordEls = WORDS.map((text) => {
      const el = document.createElement("p")
      el.className = "crv-word"
      el.textContent = text
      el.setAttribute("aria-hidden", "true")
      stage.appendChild(el)
      return el
    })

    const statement = document.createElement("div")
    statement.className = "crv-statement"
    statement.setAttribute("aria-hidden", "true")
    statement.innerHTML =
      '<span class="crv-line-mask"><span class="crv-line"><span class="crv-light">You</span> Choose<span class="crv-period">.</span></span></span>' +
      '<span class="crv-line-mask"><span class="crv-line">We <span class="crv-light">Deliver</span><span class="crv-period">.</span></span></span>'
    stage.appendChild(statement)
    const lines = Array.from(statement.querySelectorAll(".crv-line"))

    // One-time fit: shrink vw-based sizes only if the longest phrase overflows.
    // Uses an off-screen probe so it never disturbs the live DOM.
    const fit = () => {
      const stageW = stage.clientWidth || window.innerWidth
      const budget = stageW * 0.94
      const probe = document.createElement("div")
      probe.style.cssText =
        "position:fixed;left:-10000px;top:0;visibility:hidden;white-space:nowrap;" +
        "font-family:inherit;text-transform:lowercase"
      stage.appendChild(probe)
      wordEls.forEach((el) => {
        const cs = getComputedStyle(el)
        probe.style.cssText +=
          ";font-size:" + cs.fontSize + ";font-weight:" + cs.fontWeight
        probe.textContent = el.textContent
        const w = probe.getBoundingClientRect().width
        if (w > budget) {
          const fs = parseFloat(cs.fontSize)
          el.style.fontSize = Math.max(11, fs * (budget / w)) + "px"
        }
      })
      probe.remove()
    }
    fit()
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit)

    const run = () => {
      if (tlRef.current) tlRef.current.kill()
      if (reduced) {
        wordEls.forEach((el) => (el.style.display = "none"))
        statement.style.display = "flex"
        statement.style.opacity = "1"
        return
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tlRef.current = tl
      let t = 0
      wordEls.forEach((el) => {
        tl.fromTo(
          el,
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: CONFIG.enter },
          t
        ).to(
          el,
          { yPercent: -115, opacity: 0, duration: CONFIG.exit, ease: "power2.in" },
          t + CONFIG.enter + CONFIG.hold
        )
        t += CONFIG.enter + CONFIG.hold + CONFIG.exit + CONFIG.gap
      })
      const s1 = t + 0.1
      tl.fromTo(
        lines,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: CONFIG.lineDur, stagger: CONFIG.lineGap },
        s1
      )
      tl.play()
    }

    let st: ScrollTrigger | null = null
    if (reduced) {
      run()
    } else if (triggerEl) {
      st = ScrollTrigger.create({
        trigger: triggerEl,
        start: "top 80%",
        end: "bottom 20%",
        onEnter: run,
        onEnterBack: run,
      })
    } else {
      run()
    }

    return () => {
      st?.kill()
      tlRef.current?.kill()
      tlRef.current = null
      stage.innerHTML = ""
    }
  }, [trigger])

  return (
    <div
      ref={stageRef}
      className="relative w-full"
      style={{ minHeight: "clamp(11rem, 28vw, 22rem)" }}
    >
      <h1 className="sr-only">You choose. We deliver.</h1>
    </div>
  )
}
