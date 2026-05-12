'use client'

import Link from "next/link"
import { useState } from "react"

import MegaMenu from "./MegaMenu"

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 top-20 z-40 bg-black/40 backdrop-blur-sm"
          onMouseEnter={() => setOpen(false)}
        />
      )}

      <header
        className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-xl"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-3xl font-black tracking-tight">
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              NEXT
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <Link href="/">Home</Link>

            <div
              className="relative"
              onMouseEnter={() => setOpen(true)}
            >
              <button className="flex items-center gap-2 font-medium text-slate-700">
                Soluzioni e Servizi

                <span
  className={`flex items-center justify-center transition-transform duration-300 ${
    open ? "rotate-180" : ""
  }`}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
</span>
              </button>
            </div>

            <Link href="/temi-shopify">Temi Shopify</Link>
            <Link href="/progetti">Progetti</Link>
            <Link href="/chi-siamo">Chi Siamo</Link>
            <Link href="/blog">Blog</Link>
          </nav>

          <div className="hidden items-center gap-4 md:flex">
            <Link className="font-bold text-slate-950" href="/contatti">
              Contattaci
            </Link>

            <Link
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg"
              href="/contatti"
            >
              ↗
            </Link>
          </div>

          <button className="rounded-full border border-slate-200 px-4 py-2 text-sm font-bold md:hidden">
            Menu
          </button>
        </div>

        {/* MEGA MENU */}
        {open && (
          <div
            className="relative z-50"
            onMouseLeave={() => setOpen(false)}
          >
            <MegaMenu />
          </div>
        )}
      </header>
    </>
  )
}