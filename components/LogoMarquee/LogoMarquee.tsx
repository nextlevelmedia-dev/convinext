"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { urlFor } from "../../sanity/lib/image"
import "./LogoMarquee.css"

interface Logo {
  logo: { asset: { _ref: string } }
  alt: string
}

interface LogoMarqueeProps {
  logosRowOne?: Logo[] | null
  logosRowTwo?: Logo[] | null
}

function MarqueeRow({ logos, direction }: { logos: Logo[]; direction: "left" | "right" }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const posRef = useRef(0)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const isMobile = window.innerWidth < 768
    const speed = isMobile ? 0.4 : 0.8
    const dir = direction === "left" ? -1 : 1

    if (direction === "right") {
      posRef.current = -track.scrollWidth / 2
    }

    const animate = () => {
      posRef.current += speed * dir
      const half = track.scrollWidth / 2

      if (direction === "left" && posRef.current <= -half) posRef.current = 0
      if (direction === "right" && posRef.current >= 0) posRef.current = -half

      track.style.transform = `translateX(${posRef.current}px)`
      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [direction])

  return (
    <div className="relative flex overflow-hidden w-full marquee-fade">
      <div ref={trackRef} style={{ display: "flex", width: "max-content" }}>
        {logos.map((item, i) => (
          <div key={`a-${i}`} className="flex shrink-0 items-center justify-center px-4 md:px-8">
            <Image
              src={urlFor(item.logo).width(240).height(120).url()}
              alt={item.alt}
              width={240}
              height={120}
              className="h-10 md:h-20 w-auto object-contain block"
            />
          </div>
        ))}
        {logos.map((item, i) => (
          <div key={`b-${i}`} className="flex shrink-0 items-center justify-center px-4 md:px-8">
            <Image
              src={urlFor(item.logo).width(240).height(120).url()}
              alt={item.alt}
              width={240}
              height={120}
              className="h-10 md:h-20 w-auto object-contain block"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LogoMarquee({ logosRowOne, logosRowTwo }: LogoMarqueeProps) {
  const rowOne = logosRowOne ?? []
  const rowTwo = logosRowTwo ?? []

  if (!rowOne.length && !rowTwo.length) return null

  return (
    <section className="py-4 overflow-hidden">
      <div className="flex flex-col gap-6 md:gap-10">
        {rowOne.length > 0 && <MarqueeRow logos={rowOne} direction="left" />}
        {rowTwo.length > 0 && <MarqueeRow logos={rowTwo} direction="right" />}
      </div>
    </section>
  )
}