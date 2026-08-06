"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { CheckIcon, ArrowUpRightIcon } from "./icons"

interface ServicesEstimatorProps {
  onOpenContactWithScope: (scopeSummary: string) => void
}

interface ScopeOption {
  id: string
  label: string
  cost: number
  weeks: number
  category: string
}

const scopeOptions: ScopeOption[] = [
  { id: "brand", label: "Brand System & Identity", cost: 4500, weeks: 2, category: "Brand" },
  { id: "ui_ux", label: "UI/UX Product Design (Figma)", cost: 6000, weeks: 3, category: "Design" },
  { id: "ai_integration", label: "AI & LLM Model Integration", cost: 5000, weeks: 2, category: "AI" },
  { id: "web_eng", label: "Full-Stack Web App (Next.js 15)", cost: 8000, weeks: 4, category: "Engineering" },
  { id: "design_system", label: "Scalable Component Library", cost: 3500, weeks: 2, category: "Design" },
  { id: "optimization", label: "Performance & SEO Audit", cost: 2000, weeks: 1, category: "Engineering" },
]

export function ServicesEstimator({ onOpenContactWithScope }: ServicesEstimatorProps) {
  const [selectedScopes, setSelectedScopes] = useState<string[]>(["ui_ux", "web_eng"])

  const toggleScope = (id: string) => {
    setSelectedScopes((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const selectedItems = scopeOptions.filter((opt) => selectedScopes.includes(opt.id))
  const totalCost = selectedItems.reduce((acc, item) => acc + item.cost, 0)
  const totalWeeks = selectedItems.reduce((acc, item) => acc + item.weeks, 0)

  const handleInquireWithScope = () => {
    const summaryList = selectedItems.map((i) => i.label).join(", ")
    const summary = `Selected Scope: [${summaryList}] | Estimated Total: $${totalCost.toLocaleString()} USD | Timeline: ~${totalWeeks} Weeks`
    onOpenContactWithScope(summary)
  }

  const servicesList = [
    {
      id: "01",
      title: "AI Product Design",
      description: "Intuitive, human-centered UI/UX for complex generative AI workflows, agentic tools, and LLM dashboards.",
      deliverables: ["User Journey Flows", "Generative Canvas UI", "Design Tokens", "Interactive Prototypes"],
    },
    {
      id: "02",
      title: "Full-Stack Web Engineering",
      description: "Performant, type-safe Next.js 15 applications with cloud persistence, edge caching, and clean architecture.",
      deliverables: ["Next.js 15 & React 19", "Server API Proxying", "Tailwind v4 Styling", "Vercel / Cloud Run Setup"],
    },
    {
      id: "03",
      title: "Brand Systems & Identity",
      description: "Cohesive visual identities, typographic scales, and digital assets designed to command market authority.",
      deliverables: ["Logo & Visual Identity", "Design System Guidelines", "Motion Graphics", "Marketing Collateral"],
    },
    {
      id: "04",
      title: "Growth & Optimization",
      description: "High-converting landing pages, sub-100ms load optimization, and A/B tested conversion funnels.",
      deliverables: ["Funnel Optimization", "Core Web Vitals", "Analytics Setup", "Speed & Accessibility"],
    },
  ]

  return (
    <section id="services" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      {/* Services Section Header */}
      <div className="mb-12 md:mb-20">
        <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight text-white max-w-3xl">
          End-to-end design & engineering execution.
        </h2>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 md:mb-28">
        {servicesList.map((service) => (
          <div
            key={service.id}
            className="bg-[#111111] border border-white/10 rounded-3xl p-8 hover:border-[#FF6B50]/50 transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">{service.description}</p>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-2">
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block mb-1">
                Includes
              </span>
              <div className="grid grid-cols-2 gap-2">
                {service.deliverables.map((item) => (
                  <div key={item} className="flex items-center gap-1.5 text-xs text-neutral-300">
                    <CheckIcon className="w-3.5 h-3.5 text-[#FF6B50] shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Estimator Box */}
      <div className="bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#0a0a0a] border border-white/15 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center px-3 py-1 bg-[#FF6B50]/10 border border-[#FF6B50]/20 rounded-full text-xs font-mono text-[#FF6B50] mb-2">
              Interactive Scope Estimator
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
              Calculate Your Project Investment
            </h3>
          </div>
          <p className="text-xs text-neutral-400 max-w-sm">
            Select the modules required for your project to generate an instant ballpark investment and timeline estimate.
          </p>
        </div>

        {/* Scope Checkbox Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {scopeOptions.map((opt) => {
            const active = selectedScopes.includes(opt.id)
            return (
              <button
                type="button"
                key={opt.id}
                onClick={() => toggleScope(opt.id)}
                className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-start justify-between gap-3 ${
                  active
                    ? "bg-[#FF6B50]/10 border-[#FF6B50] text-white shadow-lg"
                    : "bg-white/5 border-white/10 text-neutral-400 hover:border-white/20 hover:text-white"
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-1">
                    {opt.category}
                  </span>
                  <span className="text-sm font-bold block mb-1 leading-snug">{opt.label}</span>
                  <span className="text-xs font-mono text-neutral-300">
                    ${opt.cost.toLocaleString()} &bull; ~{opt.weeks}w
                  </span>
                </div>
                <div
                  className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-1 transition-colors ${
                    active ? "bg-[#FF6B50] border-[#FF6B50] text-black" : "border-white/20"
                  }`}
                >
                  {active && <CheckIcon className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </button>
            )
          })}
        </div>

        {/* Real-time Calculation Summary Bar */}
        <div className="bg-[#080808] border border-white/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-8">
            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                Estimated Investment
              </span>
              <span className="text-3xl font-extrabold text-white font-mono">
                ${totalCost.toLocaleString()} <span className="text-xs font-sans text-neutral-400">USD</span>
              </span>
            </div>

            <div className="h-8 w-px bg-white/10 hidden sm:block" />

            <div>
              <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                Estimated Timeline
              </span>
              <span className="text-3xl font-extrabold text-[#FF6B50] font-mono">
                ~{totalWeeks} <span className="text-xs font-sans text-neutral-400">Weeks</span>
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleInquireWithScope}
            disabled={selectedScopes.length === 0}
            className="w-full sm:w-auto px-8 py-4 bg-[#FF6B50] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>Book Scope with Estimate</span>
            <ArrowUpRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
