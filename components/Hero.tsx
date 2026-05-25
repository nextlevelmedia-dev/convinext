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
    <>
      <section
        className="relative overflow-hidden px-6 pb-24 pt-40"
        style={{ backgroundColor: "#0f1f3d" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.04]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {eyebrow && (
              <div className="mb-6 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold ring-1 ring-slate-200">
                <a href="#recensioni" className="bg-brand-gradient bg-clip-text text-transparent">{eyebrow}</a>
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
                <a className="inline-flex rounded-full bg-brand-gradient px-8 py-4 font-bold !text-white shadow-xl cursor-pointer">
                  {ctaText}
                </a>
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-4 text-xs font-bold text-white/60 sm:gap-6 sm:text-sm lg:justify-start">
              <span>✓ Risultati misurabili</span>
              <span>✓ Test continui</span>
              <span>✓ Crescita reale</span>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            {rightContent ? rightContent : (
              <div className="relative w-full">

                <div className="relative z-10 rounded-[2rem] border border-white/10 bg-white p-6 shadow-2xl shadow-black/30">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                    <span style={{color: "#94a3b8"}} className="ml-2 text-xs font-medium">next-level-media.it — Analytics</span>
                  </div>

                  <div className="mb-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span style={{color: "#64748b"}} className="text-xs font-semibold">Conversioni mensili</span>
                      <span style={{color: "#22c55e"}} className="text-xs font-bold">↑ +42%</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-20">
                      {[30, 45, 35, 55, 48, 65, 58, 75, 68, 85, 78, 95].map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm"
                          style={{
                            height: `${h}%`,
                            background: i >= 9
                              ? "linear-gradient(to top, #fc03b0, #047cf9)"
                              : "rgba(148,163,184,0.3)"
                          }}
                        />
                      ))}
                    </div>
                    <div className="mt-2 flex justify-between text-[10px]" style={{color: "#94a3b8"}}>
                      <span>Gen</span><span>Mar</span><span>Giu</span><span>Set</span><span>Dic</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <p className="text-lg font-black bg-brand-gradient bg-clip-text text-transparent">+42%</p>
                      <p style={{color: "#64748b"}} className="text-[10px] mt-0.5">Conversioni</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <p style={{color: "#0f172a"}} className="text-lg font-black">2.8x</p>
                      <p style={{color: "#64748b"}} className="text-[10px] mt-0.5">ROAS medio</p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3 text-center">
                      <p style={{color: "#0f172a"}} className="text-lg font-black">+120</p>
                      <p style={{color: "#64748b"}} className="text-[10px] mt-0.5">Lead/mese</p>
                    </div>
                  </div>
                </div>

                <div className="float-1 absolute -top-6 -right-4 z-20 rounded-2xl bg-white px-4 py-3 shadow-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <span className="text-green-600 text-sm">✓</span>
                    </div>
                    <div>
                      <p style={{color: "#1e293b"}} className="text-xs font-bold">Nuovo cliente</p>
                      <p style={{color: "#94a3b8"}} className="text-[10px]">2 min fa</p>
                    </div>
                  </div>
                </div>

                <div className="float-2 absolute -bottom-6 -left-4 z-20 rounded-2xl bg-white px-4 py-3 shadow-xl border border-slate-100">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full"
                      style={{ background: "linear-gradient(135deg, #fc03b0, #047cf9)" }}
                    >
                      <span className="text-white text-xs font-bold">↑</span>
                    </div>
                    <div>
                      <p style={{color: "#1e293b"}} className="text-xs font-bold">PageSpeed 98/100</p>
                      <p style={{color: "#94a3b8"}} className="text-[10px]">Performance ottimale</p>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>
      </section>

      {/* BANDA STATISTICHE */}
      <div className="hero-stats border-y border-slate-200 py-8 px-6" style={{ backgroundColor: "#f2f2f2" }}>
        <div className="mx-auto max-w-7xl flex flex-col-reverse md:flex-row items-center gap-6 md:gap-0">

          <div className="flex items-center gap-3 md:pr-8 md:border-r border-slate-200 shrink-0 w-full md:w-auto justify-center md:justify-start">
            <div className="relative shrink-0">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="badgeGrad" x1="0" y1="0" x2="52" y2="52" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#fc03b0" />
                    <stop offset="100%" stopColor="#047cf9" />
                  </linearGradient>
                </defs>
                <path d="M26 2L6 10V26C6 36.5 14.8 46.2 26 49C37.2 46.2 46 36.5 46 26V10L26 2Z" fill="url(#badgeGrad)" />
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