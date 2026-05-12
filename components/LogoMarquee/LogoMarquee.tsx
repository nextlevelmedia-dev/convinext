"use client"

import Image from "next/image"
import { PortableText } from "@portabletext/react"
import { urlFor } from "../../sanity/lib/image"
import "./LogoMarquee.css"

interface Logo {
  logo: { asset: { _ref: string } }
  alt: string
}

interface LogoMarqueeProps {
  title?: string
  subtitle?: any
  logosRowOne?: Logo[] | null
  logosRowTwo?: Logo[] | null
}

function MarqueeRow({ logos, direction }: { logos: Logo[]; direction: "left" | "right" }) {
  return (
    <div className="relative flex overflow-hidden w-full marquee-fade">
      <div className={`marquee-track ${direction === "left" ? "marquee-track-left" : "marquee-track-right"}`}>
        {logos.map((item, i) => (
          <div key={`a-${i}`} className="flex shrink-0 items-center justify-center px-8">
            <Image
              src={urlFor(item.logo).width(240).height(120).url()}
              alt={item.alt}
              width={240}
              height={120}
              className="h-20 w-auto object-contain transition-all duration-300"
            />
          </div>
        ))}
        {logos.map((item, i) => (
          <div key={`b-${i}`} className="flex shrink-0 items-center justify-center px-8">
            <Image
              src={urlFor(item.logo).width(240).height(120).url()}
              alt={item.alt}
              width={240}
              height={120}
              className="h-20 w-auto object-contain transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function LogoMarquee({ title, subtitle, logosRowOne, logosRowTwo }: LogoMarqueeProps) {
  const rowOne = logosRowOne ?? []
  const rowTwo = logosRowTwo ?? []

  if (!rowOne.length && !rowTwo.length) return null

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="mx-auto max-w-2xl px-6 text-center text-slate-950 mb-16">
        {title && (
          <h2 className="text-4xl font-black leading-[1.2] tracking-tight md:text-[42px]">
            {title}
          </h2>
        )}
        {subtitle && (
          <div className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">
            <PortableText value={subtitle} />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-10">
        {rowOne.length > 0 && <MarqueeRow logos={rowOne} direction="left" />}
        {rowTwo.length > 0 && <MarqueeRow logos={rowTwo} direction="right" />}
      </div>
    </section>
  )
}