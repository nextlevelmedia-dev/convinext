"use client"

import dynamic from "next/dynamic"
import softwareDev from "../../public/lotties/Software-Development.json"
import team from "../../public/lotties/Team.json"

const Lottie = dynamic(() => import("lottie-react"), { ssr: false })

const lottieMap: Record<string, object> = {
  "Software-Development.json": softwareDev,
  "Team.json": team,
}

type HeroChiSiamoProps = {
  eyebrow?: string
  title?: string
  highlightOne?: string
  titleTwo?: string
  highlightTwo?: string
  subtitle?: string
  ctaText?: string
  lottieFile?: string
}

export default function HeroChiSiamo({
  eyebrow,
  title,
  highlightOne,
  titleTwo,
  highlightTwo,
  subtitle,
  ctaText,
  lottieFile,
}: HeroChiSiamoProps) {
  const animationData = (lottieFile && lottieMap[lottieFile]) ? lottieMap[lottieFile] : team

  return (
    <>
      <section
        className="relative overflow-hidden px-6 pb-24 pt-40"
        style={{ backgroundColor: "#0f1f3d" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.04]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {eyebrow && (
              <div className="mb-6 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-slate-200">
                <span className="bg-brand-gradient bg-clip-text text-transparent">{eyebrow}</span>
              </div>
            )}

            <h1 className="max-w-3xl text-4xl font-black leading-[1.2] tracking-tight text-white md:text-5xl lg:text-left">
              {title}{" "}
              {highlightOne && (
                <span className="bg-brand-gradient bg-clip-text text-transparent">{highlightOne}</span>
              )}{" "}
              {titleTwo}{" "}
              {highlightTwo && (
                <span className="bg-brand-gradient bg-clip-text text-transparent">{highlightTwo}</span>
              )}
            </h1>

            {subtitle && (
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-white/70">{subtitle}</p>
            )}

            {ctaText && (
              <div className="mt-10 flex justify-center lg:justify-start">
                <a href="/contatti" className="inline-flex rounded-full bg-brand-gradient px-8 py-4 font-bold !text-white shadow-xl cursor-pointer">
                  {ctaText}
                </a>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center">
            <Lottie
              animationData={animationData}
              loop
              autoplay
              style={{ width: "100%", maxWidth: 480 }}
            />
          </div>

        </div>
      </section>

      <div className="hero-stats border-y border-slate-200 py-8 px-6">
        <div className="mx-auto max-w-7xl flex flex-col-reverse md:flex-row items-center gap-6 md:gap-0">
          <div className="flex items-center gap-3 md:pr-8 md:border-r border-slate-200 shrink-0 w-full md:w-auto justify-center md:justify-start">
            <div className="relative shrink-0">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="badgeGradCS" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#fc03b0" />
                    <stop offset="100%" stopColor="#047cf9" />
                  </linearGradient>
                </defs>
                <path d="M26 2L6 10V26C6 36.5 14.8 46.2 26 49C37.2 46.2 46 36.5 46 26V10L26 2Z" fill="url(#badgeGradCS)" />
                <path d="M26 7L11 13.5V26C11 34.2 17.6 41.8 26 44C34.4 41.8 41 34.2 41 26V13.5L26 7Z" fill="white" fillOpacity="0.15" />
                <path d="M18 26L23 31L34 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M26 8L27.2 11.5H31L28 13.5L29.2 17L26 15L22.8 17L24 13.5L21 11.5H24.8L26 8Z" fill="white" fillOpacity="0.9" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-black tracking-widest uppercase" style={{ background: "linear-gradient(to right, #fc03b0, #047cf9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Verified Agency
              </p>
              <p className="text-[11px] font-semibold text-slate-500">Results Certified</p>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-4 gap-0 w-full md:pl-8 divide-x divide-slate-200">
            {[
              { value: "+100", label: "Siti realizzati", hideOnMobile: false },
              { value: "98%", label: "Clienti soddisfatti", hideOnMobile: false },
              { value: "3x", label: "Lead in più in media", hideOnMobile: false },
              { value: "60gg", label: "Primi risultati garantiti", hideOnMobile: true },
            ].map((stat) => (
              <div key={stat.label} className={`text-center px-4 first:pl-0 last:pr-0 ${stat.hideOnMobile ? "hidden md:block" : ""}`}>
                <p className="text-3xl font-black bg-brand-gradient bg-clip-text text-transparent">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}