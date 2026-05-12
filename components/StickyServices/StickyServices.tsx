'use client'

import { useEffect } from "react"
import "./StickyServices.css"

const services = [
  {
    label: "Ecommerce Solutions",
    title: "Ecommerce Shopify",
    text: "Ottieni più vendite con un ecommerce Shopify progettato per convertire e offrire un’esperienza fluida.",
    cta: "Ottimizza il tuo ecommerce",
    href: "/ecommerce",
    videoWebm: "https://next-level-media.it/wp-content/uploads/2026/03/Ecommerce.webm",
    videoMp4: "https://next-level-media.it/wp-content/uploads/2026/03/Ecommerce.mp4",
  },
  {
    label: "Conversion Optimization",
    title: "Ottimizzazione Conversioni",
    text: "Genera più ricavi dagli stessi visitatori migliorando conversioni e performance.",
    cta: "Ottieni di più dal tuo traffico",
    href: "/ottimizzazione-conversioni",
    image: "https://next-level-media.it/wp-content/uploads/2026/04/Progetto-senza-titolo-2026-04-27T163434.994.webp",
  },
  {
    label: "Shopify Development",
    title: "Temi Shopify Custom",
    text: "Supera i limiti dei temi standard con un ecommerce Shopify sviluppato su misura per il tuo business.",
    cta: "Scopri il tuo tema su misura",
    href: "/temi-shopify",
    videoWebm: "https://next-level-media.it/wp-content/uploads/2025/12/Temi-shopify.01.webm",
    videoMp4: "https://next-level-media.it/wp-content/uploads/2025/12/Temi-shopify.01.mp4",
  },
  {
    label: "Web Performance",
    title: "Siti Web Performanti",
    text: "Ottieni più lead e clienti con pagine ottimizzate per guidare ogni utente all’azione.",
    cta: "Ottimizza il tuo sito web",
    href: "/siti-web",
    videoWebm: "https://next-level-media.it/wp-content/uploads/2025/12/website.webm",
    videoMp4: "https://next-level-media.it/wp-content/uploads/2025/12/website.mp4",
  },
]

export default function StickyServices() {
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
                {service.videoWebm || service.videoMp4 ? (
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="none"
                    className="stack-video"
                  >
                    {service.videoWebm && <source src={service.videoWebm} />}
                    {service.videoMp4 && <source src={service.videoMp4} />}
                  </video>
                ) : (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="stack-image"
                  />
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}