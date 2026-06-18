'use client'

import { useEffect, useRef } from "react"
import dynamic from "next/dynamic"
import "./StickyServices.css"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

type Service = {
  label: string
  title: string
  text: string
  cta: string
  href: string
  mediaType?: "video" | "image" | "lottie"
  videoWebm?: string
  videoMp4?: string
  image?: { asset: { url: string } }
  lottieFile?: string
}

type Props = {
  titleHighlight?: string
  titleNormal?: string
  subtitle?: string
  services: Service[]
}

function LazyVideo({ webm, mp4 }: { webm?: string; mp4?: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const loaded = useRef(false)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded.current) {
          loaded.current = true
          const video = videoRef.current
          if (!video) return
          if (webm) {
            const s = document.createElement("source")
            s.src = webm
            s.type = "video/webm"
            video.appendChild(s)
          }
          if (mp4) {
            const s = document.createElement("source")
            s.src = mp4
            s.type = "video/mp4"
            video.appendChild(s)
          }
          video.load()
          video.play().catch(() => {})
          observer.disconnect()
        }
      },
      { rootMargin: "300px" }
    )

    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [webm, mp4])

  return (
    <div ref={wrapperRef} className="stack-video-wrapper">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className="stack-video"
      />
    </div>
  )
}

function LazyLottie({ file }: { file: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const loaded = useRef(false)
  const lottieRef = useRef<any>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loaded.current) {
          loaded.current = true
          import(`../../public/lotties/${file}`).then((data) => {
            if (!lottieRef.current) return
            lottieRef.current.innerHTML = ""
            const LottiePlayer = document.createElement("div")
            el.appendChild(LottiePlayer)
          })
          observer.disconnect()
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [file])

  return <div ref={lottieRef} className="stack-lottie-wrapper" />
}

function ServiceMedia({ service }: { service: Service }) {
  if (service.mediaType === "video" && (service.videoWebm || service.videoMp4)) {
    return <LazyVideo webm={service.videoWebm} mp4={service.videoMp4} />
  }

  if (service.mediaType === "image" && service.image?.asset?.url) {
    return (
      <img
        src={service.image.asset.url}
        alt={service.title}
        className="stack-image"
        loading="lazy"
        decoding="async"
      />
    )
  }

  if (service.mediaType === "lottie" && service.lottieFile) {
    return (
      <div className="stack-lottie-wrapper">
        <Lottie
          animationData={undefined}
          loop
          autoplay={false}
          style={{ width: "100%", maxWidth: 380 }}
        />
      </div>
    )
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
        const nextCard = cards[index + 1]
        const nextRect = nextCard?.getBoundingClientRect()

        if (nextRect && nextRect.top < window.innerHeight * 0.45) {
          card.classList.add("is-compressed")
        } else {
          card.classList.remove("is-compressed")
        }

        const rect = card.getBoundingClientRect()
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
                <p className="text-lg leading-8 text-slate-600 dark:text-slate-300">{subtitle}</p>
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
                <a href={service.href} className="stack-button">{service.cta}</a>
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