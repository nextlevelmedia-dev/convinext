"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"
import { urlFor } from "../../sanity/lib/image"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

interface FinalRecapProps {
  eyebrow?: string
  titleHighlight?: string
  titleNormal?: string
  subtitle?: string
  bulletPoints?: string[]
  ctaText?: string
  ctaHref?: string
  ctaSubText?: string
  mediaType?: "image" | "video" | "lottie"
  image?: { asset: { _ref: string } }
  videoWebm?: string
  videoMp4?: string
  lottieFile?: string
}

function MediaBlock({ mediaType, image, videoWebm, videoMp4, lottieFile }: Partial<FinalRecapProps>) {
  const [animationData, setAnimationData] = useState<any>(null)

  useEffect(() => {
    if (mediaType !== "lottie" || !lottieFile) return
    let cancelled = false
    fetch(`/lotties/${lottieFile}`)
      .then((res) => res.json())
      .then((data) => { if (!cancelled) setAnimationData(data) })
      .catch(() => {})
    return () => { cancelled = true }
  }, [mediaType, lottieFile])

  if (mediaType === "video" && (videoWebm || videoMp4)) {
    return (
      <video autoPlay muted loop playsInline className="w-full h-full object-cover rounded-2xl">
        {videoWebm && <source src={videoWebm} type="video/webm" />}
        {videoMp4 && <source src={videoMp4} type="video/mp4" />}
      </video>
    )
  }

  if (mediaType === "lottie" && lottieFile) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        {animationData && (
          <Lottie animationData={animationData} loop style={{ width: "100%", height: "100%" }} />
        )}
      </div>
    )
  }

  if (mediaType === "image" && image) {
    return (
      <Image
        src={urlFor(image).width(800).height(600).url()}
        alt=""
        width={800}
        height={600}
        className="w-full h-full object-cover rounded-2xl"
      />
    )
  }

  return (
    <div
      className="w-full h-full flex items-center justify-center rounded-2xl"
      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>Media</p>
    </div>
  )
}

export default function FinalRecap({
  eyebrow,
  titleHighlight,
  titleNormal,
  subtitle,
  bulletPoints,
  ctaText,
  ctaHref = "/contatti",
  ctaSubText,
  mediaType,
  image,
  videoWebm,
  videoMp4,
  lottieFile,
}: FinalRecapProps) {
  if (!titleHighlight && !titleNormal) return null

  const linkHref = ctaHref ?? "/contatti"

  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#0f1f3d" }}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">

          <div className="w-full md:w-1/2 flex flex-col">

            {eyebrow && (
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: "16px" }}>
                {eyebrow}
              </p>
            )}

            {(titleHighlight || titleNormal) && (
              <h2 className="text-4xl font-black leading-[1.2] tracking-tight text-white md:text-[42px] mb-5">
                {titleHighlight && (
                  <span className="bg-brand-gradient bg-clip-text text-transparent">{titleHighlight}</span>
                )}
                {titleHighlight && titleNormal && " "}
                {titleNormal}
              </h2>
            )}

            {subtitle && (
              <p className="text-base leading-7 mb-6" style={{ color: "rgba(255,255,255,0.65)" }}>
                {subtitle}
              </p>
            )}

            {bulletPoints && bulletPoints.length > 0 && (
              <ul className="flex flex-col gap-3 mb-8">
                {bulletPoints.map((point, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span style={{ width: "20px", height: "20px", borderRadius: "50%", background: "linear-gradient(135deg, #fc03b0, #047cf9)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.85)", fontSize: "15px", fontWeight: 500 }}>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {ctaText && (
              <div className="flex flex-col gap-3">
                <a href={linkHref} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(to right, #fc03b0, #047cf9)", color: "#fff", padding: "16px 40px", borderRadius: "999px", fontWeight: 700, fontSize: "16px", textDecoration: "none", boxShadow: "0 8px 32px rgba(252,3,176,0.25)", alignSelf: "flex-start" }}>
                  {ctaText}
                </a>
                {ctaSubText && (
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
                    {ctaSubText}
                  </p>
                )}
              </div>
            )}

          </div>

          <div className="w-full md:w-1/2" style={{ minHeight: "380px" }}>
            <MediaBlock
              mediaType={mediaType}
              image={image}
              videoWebm={videoWebm}
              videoMp4={videoMp4}
              lottieFile={lottieFile}
            />
          </div>

        </div>
      </div>
    </section>
  )
}