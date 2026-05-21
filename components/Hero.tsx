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
      <section className="relative overflow-hidden px-6 pb-24 pt-40 text-slate-950 dark:text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:48px_48px] opacity-40 dark:opacity-[0.07]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

          {/* LEFT */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            {eyebrow && (
              <div className="mb-6 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-slate-200">
                <span className="bg-brand-gradient bg-clip-text text-transparent">{eyebrow}</span>
              </div>
            )}

            <h1 className="max-w-3xl text-4xl font-black leading-[1.2] tracking-tight text-slate-950 dark:text-white md:text-5xl lg:text-left">
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
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-700 dark:text-slate-300">{subtitle}</p>
            )}

            {ctaText && (
              <div className="mt-10 flex justify-center lg:justify-start">
                <a className="inline-flex rounded-full bg-brand-gradient px-8 py-4 font-bold !text-white shadow-xl cursor-pointer">
                {ctaText}
                </a>
              </div>
            )}

            <div className="mt-8 flex items-center justify-center gap-4 text-xs font-bold text-slate-800 dark:text-slate-300 sm:gap-6 sm:text-sm lg:justify-start">
              <span>✓ Risultati misurabili</span>
              <span>✓ Test continui</span>
              <span>✓ Crescita reale</span>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            {rightContent ? rightContent : (
              <div className="relative w-full">

                {/* CARD PRINCIPALE — sempre bianca con testi scuri */}
                <div className="relative z-10 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200">
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

                {/* FLOATING CARD 1 */}
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

                {/* FLOATING CARD 2 */}
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
      <div className="border-y border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-transparent backdrop-blur-sm py-8 px-6">
        <div className="mx-auto max-w-7xl grid grid-cols-3 gap-6 md:grid-cols-4">
          {[
            { value: "+100", label: "Siti realizzati", hideOnMobile: false },
            { value: "98%", label: "Clienti soddisfatti", hideOnMobile: false },
            { value: "3x", label: "Lead in più in media", hideOnMobile: false },
            { value: "60gg", label: "Primi risultati garantiti", hideOnMobile: true },
          ].map((stat) => (
            <div key={stat.label} className={`text-center ${stat.hideOnMobile ? "hidden md:block" : ""}`}>
              <p className="text-3xl font-black bg-brand-gradient bg-clip-text text-transparent">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}