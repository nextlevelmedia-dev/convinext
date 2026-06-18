'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

import MegaMenu from "./MegaMenu"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  const [open, setOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileServizi, setMobileServizi] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
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

  const closeDrawer = () => {
    setMobileOpen(false)
    setMobileServizi(false)
  }

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
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className="flex flex-col px-6 py-8 gap-1 overflow-y-auto h-[calc(100%-80px)]">
          

          <div className="border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={(e) => {
                e.stopPropagation()
                setMobileServizi(prev => !prev)
              }}
              className="flex w-full items-center justify-between py-3 text-lg font-semibold text-slate-900 dark:text-white"
            >
              Soluzioni e Servizi
              <span className={`transition-transform duration-300 ${mobileServizi ? "rotate-180" : ""}`}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </span>
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${mobileServizi ? "max-h-60 pb-3" : "max-h-0"}`}>
              <div className="flex flex-col gap-2 pl-4">
                <Link
                  href="/ecommerce"
                  onClick={closeDrawer}
                  className="flex items-center gap-3 py-2 text-base text-slate-600 dark:text-white/70"
                >
                  <span className="text-lg">🛍</span> E-commerce Shopify
                </Link>
                <Link
                  href="/ottimizzazione-conversioni"
                  onClick={closeDrawer}
                  className="flex items-center gap-3 py-2 text-base text-slate-600 dark:text-white/70"
                >
                  <span className="text-lg">📈</span> Ottimizzazione Conversioni
                </Link>
                <Link
                  href="/siti-web"
                  onClick={closeDrawer}
                  className="flex items-center gap-3 py-2 text-base text-slate-600 dark:text-white/70"
                >
                  <span className="text-lg">🌐</span> Siti Web Performanti
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/progetti"
            onClick={closeDrawer}
            className="flex items-center py-3 text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800"
          >
            Progetti
          </Link>

          <Link
            href="/chi-siamo"
            onClick={closeDrawer}
            className="flex items-center py-3 text-lg font-semibold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800"
          >
            Chi Siamo
          </Link>

          <div className="mt-8">
            <Link
              href="/contatti"
              onClick={closeDrawer}
              className="flex w-full items-center justify-center rounded-full bg-brand-gradient px-8 py-4 text-base font-bold text-white shadow-lg"
            >
              Contattaci →
            </Link>
          </div>

          <div className="mt-4 flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <header className={`fixed left-0 top-0 z-50 w-full border-b border-slate-200/70 dark:border-slate-700 transition-colors duration-300 ${scrolled ? "bg-white dark:bg-black" : "bg-white dark:bg-black"}`}>
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

          <Link href="/" className="flex items-center">
            <Image
              src="/logo.webp"
              alt="Next Level Media"
              width={90}
              height={36}
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            

            <div className="relative" onMouseEnter={() => setOpen(true)}>
              <button className="flex items-center gap-2 font-medium transition-colors">
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
            <Link className="contattaci-link font-bold" href="/contatti">
              Contattaci
            </Link>
            <Link
              className="cta-bubble flex h-8 w-8 items-center justify-center rounded-full bg-brand-gradient shadow-lg"
              href="/contatti"
            >
              ↗
            </Link>
            <div className="w-2" />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-bold"
            >
              Menu
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