'use client'

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import MegaMenu from "./MegaMenu"
import ThemeToggle from "./ThemeToggle"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 top-20 z-40 bg-black/40 backdrop-blur-sm"
          onMouseEnter={() => setOpen(false)}
        />
      )}

      <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/70 dark:border-slate-700 backdrop-blur-xl">
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
            <Link href="/" className="transition-colors">Home</Link>

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
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link className="contattaci-link font-bold" href="/contatti">
              Contattaci
            </Link>
            <Link
              className="cta-bubble flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient shadow-lg"
              href="/contatti"
            >
              ↗
            </Link>
            <div className="w-2" />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
            <button className="rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2 text-sm font-bold">
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