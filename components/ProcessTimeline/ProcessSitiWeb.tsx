"use client"

import { useEffect, useRef } from "react"

interface ProcessStep {
  title: string
  description: string
}

interface ProcessSitiWebProps {
  titleHighlight?: string
  titleNormal?: string
  subtitle?: string
  steps?: ProcessStep[]
}

export default function ProcessSitiWeb({
  titleHighlight,
  titleNormal,
  subtitle,
  steps,
}: ProcessSitiWebProps) {
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
      requestAnimationFrame(() => {
        updateProgress()
        ticking = false
      })
    }

    const step3 = root.querySelector<HTMLElement>("[data-step3]")
    const stage3 = step3?.querySelector<HTMLElement>(".nx3-proto__stage") ?? null
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
            const vmax = 0.55
            if (v > vmax) v = vmax
            if (v < -vmax) v = -vmax
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
        running = true
        lastT = 0
        maxY = measure()
        y = Math.min(y, maxY)
        v = 0
        stopIndex = 0
        target = (stops[1] || 0.25) * maxY
        holdLeft = 900
        rafId = requestAnimationFrame(loop)
      }

      const stop = () => {
        running = false
        if (rafId) cancelAnimationFrame(rafId)
        rafId = null
        lastT = 0
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
        if (e.isIntersecting && e.intersectionRatio > 0.28) {
          proto.reveal()
          proto.start()
        } else {
          proto.stop()
        }
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

        <div id="nlm-web-process-timeline" ref={rootRef}>
          <style>{`
            #nlm-web-process-timeline{--grad-a:#fc03b0;--grad-b:#047cf9;--text:#0f172a;--muted:#64748b;--card:#ffffff;--card-border:rgba(15,23,42,.06);--shadow:0 18px 50px rgba(15,23,42,.08);--line-bg:rgba(4,124,249,.14);--radius:18px;--enter-y:26px;--enter-dur:620ms;--enter-ease:cubic-bezier(.2,.8,.2,1);font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial;color:var(--text)}
            #nlm-web-process-timeline *{box-sizing:border-box}
            #nlm-web-process-timeline .timeline{position:relative;padding:12px 0}
            #nlm-web-process-timeline .timeline::before{content:"";position:absolute;left:50%;top:0;transform:translateX(-50%);width:6px;height:100%;background:var(--line-bg);border-radius:999px}
            #nlm-web-process-timeline .timeline__progress{position:absolute;left:50%;top:0;transform:translateX(-50%);width:6px;height:0;border-radius:999px;background:linear-gradient(180deg,var(--grad-a) 0%,var(--grad-b) 100%);will-change:height}
            #nlm-web-process-timeline .timeline__tracker{position:absolute;left:50%;top:0;transform:translate(-50%,-50%);width:16px;height:16px;border-radius:999px;background:#fff;border:3px solid rgba(4,124,249,.55);box-shadow:0 10px 30px rgba(4,124,249,.18);will-change:top}
            #nlm-web-process-timeline .step{position:relative;display:grid;grid-template-columns:1fr 90px 1fr;align-items:center;gap:18px;padding:34px 0;min-height:220px}
            #nlm-web-process-timeline .step__left,#nlm-web-process-timeline .step__right{display:flex;min-width:0}
            #nlm-web-process-timeline .step[data-side="left"] .step__left{justify-content:flex-end}
            #nlm-web-process-timeline .step[data-side="left"] .step__right{justify-content:flex-start}
            #nlm-web-process-timeline .step[data-side="right"] .step__left{justify-content:flex-end}
            #nlm-web-process-timeline .step[data-side="right"] .step__right{justify-content:flex-start}
            #nlm-web-process-timeline .step__middle{position:relative;height:100%;display:flex;justify-content:center}
            #nlm-web-process-timeline .step__dot{position:absolute;top:50%;transform:translateY(-50%);width:18px;height:18px;border-radius:999px;background:rgba(4,124,249,.35);transition:opacity .25s ease,transform .25s ease;opacity:.35}
            #nlm-web-process-timeline .card{background:var(--card);border:1px solid var(--card-border);border-radius:var(--radius);box-shadow:var(--shadow);padding:22px;max-width:460px}
            #nlm-web-process-timeline .card__top{display:flex;align-items:center;gap:12px;margin-bottom:10px}
            #nlm-web-process-timeline .badge{width:34px;height:34px;border-radius:10px;background:rgba(4,124,249,.10);display:grid;place-items:center;color:rgba(4,124,249,.95);font-weight:800;font-size:13px;flex:0 0 auto}
            #nlm-web-process-timeline .icon{width:34px;height:34px;border-radius:10px;display:grid;place-items:center;background:linear-gradient(135deg,rgba(252,3,176,.12),rgba(4,124,249,.10));color:rgba(15,23,42,.9);border:1px solid rgba(15,23,42,.06);flex:0 0 auto}
            #nlm-web-process-timeline .card h4{margin:0;font-size:24px;letter-spacing:-0.01em;line-height:1.2}
            #nlm-web-process-timeline .card p{margin:8px 0 0;line-height:1.65;font-size:18px;color:inherit}
            #nlm-web-process-timeline .graphic{border-radius:22px;overflow:hidden;border:1px solid rgba(15,23,42,.06);box-shadow:0 18px 60px rgba(15,23,42,.08);background:rgba(255,255,255,.85);max-width:520px;width:100%;min-width:0}
            #nlm-web-process-timeline .graphic__pad{padding:14px}
            #nlm-web-process-timeline .card,#nlm-web-process-timeline .graphic{opacity:0;transform:translateY(var(--enter-y));transition:opacity var(--enter-dur) var(--enter-ease),transform var(--enter-dur) var(--enter-ease);will-change:opacity,transform}
            #nlm-web-process-timeline .step .card{transition-delay:140ms}
            #nlm-web-process-timeline .step .graphic{transition-delay:260ms}
            #nlm-web-process-timeline .step.is-active .card,#nlm-web-process-timeline .step.is-active .graphic{opacity:1;transform:translateY(0)}
            #nlm-web-process-timeline .step.is-active .step__dot{opacity:1;transform:translateY(-50%) scale(1.05)}
            #nlm-web-process-timeline .nx-map__stage{position:relative;isolation:isolate;border-radius:22px;padding:18px;min-height:360px;overflow:hidden;background:radial-gradient(1200px 500px at 50% 0%,rgba(92,106,255,.10),transparent 60%),radial-gradient(800px 520px at 85% 20%,rgba(236,0,140,.08),transparent 55%),rgba(255,255,255,.92);border:1px solid rgba(17,24,39,.06)}
            #nlm-web-process-timeline .nx-map__svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}
            #nlm-web-process-timeline .nx-node{position:absolute;width:clamp(150px,18vw,175px);border-radius:16px;background:rgba(255,255,255,.92);border:1px solid rgba(17,24,39,.08);box-shadow:0 12px 40px rgba(17,24,39,.06);padding:10px;z-index:3;opacity:1!important;transform:none!important}
            #nlm-web-process-timeline .nx-node__chip{display:inline-flex;align-items:center;padding:4px 8px;border-radius:999px;background:rgba(17,24,39,.04);border:1px solid rgba(17,24,39,.06);font-weight:800;font-size:12px;line-height:1;white-space:nowrap}
            #nlm-web-process-timeline .nx-node__chip--primary{background:linear-gradient(90deg,rgba(252,3,176,.14),rgba(4,124,249,.12));border:1px solid rgba(4,124,249,.14)}
            #nlm-web-process-timeline .nx-node__text{margin-top:6px;opacity:.78;font-size:12px;line-height:1.35}
            #nlm-web-process-timeline .nx-node--a{left:4%;top:14%}
            #nlm-web-process-timeline .nx-node--b{left:4%;top:39%}
            #nlm-web-process-timeline .nx-node--c{left:4%;top:64%}
            #nlm-web-process-timeline .nx-node--d{right:4%;top:39%;width:clamp(150px,20vw,190px)}
            #nlm-web-process-timeline .nx-lines--glow .nx-line{stroke:rgba(92,106,255,.22);stroke-width:3.2;filter:blur(1.4px)}
            #nlm-web-process-timeline .nx-lines--crisp .nx-line{stroke:rgba(27,27,31,.42);stroke-width:1.4}
            #nlm-web-process-timeline .nx-line{fill:none;stroke-linecap:round;stroke-linejoin:round;vector-effect:non-scaling-stroke;opacity:1!important}
            #nlm-web-process-timeline .nx-pulse{position:absolute;left:50%;top:50%;width:12px;height:12px;border-radius:999px;transform:translate(-50%,-50%);background:rgba(92,106,255,.35);box-shadow:0 0 0 9px rgba(92,106,255,.08);z-index:2;opacity:1!important}
            #nlm-web-process-timeline .nx2-sitemap__canvas{border-radius:18px;background:rgba(255,255,255,.70);border:1px solid rgba(17,24,39,.06);box-shadow:0 12px 40px rgba(17,24,39,.06);padding:12px;overflow:hidden}
            #nlm-web-process-timeline .nx2-tree{margin:0;padding:0;list-style:none;width:100%}
            #nlm-web-process-timeline .nx2-tree ul{margin:0;padding:0;list-style:none}
            #nlm-web-process-timeline .nx2-tree__root{display:flex;flex-direction:column;align-items:center;gap:12px;padding-top:2px;position:relative}
            #nlm-web-process-timeline .nx2-tree__level--top{display:flex;justify-content:space-between;gap:12px;width:100%;position:relative;padding-top:14px}
            #nlm-web-process-timeline .nx2-tree__level--top:before{content:"";position:absolute;left:6%;right:6%;top:5px;height:5px;background:rgba(17,24,39,.18);border-radius:999px;opacity:.55}
            #nlm-web-process-timeline .nx2-tree__branch{flex:1 1 0;min-width:0;display:flex;flex-direction:column;align-items:center;gap:10px;position:relative;padding-top:8px}
            #nlm-web-process-timeline .nx2-tree__branch:before{content:"";position:absolute;top:-1px;width:7px;height:16px;background:rgba(17,24,39,.18);border-radius:999px;opacity:.55}
            #nlm-web-process-timeline .nx2-tree__level--leaf{display:flex;flex-direction:column;gap:8px;width:100%;align-items:center;padding-top:8px;position:relative}
            #nlm-web-process-timeline .nx2-tree__level--leaf:before{content:"";position:absolute;top:-1px;left:50%;transform:translateX(-50%);width:7px;height:16px;background:rgba(17,24,39,.18);border-radius:999px;opacity:.55}
            #nlm-web-process-timeline .nx2-node{display:inline-flex;align-items:center;justify-content:center;text-align:center;font-weight:800;padding:8px 10px;border-radius:12px;border:1px solid rgba(17,24,39,.08);background:rgba(255,255,255,.92);box-shadow:0 12px 40px rgba(17,24,39,.06);font-size:13px;line-height:1;min-width:0;max-width:100%;white-space:nowrap}
            #nlm-web-process-timeline .nx2-node--root{font-size:16px;padding:9px 12px;border-radius:14px;border-color:rgba(4,124,249,.18);background:linear-gradient(180deg,rgba(4,124,249,.16),rgba(255,255,255,.92));position:relative}
            #nlm-web-process-timeline .nx2-node--top{border-color:rgba(4,124,249,.16);background:rgba(4,124,249,.10)}
            #nlm-web-process-timeline .nx2-node--leaf{border-color:rgba(252,3,176,.18);background:rgba(252,3,176,.08)}
            #nlm-web-process-timeline .nx3-proto__stage{position:relative;border-radius:22px;padding:clamp(14px,2.2vw,20px);overflow:hidden;background:radial-gradient(1200px 520px at 50% 0%,rgba(92,106,255,.10),transparent 60%),radial-gradient(820px 560px at 85% 20%,rgba(236,0,140,.08),transparent 55%),rgba(255,255,255,.92);border:1px solid rgba(17,24,39,.06);min-height:360px;display:flex;align-items:center;justify-content:center}
            #nlm-web-process-timeline .nx3-device{position:relative;width:min(560px,100%);border-radius:22px;border:1px solid rgba(17,24,39,.10);background:rgba(255,255,255,.84);box-shadow:0 24px 90px rgba(17,24,39,.10);overflow:hidden;opacity:0;transform:translateY(14px);transition:opacity .6s var(--enter-ease),transform .6s var(--enter-ease);will-change:opacity,transform;contain:layout paint style}
            #nlm-web-process-timeline .nx3-device.is-on{opacity:1;transform:translateY(0)}
            #nlm-web-process-timeline .nx3-device__top{display:flex;align-items:center;gap:12px;padding:10px 12px;border-bottom:1px solid rgba(17,24,39,.08);background:rgba(255,255,255,.75);position:relative;z-index:4}
            #nlm-web-process-timeline .nx3-traffic{display:flex;gap:6px}
            #nlm-web-process-timeline .nx3-traffic span{width:10px;height:10px;border-radius:999px;background:rgba(17,24,39,.14)}
            #nlm-web-process-timeline .nx3-url{flex:1;display:flex;align-items:center;gap:8px;padding:7px 10px;border-radius:999px;border:1px solid rgba(17,24,39,.08);background:rgba(17,24,39,.03);overflow:hidden}
            #nlm-web-process-timeline .nx3-url__text{opacity:.72;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
            #nlm-web-process-timeline .nx3-signal{width:18px;height:10px;border-radius:999px;background:rgba(17,24,39,.08)}
            #nlm-web-process-timeline .nx3-screen{position:relative;height:320px;overflow:hidden;background:radial-gradient(600px 320px at 30% 10%,rgba(92,106,255,.10),transparent 55%),rgba(255,255,255,.92)}
            #nlm-web-process-timeline .nx3-state{position:absolute;inset:0;padding:16px;overflow:hidden}
            #nlm-web-process-timeline .nx3-state--skeleton{z-index:1;transition:opacity .35s ease}
            #nlm-web-process-timeline .nx3-state--live{z-index:2;opacity:0;transform:translateY(8px);transition:opacity .45s ease,transform .45s ease;will-change:opacity,transform}
            #nlm-web-process-timeline .nx3-device.is-live .nx3-state--skeleton{opacity:0}
            #nlm-web-process-timeline .nx3-device.is-live .nx3-state--live{opacity:1;transform:translateY(0)}
            #nlm-web-process-timeline .nx3-skel{border-radius:14px;background:rgba(17,24,39,.06);margin-bottom:10px;height:12px}
            #nlm-web-process-timeline .nx3-skel.hero{height:96px;border-radius:18px;background:rgba(17,24,39,.05)}
            #nlm-web-process-timeline .nx3-skel.card{height:54px;background:rgba(17,24,39,.05)}
            #nlm-web-process-timeline .nx3-skel.card.small{height:42px}
            #nlm-web-process-timeline .w70{width:70%}
            #nlm-web-process-timeline .nx3-live__header{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 12px;border:1px solid rgba(17,24,39,.08);border-radius:18px;background:rgba(255,255,255,.75);margin-bottom:12px}
            #nlm-web-process-timeline .nx3-live__logo{width:28px;height:28px;border-radius:10px;background:rgba(17,24,39,.08)}
            #nlm-web-process-timeline .nx3-live__nav{display:flex;gap:8px;flex:1;justify-content:center}
            #nlm-web-process-timeline .nx3-live__nav span{width:44px;height:10px;border-radius:999px;background:rgba(17,24,39,.06)}
            #nlm-web-process-timeline .nx3-live__cta{width:72px;height:12px;border-radius:999px;background:linear-gradient(90deg,rgba(236,0,140,.22),rgba(92,106,255,.22));border:1px solid rgba(92,106,255,.14)}
            #nlm-web-process-timeline .nx3-live__viewport{position:relative;height:calc(100% - 68px);overflow:hidden;border-radius:18px;border:1px solid rgba(17,24,39,.06);background:rgba(255,255,255,.72)}
            #nlm-web-process-timeline .nx3-live__content{transform:translate3d(0,0,0);will-change:transform}
            #nlm-web-process-timeline .nx3-live__content > *{padding:14px}
            #nlm-web-process-timeline .nx3-live__hero{padding:16px 14px;background:radial-gradient(520px 220px at 20% 0%,rgba(92,106,255,.12),transparent 60%),rgba(255,255,255,.78);border-bottom:1px solid rgba(17,24,39,.06)}
            #nlm-web-process-timeline .nx3-live__h1{height:16px;width:58%;border-radius:999px;background:rgba(17,24,39,.08);margin-bottom:12px}
            #nlm-web-process-timeline .nx3-live__p{height:11px;width:86%;border-radius:999px;background:rgba(17,24,39,.06);margin-bottom:10px}
            #nlm-web-process-timeline .nx3-live__btns{display:flex;gap:10px;margin-top:12px}
            #nlm-web-process-timeline .nx3-live__btn{width:92px;height:14px;border-radius:999px;background:linear-gradient(90deg,rgba(236,0,140,.20),rgba(92,106,255,.20));border:1px solid rgba(92,106,255,.12)}
            #nlm-web-process-timeline .nx3-live__btn.ghost{background:rgba(17,24,39,.04);border:1px solid rgba(17,24,39,.08)}
            #nlm-web-process-timeline .nx3-live__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;border-bottom:1px solid rgba(17,24,39,.06);background:rgba(255,255,255,.72)}
            #nlm-web-process-timeline .nx3-live__tile{height:70px;border-radius:16px;background:rgba(17,24,39,.05);border:1px solid rgba(17,24,39,.06)}
            #nlm-web-process-timeline .nx3-live__section{border-bottom:1px solid rgba(17,24,39,.06);background:rgba(255,255,255,.74)}
            #nlm-web-process-timeline .nx3-live__k{height:12px;width:30%;border-radius:999px;background:rgba(17,24,39,.07);margin-bottom:12px}
            #nlm-web-process-timeline .nx3-live__footer{display:grid;grid-template-columns:1fr 1fr;gap:10px;background:rgba(17,24,39,.02)}
            #nlm-web-process-timeline .nx3-live__fcol{height:64px;border-radius:16px;background:rgba(17,24,39,.04);border:1px solid rgba(17,24,39,.06)}
            #nlm-web-process-timeline .nx3-cursor{position:absolute;width:10px;height:10px;border-radius:999px;background:rgba(92,106,255,.28);box-shadow:0 0 0 10px rgba(92,106,255,.08);top:140px;left:60%;opacity:0;transform:translate(-50%,-50%);will-change:left,top,opacity;pointer-events:none;z-index:3}
            #nlm-web-process-timeline .nx3-touch{position:absolute;width:10px;height:10px;border-radius:999px;border:1px solid rgba(92,106,255,.22);top:140px;left:60%;opacity:0;transform:translate(-50%,-50%) scale(0.6);pointer-events:none;z-index:2;will-change:left,top,opacity,transform}
            #nlm-web-process-timeline .nx3-shine{position:absolute;inset:-40% -30%;background:radial-gradient(closest-side,rgba(255,255,255,.32),transparent 70%);transform:translate(-30%,-20%) rotate(12deg);opacity:0;pointer-events:none;z-index:1;transition:opacity .6s ease}
            #nlm-web-process-timeline .nx3-device.is-on .nx3-shine{opacity:.18}
            #nlm-web-process-timeline .nx3-device__badge{position:absolute;right:12px;bottom:12px;padding:8px 10px;border-radius:999px;border:1px solid rgba(17,24,39,.10);background:rgba(255,255,255,.75);box-shadow:0 12px 40px rgba(17,24,39,.08);display:flex;gap:8px;align-items:center;font-weight:700;z-index:5;opacity:0;transform:translateY(10px);transition:opacity .55s var(--enter-ease),transform .55s var(--enter-ease);transition-delay:220ms}
            #nlm-web-process-timeline .nx3-device.is-on .nx3-device__badge{opacity:1;transform:translateY(0)}
            #nlm-web-process-timeline .nx3-badge-dot{width:8px;height:8px;border-radius:999px;background:linear-gradient(90deg,rgba(252,3,176,.85),rgba(4,124,249,.85));box-shadow:0 8px 20px rgba(4,124,249,.18)}
            @media(max-width:900px){
              #nlm-web-process-timeline .step{grid-template-columns:40px 1fr;gap:14px;padding:22px 0;min-height:auto}
              #nlm-web-process-timeline .timeline::before,#nlm-web-process-timeline .timeline__progress{left:20px;transform:none}
              #nlm-web-process-timeline .timeline__tracker{left:20px;transform:translate(-50%,-50%)}
              #nlm-web-process-timeline .step__middle{grid-column:1}
              #nlm-web-process-timeline .step__left,#nlm-web-process-timeline .step__right{grid-column:2;justify-content:flex-start!important}
              #nlm-web-process-timeline .card,#nlm-web-process-timeline .graphic{max-width:100%;width:100%}
              #nlm-web-process-timeline .step[data-side="right"] .step__right{order:1}
              #nlm-web-process-timeline .step[data-side="right"] .step__left{order:2}
            }
          `}</style>

          <div className="timeline" data-timeline>
            <div className="timeline__progress" data-progress></div>
            <div className="timeline__tracker" data-tracker></div>

            {/* STEP 1 */}
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
                    <div className="nx-map__stage">
                      <div className="nx-node nx-node--a"><div className="nx-node__chip">Obiettivi</div><div className="nx-node__text">Cosa deve ottenere il sito.</div></div>
                      <div className="nx-node nx-node--b"><div className="nx-node__chip">Pubblico</div><div className="nx-node__text">A chi stai parlando davvero.</div></div>
                      <div className="nx-node nx-node--c"><div className="nx-node__chip">Messaggio</div><div className="nx-node__text">Cosa deve restare in testa.</div></div>
                      <div className="nx-node nx-node--d"><div className="nx-node__chip nx-node__chip--primary">Struttura del sito</div><div className="nx-node__text">Ordine, sezioni e conversione.</div></div>
                      <svg className="nx-map__svg" viewBox="0 0 1000 520" preserveAspectRatio="none">
                        <g className="nx-lines nx-lines--glow">
                          <path className="nx-line" d="M 220 135 C 360 135, 420 175, 520 260"/>
                          <path className="nx-line" d="M 220 260 C 360 260, 420 260, 520 260"/>
                          <path className="nx-line" d="M 220 385 C 360 385, 420 345, 520 260"/>
                          <path className="nx-line" d="M 520 260 C 650 260, 730 260, 820 260"/>
                        </g>
                        <g className="nx-lines nx-lines--crisp">
                          <path className="nx-line" d="M 220 135 C 360 135, 420 175, 520 260"/>
                          <path className="nx-line" d="M 220 260 C 360 260, 420 260, 520 260"/>
                          <path className="nx-line" d="M 220 385 C 360 385, 420 345, 520 260"/>
                          <path className="nx-line" d="M 520 260 C 650 260, 730 260, 820 260"/>
                        </g>
                      </svg>
                      <div className="nx-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div className="step" data-step data-side="right">
              <div className="step__left">
                <div className="graphic">
                  <div className="graphic__pad">
                    <div className="nx2-sitemap">
                      <div className="nx2-sitemap__canvas">
                        <ul className="nx2-tree">
                          <li className="nx2-tree__root">
                            <div className="nx2-node nx2-node--root">Home</div>
                            <ul className="nx2-tree__level nx2-tree__level--top">
                              <li className="nx2-tree__branch">
                                <div className="nx2-node nx2-node--top">About</div>
                                <ul className="nx2-tree__level nx2-tree__level--leaf">
                                  <li><div className="nx2-node nx2-node--leaf">History</div></li>
                                  <li><div className="nx2-node nx2-node--leaf">FAQ</div></li>
                                </ul>
                              </li>
                              <li className="nx2-tree__branch">
                                <div className="nx2-node nx2-node--top">Pages</div>
                              </li>
                              <li className="nx2-tree__branch">
                                <div className="nx2-node nx2-node--top">Posts</div>
                                <ul className="nx2-tree__level nx2-tree__level--leaf">
                                  <li><div className="nx2-node nx2-node--leaf">Related</div></li>
                                  <li><div className="nx2-node nx2-node--leaf">Latest</div></li>
                                  <li><div className="nx2-node nx2-node--leaf">Category</div></li>
                                </ul>
                              </li>
                              <li className="nx2-tree__branch">
                                <div className="nx2-node nx2-node--top">Services</div>
                                <ul className="nx2-tree__level nx2-tree__level--leaf">
                                  <li><div className="nx2-node nx2-node--leaf">Free</div></li>
                                  <li><div className="nx2-node nx2-node--leaf">Premium</div></li>
                                  <li><div className="nx2-node nx2-node--leaf">Cases</div></li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
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
                        <path d="M4 4h16v16H4V4Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 8h8M8 12h5M8 16h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <h4>{s[1]?.title || "Step 2"}</h4>
                  </div>
                  <p>{s[1]?.description || ""}</p>
                </div>
              </div>
            </div>

            {/* STEP 3 */}
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
                            <span className="nx3-url__lock"></span>
                            <span className="nx3-url__text">prototype.yoursite.it</span>
                          </div>
                          <div className="nx3-signal"></div>
                        </div>
                        <div className="nx3-screen">
                          <div className="nx3-state nx3-state--skeleton" data-nx3-skel>
                            <div className="nx3-skel hero"></div>
                            <div className="nx3-skel line"></div>
                            <div className="nx3-skel line w70"></div>
                            <div className="nx3-skel card"></div>
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
                                <div className="nx3-live__hero">
                                  <div className="nx3-live__h1"></div>
                                  <div className="nx3-live__p"></div>
                                  <div className="nx3-live__p w75"></div>
                                  <div className="nx3-live__btns">
                                    <div className="nx3-live__btn"></div>
                                    <div className="nx3-live__btn ghost"></div>
                                  </div>
                                </div>
                                <div className="nx3-live__grid">
                                  <div className="nx3-live__tile"></div>
                                  <div className="nx3-live__tile"></div>
                                  <div className="nx3-live__tile"></div>
                                </div>
                                <div className="nx3-live__section">
                                  <div className="nx3-live__k"></div>
                                  <div className="nx3-live__p"></div>
                                  <div className="nx3-live__p w60"></div>
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
                          <span className="nx3-badge-dot"></span> Live preview
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