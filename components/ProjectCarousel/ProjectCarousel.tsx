'use client'

import { useEffect, useRef } from 'react'
import './ProjectCarousel.css'

export default function ProjectCarousel() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const slides = Array.from(document.querySelectorAll<HTMLElement>('.nlm-slide'))
    const track = document.querySelector<HTMLElement>('.nlm-track')
    const section = sectionRef.current!
    const nextButton = document.querySelector<HTMLButtonElement>('.nlm-btn.next')
    const prevButton = document.querySelector<HTMLButtonElement>('.nlm-btn.prev')

    if (!slides.length || !track || !section) return

    let current = 2
    let autoplayTimer: ReturnType<typeof setInterval> | null = null
    let openProgress = 0

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const FINAL = { x1: 180, x2: 320, s1: 0.85, s2: 0.7 }
    const MOBILE = { x1: 50, x2: 100, s1: 0.85, s2: 0.7 }

    function isMobile() {
      return window.innerWidth <= 600
    }

    function params() {
      const p = isMobile() ? MOBILE : FINAL
      return {
        x1: p.x1 * openProgress,
        x2: p.x2 * openProgress,
        s1: lerp(1, p.s1, openProgress),
        s2: lerp(1, p.s2, openProgress),
      }
    }

    function render() {
      const { x1, x2, s1, s2 } = params()

      slides.forEach((slide, i) => {
        const diff = (i - current + slides.length) % slides.length

        slide.style.transition = openProgress < 1
          ? 'transform 0.1s linear'
          : 'transform 0.9s cubic-bezier(0.25,1,0.3,1)'

        if (diff === 0) {
          slide.style.transform = 'translateX(0) scale(1)'
          slide.style.zIndex = '10'
        } else if (diff === 1 || diff === slides.length - 1) {
          const d = diff === 1 ? 1 : -1
          slide.style.transform = `translateX(${d * x1}px) scale(${s1})`
          slide.style.zIndex = '6'
        } else if (diff === 2 || diff === slides.length - 2) {
          const d = diff === 2 ? 1 : -1
          slide.style.transform = `translateX(${d * x2}px) scale(${s2})`
          slide.style.zIndex = '5'
        } else {
          slide.style.transform = 'translateX(0) scale(0.5)'
          slide.style.zIndex = '1'
        }
      })

      // frecce seguono dinamicamente l'ultima card visibile + 20px
      const cardW = 300
      const offset = x2 + (cardW / 2) * s2 + 40
      const btnW = 25
      if (prevButton) {
        prevButton.style.left = `calc(50% - ${offset + btnW}px)`
        prevButton.style.right = 'auto'
      }
      if (nextButton) {
        nextButton.style.right = `calc(50% - ${offset + btnW}px)`
        nextButton.style.left = 'auto'
      }
    }

    function updateProgress() {
      const rect = section.getBoundingClientRect()
      const windowH = window.innerHeight
      const start = windowH * 0.9
      const end = windowH * 0.3
      const top = rect.top
      const raw = (start - top) / (start - end)
      openProgress = Math.min(1, Math.max(0, raw))
      render()
    }

    const next = () => { current = (current + 1) % slides.length; render() }
    const prev = () => { current = (current - 1 + slides.length) % slides.length; render() }

    nextButton?.addEventListener('click', next)
    prevButton?.addEventListener('click', prev)

    let sx = 0
    let ex = 0
    const onTouchStart = (e: TouchEvent) => { sx = e.touches[0].clientX; ex = sx }
    const onTouchMove = (e: TouchEvent) => { ex = e.touches[0].clientX }
    const onTouchEnd = () => {
      const dx = ex - sx
      if (Math.abs(dx) > 45) dx < 0 ? next() : prev()
    }

    track.addEventListener('touchstart', onTouchStart, { passive: true })
    track.addEventListener('touchmove', onTouchMove, { passive: true })
    track.addEventListener('touchend', onTouchEnd)

    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    updateProgress()

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          autoplayTimer = setInterval(next, 3000)
        } else {
          if (autoplayTimer) clearInterval(autoplayTimer)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(section)

    return () => {
      nextButton?.removeEventListener('click', next)
      prevButton?.removeEventListener('click', prev)
      track.removeEventListener('touchstart', onTouchStart)
      track.removeEventListener('touchmove', onTouchMove)
      track.removeEventListener('touchend', onTouchEnd)
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
      observer.disconnect()
      if (autoplayTimer) clearInterval(autoplayTimer)
    }
  }, [])

  return (
    <section className="nlm-coverflow" ref={sectionRef}>
      <button className="nlm-btn prev" aria-label="Previous">&#10094;</button>

      <div className="nlm-track">
        <div className="nlm-slide"><div className="nlm-card">
          <img src="https://next-level-media.it/wp-content/uploads/2025/12/Progetto-senza-titolo-2025-12-05T160336.097-2.webp" alt="Dance On" width="600" height="400" />
          <h3>Dance On</h3><h4>SITO WEB - CUSTOM DEVELOPMENT - SEO</h4>
          <p>Sito web per scuola di danza e studio Pilates a Rho. Include presentazione corsi, team insegnanti e SEO locale.</p>
          <a href="https://www.spaziodanceon.it/" target="_blank" rel="noopener noreferrer" className="nlm-card-btn">Vedi il sito</a>
        </div></div>

        <div className="nlm-slide"><div className="nlm-card">
          <img src="https://staging2.next-level-media.it/wp-content/uploads/2025/12/Progetto-senza-titolo-2025-12-05T160843.763-1.webp" alt="Need JPG" width="600" height="400" />
          <h3>Need Jpg</h3><h4>E-COMMERCE - CUSTOM DEVELOPMENT - ADV</h4>
          <p>Store online streetwear con UX studiata per la conversione e flusso d&apos;acquisto rapido.</p>
          <a href="https://needjpg.com/" target="_blank" rel="noopener noreferrer" className="nlm-card-btn">Vedi il sito</a>
        </div></div>

        <div className="nlm-slide"><div className="nlm-card">
          <img src="https://next-level-media.it/wp-content/uploads/2026/04/Progetto-senza-titolo-2026-04-27T165821.929.webp" alt="Snakes Milano" width="600" height="400" />
          <h3>Snakes Milano</h3><h4>LANDING - CUSTOM DEVELOPMENT - DONAZIONI</h4>
          <p>Sito web per squadra di Powerchair Football con sistema di donazioni e struttura pensata per supportare il progetto sportivo.</p>
          <a href="https://www.snakesmilano.it/" target="_blank" rel="noopener noreferrer" className="nlm-card-btn">Vedi il sito</a>
        </div></div>

        <div className="nlm-slide"><div className="nlm-card">
          <img src="https://next-level-media.it/wp-content/uploads/2026/04/Progetto-senza-titolo-2026-04-27T163434.994.webp" alt="Effemme Exclusive Lab" width="600" height="400" />
          <h3>Effemme Exclusive Lab</h3><h4>E-COMMERCE - CUSTOM DEVELOPMENT - ADV</h4>
          <p>Store online streetwear con UX studiata per la conversione e flusso d&apos;acquisto rapido.</p>
          <a href="https://effemmeexclusivelab.com/" target="_blank" rel="noopener noreferrer" className="nlm-card-btn">Vedi il sito</a>
        </div></div>

        <div className="nlm-slide"><div className="nlm-card">
          <img src="https://next-level-media.it/wp-content/uploads/2026/04/Progetto-senza-titolo-2026-04-27T164723.190.webp" alt="Barlafus Cafè" width="600" height="400" />
          <h3>Barlafus Cafè</h3><h4>SITO WEB - CUSTOM DEVELOPMENT</h4>
          <p>Sito web per bar con menu digitale, presentazione dell&apos;offerta e struttura ottimizzata per attrarre clienti locali.</p>
          <a href="https://www.barlafuscafe.it/" target="_blank" rel="noopener noreferrer" className="nlm-card-btn">Vedi il sito</a>
        </div></div>

        <div className="nlm-slide"><div className="nlm-card">
          <img src="https://staging2.next-level-media.it/wp-content/uploads/2025/12/Progetto-senza-titolo-2025-12-05T123451.217-1.webp" alt="Vitera Group" width="600" height="400" />
          <h3>Vitera Group</h3><h4>SITO WEB - CUSTOM DEVELOPMENT</h4>
          <p>Sito professionale per realizzatori di stand, con struttura SEO e presentazione servizi.</p>
          <a href="https://www.viteragroup.com/" target="_blank" rel="noopener noreferrer" className="nlm-card-btn">Vedi il sito</a>
        </div></div>

        <div className="nlm-slide"><div className="nlm-card">
          <img src="https://staging2.next-level-media.it/wp-content/uploads/2025/12/Progetto-senza-titolo-2025-12-05T123338.051-1.webp" alt="Davide Fratta" width="600" height="400" />
          <h3>Davide Fratta</h3><h4>LANDING PAGE - CUSTOM DEVELOPMENT</h4>
          <p>Landing page elegante e professionale pensata per massimizzare i contatti.</p>
          <a href="https://www.davidefratta.it/" target="_blank" rel="noopener noreferrer" className="nlm-card-btn">Vedi il sito</a>
        </div></div>

        <div className="nlm-slide"><div className="nlm-card">
          <img src="https://staging2.next-level-media.it/wp-content/uploads/2025/12/Progetto-senza-titolo-2025-12-05T155229.614-1.webp" alt="Samgroup Srl" width="600" height="400" />
          <h3>Samgroup Srl</h3><h4>SITO WEB - PORTFOLIO</h4>
          <p>Sito professionale per geometra, layout pulito e struttura SEO.</p>
          <a href="https://www.samgroup.it/" target="_blank" rel="noopener noreferrer" className="nlm-card-btn">Vedi il sito</a>
        </div></div>

        <div className="nlm-slide"><div className="nlm-card">
          <img src="https://next-level-media.it/wp-content/uploads/2026/04/Progetto-senza-titolo-2026-04-27T163727.009.webp" alt="Delta Antinfortunistica" width="600" height="400" />
          <h3>Delta Antinfortunistica</h3><h4>LANDING PAGE - CUSTOM DEVELOPMENT</h4>
          <p>Landing per promuovere catalogo di dpi antinfortunistici.</p>
          <a href="https://www.antinfortunisticadelta.it/" target="_blank" rel="noopener noreferrer" className="nlm-card-btn">Vedi il sito</a>
        </div></div>

        <div className="nlm-slide"><div className="nlm-card">
          <img src="https://staging2.next-level-media.it/wp-content/uploads/2025/12/Progetto-senza-titolo-2025-12-05T155432.570-1.webp" alt="Animali Rho" width="600" height="400" />
          <h3>Animali Rho</h3><h4>SITO WEB - DONAZIONI</h4>
          <p>Sito di raccolta fondi per canile con sistema donazioni e sensibilizzazione.</p>
          <a href="https://www.dimensioneanimalerho.org/" target="_blank" rel="noopener noreferrer" className="nlm-card-btn">Vedi il sito</a>
        </div></div>
      </div>

      <button className="nlm-btn next" aria-label="Next">&#10095;</button>
    </section>
  )
}