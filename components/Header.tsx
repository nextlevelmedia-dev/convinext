'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

import MegaMenu from "./MegaMenu"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
      document.documentElement.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
      document.documentElement.style.overflow = ""
    }
  }, [mobileOpen])

  const closeDrawer = () => setMobileOpen(false)

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 top-20 z-40 bg-black/40 backdrop-blur-sm"
          onMouseEnter={() => setOpen(false)}
        />
      )}

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 md:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={closeDrawer}
      />

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 z-[70] h-full w-[85vw] max-w-sm bg-white dark:bg-[#111118] shadow-2xl md:hidden transition-transform duration-300 ease-in-out ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-20 items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700">
          <Image src="/logo.webp" alt="Next Level Media" width={80} height={32} priority />
          <button
            onClick={closeDrawer}
            aria-label="Chiudi menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="flex flex-col px-6 py-8 gap-1 overflow-y-auto h-[calc(100%-80px)]">

          {/* Soluzioni e Servizi sempre aperto */}
          <div className="border-b border-slate-100 dark:border-slate-800 pb-3 mb-1">
            <p className="py-3 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Soluzioni e Servizi
            </p>
            <div className="flex flex-col gap-1 pl-2">
              <Link
                href="/ecommerce"
                onClick={closeDrawer}
                className="flex items-center gap-3 py-2.5 text-base font-medium text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#fc03b0] to-[#047cf9]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                </span>
                E-commerce Shopify
              </Link>
              <Link
                href="/ottimizzazione-conversioni"
                onClick={closeDrawer}
                className="flex items-center gap-3 py-2.5 text-base font-medium text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#fc03b0] to-[#047cf9]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </span>
                Ottimizzazione Conversioni
              </Link>
              <Link
                href="/siti-web"
                onClick={closeDrawer}
                className="flex items-center gap-3 py-2.5 text-base font-medium text-slate-700 dark:text-white/80 hover:text-slate-900 dark:hover:text-white"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#fc03b0] to-[#047cf9]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </span>
                Siti Web Performanti
              </Link>
            </div>
          </div>

          <Link href="/progetti" onClick={closeDrawer} className="flex items-center py-3 text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">
            Progetti
          </Link>
          <Link href="/chi-siamo" onClick={closeDrawer} className="flex items-center py-3 text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800">
            Chi Siamo
          </Link>

          <div className="mt-8">
            <Link href="/contatti" onClick={closeDrawer} className="flex w-full items-center justify-center rounded-full bg-brand-gradient px-8 py-4 text-base font-bold text-white shadow-lg">
              Contattaci →
            </Link>
          </div>
        </div>
      </div>

      <header className={`fixed left-0 top-0 z-50 w-full border-b border-slate-200/70 dark:border-slate-700 transition-colors duration-300 ${scrolled ? "bg-white dark:bg-black" : "bg-white dark:bg-black"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <Link href="/" className="flex items-center" aria-label="Home — Next Level Media">
            <Image src="/logo.webp" alt="Next Level Media" width={90} height={36} priority />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex" aria-label="Navigazione principale">
            <div className="relative" onMouseEnter={() => setOpen(true)}>
              <button
                aria-expanded={open}
                aria-haspopup="true"
                aria-label="Soluzioni e Servizi"
                className="flex items-center gap-2 font-medium transition-colors"
              >
                Soluzioni e Servizi
                <span className={`flex items-center justify-center transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </span>
              </button>
            </div>

            <Link href="/progetti" className="transition-colors">Progetti</Link>
            <Link href="/chi-siamo" className="transition-colors">Chi Siamo</Link>
            <Link href="/risorse" className="transition-colors">Risorse</Link>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link className="contattaci-link font-bold" href="/contatti">Contattaci</Link>
            <Link
              className="cta-bubble flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient shadow-lg"
              href="/contatti"
              aria-label="Contattaci"
            >
              ↗
            </Link>
            <div className="w-2" />
            <ThemeToggle />
          </div>

          {/* Hamburger mobile */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileOpen(true)}
              aria-label="Apri menu"
              aria-expanded={mobileOpen}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-slate-200 dark:border-slate-700"
            >
              <span className="block h-[2px] w-5 bg-slate-700 dark:bg-white rounded-full" />
              <span className="block h-[2px] w-5 bg-slate-700 dark:bg-white rounded-full" />
              <span className="block h-[2px] w-5 bg-slate-700 dark:bg-white rounded-full" />
            </button>
          </div>

        </div>

        {open && (
          <div className="relative z-50" onMouseLeave={() => setOpen(false)}>
            <MegaMenu />
          </div>
        )}
      </header>
    </>
  )
}