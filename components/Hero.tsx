import type { ReactNode } from "react"

type HeroProps = {
  eyebrow?: string
  title?: string
  titleTwo?: string
  highlightOne?: string
  highlightTwo?: string
  subtitle?: string
  ctaText?: string
  rightContent?: ReactNode
}

export default function Hero({
  eyebrow,
  title,
  titleTwo,
  highlightOne,
  highlightTwo,
  subtitle,
  ctaText,
  rightContent,
}: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-24 pt-40 text-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

          {/* EYEBROW */}
          {eyebrow && (
            <div className="mb-6 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-slate-200">
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {eyebrow}
              </span>
            </div>
          )}

          {/* TITLE */}
          <h1 className="max-w-3xl text-4xl font-black leading-[1.2] tracking-tight md:text-5xl lg:text-left">
            {title}{" "}

            {highlightOne && (
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {highlightOne}
              </span>
            )}

            {" "}
            {titleTwo}
            {" "}

            {highlightTwo && (
              <span className="bg-brand-gradient bg-clip-text text-transparent">
                {highlightTwo}
              </span>
            )}
          </h1>

          {/* SUBTITLE */}
          {subtitle && (
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-700">
              {subtitle}
            </p>
          )}

          {/* CTA */}
          {ctaText && (
            <div className="mt-10 flex justify-center lg:justify-start">
              <a className="inline-flex rounded-full bg-brand-gradient px-8 py-4 font-bold text-white shadow-xl shadow-brand-end/20">
                {ctaText}
              </a>
            </div>
          )}

          {/* BADGES */}
          <div className="mt-8 flex items-center justify-center gap-4 text-xs font-bold text-slate-800 sm:gap-6 sm:text-sm lg:justify-start">
            <span>✓ Risultati misurabili</span>
            <span>✓ Test continui</span>
            <span>✓ Crescita reale</span>
          </div>

        </div>

        {/* RIGHT CONTENT */}
        <div>
          {rightContent ? (
            rightContent
          ) : (
            <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-pink-50 via-white to-blue-50 p-8 shadow-2xl shadow-slate-200">

              <div className="mb-8 flex justify-center gap-3 sm:justify-start">
                <span className="h-3 w-3 rounded-full bg-brand-start/30" />
                <span className="h-3 w-3 rounded-full bg-purple-300" />
                <span className="h-3 w-3 rounded-full bg-brand-end/30" />
              </div>

              <div className="grid gap-8 sm:grid-cols-2">

                <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
                  <p className="text-sm text-slate-500">Performance</p>

                  <p className="mt-4 bg-brand-gradient bg-clip-text text-5xl font-black text-transparent">
                    +42%
                  </p>

                  <p className="mt-2 text-slate-500">conversioni</p>
                </div>

                <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
                  <p className="text-4xl font-black">+120</p>
                  <p className="mt-2 text-slate-500">lead/mese</p>
                </div>

                <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
                  <p className="text-4xl font-black">2.8x</p>
                  <p className="mt-2 text-slate-500">ROAS medio</p>
                </div>

                <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
                  <p className="text-4xl font-black">+18%</p>
                  <p className="mt-2 text-slate-500">conversion rate</p>
                </div>

              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  )
}