"use client"

import { useEffect, useRef } from "react"

interface ProcessStep {
  title: string
  description: string
}

interface ProcessConversioniProps {
  titleHighlight?: string
  titleNormal?: string
  subtitle?: string
  steps?: ProcessStep[]
}

export default function ProcessConversioni({
  titleHighlight,
  titleNormal,
  subtitle,
  steps,
}: ProcessConversioniProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const timeline = root.querySelector<HTMLElement>("[data-timeline]")
    const progressEl = root.querySelector<HTMLElement>("[data-progress]")
    const trackerEl = root.querySelector<HTMLElement>("[data-tracker]")
    const stepEls = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"))

    if (!timeline || !progressEl || !trackerEl) return

    function clamp(n: number, min: number, max: number) {
      return Math.max(min, Math.min(max, n))
    }

    const ioSteps = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-active")
      })
    }, { threshold: 0.35 })
    stepEls.forEach((s) => ioSteps.observe(s))

    let ticking = false
    function updateProgress() {
      const rect = timeline!.getBoundingClientRect()
      const vh = window.innerHeight
      const start = vh * 0.20
      const end = vh * 0.80
      const denom = rect.height + (vh - start - end)
      const raw = denom ? (vh - rect.top - start) / denom : 0
      const p = clamp(isFinite(raw) ? raw : 0, 0, 1)
      const pct = (p * 100).toFixed(2) + "%"
      progressEl!.style.height = pct
      trackerEl!.style.top = pct
    }

    function requestTick() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => { updateProgress(); ticking = false })
    }

    // Step 2 — A/B bar animation
    const step2El = root.querySelector<HTMLElement>("[data-step2]")
    const barA = step2El?.querySelector<HTMLElement>("[data-bar-a]")
    const barB = step2El?.querySelector<HTMLElement>("[data-bar-b]")

    let abAnimated = false
    if (step2El && barA && barB) {
      const ioAB = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !abAnimated) {
          abAnimated = true
          setTimeout(() => { barA.style.width = "38%" }, 300)
          setTimeout(() => { barB.style.width = "74%" }, 500)
        }
      }, { threshold: 0.4 })
      ioAB.observe(step2El)
    }

    // Step 3 — device animation
    const step3El = root.querySelector<HTMLElement>("[data-step3]")
    const stage3 = step3El?.querySelector<HTMLElement>(".nx3-proto__stage") ?? null
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let rafId: number | null = null
    let running = false
    let lastT = 0
    let y = 0, v = 0, target = 0, maxY = 0
    const stops = [0.00, 0.26, 0.52, 0.78, 1.00]
    let stopIndex = 0
    const holdMs = 1050
    let holdLeft = 0
    let cursorT = 0

    function setupProto() {
      if (!stage3) return null
      const device = stage3.querySelector<HTMLElement>("[data-nx3-device]")
      const viewport = stage3.querySelector<HTMLElement>("[data-nx3-viewport]")
      const content = stage3.querySelector<HTMLElement>("[data-nx3-content]")
      const cursor = stage3.querySelector<HTMLElement>("[data-nx3-cursor]")
      const touch = stage3.querySelector<HTMLElement>("[data-nx3-touch]")
      if (!device || !viewport || !content) return null

      const measure = () => Math.max(0, content.scrollHeight - viewport.clientHeight)
      const setY = (val: number) => { content.style.transform = `translate3d(0,${(-val).toFixed(2)}px,0)` }

      const setCursor = (dt: number) => {
        if (!cursor || !touch) return
        cursorT += dt
        const fx = 50 + Math.sin(cursorT * 0.00045) * 10
        const fy = 38 + Math.cos(cursorT * 0.00038) * 14
        cursor.style.opacity = "0.75"
        cursor.style.left = fx + "%"
        cursor.style.top = fy + "%"
        const phase = (cursorT % 3200) / 3200
        const pulse = phase < 0.22 ? (1 - Math.cos((phase / 0.22) * Math.PI)) * 0.5 : 0
        touch.style.opacity = (pulse * 0.85).toFixed(3)
        touch.style.left = fx + "%"
        touch.style.top = fy + "%"
        touch.style.transform = `translate(-50%, -50%) scale(${(0.65 + pulse * 0.9).toFixed(2)})`
        touch.style.boxShadow = `0 0 0 ${(10 + 28 * pulse).toFixed(0)}px rgba(92,106,255,${(0.11 * pulse).toFixed(3)})`
      }

      const pickNextTarget = () => {
        if (maxY <= 0) { target = 0; return }
        stopIndex++
        if (stopIndex >= stops.length) stopIndex = 0
        target = stops[stopIndex] * maxY
        holdLeft = holdMs
      }

      const loop = (t: number) => {
        if (!running) return
        if (!lastT) lastT = t
        const dt = Math.min(40, t - lastT)
        lastT = t
        if (t % 1000 < 20) maxY = measure()
        if (holdLeft > 0) {
          holdLeft -= dt
          v *= 0.90
        } else {
          const dist = target - y
          if (Math.abs(dist) < 1.2) {
            v = 0
            pickNextTarget()
          } else {
            const k = 0.0012
            const damp = 0.92
            v = (v + dist * k * dt) * damp
            if (v > 0.55) v = 0.55
            if (v < -0.55) v = -0.55
            y += v * dt
            if (y < 0) y = 0
            if (y > maxY) y = maxY
          }
        }
        setY(y)
        setCursor(dt)
        rafId = requestAnimationFrame(loop)
      }

      const start = () => {
        if (running || reduce) return
        running = true; lastT = 0; maxY = measure()
        y = Math.min(y, maxY); v = 0; stopIndex = 0
        target = (stops[1] || 0.25) * maxY; holdLeft = 900
        rafId = requestAnimationFrame(loop)
      }

      const stop = () => {
        running = false
        if (rafId) cancelAnimationFrame(rafId)
        rafId = null; lastT = 0
        if (cursor) cursor.style.opacity = "0"
        if (touch) touch.style.opacity = "0"
      }

      const reveal = () => {
        device.classList.add("is-on")
        window.setTimeout(() => { device.classList.add("is-live") }, 900)
      }

      return { start, stop, reveal }
    }

    const proto = setupProto()

    if (stage3 && proto) {
      const ioProto = new IntersectionObserver((entries) => {
        const e = entries[0]
        if (!e) return
        if (e.isIntersecting && e.intersectionRatio > 0.28) { proto.reveal(); proto.start() }
        else { proto.stop() }
      }, { threshold: [0, 0.28, 0.55] })
      ioProto.observe(stage3)
      document.addEventListener("visibilitychange", () => { if (document.hidden) proto.stop() })
      if (reduce) { proto.reveal(); proto.stop() }
    }

    window.addEventListener("scroll", requestTick, { passive: true })
    window.addEventListener("resize", requestTick)
    updateProgress()

    return () => {
      window.removeEventListener("scroll", requestTick)
      window.removeEventListener("resize", requestTick)
      ioSteps.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const s = steps || []

  return (
    <section className="py-24 px-6">
      <div className="mx-auto" style={{ maxWidth: "1100px" }}>

        {(titleHighlight || titleNormal || subtitle) && (
          <div style={{ textAlign: "center", maxWidth: "620px", margin: "0 auto 48px" }}>
            {(titleHighlight || titleNormal) && (
              <h2 style={{ margin: "0 0 10px", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
                {titleHighlight && (
                  <span style={{ background: "linear-gradient(to right, #fc03b0, #047cf9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {titleHighlight}
                  </span>
                )}
                {titleHighlight && titleNormal && " "}
                {titleNormal}
              </h2>
            )}
            {subtitle && (
              <p style={{ margin: 0, color: "#64748b", fontSize: "16px", lineHeight: 1.6 }}>{subtitle}</p>
            )}
          </div>
        )}

        <div id="nlm-cro-process-timeline" ref={rootRef}>
          <style>{`
            #nlm-cro-process-timeline{--grad-a:#fc03b0;--grad-b:#047cf9;--text:#0f172a;--muted:#64748b;--card:#ffffff;--card-border:rgba(15,23,42,.06);--shadow:0 18px 50px rgba(15,23,42,.08);--line-bg:rgba(4,124,249,.14);--radius:18px;--enter-y:26px;--enter-dur:620ms;--enter-ease:cubic-bezier(.2,.8,.2,1);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;color:var(--text)}
            #nlm-cro-process-timeline *{box-sizing:border-box}
            #nlm-cro-process-timeline .timeline{position:relative;padding:12px 0}
            #nlm-cro-process-timeline .timeline::before{content:"";position:absolute;left:50%;top:0;transform:translateX(-50%);width:6px;height:100%;background:var(--line-bg);border-radius:999px}
            #nlm-cro-process-timeline .timeline__progress{position:absolute;left:50%;top:0;transform:translateX(-50%);width:6px;height:0;border-radius:999px;background:linear-gradient(180deg,var(--grad-a) 0%,var(--grad-b) 100%);will-change:height}
            #nlm-cro-process-timeline .timeline__tracker{position:absolute;left:50%;top:0;transform:translate(-50%,-50%);width:16px;height:16px;border-radius:999px;background:#fff;border:3px solid rgba(4,124,249,.55);box-shadow:0 10px 30px rgba(4,124,249,.18);will-change:top}
            #nlm-cro-process-timeline .step{position:relative;display:grid;grid-template-columns:1fr 90px 1fr;align-items:center;gap:18px;padding:34px 0;min-height:220px}
            #nlm-cro-process-timeline .step__left,#nlm-cro-process-timeline .step__right{display:flex;min-width:0}
            #nlm-cro-process-timeline .step[data-side="left"] .step__left{justify-content:flex-end}
            #nlm-cro-process-timeline .step[data-side="left"] .step__right{justify-content:flex-start}
            #nlm-cro-process-timeline .step[data-side="right"] .step__left{justify-content:flex-end}
            #nlm-cro-process-timeline .step[data-side="right"] .step__right{justify-content:flex-start}
            #nlm-cro-process-timeline .step__middle{position:relative;height:100%;display:flex;justify-content:center}
            #nlm-cro-process-timeline .step__dot{position:absolute;top:50%;transform:translateY(-50%);width:18px;height:18px;border-radius:999px;background:rgba(4,124,249,.35);transition:opacity .25s ease,transform .25s ease;opacity:.35}
            #nlm-cro-process-timeline .card{background:var(--card);border:1px solid var(--card-border);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px;max-width:460px}
            #nlm-cro-process-timeline .card__top{display:flex;align-items:center;gap:12px;margin-bottom:10px}
            #nlm-cro-process-timeline .badge{width:34px;height:34px;border-radius:10px;background:rgba(4,124,249,.10);display:grid;place-items:center;color:rgba(4,124,249,.95);font-weight:800;font-size:13px;flex:0 0 auto}
            #nlm-cro-process-timeline .icon{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(135deg,rgba(252,3,176,.12),rgba(4,124,249,.10));color:rgba(15,23,42,.9);border:1px solid rgba(15,23,42,.06);flex:0 0 auto}
            #nlm-cro-process-timeline .card h4{margin:0;font-size:24px;letter-spacing:-0.01em;line-height:1.2}
            #nlm-cro-process-timeline .card p{margin:8px 0 0;line-height:1.65;font-size:18px;color:inherit}
            #nlm-cro-process-timeline .graphic{border-radius:22px;overflow:hidden;border:1px solid rgba(15,23,42,.06);box-shadow:0 18px 60px rgba(15,23,42,.08);background:rgba(255,255,255,.85);max-width:520px;width:100%;min-width:0}
            #nlm-cro-process-timeline .graphic__pad{padding:14px}
            #nlm-cro-process-timeline .card,#nlm-cro-process-timeline .graphic{opacity:0;transform:translateY(var(--enter-y));transition:opacity var(--enter-dur) var(--enter-ease),transform var(--enter-dur) var(--enter-ease);will-change:opacity,transform}
            #nlm-cro-process-timeline .step .card{transition-delay:140ms}
            #nlm-cro-process-timeline .step .graphic{transition-delay:260ms}
            #nlm-cro-process-timeline .step.is-active .card,#nlm-cro-process-timeline .step.is-active .graphic{opacity:1;transform:translateY(0)}
            #nlm-cro-process-timeline .step.is-active .step__dot{opacity:1;transform:translateY(-50%) scale(1.05)}
            #nlm-cro-process-timeline .ab-bar{height:10px;border-radius:999px;width:0;transition:width 1.2s cubic-bezier(.4,0,.2,1)}
            #nlm-cro-process-timeline .nx3-proto__stage{position:relative;border-radius:22px;padding:clamp(14px,2.2vw,20px);overflow:hidden;background:radial-gradient(1200px 520px at 50% 0%,rgba(92,106,255,.10),transparent 60%),radial-gradient(820px 560px at 85% 20%,rgba(236,0,140,.08),transparent 55%),rgba(255,255,255,.92);border:1px solid rgba(17,24,39,.06);min-height:360px;display:flex;align-items:center;justify-content:center}
            #nlm-cro-process-timeline .nx3-device{position:relative;width:min(560px,100%);border-radius:22px;border:1px solid rgba(17,24,39,.10);background:rgba(255,255,255,.84);box-shadow:0 24px 90px rgba(17,24,39,.10);overflow:hidden;opacity:0;transform:translateY(14px);transition:opacity .6s var(--enter-ease),transform .6s var(--enter-ease);will-change:opacity,transform;contain:layout paint style}
            #nlm-cro-process-timeline .nx3-device.is-on{opacity:1;transform:translateY(0)}
            #nlm-cro-process-timeline .nx3-device__top{display:flex;align-items:center;gap:12px;padding:10px 12px;border-bottom:1px solid rgba(17,24,39,.08);background:rgba(255,255,255,.75);position:relative;z-index:4}
            #nlm-cro-process-timeline .nx3-traffic{display:flex;gap:6px}
            #nlm-cro-process-timeline .nx3-traffic span{width:10px;height:10px;border-radius:999px;background:rgba(17,24,39,.14)}
            #nlm-cro-process-timeline .nx3-url{flex:1;display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:999px;border:1px solid rgba(17,24,39,.08);background:rgba(17,24,39,.03);overflow:hidden}
            #nlm-cro-process-timeline .nx3-url__text{opacity:.72;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
            #nlm-cro-process-timeline .nx3-signal{width:18px;height:10px;border-radius:999px;background:rgba(17,24,39,.08)}
            #nlm-cro-process-timeline .nx3-screen{position:relative;height:320px;overflow:hidden;background:radial-gradient(600px 320px at 30% 10%,rgba(92,106,255,.10),transparent 55%),rgba(255,255,255,.92)}
            #nlm-cro-process-timeline .nx3-state{position:absolute;inset:0;padding:16px;overflow:hidden}
            #nlm-cro-process-timeline .nx3-state--skeleton{z-index:1;transition:opacity .35s ease}
            #nlm-cro-process-timeline .nx3-state--live{z-index:2;opacity:0;transform:translateY(8px);transition:opacity .45s ease,transform .45s ease;will-change:opacity,transform}
            #nlm-cro-process-timeline .nx3-device.is-live .nx3-state--skeleton{opacity:0}
            #nlm-cro-process-timeline .nx3-device.is-live .nx3-state--live{opacity:1;transform:translateY(0)}
            #nlm-cro-process-timeline .nx3-skel{border-radius:14px;background:rgba(17,24,39,.06);margin-bottom:10px;height:12px}
            #nlm-cro-process-timeline .nx3-skel.hero{height:96px;border-radius:18px;background:rgba(17,24,39,.05)}
            #nlm-cro-process-timeline .nx3-skel.card{height:54px;background:rgba(17,24,39,.05)}
            #nlm-cro-process-timeline .nx3-skel.card.small{height:42px}
            #nlm-cro-process-timeline .w70{width:70%}
            #nlm-cro-process-timeline .nx3-live__header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px;border:1px solid rgba(17,24,39,.08);border-radius:18px;background:rgba(255,255,255,.75);margin-bottom:12px}
            #nlm-cro-process-timeline .nx3-live__logo{width:28px;height:28px;border-radius:10px;background:rgba(17,24,39,.08)}
            #nlm-cro-process-timeline .nx3-live__nav{display:flex;gap:8px;flex:1;justify-content:center}
            #nlm-cro-process-timeline .nx3-live__nav span{width:44px;height:10px;border-radius:999px;background:rgba(17,24,39,.06)}
            #nlm-cro-process-timeline .nx3-live__cta{width:72px;height:12px;border-radius:999px;background:linear-gradient(90deg,rgba(236,0,140,.22),rgba(92,106,255,.22));border:1px solid rgba(92,106,255,.14)}
            #nlm-cro-process-timeline .nx3-live__viewport{position:relative;height:calc(100% - 68px);overflow:hidden;border-radius:18px;border:1px solid rgba(17,24,39,.06);background:rgba(255,255,255,.72)}
            #nlm-cro-process-timeline .nx3-live__content{transform:translate3d(0,0,0);will-change:transform}
            #nlm-cro-process-timeline .nx3-live__content > *{padding:14px}
            #nlm-cro-process-timeline .nx3-live__hero{padding:16px 14px;background:radial-gradient(520px 220px at 20% 0%,rgba(92,106,255,.12),transparent 60%),rgba(255,255,255,.78);border-bottom:1px solid rgba(17,24,39,.06)}
            #nlm-cro-process-timeline .nx3-live__h1{height:16px;width:58%;border-radius:999px;background:rgba(17,24,39,.08);margin-bottom:12px}
            #nlm-cro-process-timeline .nx3-live__p{height:11px;width:86%;border-radius:999px;background:rgba(17,24,39,.06);margin-bottom:10px}
            #nlm-cro-process-timeline .nx3-live__btns{display:flex;gap:10px;margin-top:12px}
            #nlm-cro-process-timeline .nx3-live__btn{width:92px;height:14px;border-radius:999px;background:linear-gradient(90deg,rgba(236,0,140,.20),rgba(92,106,255,.20));border:1px solid rgba(92,106,255,.12)}
            #nlm-cro-process-timeline .nx3-live__btn.ghost{background:rgba(17,24,39,.04);border:1px solid rgba(17,24,39,.08)}
            #nlm-cro-process-timeline .nx3-live__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;border-bottom:1px solid rgba(17,24,39,.06);background:rgba(255,255,255,.72)}
            #nlm-cro-process-timeline .nx3-live__tile{height:70px;border-radius:16px;background:rgba(17,24,39,.05);border:1px solid rgba(17,24,39,.06)}
            #nlm-cro-process-timeline .nx3-live__section{border-bottom:1px solid rgba(17,24,39,.06);background:rgba(255,255,255,.74)}
            #nlm-cro-process-timeline .nx3-live__k{height:12px;width:30%;border-radius:999px;background:rgba(17,24,39,.07);margin-bottom:12px}
            #nlm-cro-process-timeline .nx3-live__footer{display:grid;grid-template-columns:1fr 1fr;gap:10px;background:rgba(17,24,39,.02)}
            #nlm-cro-process-timeline .nx3-live__fcol{height:64px;border-radius:16px;background:rgba(17,24,39,.04);border:1px solid rgba(17,24,39,.06)}
            #nlm-cro-process-timeline .nx3-cursor{position:absolute;width:10px;height:10px;border-radius:999px;background:rgba(92,106,255,.28);box-shadow:0 0 0 10px rgba(92,106,255,.08);top:140px;left:60%;opacity:0;transform:translate(-50%,-50%);will-change:left,top,opacity;pointer-events:none;z-index:3}
            #nlm-cro-process-timeline .nx3-touch{position:absolute;width:10px;height:10px;border-radius:999px;border:1px solid rgba(92,106,255,.22);top:140px;left:60%;opacity:0;transform:translate(-50%,-50%) scale(0.6);pointer-events:none;z-index:2;will-change:left,top,opacity,transform}
            #nlm-cro-process-timeline .nx3-shine{position:absolute;inset:-40% -30%;background:radial-gradient(closest-side,rgba(255,255,255,.32),transparent 70%);transform:translate(-30%,-20%) rotate(12deg);opacity:0;pointer-events:none;z-index:1;transition:opacity .6s ease}
            #nlm-cro-process-timeline .nx3-device.is-on .nx3-shine{opacity:.18}
            #nlm-cro-process-timeline .nx3-device__badge{position:absolute;right:12px;bottom:12px;padding:8px 10px;border-radius:999px;border:1px solid rgba(17,24,39,.10);background:rgba(255,255,255,.75);box-shadow:0 12px 40px rgba(17,24,39,.08);display:flex;gap:8px;align-items:center;font-weight:700;z-index:5;opacity:0;transform:translateY(10px);transition:opacity .55s var(--enter-ease),transform .55s var(--enter-ease);transition-delay:220ms}
            #nlm-cro-process-timeline .nx3-device.is-on .nx3-device__badge{opacity:1;transform:translateY(0)}
            #nlm-cro-process-timeline .nx3-badge-dot{width:8px;height:8px;border-radius:999px;background:linear-gradient(90deg,rgba(252,3,176,.85),rgba(4,124,249,.85));box-shadow:0 8px 20px rgba(4,124,249,.18)}
            @media(max-width:900px){
              #nlm-cro-process-timeline .step{grid-template-columns:40px 1fr;gap:14px;padding:22px 0;min-height:auto}
              #nlm-cro-process-timeline .timeline::before,#nlm-cro-process-timeline .timeline__progress{left:20px;transform:none}
              #nlm-cro-process-timeline .timeline__tracker{left:20px;transform:translate(-50%,-50%)}
              #nlm-cro-process-timeline .step__middle{grid-column:1}
              #nlm-cro-process-timeline .step__left,#nlm-cro-process-timeline .step__right{grid-column:2;justify-content:flex-start!important}
              #nlm-cro-process-timeline .card,#nlm-cro-process-timeline .graphic{max-width:100%;width:100%}
              #nlm-cro-process-timeline .step[data-side="right"] .step__right{order:1}
              #nlm-cro-process-timeline .step[data-side="right"] .step__left{order:2}
            }
          `}</style>

          <div className="timeline" data-timeline>
            <div className="timeline__progress" data-progress></div>
            <div className="timeline__tracker" data-tracker></div>

            {/* STEP 1 — Audit & Analisi → Funnel CRO */}
            <div className="step" data-step data-side="left">
              <div className="step__left">
                <div className="card">
                  <div className="card__top">
                    <div className="badge">01</div>
                    <div className="icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M16.8 16.8 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <h4>{s[0]?.title || "Step 1"}</h4>
                  </div>
                  <p>{s[0]?.description || ""}</p>
                </div>
              </div>
              <div className="step__middle"><div className="step__dot"></div></div>
              <div className="step__right">
                <div className="graphic">
                  <div className="graphic__pad">
                    <div style={{ borderRadius: "18px", overflow: "hidden", background: "radial-gradient(800px 400px at 50% 0%, rgba(92,106,255,.10), transparent 60%), rgba(255,255,255,.92)", border: "1px solid rgba(17,24,39,.06)", padding: "18px", minHeight: "320px" }}>
                      <div style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", color: "rgba(17,24,39,.45)", marginBottom: "16px", textTransform: "uppercase" }}>Funnel Attuale</div>
                      {[
                        { label: "Visitatori", value: "10.000", pct: 100, color: "rgba(92,106,255,.20)" },
                        { label: "Pagine prodotto", value: "4.200", pct: 72, color: "rgba(92,106,255,.28)" },
                        { label: "Aggiunta carrello", value: "840", pct: 48, color: "rgba(236,0,140,.22)" },
                        { label: "Checkout", value: "320", pct: 28, color: "rgba(236,0,140,.32)" },
                        { label: "Acquisto ✓", value: "128", pct: 14, color: "linear-gradient(90deg, rgba(252,3,176,.55), rgba(4,124,249,.55))" },
                      ].map((row, i) => (
                        <div key={i} style={{ marginBottom: "10px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ fontSize: "12px", fontWeight: 700, color: "rgba(17,24,39,.75)" }}>{row.label}</span>
                            <span style={{ fontSize: "12px", fontWeight: 800, color: "rgba(17,24,39,.55)" }}>{row.value}</span>
                          </div>
                          <div style={{ height: "8px", borderRadius: "999px", background: "rgba(17,24,39,.06)", overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${row.pct}%`, borderRadius: "999px", background: row.color }} />
                          </div>
                        </div>
                      ))}
                      <div style={{ marginTop: "14px", display: "flex", gap: "8px" }}>
                        <div style={{ flex: 1, borderRadius: "12px", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.16)", padding: "10px", textAlign: "center" }}>
                          <div style={{ fontSize: "18px", fontWeight: 900, color: "rgba(239,68,68,.8)" }}>1.28%</div>
                          <div style={{ fontSize: "11px", color: "rgba(17,24,39,.45)", marginTop: "2px" }}>CVR attuale</div>
                        </div>
                        <div style={{ flex: 1, borderRadius: "12px", background: "rgba(239,68,68,.08)", border: "1px solid rgba(239,68,68,.16)", padding: "10px", textAlign: "center" }}>
                          <div style={{ fontSize: "18px", fontWeight: 900, color: "rgba(239,68,68,.8)" }}>87%</div>
                          <div style={{ fontSize: "11px", color: "rgba(17,24,39,.45)", marginTop: "2px" }}>Drop rate</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2 — A/B Test → Visual A/B animato */}
            <div className="step" data-step data-side="right" data-step2="">
              <div className="step__left">
                <div className="graphic">
                  <div className="graphic__pad">
                    <div style={{ borderRadius: "18px", background: "radial-gradient(800px 400px at 50% 0%, rgba(236,0,140,.08), transparent 55%), rgba(255,255,255,.92)", border: "1px solid rgba(17,24,39,.06)", padding: "18px", minHeight: "320px" }}>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                        <span style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", color: "rgba(17,24,39,.45)", textTransform: "uppercase" }}>A/B Test attivo</span>
                        <span style={{ fontSize: "10px", fontWeight: 700, background: "rgba(34,197,94,.12)", color: "rgba(34,197,94,.9)", border: "1px solid rgba(34,197,94,.2)", borderRadius: "999px", padding: "3px 8px" }}>● Live</span>
                      </div>
                      <div style={{ fontSize: "11px", color: "rgba(17,24,39,.45)", background: "rgba(17,24,39,.03)", borderRadius: "10px", padding: "8px 10px", marginBottom: "14px" }}>
                        <span style={{ fontWeight: 700, color: "rgba(17,24,39,.65)" }}>Homepage CTA</span> · 4.812 visite · 12 gg fa
                      </div>
                      {/* Variante A */}
                      <div style={{ marginBottom: "14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, background: "rgba(17,24,39,.06)", border: "1px solid rgba(17,24,39,.10)", borderRadius: "4px", padding: "2px 6px", color: "rgba(17,24,39,.55)" }}>A</span>
                            <span style={{ fontSize: "12px", color: "rgba(17,24,39,.65)" }}>"Scopri di più"</span>
                          </div>
                          <span style={{ fontSize: "13px", fontWeight: 800, color: "rgba(17,24,39,.65)" }}>2.3% <span style={{ fontSize: "10px", fontWeight: 400 }}>CVR</span></span>
                        </div>
                        <div style={{ height: "10px", borderRadius: "999px", background: "rgba(17,24,39,.06)", overflow: "hidden" }}>
                          <div className="ab-bar" data-bar-a style={{ background: "rgba(17,24,39,.20)" }} />
                        </div>
                        <div style={{ fontSize: "10px", color: "rgba(17,24,39,.35)", marginTop: "3px" }}>2.368 visite · 54 conv.</div>
                      </div>
                      {/* Variante B */}
                      <div style={{ marginBottom: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span style={{ fontSize: "11px", fontWeight: 700, background: "rgba(4,124,249,.10)", border: "1px solid rgba(4,124,249,.18)", borderRadius: "4px", padding: "2px 6px", color: "rgba(4,124,249,.85)" }}>B</span>
                            <span style={{ fontSize: "12px", color: "rgba(17,24,39,.65)" }}>"Ottimizza ora"</span>
                            <span style={{ fontSize: "10px", fontWeight: 700, background: "rgba(34,197,94,.10)", color: "rgba(34,197,94,.8)", borderRadius: "999px", padding: "2px 6px" }}>+92%</span>
                          </div>
                          <span style={{ fontSize: "13px", fontWeight: 800, color: "rgba(4,124,249,.85)" }}>4.4% <span style={{ fontSize: "10px", fontWeight: 400, color: "rgba(17,24,39,.45)" }}>CVR</span></span>
                        </div>
                        <div style={{ height: "10px", borderRadius: "999px", background: "rgba(17,24,39,.06)", overflow: "hidden" }}>
                          <div className="ab-bar" data-bar-b style={{ background: "linear-gradient(to right, #fc03b0, #047cf9)" }} />
                        </div>
                        <div style={{ fontSize: "10px", color: "rgba(17,24,39,.35)", marginTop: "3px" }}>2.444 visite · 107 conv.</div>
                      </div>
                      <div style={{ borderTop: "1px solid rgba(17,24,39,.06)", paddingTop: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: "12px", fontWeight: 700, color: "rgba(4,124,249,.85)" }}>🏆 Variante B vincitrice · 97% conf.</span>
                        <span style={{ fontSize: "10px", color: "rgba(17,24,39,.35)" }}>2 gg al termine</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="step__middle"><div className="step__dot"></div></div>
              <div className="step__right">
                <div className="card">
                  <div className="card__top">
                    <div className="badge">02</div>
                    <div className="icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <h4>{s[1]?.title || "Step 2"}</h4>
                  </div>
                  <p>{s[1]?.description || ""}</p>
                </div>
              </div>
            </div>

            {/* STEP 3 — Report & Iterazione → Dashboard analytics animata */}
            <div className="step" data-step data-side="left" data-step3="">
              <div className="step__left">
                <div className="card">
                  <div className="card__top">
                    <div className="badge">03</div>
                    <div className="icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M4 16l6-6 4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M20 8v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <h4>{s[2]?.title || "Step 3"}</h4>
                  </div>
                  <p>{s[2]?.description || ""}</p>
                </div>
              </div>
              <div className="step__middle"><div className="step__dot"></div></div>
              <div className="step__right">
                <div className="graphic">
                  <div className="graphic__pad">
                    <div className="nx3-proto__stage">
                      <div className="nx3-device" data-nx3-device>
                        <div className="nx3-device__top">
                          <div className="nx3-traffic"><span></span><span></span><span></span></div>
                          <div className="nx3-url">
                            <span className="nx3-url__text">analytics.dashboard.it</span>
                          </div>
                          <div className="nx3-signal"></div>
                        </div>
                        <div className="nx3-screen">
                          <div className="nx3-state nx3-state--skeleton" data-nx3-skel>
                            <div className="nx3-skel hero"></div>
                            <div className="nx3-skel line"></div>
                            <div className="nx3-skel line w70"></div>
                            <div className="nx3-skel card"></div>
                            <div className="nx3-skel card small"></div>
                          </div>
                          <div className="nx3-state nx3-state--live" data-nx3-live>
                            <div className="nx3-live__header">
                              <div className="nx3-live__logo"></div>
                              <div className="nx3-live__nav"><span></span><span></span><span></span></div>
                              <div className="nx3-live__cta"></div>
                            </div>
                            <div className="nx3-live__viewport" data-nx3-viewport>
                              <div className="nx3-live__content" data-nx3-content>
                                {/* KPI cards */}
                                <div style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", borderBottom: "1px solid rgba(17,24,39,.06)" }}>
                                  {[
                                    { label: "CVR", value: "+42%", color: "rgba(34,197,94,.9)" },
                                    { label: "ROAS", value: "2.8x", color: "rgba(4,124,249,.85)" },
                                    { label: "AOV", value: "+18%", color: "rgba(252,3,176,.85)" },
                                  ].map((kpi, i) => (
                                    <div key={i} style={{ borderRadius: "10px", background: "rgba(17,24,39,.04)", border: "1px solid rgba(17,24,39,.06)", padding: "8px", textAlign: "center" }}>
                                      <div style={{ fontSize: "14px", fontWeight: 900, color: kpi.color }}>{kpi.value}</div>
                                      <div style={{ fontSize: "10px", color: "rgba(17,24,39,.4)", marginTop: "2px" }}>{kpi.label}</div>
                                    </div>
                                  ))}
                                </div>
                                {/* Chart bars */}
                                <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(17,24,39,.06)" }}>
                                  <div style={{ fontSize: "10px", fontWeight: 700, color: "rgba(17,24,39,.35)", marginBottom: "8px" }}>Conversioni mensili</div>
                                  <div style={{ display: "flex", alignItems: "flex-end", gap: "3px", height: "50px" }}>
                                    {[30, 42, 35, 50, 45, 60, 55, 72, 65, 80, 75, 92].map((h, i) => (
                                      <div key={i} style={{ flex: 1, borderRadius: "3px 3px 0 0", height: `${h}%`, background: i >= 9 ? "linear-gradient(to top, #fc03b0, #047cf9)" : "rgba(17,24,39,.10)" }} />
                                    ))}
                                  </div>
                                </div>
                                <div className="nx3-live__section">
                                  <div className="nx3-live__k"></div>
                                  <div className="nx3-live__p"></div>
                                </div>
                                <div className="nx3-live__footer">
                                  <div className="nx3-live__fcol"></div>
                                  <div className="nx3-live__fcol"></div>
                                </div>
                              </div>
                            </div>
                            <div className="nx3-cursor" data-nx3-cursor></div>
                            <div className="nx3-touch" data-nx3-touch></div>
                          </div>
                          <div className="nx3-shine"></div>
                        </div>
                        <div className="nx3-device__badge">
                          <span className="nx3-badge-dot"></span> Report live
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}