"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { CloseIcon, CheckIcon } from "./icons"

interface Project {
  id: string
  title: string
  category: string
  year: string
  description: string
  deliverables: string[]
  metrics: string
  image: string
  featuredImage: string
  client: string
}

const projects: Project[] = [
  {
    id: "nebula",
    title: "NEBULA",
    category: "Brand Identity / AI",
    year: "2026",
    description: "Generative AI branding and interactive prompt engineering portal for next-gen creative models. Built with real-time WebGL canvas and instant model preview.",
    deliverables: ["Visual Identity System", "WebGL Shader Canvas", "React 19 App", "Design Tokens"],
    metrics: "+240% User Retention",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop",
    featuredImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    client: "Nebula AI Labs Inc.",
  },
  {
    id: "quantum",
    title: "QUANTUM",
    category: "Web Design / Fintech",
    year: "2026",
    description: "High-frequency crypto trading dashboard & multi-asset institutional portfolio tracker with sub-10ms UI updates and dark glassmorphic styling.",
    deliverables: ["UX Architecture", "Dark Mode System", "WebSocket Data Engine", "Design System"],
    metrics: "$1.4B Volume Tracked",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop",
    featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    client: "Quantum Capital Global",
  },
  {
    id: "echo",
    title: "ECHO",
    category: "Art Direction / Media",
    year: "2025",
    description: "Immersive audio streaming platform and editorial publication for experimental music producers and ambient soundscapes.",
    deliverables: ["Art Direction", "Custom Web Player", "Editorial Layout", "Sound Synthesis UI"],
    metrics: "1.2M Monthly Streams",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop",
    featuredImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    client: "Echo Media Group",
  },
  {
    id: "flux",
    title: "FLUX",
    category: "Development / SaaS",
    year: "2025",
    description: "Automated developer workflow platform and CI/CD observability dashboard designed to reduce release friction by 70%.",
    deliverables: ["Full Stack Platform", "API Architecture", "Component Library", "Micro-animations"],
    metrics: "70% Faster Releases",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    featuredImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
    client: "Flux Developer Technologies",
  },
]

export function ProjectGallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="work" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="flex justify-between items-end mb-12 md:mb-20 border-b border-[#222222] pb-8 md:pb-10">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
          Case Studies
        </h2>
        <span className="hidden md:block text-[#666666] text-xs font-mono uppercase tracking-widest">
          2026
        </span>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-20 md:gap-y-32">
        {projects.map((project, idx) => (
          <article
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className={`group cursor-pointer ${idx % 2 === 1 ? "md:mt-24" : ""}`}
          >
            <div className="aspect-[4/3] overflow-hidden bg-[#111111] rounded-2xl border border-white/10 relative">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-mono text-[#FF6B50] font-bold">
                {project.metrics}
              </div>
            </div>

            <div className="mt-8 flex justify-between items-start gap-4">
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight mb-2 text-white relative w-fit group-hover:text-[#FF6B50] transition-colors">
                  {project.title}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-[#FF6B50] transition-all duration-300 group-hover:w-full" />
                </h3>
                <p className="text-[#888888] text-[10px] font-mono font-bold uppercase tracking-[0.2em]">
                  {project.category}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Detailed Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f0f0f] border border-white/15 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 text-white relative shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
                aria-label="Close case study"
              >
                <CloseIcon className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-3 text-xs font-mono text-[#FF6B50] uppercase tracking-widest">
                <span>{selectedProject.category} &bull; {selectedProject.year}</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
                {selectedProject.title}
              </h2>

              <p className="text-neutral-300 text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
                {selectedProject.description}
              </p>

              <div className="relative aspect-video rounded-2xl overflow-hidden mb-8 border border-white/10">
                <Image
                  src={selectedProject.featuredImage}
                  alt={selectedProject.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 bg-[#161616] rounded-2xl border border-white/10 mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                    Client & Impact
                  </span>
                  <p className="text-sm font-bold text-white mb-1">{selectedProject.client}</p>
                  <p className="text-xs font-mono text-[#FF6B50] font-bold">{selectedProject.metrics}</p>
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                    Core Deliverables
                  </span>
                  <div className="space-y-1">
                    {selectedProject.deliverables.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-xs text-neutral-300">
                        <CheckIcon className="w-3.5 h-3.5 text-[#FF6B50]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
