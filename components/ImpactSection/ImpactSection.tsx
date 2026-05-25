"use client"

import { useEffect, useRef } from "react"

interface ImpactSectionProps {
  titleHighlight?: string
  titleNormal?: string
  subtitle?: string
  impactText?: string
}

export default function ImpactSection({
  titleHighlight,
  titleNormal,
  subtitle,
  impactText,
}: ImpactSectionProps) {
  const impactRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = impactRef.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowHeight = window.innerHeight

      const triggerPoint = windowHeight * 0.2
      const startPoint = windowHeight
      const progress = Math.max(0, Math.min(1, (startPoint - rect.top) / (startPoint - triggerPoint)))

      const scale = 1.6 - progress * 0.6
      const opacity = progress
      const translateY = 60 - progress * 60

      el.style.transform = `scale(${scale}) translateY(${translateY}px)`
      el.style.opacity = `${opacity}`
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative px-6 pt-20 pb-16">
      <div className="mx-auto max-w-6xl">

        <div className="text-center mb-4">
          {(titleHighlight || titleNormal) && (
            <h2 className="text-3xl font-black leading-[1.2] tracking-tight text-slate-950 dark:text-white md:text-5xl mb-6 mx-auto max-w-2xl">
              {titleHighlight && (
                <span className="bg-brand-gradient bg-clip-text text-transparent">
                  {titleHighlight}
                </span>
              )}
              {titleHighlight && titleNormal && " "}
              {titleNormal}
            </h2>
          )}
          {subtitle && (
            <p className="text-base leading-7 text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {impactText && (
          <div className="flex items-center justify-center py-8">
            <div
              ref={impactRef}
              className="font-black text-center leading-none select-none"
              style={{
                fontSize: "clamp(80px, 35vw, 200px)",
                background: "linear-gradient(to right, #fc03b0, #047cf9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: 0,
                transform: "scale(1.3) translateY(60px)",
                willChange: "transform, opacity",
                transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
              }}
            >
              {impactText}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}