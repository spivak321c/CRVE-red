"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CloseIcon, SendIcon, CheckCircleIcon } from "./icons"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
  initialScope?: string
}

export function ContactModal({ isOpen, onClose, initialScope }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Full AI Product & Web Engineering",
    budget: "$10k - $25k",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (initialScope) {
      setFormData((prev) => ({
        ...prev,
        message: initialScope,
      }))
    }
  }, [initialScope])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  const resetForm = () => {
    setSubmitted(false)
    setFormData({
      name: "",
      email: "",
      company: "",
      projectType: "Full AI Product & Web Engineering",
      budget: "$10k - $25k",
      message: "",
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[3000] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#0f0f0f] border border-white/15 rounded-3xl max-w-2xl w-full p-8 sm:p-12 text-white relative shadow-2xl my-auto"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 active:bg-white/20 text-white rounded-full transition-colors cursor-pointer"
              aria-label="Close contact form"
            >
              <CloseIcon className="w-5 h-5" />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-6"
              >
                <div className="w-16 h-16 bg-[#FF6B50]/10 border border-[#FF6B50] text-[#FF6B50] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircleIcon className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-extrabold">Project Inquiry Received!</h3>
                <p className="text-neutral-300 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our lead partner will review your requirements and reach out at <span className="text-[#FF6B50] font-mono">{formData.email}</span> within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-8 py-3.5 bg-white text-black font-extrabold text-xs uppercase rounded-xl hover:bg-neutral-200 active:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                  Let&apos;s Build Together.
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 mb-8">
                  Fill out the form below or email us directly at{" "}
                  <a href="mailto:hello@crve.studio" className="text-[#FF6B50] underline">
                    hello@crve.studio
                  </a>
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Jenkins"
                        className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF6B50] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF6B50] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                        Company / Project Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Inc."
                        className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF6B50] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                        Target Budget
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF6B50] transition-colors"
                      >
                        <option value="<$10k">&lt; $10k USD</option>
                        <option value="$10k - $25k">$10k - $25k USD</option>
                        <option value="$25k - $50k">$25k - $50k USD</option>
                        <option value="$50k+">$50k+ USD (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block mb-1">
                      Project Details & Scope
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your product goals, timeline, or scope requirements..."
                      className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#FF6B50] transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#FF6B50] hover:bg-white active:bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <span>Sending Inquiry...</span>
                    ) : (
                      <>
                        <span>Send Project Brief</span>
                        <SendIcon className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
