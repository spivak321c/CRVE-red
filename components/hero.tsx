"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { WordCycle } from "./word-cycle"

interface HeroProps {
  onOpenContact: () => void
}

export function Hero({ onOpenContact }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 pb-16 px-6 overflow-hidden"
    >
      {/* Background Radial Atmosphere */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#221612_0%,_#050505_70%)] opacity-70" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B50]/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      {/* Hero Word Cycle */}
      <div className="relative z-10 w-full select-none cursor-default my-2">
        <WordCycle trigger={sectionRef} />
        <p className="mt-6 text-base sm:text-xl font-light text-neutral-400 max-w-xl mx-auto tracking-tight leading-relaxed text-center">
          Crafting high-impact digital products, scalable brand systems, and AI-native interfaces that convert.
        </p>
      </div>

      {/* Action Trigger */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <button
          type="button"
          onClick={onOpenContact}
          className="px-8 py-4 bg-[#FF6B50] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl hover:shadow-[#FF6B50]/20 cursor-pointer"
        >
          Book Discovery Call
        </button>
      </motion.div>

      {/* Bottom Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-7xl mx-auto mt-16 md:mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10"
      >
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#FF6B50]" />
          <p className="text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-neutral-400">
            Independent studio — design · engineering · AI
          </p>
        </div>

        <a
          href="mailto:hello@crve.studio"
          className="text-sm font-mono font-semibold tracking-wider uppercase text-white hover:text-[#FF6B50] transition-colors border-b-2 border-white hover:border-[#FF6B50] pb-1"
        >
          hello@crve.studio
        </a>
      </motion.div>
    </section>
  )
}
