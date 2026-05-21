"use client"

import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") {
      document.documentElement.classList.add("dark")
      setDark(true)
    }
  }, [])

  const toggle = () => {
    if (dark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
    setDark(!dark)
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1.5 shadow-sm transition-all"
      aria-label="Toggle dark mode"
    >
      <span className={`text-sm transition-all ${!dark ? "opacity-100" : "opacity-40"}`}>☀️</span>
      <span className={`text-sm transition-all ${dark ? "opacity-100" : "opacity-40"}`}>🌙</span>
    </button>
  )
}