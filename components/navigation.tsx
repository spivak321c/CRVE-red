"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { getLenis } from "@/lib/lenis"
import { MenuIcon, CloseIcon, ArrowUpRightIcon } from "./icons"

interface NavigationProps {
  onOpenContact: () => void
}

export function Navigation({ onOpenContact }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
      getLenis()?.stop()
    } else {
      document.body.style.overflow = ""
      getLenis()?.start()
    }
    return () => {
      document.body.style.overflow = ""
      getLenis()?.start()
    }
  }, [mobileOpen])

  useEffect(() => {
    if (!mobileOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [mobileOpen])

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Selected Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Journal", href: "#journal" },
  ]

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault()
      setMobileOpen(false)
      const lenis = getLenis()
      if (lenis) {
        lenis.scrollTo(href, { duration: 1.2 })
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 px-6 py-5 ${
          scrolled ? "bg-[#080808]/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-10">
            <Link
              href="/"
              className="flex items-center gap-2.5 group relative z-[1010]"
              onClick={(e) => handleNavClick(e, "#hero")}
            >
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-black font-display text-2xl leading-none transition-colors duration-300 group-hover:bg-[#FF6B50]">
                C.
              </div>
              <span className="font-bold text-xl tracking-tight text-white group-hover:text-[#FF6B50] transition-colors">
                CRVE<span className="text-[#FF6B50]">.</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-9 text-base font-medium tracking-tight text-neutral-400">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-white transition-colors duration-200 py-1 relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF6B50] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenContact}
              className="hidden lg:inline-flex px-6 py-3 bg-[#1a1a1a] hover:bg-white hover:text-black border border-[#333333] hover:border-white text-sm font-semibold uppercase tracking-wider text-white rounded-xl transition-all duration-300 shadow-md items-center gap-2 group cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowUpRightIcon className="w-4.5 h-4.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden relative z-[1010] p-2.5 text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-drawer"
            >
              {mobileOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-[999] bg-[#050505]/98 backdrop-blur-2xl flex flex-col pt-28 px-8 pb-12 overflow-y-auto"
          >
            <div className="flex flex-col gap-6 max-w-md mx-auto w-full my-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-3xl font-bold tracking-tight text-white hover:text-[#FF6B50] transition-colors block py-2 border-b border-white/10"
                  >
                    {link.label}
                  </a>
                </motion.div>
              ))}

              <div className="pt-6 mt-4 border-t border-white/10 flex flex-col gap-4">
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Ready to launch your next AI product or brand system?
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    onOpenContact()
                  }}
                  className="w-full py-4 bg-[#FF6B50] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Start A Project</span>
                  <ArrowUpRightIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
