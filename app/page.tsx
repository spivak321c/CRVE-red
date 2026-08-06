"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Benefits } from "@/components/benefits"
import { ProjectGallery } from "@/components/project-gallery"
import { ServicesEstimator } from "@/components/services-estimator"
import { JournalSection } from "@/components/journal-section"
import { Footer } from "@/components/footer"
import { ContactModal } from "@/components/contact-modal"

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false)
  const [initialScope, setInitialScope] = useState("")

  const handleOpenContact = () => {
    setInitialScope("")
    setContactOpen(true)
  }

  const handleOpenContactWithScope = (scopeSummary: string) => {
    setInitialScope(scopeSummary)
    setContactOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#ebebeb] relative selection:bg-[#FF6B50] selection:text-white">
      {/* Top Glass Navigation */}
      <Navigation onOpenContact={handleOpenContact} />

      {/* Hero Section */}
      <Hero onOpenContact={handleOpenContact} />

      {/* Benefits / Hyper-growth section */}
      <Benefits />

      {/* Selected Work Gallery */}
      <ProjectGallery />

      {/* Services & Interactive Scope Estimator */}
      <ServicesEstimator onOpenContactWithScope={handleOpenContactWithScope} />

      {/* Journal & Insights */}
      <JournalSection />

      {/* Footer */}
      <Footer onOpenContact={handleOpenContact} />

      {/* Interactive Contact & Discovery Call Modal */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        initialScope={initialScope}
      />
    </div>
  )
}
