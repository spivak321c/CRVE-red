"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { getLenis } from "@/lib/lenis"
import { CloseIcon, ArrowUpRightIcon } from "./icons"

interface Article {
  id: string
  title: string
  date: string
  readTime: string
  category: string
  summary: string
  content: string[]
}

const articles: Article[] = [
  {
    id: "100ms-ui",
    title: "The 100ms UI Revolution: Speed as a Core Design System Element",
    date: "August 2026",
    readTime: "4 min read",
    category: "Design Engineering",
    summary: "Why latency is the most overlooked design metric in modern software products, and how ultra-fast interactions rebuild user trust.",
    content: [
      "In modern software engineering, speed is no longer just a technical metric handled by backend engineers. It is a fundamental user interface feature.",
      "When a micro-interaction responds in under 100 milliseconds, users perceive the application as an extension of their own thought process rather than a remote server calculation.",
      "By combining server components, optimistic UI updates, and zero-layout-shift design tokens, product teams can drastically reduce cognitive friction and unlock double-digit conversion gains.",
    ],
  },
  {
    id: "ai-native-ui",
    title: "Designing AI-Native Products: Moving Beyond Chat Interfaces",
    date: "July 2026",
    readTime: "6 min read",
    category: "AI & UX Architecture",
    summary: "The simple chat box is fading. Here is how modern generative products are adopting contextual canvases, voice flows, and proactive agents.",
    content: [
      "While the conversational chat prompt was the initial bridge to generative AI, power users quickly outgrow scrolling text threads for complex workflows.",
      "The future of AI-native software lies in hybrid spatial canvases: surfaces where AI agents synthesize code, visuals, and data in real-time right alongside human edits.",
      "At CRVE, we structure AI interfaces around high-velocity feedback loops—providing dynamic controls that adapt based on prompt confidence and context.",
    ],
  },
  {
    id: "saas-branding",
    title: "The Death of Generic SaaS Branding: Crafting Market Distinction",
    date: "June 2026",
    readTime: "5 min read",
    category: "Brand Strategy",
    summary: "Why identical purple gradients and standard Inter font stacks are killing brand recall, and how distinct typography establishes authority.",
    content: [
      "Over the past five years, B2B SaaS aesthetics converged into a singular template: dark backgrounds, purple-to-blue neon glow, and generic geometric sans-serif fonts.",
      "When every product looks like a clone of its competitor, brand affinity collapses and marketing costs surge. True distinction comes from deliberate typographic pairing and tactile visual language.",
      "By introducing high-contrast display fonts, bespoke color accents (like our signature coral), and structural rhythm, brands stand out instantly in saturated landscapes.",
    ],
  },
]

export function JournalSection() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)

  return (
    <section id="journal" className="py-20 md:py-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex justify-between items-end mb-12 md:mb-16 border-b border-[#222222] pb-8 md:pb-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Our Journal
        </h2>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault()
            const lenis = getLenis()
            if (lenis) {
              lenis.scrollTo("#contact", { duration: 1.2 })
            } else {
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
          }}
          className="hidden md:flex items-center gap-1 text-xs font-mono uppercase tracking-wider text-neutral-400 hover:text-white transition-colors"
        >
          <span>Subscribe to Insights</span>
          <ArrowUpRightIcon className="w-4 h-4 text-[#FF6B50]" />
        </a>
      </div>

      {/* Article List */}
      <div className="space-y-6">
        {articles.map((article) => (
          <article
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="p-8 bg-[#111111] hover:bg-[#161616] border border-white/10 rounded-2xl transition-all duration-300 cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 mb-3">
                <span className="text-[#FF6B50] font-bold">{article.category}</span>
                <span>&bull;</span>
                <span>{article.date}</span>
                <span>&bull;</span>
                <span>{article.readTime}</span>
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-[#FF6B50] transition-colors mb-2">
                {article.title}
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed">{article.summary}</p>
            </div>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white group-hover:text-[#FF6B50] transition-colors shrink-0">
              <span>Read Article</span>
              <ArrowUpRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </article>
        ))}
      </div>

      {/* Reader Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedArticle(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f0f0f] border border-white/15 rounded-3xl max-w-3xl w-full max-h-[85vh] overflow-y-auto p-8 sm:p-12 text-white relative shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close article"
              >
                <CloseIcon className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 text-xs font-mono text-[#FF6B50] uppercase tracking-widest mb-4">
                <span>{selectedArticle.category} &bull; {selectedArticle.readTime}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
                {selectedArticle.title}
              </h2>

              <div className="prose prose-invert max-w-none space-y-6 text-neutral-300 leading-relaxed text-base sm:text-lg border-t border-white/10 pt-6">
                {selectedArticle.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs font-mono text-neutral-500">CRVE Editorial Team</span>
                <button
                  type="button"
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
