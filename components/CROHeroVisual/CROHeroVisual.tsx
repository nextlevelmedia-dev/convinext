// components/CROHeroVisual/CROHeroVisual.tsx
"use client"

import { useEffect, useRef } from "react"

export default function CROHeroVisual() {
  const barARef = useRef<HTMLDivElement>(null)
  const barBRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (barARef.current) barARef.current.style.width = "38%"
      if (barBRef.current) barBRef.current.style.width = "74%"
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full">
      {/* Card principale */}
      <div
        className="relative z-10 rounded-[2rem] border border-white/10 bg-white p-6 shadow-2xl shadow-black/30"
        style={{ color: "#0f172a" }}
      >
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span style={{ color: "#94a3b8" }} className="ml-2 text-xs font-medium">
              A/B Test attivo
            </span>
          </div>
          <span className="animate-pulse rounded-full bg-green-100 px-3 py-1 text-[11px] font-semibold text-green-600">
            ● Live
          </span>
        </div>

        {/* Info test */}
        <div className="mb-4 rounded-xl bg-slate-50 px-3 py-2 text-xs" style={{ color: "#64748b" }}>
          <span className="font-semibold" style={{ color: "#0f172a" }}>Homepage CTA</span>
          {" · "}4.812 visitatori{" · "}iniziato 12 gg fa
        </div>

        {/* Variante A */}
        <div className="mb-4">
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] font-semibold text-slate-500">A</span>
              <span className="text-sm" style={{ color: "#0f172a" }}>"Scopri di più"</span>
            </div>
            <span className="text-sm font-bold" style={{ color: "#0f172a" }}>2,3% <span className="text-xs font-normal text-slate-400">CVR</span></span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              ref={barARef}
              className="h-full rounded-full bg-slate-300 transition-all duration-[1200ms] ease-out"
              style={{ width: "0%" }}
            />
          </div>
          <p className="mt-1 text-[11px]" style={{ color: "#94a3b8" }}>2.368 visite · 54 conversioni</p>
        </div>

        {/* Variante B */}
        <div className="mb-5">
          <div className="mb-1.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[11px] font-semibold text-blue-600">B</span>
              <span className="text-sm" style={{ color: "#0f172a" }}>"Ottimizza ora gratis"</span>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">+92%</span>
            </div>
            <span className="text-sm font-bold text-blue-600">4,4% <span className="text-xs font-normal text-slate-400">CVR</span></span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div
              ref={barBRef}
              className="h-full rounded-full transition-all duration-[1400ms] ease-out"
              style={{ width: "0%", background: "linear-gradient(to right, #fc03b0, #047cf9)" }}
            />
          </div>
          <p className="mt-1 text-[11px]" style={{ color: "#94a3b8" }}>2.444 visite · 107 conversioni</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-3">
          <span className="text-xs font-semibold text-blue-600">🏆 Variante B vincitrice · 97% confidenza</span>
          <span className="text-[11px]" style={{ color: "#94a3b8" }}>2 gg al termine</span>
        </div>
      </div>

      {/* Metriche */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { value: "+92%", label: "Uplift CVR" },
          { value: "+53", label: "Conv. extra/mese" },
          { value: "97%", label: "Confidenza stat." },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white/10 p-3 text-center backdrop-blur-sm border border-white/10">
            <p className="text-lg font-black bg-brand-gradient bg-clip-text text-transparent">{s.value}</p>
            <p className="mt-0.5 text-[10px] text-white/60">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Badge floating */}
      <div className="float-1 absolute -top-6 -right-4 z-20 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
            <span className="text-sm text-green-600">✓</span>
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: "#1e293b" }}>Test completato</p>
            <p className="text-[10px]" style={{ color: "#94a3b8" }}>Winner dichiarato</p>
          </div>
        </div>
      </div>

      <div className="float-2 absolute -bottom-6 -left-4 z-20 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-xl">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full"
            style={{ background: "linear-gradient(135deg, #fc03b0, #047cf9)" }}
          >
            <span className="text-xs font-bold text-white">↑</span>
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: "#1e293b" }}>Revenue +€4.200</p>
            <p className="text-[10px]" style={{ color: "#94a3b8" }}>Questo mese</p>
          </div>
        </div>
      </div>
    </div>
  )
}