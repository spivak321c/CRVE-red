import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function staggerFadeScale(
  selector: string,
  opts: { duration?: number; stagger?: number; delay?: number; fromScale?: number } = {},
) {
  const { duration = 0.6, stagger = 0.1, delay = 0.1, fromScale = 0.9 } = opts
  const targets = gsap.utils.toArray<HTMLElement>(selector)
  if (!targets.length) return

  return gsap.fromTo(
    targets,
    { opacity: 0, y: 32, scale: fromScale },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: targets[0],
        start: "top 88%",
        once: true,
      },
    },
  )
}

export function magneticHover(selector: string, strength = 0.2) {
  const targets = gsap.utils.toArray<HTMLElement>(selector)
  if (!targets.length) return

  targets.forEach((el) => {
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" })
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" })

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const relX = e.clientX - (rect.left + rect.width / 2)
      const relY = e.clientY - (rect.top + rect.height / 2)
      xTo(relX * strength)
      yTo(relY * strength)
    }

    const onLeave = () => {
      xTo(0)
      yTo(0)
    }

    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
  })
}