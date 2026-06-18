"use client"

import { useState } from "react"

interface FaqItem {
  question: string
  answer: string
}

interface FaqSectionProps {
  titleHighlight?: string
  titleNormal?: string
  items?: FaqItem[]
}

export default function FaqSection({ titleHighlight, titleNormal, items }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (!items?.length) return null

  return (
    <section className="faq-section py-24 px-6">
      <div className="mx-auto" style={{ maxWidth: "760px" }}>

        {(titleHighlight || titleNormal) && (
          <h2 className="text-4xl font-black tracking-tight leading-[1.2] text-slate-950 dark:text-white text-center mb-16">
            {titleHighlight && (
              <span className="bg-brand-gradient bg-clip-text text-transparent">{titleHighlight}</span>
            )}
            {titleHighlight && titleNormal && " "}
            {titleNormal}
          </h2>
        )}

        <div className="flex flex-col">
          {items.map((item, i) => (
            <div key={i} className="border-b border-black/10 dark:border-white/10">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left gap-4"
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <span className="text-slate-950 dark:text-white font-semibold text-lg leading-snug">
                  {item.question}
                </span>
                <span
                  className="dark:text-white/40"
                  style={{
                    color: "rgba(0,0,0,0.4)",
                    fontSize: "20px",
                    flexShrink: 0,
                    transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                    display: "inline-block",
                  }}
                >
                  &#8964;
                </span>
              </button>

              <div
                style={{
                  maxHeight: openIndex === i ? "600px" : "0px",
                  overflow: "hidden",
                  transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                <p
                  className="text-base leading-7 pb-5 dark:text-white/60"
                  style={{ color: "rgba(0,0,0,0.60)" }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}