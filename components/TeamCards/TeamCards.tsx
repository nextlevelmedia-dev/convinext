"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { PortableText } from "@portabletext/react"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

interface Card {
  title: string
  description: string
  lottieFile: string
}

interface TeamCardsProps {
  titleHighlight?: string
  titleNormal?: string
  subtitle?: any
  cards?: Card[] | null
}

function TeamCard({ card, large }: { card: Card; large?: boolean }) {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    if (!card.lottieFile) return
    let cancelled = false
    fetch(`/lotties/${card.lottieFile}`)
      .then((res) => res.json())
      .then((data) => { if (!cancelled) setAnimationData(data) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [card.lottieFile])

  return (
    <div className={`team-card card-adaptive rounded-2xl p-8 ${large ? "team-card--large" : ""}`}>
      <div className="mb-6 flex items-center justify-center">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop
            autoplay
            style={{ width: large ? 280 : 200, height: large ? 280 : 200 }}
          />
        ) : (
          <div className="h-48 w-48 rounded-xl bg-slate-100" />
        )}
      </div>
      <h3 style={{ marginBottom: "12px", fontSize: "20px", fontWeight: 700, color: "inherit" }}>{card.title}</h3>
      <p style={{ fontSize: "16px", lineHeight: 1.75, opacity: 0.7, color: "inherit" }}>{card.description}</p>
    </div>
  )
}

export default function TeamCards({ titleHighlight, titleNormal, subtitle, cards }: TeamCardsProps) {
  const cardList = cards ?? []
  if (!cardList.length) return null

  const largeCards = cardList.slice(0, 2)
  const smallCards = cardList.slice(2)

  return (
    <section className="px-6 py-24 bg-[#f2f2f2] dark:bg-[#111118]">
      <div className="mx-auto max-w-6xl">

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-5 items-start">
          <div className="md:col-span-2">
            {(titleHighlight || titleNormal) && (
              <h2 className="text-4xl font-black leading-[1.2] tracking-tight md:text-[42px] text-slate-950 dark:text-white">
                {titleHighlight && (
                  <span className="bg-brand-gradient bg-clip-text text-transparent">
                    {titleHighlight}
                  </span>
                )}
                {titleNormal && <span>{titleNormal}</span>}
              </h2>
            )}
          </div>
          {subtitle && (
            <div className="md:col-span-3 md:pt-3 text-lg font-medium leading-8 text-slate-600 dark:text-white/60">
              <PortableText value={subtitle} />
            </div>
          )}
        </div>

        {largeCards.length > 0 && (
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            {largeCards.map((card, i) => (
              <TeamCard key={i} card={card} large />
            ))}
          </div>
        )}

        {smallCards.length > 0 && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {smallCards.map((card, i) => (
              <TeamCard key={i} card={card} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}