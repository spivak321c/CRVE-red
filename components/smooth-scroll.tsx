"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import { setLenis, getLenis } from "@/lib/lenis"

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    if (getLenis()) return

    const lenis = new Lenis({
      duration: 1.2,
      autoRaf: true,
    })
    setLenis(lenis)

    return () => {
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  return null
}
