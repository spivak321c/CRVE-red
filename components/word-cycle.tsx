"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface WordCycleProps {
  trigger: React.RefObject<HTMLElement | null>
}

const CONFIG = {
  glyphDur: 0.5,
  exitDur: 0.45,
  stagger: 0.06,
  hold: 1.4,
  gapAfterExit: 0.165,
  lineGap: 0.3,
  lineDur: 0.85,
  words: [
    { text: "/design", start: 0 },
    { text: "/development", start: 2.71 },
    { text: "/motion", start: 5.72 },
  ],
}

export function WordCycle({ trigger }: WordCycleProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const stage = stageRef.current
    const triggerEl = trigger?.current
    if (!stage) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const words = CONFIG.words.map((w) => {
      const enterEnd = w.start + CONFIG.glyphDur + (w.text.length - 1) * CONFIG.stagger
      return {
        text: w.text,
        start: w.start,
        holdEnd: enterEnd + CONFIG.hold,
        exitEnd: enterEnd + CONFIG.hold + CONFIG.exitDur,
      }
    })
    const lastExit = words[words.length - 1].exitEnd
    const s1 = lastExit + CONFIG.gapAfterExit
    const s2 = s1 + CONFIG.lineGap

    let wordEls: HTMLElement[] = []
    let glyphSets: HTMLElement[][] = []
    let statement: HTMLElement
    let lines: HTMLElement[]

    const build = () => {
      stage.innerHTML = ""
      wordEls = []
      glyphSets = []
      words.forEach((w) => {
        const word = document.createElement("div")
        word.className = "crv-word"
        word.style.display = "none"
        word.setAttribute("aria-hidden", "true")
        const mask = document.createElement("span")
        mask.className = "crv-mask"
        const fitVw = 95 / (w.text.length * 0.58)
        mask.style.fontSize = `clamp(3rem, ${Math.min(16, fitVw).toFixed(2)}vw, 12rem)`
        const glyphs: HTMLElement[] = []
        w.text.split("").forEach((ch) => {
          const g = document.createElement("span")
          g.className = "crv-glyph"
          g.textContent = ch
          g.style.transform = "translateY(115%)"
          g.style.fontWeight = "200"
          mask.appendChild(g)
          glyphs.push(g)
        })
        word.appendChild(mask)
        stage.appendChild(word)
        wordEls.push(word)
        glyphSets.push(glyphs)
      })

      statement = document.createElement("div")
      statement.className = "crv-statement"
      statement.style.display = "none"
      statement.setAttribute("aria-hidden", "true")
      statement.innerHTML =
        '<span class="crv-line-mask"><span class="crv-line"><span class="crv-light">You</span> choose<span class="crv-period">.</span></span></span>' +
        '<span class="crv-line-mask"><span class="crv-line">We <span class="crv-light">deliver</span><span class="crv-period">.</span></span></span>'
      stage.appendChild(statement)
      lines = Array.from(statement.querySelectorAll(".crv-line"))
    }

    const run = () => {
      if (tlRef.current) tlRef.current.kill()
      build()
      if (reduced) {
        statement.style.display = "flex"
        return
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tlRef.current = tl
      words.forEach((w, i) => {
        const glyphs = glyphSets[i]
        tl.set(wordEls[i], { display: "flex" }, w.start)
          .fromTo(
            glyphs,
            { yPercent: 115, fontWeight: 200 },
            { yPercent: 0, fontWeight: 800, duration: CONFIG.glyphDur, stagger: CONFIG.stagger },
            w.start
          )
          .to(glyphs, { yPercent: -115, duration: CONFIG.exitDur, ease: "power2.in" }, w.holdEnd)
          .set(wordEls[i], { display: "none" }, w.exitEnd)
      })
      tl.set(statement, { display: "flex" }, s1)
        .fromTo(
          lines,
          { yPercent: 120 },
          { yPercent: 0, duration: CONFIG.lineDur, stagger: CONFIG.lineGap },
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
      style={{ minHeight: "calc(clamp(4rem, 15vw, 11rem) * 2.5)" }}
    >
      <h1 className="sr-only">You choose. We deliver.</h1>
    </div>
  )
}
