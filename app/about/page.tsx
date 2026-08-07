"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactModal } from "@/components/contact-modal"
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/scroll-reveal"
import { staggerFadeScale, magneticHover } from "@/lib/gsap-effects"

const values = [
  {
    number: "01",
    title: "Creativity",
    description: "We believe in the power of creative thinking to solve problems and create meaningful experiences that resonate with real people.",
  },
  {
    number: "02",
    title: "Integrity",
    description: "We operate with honesty and transparency in all our relationships. We stand by our work and our commitments.",
  },
  {
    number: "03",
    title: "Collaboration",
    description: "The best work comes from working closely with clients. We value diverse perspectives and genuine partnership.",
  },
  {
    number: "04",
    title: "Excellence",
    description: "We are committed to delivering exceptional quality in everything we do. No shortcuts, no compromises.",
  },
]

const process = [
  {
    step: "01",
    title: "Discovery",
    description: "We dig deep into your business, market, and audience through research and workshops to uncover real opportunities.",
  },
  {
    step: "02",
    title: "Strategy",
    description: "We craft a focused strategy aligned with your goals, defining a clear roadmap from where you are to where you want to be.",
  },
  {
    step: "03",
    title: "Creation",
    description: "Our team brings the strategy to life through world-class design, compelling content, and powerful storytelling.",
  },
  {
    step: "04",
    title: "Delivery",
    description: "We manage the entire implementation, ensuring a seamless launch with ongoing support and optimization.",
  },
]

const team = [
  {
    name: "Kuchukwu",
    role: "Product Designer",
    image: "https://res.cloudinary.com/mwvch9hy/image/upload/v1783198709/kuch_eiesrl.jpg",
  },
  {
    name: "Andre",
    role: "Fullstack Developer",
    image: "https://res.cloudinary.com/mwvch9hy/image/upload/v1783198701/andre_zgqi1y.jpg",
  },
]

const statsData = [
  { value: 48, suffix: " +", label: "Projects Delivered" },
  { value: 24, suffix: " +", label: "Happy Clients" },
  { value: 2, suffix: "", label: "Years of Craft" },
  { value: 2, suffix: "", label: "Team Members" },
]

function StatCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    setCount(0)
    const duration = 1500
    const start = performance.now()
    let raf: number
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * value))
      if (progress < 1) {
        raf = requestAnimationFrame(step)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [isInView, value])

  return (
    <div ref={ref} className={`text-center flex-1 transition-all duration-700 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
      <span className="block font-display text-[clamp(2.5rem,5vw,4rem)] tracking-tight text-[#F5F3EE] leading-none">
        {count}
        <span className="text-[#FF6B50]">{suffix}</span>
      </span>
      <span className="block font-mono text-[11px] text-neutral-500 uppercase tracking-[0.2em] mt-3">
        {label}
      </span>
    </div>
  )
}

export default function AboutPage() {
  const [contactOpen, setContactOpen] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const valuesCtx = staggerFadeScale(".values-card", {
      duration: 0.6,
      stagger: 0.1,
      delay: 0.1,
      fromScale: 0.92,
    })
    const teamCtx = staggerFadeScale(".team-member", {
      duration: 0.6,
      stagger: 0.08,
      delay: 0.1,
      fromScale: 0.96,
    })
    magneticHover(".team-member", 0.12)

    return () => {
      valuesCtx?.scrollTrigger?.kill()
      valuesCtx?.kill()
      teamCtx?.scrollTrigger?.kill()
      teamCtx?.kill()
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#050505] text-[#ebebeb] relative selection:bg-[#FF6B50] selection:text-white overflow-x-hidden">
      <Navigation onOpenContact={() => setContactOpen(true)} />

      {/* Hero */}
      <section className="relative pt-40 pb-24 md:pb-32 px-6 md:px-12 overflow-hidden min-h-[72vh] flex items-center border-b border-white/5">
        <span
          aria-hidden
          className="absolute -top-8 right-0 md:right-8 font-display text-[clamp(10rem,28vw,24rem)] text-white/[0.03] leading-none pointer-events-none select-none"
        >
          About
        </span>
        <StaggerContainer className="max-w-[1400px] mx-auto relative z-10 w-full">
          <StaggerItem>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6B50] block mb-8">
              ( About CRVE )
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="font-display text-[clamp(2.5rem,7.5vw,6.5rem)] uppercase leading-[1.02] tracking-[-0.01em] text-[#F5F3EE] max-w-5xl mb-8">
              We build brands that outlast trends.
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="text-base md:text-lg text-neutral-400 leading-relaxed max-w-xl font-light">
              An independent design and development studio.
              We do not follow trends. We build systems that scale and outlive the moment.
            </p>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Studio Monogram */}
      <section className="border-b border-white/5">
        <div className="h-[40vh] md:h-[52vh] w-full flex items-center justify-center">
          <span className="font-display text-[clamp(5rem,16vw,14rem)] text-white/[0.04] tracking-[-0.02em] select-none">
            CRVE
          </span>
        </div>
      </section>

      {/* Our Story */}
      <section className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6B50] block mb-14">
              ( Our Story )
            </p>
          </ScrollReveal>
          <div className="space-y-10">
            <ScrollReveal>
              <p className="font-display uppercase text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.08] tracking-[0.01em] text-[#F5F3EE] max-w-4xl">
                Founded in 2024. Built for the bold.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed font-light italic max-w-3xl">
                We believe design should solve problems, not just look good.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="max-w-xl space-y-6">
                <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
                  CRVE started with a belief: design should solve problems, not just look good.
                  What began as a small team of strategists and engineers has grown into a full-service
                  creative studio working with startups, established brands, and everything in between.
                </p>
                <p className="text-sm md:text-base text-neutral-400 leading-relaxed font-light">
                  Every project teaches us something new and shapes our approach to creative problem-solving.
                  We do not believe in one-size-fits-all solutions. Each client brings a unique challenge,
                  and we meet it with the same rigor and curiosity every time.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-0">
              {statsData.map((stat, i) => (
                <div key={stat.label} className="flex-1 w-full md:w-auto flex items-center justify-center">
                  <StatCounter value={stat.value} suffix={stat.suffix} label={stat.label} delay={i * 0.1} />
                  {i < statsData.length - 1 && (
                    <div className="hidden md:block w-px h-14 bg-white/5" />
                  )}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-white/5" ref={sectionRef}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6B50] block mb-14">
              ( Values )
            </p>
          </ScrollReveal>

          {/* Desktop: horizontal track */}
          <ScrollReveal>
            <div className="hidden md:flex items-center gap-3 font-mono text-xs text-neutral-500 uppercase tracking-[0.2em] mb-10">
              <span>Scroll</span>
              <motion.svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </div>
          </ScrollReveal>
          <div className="hidden md:block overflow-x-auto [&::-webkit-scrollbar]:hidden -mx-6 px-6">
            <div className="flex gap-6 pb-4 w-max">
              {values.map((value, i) => (
                <motion.div
                  key={value.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="values-card w-[340px] flex-shrink-0 border border-white/10 bg-white/[0.02] p-8 hover:-translate-y-1 hover:border-[#FF6B50]/40 transition-all duration-500 flex flex-col justify-between group"
                >
                  <span className="font-display text-5xl text-white/[0.08] block mb-6 group-hover:text-[#FF6B50]/30 transition-colors duration-500">
                    {value.number}
                  </span>
                  <div>
                    <h3 className="font-display uppercase tracking-[0.02em] text-xl md:text-2xl text-[#F5F3EE] mb-3">
                      {value.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-4">
            {values.map((value, i) => (
              <ScrollReveal key={value.number} delay={i * 0.08}>
                <div className="values-card border border-white/10 bg-white/[0.02] p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="font-mono text-xs text-[#FF6B50]">{value.number}</span>
                    <h3 className="font-display uppercase tracking-[0.02em] text-lg text-[#F5F3EE]">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6B50] block mb-16">
              ( Process )
            </p>
          </ScrollReveal>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-0 right-0 h-px bg-white/10" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
              {process.map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 0.1}>
                  <div className="relative">
                    <div className="hidden md:flex items-center justify-center w-6 h-6 border border-white/20 bg-[#050505] relative z-10 mb-8">
                      <div className="w-2 h-2 bg-[#FF6B50]" />
                    </div>
                    <span className="hidden md:block font-display text-5xl text-white/[0.08] mb-4">
                      {item.step}
                    </span>
                    <div className="flex items-center gap-4 md:hidden mb-3">
                      <span className="font-mono text-2xl text-[#FF6B50]/60">
                        {item.step}
                      </span>
                      <h3 className="font-display uppercase tracking-[0.02em] text-lg text-[#F5F3EE]">
                        {item.title}
                      </h3>
                    </div>
                    <h3 className="hidden md:block font-display uppercase tracking-[0.02em] text-xl md:text-2xl text-[#F5F3EE] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-400 leading-relaxed max-w-xs">
                      {item.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#FF6B50] block mb-14">
              ( Team )
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.08}>
                <div className="team-member group border border-white/10 bg-white/[0.02] overflow-hidden hover:border-[#FF6B50]/40 transition-all duration-500">
                  <div className="relative aspect-[3/4] overflow-hidden bg-[#0a0a0a]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display uppercase tracking-[0.02em] text-base text-[#F5F3EE]">
                      {member.name}
                    </h3>
                    <p className="font-mono text-xs text-neutral-500 mt-1 uppercase tracking-[0.15em]">
                      {member.role}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b-0">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-20 md:py-28">
          <ScrollReveal className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 mb-8">
              Ready to build something great?
            </p>
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="group inline-flex items-center gap-5 text-sm font-mono font-semibold uppercase tracking-[0.2em] text-white hover:text-[#FF6B50] active:text-[#FF6B50] transition-colors duration-300 cursor-pointer"
            >
              Start a Project
              <span className="inline-block w-16 h-px bg-[#FF6B50] group-hover:w-24 transition-all duration-500" />
            </button>
          </ScrollReveal>
        </div>
      </section>

      <Footer onOpenContact={() => setContactOpen(true)} />

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </main>
  )
}