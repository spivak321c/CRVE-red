"use client"

import { useState } from "react"

interface FooterProps {
  onOpenContact: () => void
}

export function Footer({ onOpenContact }: FooterProps) {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null)

  const socials = [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "X", href: "https://x.com" },
    { label: "LinkedIn", href: "https://linkedin.com" },
  ]

  return (
    <footer id="contact" className="relative pt-24 md:pt-36 pb-20 md:pb-28 px-6 md:px-12 border-t border-[#1a1a1a] bg-[#050505]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-16">
        <div className="flex-1">
          <h2
            onClick={onOpenContact}
            className="text-[16vw] md:text-[11vw] leading-[0.9] font-display tracking-tight text-white hover:text-[#FF6B50] transition-colors duration-500 mb-12 select-none cursor-pointer"
          >
            LET&apos;S<br />TALK.
          </h2>
          <div className="flex flex-col gap-6">
            <a
              href="mailto:hello@crve.studio"
              className="text-2xl sm:text-4xl font-semibold hover:text-[#FF6B50] transition-all w-fit border-b border-white/20 pb-1"
            >
              hello@crve.studio
            </a>
            <p className="text-[#888888] text-xs sm:text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF6B50]" />
              <span>Available for worldwide collaborations & remote projects.</span>
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col md:items-end gap-3 md:mb-6">
          {socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-colors w-fit relative group"
            >
              {social.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#FF6B50] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 md:mt-32 pt-8 border-t border-[#111111] flex flex-col md:flex-row justify-between items-center text-[#555555] text-[11px] font-mono uppercase tracking-widest gap-4">
        <p>&copy; 2026 CRVE Agency. All rights reserved.</p>
        <div className="flex gap-8">
          <button
            type="button"
            onClick={() => setModalType("privacy")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => setModalType("terms")}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
        </div>
      </div>

      {/* Policy Modal */}
      {modalType && (
        <div
          className="fixed inset-0 z-[2500] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          onClick={() => setModalType(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#121212] border border-white/15 rounded-2xl max-w-lg w-full p-8 text-white space-y-4"
          >
            <h3 className="text-xl font-bold uppercase tracking-wider text-[#FF6B50]">
              {modalType === "privacy" ? "Privacy Policy" : "Terms of Service"}
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {modalType === "privacy"
                ? "CRVE values your data privacy. We collect minimal analytics purely to improve service delivery and client interactions. We never sell or share client data with third parties."
                : "All project briefs, estimates, and deliverables generated through CRVE are governed by mutual intellectual property agreements executed prior to project kickoff."}
            </p>
            <button
              type="button"
              onClick={() => setModalType(null)}
              className="mt-4 px-6 py-2 bg-[#FF6B50] text-black font-bold text-xs uppercase rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </footer>
  )
}
