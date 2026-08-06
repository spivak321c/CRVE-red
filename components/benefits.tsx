"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckIcon } from "./icons"

export function Benefits() {
  const [activeTab, setActiveTab] = useState<"analytics" | "system" | "performance">("analytics")

  return (
    <section id="benefits" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <h2 className="text-4xl md:text-7xl font-bold leading-[1.08] tracking-tight text-white max-w-5xl mb-12 md:mb-20">
        Clean, scalable design that helps you <span className="text-neutral-500">ship faster</span> and grow your revenue.
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Benefit Card 1: Hyper-Growth */}
        <div className="bg-[#111111] border border-white/10 rounded-[2.5rem] p-8 md:p-12 min-h-[480px] md:min-h-[520px] flex flex-col justify-between relative overflow-hidden group hover:border-white/20 transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="bg-[#1a1a1a] text-[10px] font-mono font-bold px-4 py-2 rounded-full uppercase tracking-widest text-neutral-300 border border-[#333333]">
              Hyper-Growth Velocity
            </div>
          </div>

          <div className="my-8">
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                <CheckIcon className="w-4 h-4 text-[#FF6B50] shrink-0" />
                <span>2.4x Faster MVP Time-to-Market</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                <CheckIcon className="w-4 h-4 text-[#FF6B50] shrink-0" />
                <span>Zero Technical or Design Debt</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                <CheckIcon className="w-4 h-4 text-[#FF6B50] shrink-0" />
                <span>Built for High-Converting Funnels</span>
              </div>
            </div>
          </div>

          <div className="mt-auto">
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 text-white">
              Start faster.
            </h3>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-[#444444] group-hover:text-[#888888] transition-colors duration-500">
              Earn sooner.
            </h3>
          </div>
        </div>

        {/* Benefit Card 2: Interactive Browser Mockup */}
        <div className="bg-gradient-to-br from-[#161110] via-[#111111] to-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-6 md:p-10 min-h-[480px] md:min-h-[520px] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -top-32 right-0 w-[400px] h-[400px] bg-[#FF6B50]/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Top Interactive Tabs inside card */}
          <div className="flex items-center justify-between gap-2 mb-6 z-10">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("analytics")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "analytics" ? "bg-white text-black shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                Analytics
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("system")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "system" ? "bg-white text-black shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                System
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("performance")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "performance" ? "bg-white text-black shadow-md" : "text-neutral-400 hover:text-white"
                }`}
              >
                Conversion
              </button>
            </div>
            <span className="text-xs font-mono text-neutral-500 hidden sm:block">Live Preview</span>
          </div>

          {/* Browser Container */}
          <div className="w-full max-w-md mx-auto bg-[#0d0d0d] rounded-2xl border border-white/15 shadow-2xl overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500 my-auto">
            <div className="bg-[#181818] px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
              </div>
              <div className="h-3.5 w-36 bg-white/10 rounded-full text-[9px] font-mono text-center text-neutral-400 flex items-center justify-center">
                app.crve.studio
              </div>
            </div>

            <div className="p-6 bg-[#0a0a0a] min-h-[220px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {activeTab === "analytics" && (
                  <motion.div
                    key="analytics"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Enterprise Suite</div>
                        <div className="text-xl font-extrabold text-white">Analytics v4.0</div>
                      </div>
                      <div className="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-lg flex items-center gap-1">
                        <span>+184% ARR</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-[10px] text-neutral-400 block">Avg Load Time</span>
                        <span className="text-lg font-bold text-white font-mono">112ms</span>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-[10px] text-neutral-400 block">User Satisfaction</span>
                        <span className="text-lg font-bold text-emerald-400 font-mono">99.8%</span>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "system" && (
                  <motion.div
                    key="system"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Design Tokens</div>
                        <div className="text-xl font-extrabold text-white">Figma & React Sync</div>
                      </div>
                      <div className="px-2.5 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-xs font-bold rounded-lg flex items-center gap-1">
                        <span>42 Modules</span>
                      </div>
                    </div>
                    <p className="text-xs text-neutral-300 leading-relaxed">
                      Bi-directional token pipelines auto-sync colors, typography, and motion primitives directly into production components.
                    </p>
                  </motion.div>
                )}

                {activeTab === "performance" && (
                  <motion.div
                    key="performance"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">Conversion Funnel</div>
                        <div className="text-xl font-extrabold text-[#FF6B50]">4.8% Opt-in Rate</div>
                      </div>
                      <div className="px-2.5 py-1 bg-[#FF6B50]/10 text-[#FF6B50] border border-[#FF6B50]/20 text-xs font-bold rounded-lg flex items-center gap-1">
                        <span>Top 1% SaaS</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden p-0.5 border border-white/10">
                      <div className="bg-gradient-to-r from-[#FF6B50] to-[#FF8F70] h-full rounded-full w-[88%]" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <span>Built with Next.js & Tailwind</span>
            <span>Interactive Component</span>
          </div>
        </div>
      </div>
    </section>
  )
}
