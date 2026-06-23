"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { urlFor } from "../../sanity/lib/image"
import { ValuePropVisual } from "../ValuePropVisuals/ValuePropVisuals"

interface ValuePropItem {
  label?: string
  titleHighlight?: string
  titleNormal?: string
  subtitle?: string
  ctaText?: string
  ctaHref?: string
  mediaType?: "image" | "video" | "lottie" | "3d" | "component"
  image?: { asset: { _ref: string } }
  videoWebm?: string
  videoMp4?: string
  lottieFile?: string
  modelUrl?: string
  componentKey?: string
}

interface ValuePropsProps {
  items?: ValuePropItem[]
}

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => null,
})

function LazyMount({
  children,
  rootMargin = "300px 0px",
}: {
  children: React.ReactNode
  rootMargin?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || shouldLoad) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(el)

    return () => observer.disconnect()
  }, [rootMargin, shouldLoad])

  return (
    <div ref={ref} className="w-full h-full">
      {shouldLoad ? children : null}
    </div>
  )
}

function LazyVideo({ item }: { item: ValuePropItem }) {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const playVideo = async () => {
      try {
        await video.play()
      } catch {
        // autoplay può essere bloccato dal browser: nessun problema
      }
    }

    playVideo()

    return () => {
      video.pause()
    }
  }, [])

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full h-full object-cover"
    >
      {item.videoWebm && <source src={item.videoWebm} type="video/webm" />}
      {item.videoMp4 && <source src={item.videoMp4} type="video/mp4" />}
    </video>
  )
}

function LazyLottie({ file }: { file: string }) {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    let cancelled = false

    fetch(`/lotties/${file}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data)
      })
      .catch(() => {})

    return () => { cancelled = true }
  }, [file])

  if (!animationData) return null

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      style={{ width: "100%", height: "100%" }}
    />
  )
}

function MediaBlock({ item }: { item: ValuePropItem }) {
  if (item.mediaType === "component" && item.componentKey) {
    return (
      <LazyMount rootMargin="250px 0px">
        <ValuePropVisual visualKey={item.componentKey} />
      </LazyMount>
    )
  }

  if (item.mediaType === "video" && (item.videoWebm || item.videoMp4)) {
    return (
      <div className="w-full rounded-2xl overflow-hidden aspect-video bg-slate-900">
        <LazyMount rootMargin="250px 0px">
          <LazyVideo item={item} />
        </LazyMount>
      </div>
    )
  }

  if (item.mediaType === "lottie" && item.lottieFile) {
    return (
      <div className="w-full rounded-2xl aspect-video flex items-center justify-center overflow-hidden">
        <LazyMount rootMargin="250px 0px">
          <LazyLottie file={item.lottieFile} />
        </LazyMount>
      </div>
    )
  }

  if (item.mediaType === "image" && item.image) {
    return (
      <div className="w-full rounded-2xl overflow-hidden aspect-video">
        <Image
          src={urlFor(item.image).width(800).height(450).url()}
          alt={item.titleNormal || ""}
          width={800}
          height={450}
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="w-full h-full object-cover"
        />
      </div>
    )
  }

  return (
    <div className="w-full rounded-2xl bg-slate-100 aspect-video flex items-center justify-center">
      <p className="text-slate-400 text-sm">Media</p>
    </div>
  )
}

function ValuePropRow({ item, index }: { item: ValuePropItem; index: number }) {
  const isReversed = index % 2 !== 0
  const link = item.ctaHref || "/contatti"

  return (
    <div className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 ${isReversed ? "md:flex-row-reverse" : ""}`}>
      <div className="w-full md:w-1/2">
        <MediaBlock item={item} />
      </div>

      <div className="w-full md:w-1/2">
        {item.label && (
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "12px" }}>
            {item.label}
          </p>
        )}

        {(item.titleHighlight || item.titleNormal) && (
          <h3 className="text-3xl font-black leading-[1.2] tracking-tight text-white md:text-4xl mb-4">
            {item.titleHighlight && (
              <span className="bg-brand-gradient bg-clip-text text-transparent">{item.titleHighlight}</span>
            )}
            {item.titleHighlight && item.titleNormal && " "}
            {item.titleNormal}
          </h3>
        )}

        {item.subtitle && (
          <p className="text-lg leading-7 mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
            {item.subtitle}
          </p>
        )}

        {item.ctaText && (
          <a href={link} style={{ color: "#ffffff", display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to right, #fc03b0, #047cf9)", padding: "12px 32px", borderRadius: "999px", fontWeight: 700, fontSize: "14px", textDecoration: "none", boxShadow: "0 8px 32px rgba(252,3,176,0.25)", cursor: "pointer" }}>
            {item.ctaText}
          </a>
        )}
      </div>
    </div>
  )
}

export default function ValueProps({ items }: ValuePropsProps) {
  if (!items?.length) return null

  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#0f1f3d" }}>
      <div className="mx-auto max-w-6xl flex flex-col gap-24">
        {items.map((item, i) => (
          <ValuePropRow key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  )
}