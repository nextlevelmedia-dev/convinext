'use client'

import { useEffect } from "react"
import dynamic from "next/dynamic"
import statsLottie from "../../public/lotties/Stats-Going-Up (1).json"
import "./StickyServices.css"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

type Service = {
  label: string
  title: string
  text: string
  cta: string
  href: string
  videoWebm?: string
  videoMp4?: string
  image?: string
  lottie?: string
}

type Props = {
  titleHighlight?: string
  titleNormal?: string
  subtitle?: string
  services: Service[]
}

function ServiceMedia({ service }: { service: Service }) {
  if (service.lottie === "Stats-Going-Up (1).json") {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Lottie
          animationData={statsLottie}
          loop
          autoplay
          style={{ width: "100%", maxWidth: 380 }}
        />
      </div>
    )
  }

  if (service.videoWebm || service.videoMp4) {
    return (
      <video autoPlay muted loop playsInline preload="none" className="stack-video">
        {service.videoWebm && <source src={service.videoWebm} />}
        {service.videoMp4 && <source src={service.videoMp4} />}
      </video>
    )
  }

  if (service.image) {
    return <img src={service.image} alt={service.title} className="stack-image" />
  }

  return null
}

export default function StickyServices({ titleHighlight, titleNormal, subtitle, services }: Props) {
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-stack-card]")
    )

    const onScroll = () => {
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const nextCard = cards[index + 1]
        const nextRect = nextCard?.getBoundingClientRect()

        if (nextRect && nextRect.top < window.innerHeight * 0.45) {
          card.classList.add("is-compressed")
        } else {
          card.classList.remove("is-compressed")
        }

        if (rect.top < window.innerHeight * 0.25) {
          card.classList.add("is-active")
        } else {
          card.classList.remove("is-active")
        }
      })
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section className="sticky-services">

      {(titleHighlight || titleNormal || subtitle) && (
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-6 items-start">

            <div>
              {(titleHighlight || titleNormal) && (
                <h2 className="text-4xl font-black leading-[1.2] tracking-tight text-slate-950 dark:text-white md:text-[42px]">
                  {titleHighlight && (
                    <span className="bg-brand-gradient bg-clip-text text-transparent">
                      {titleHighlight}
                    </span>
                  )}
                  {titleHighlight && titleNormal && " "}
                  {titleNormal}
                </h2>
              )}
            </div>

            {subtitle && (
              <div className="lg:pt-3">
                <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">
                  {subtitle}
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      <div className="scroll-stack" id="services-stack">
        {services.map((service) => (
          <article className="stack-card" data-stack-card key={service.title}>
            <div className="stack-card-grid">
              <div className="stack-card-content">
                <span className="stack-label">{service.label}</span>
                <h3 className="stack-title">
                  <span>{service.title}</span>
                </h3>
                <p className="stack-text">{service.text}</p>
                <a href={service.href} className="stack-button">
                  {service.cta}
                </a>
              </div>
              <div className="stack-media">
                <ServiceMedia service={service} />
              </div>
            </div>
          </article>
        ))}
      </div>

    </section>
  )
}