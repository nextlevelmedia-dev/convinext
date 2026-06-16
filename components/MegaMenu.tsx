import Link from "next/link"

const items = [
  {
    title: "E-commerce Shopify",
    href: "/ecommerce",
    description: "Soluzioni su misura per costruire e far crescere il tuo brand online.",
    features: ["Setup e configurazione", "Design personalizzato", "Integrazioni e automazioni", "Assistenza e scalabilità"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
      </svg>
    ),
  },
  {
    title: "Ottimizzazione Conversioni",
    href: "/ottimizzazione-conversioni",
    description: "Trasformiamo i visitatori in clienti con strategie data-driven.",
    features: ["Analisi e audit CRO", "A/B Testing", "UX & Performance", "Strategie di crescita"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    ),
  },
  {
    title: "Siti Web Performanti",
    href: "/siti-web",
    description: "Siti veloci, moderni e ottimizzati per offrire la migliore esperienza.",
    features: ["Design moderno e responsive", "SEO & Performance", "Sicurezza e affidabilità", "Manutenzione e supporto"],
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
]

export default function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full w-screen -translate-x-1/2 border-t border-slate-200 dark:border-slate-800 bg-transparent">
      <div className="mx-auto max-w-7xl px-6 pb-6">
        <div
          className="rounded-b-3xl shadow-2xl shadow-slate-200/60 dark:shadow-black/40"
          style={{ background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)" }}
        >
          <div className="grid grid-cols-4 gap-0 p-8">

            {items.map((item, i) => (
              <div
                key={item.title}
                className="flex flex-col pr-8"
                style={{
                  borderRight: i < items.length - 1 ? "1px solid #e2e8f0" : "none",
                  paddingLeft: i > 0 ? "32px" : "0",
                }}
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: "linear-gradient(135deg, rgba(252,3,176,0.10), rgba(4,124,249,0.10))", color: "#7c3aed" }}
                >
                  {item.icon}
                </div>

                <h3 className="mb-2 text-lg font-black" style={{ color: "#0f172a" }}>
                  {item.title}
                </h3>

                <p className="mb-5 text-sm leading-6" style={{ color: "#64748b" }}>
                  {item.description}
                </p>

                <ul className="mb-6 space-y-2 flex-1">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "#475569" }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-bold transition-all duration-300 hover:text-white"
                  style={{ background: "#f1f5f9", color: "#0f172a" }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.background = "linear-gradient(to right, #fc03b0, #047cf9)"
                    el.style.color = "#ffffff"
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.background = "#f1f5f9"
                    el.style.color = "#0f172a"
                  }}
                >
                  Scopri di più →
                </Link>
              </div>
            ))}

            {/* COLONNA DESTRA — CTA */}
            <div className="pl-8 flex flex-col justify-center" style={{ borderLeft: "1px solid #e2e8f0" }}>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#7c3aed" }}>
                Hai un&apos;idea in mente?
              </p>
              <h3 className="mb-3 text-2xl font-black leading-tight" style={{ color: "#0f172a" }}>
                Parliamone insieme
              </h3>
              <p className="mb-6 text-sm leading-6" style={{ color: "#64748b" }}>
                Raccontaci il tuo progetto e scopriamo come realizzarlo al meglio.
              </p>
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-pink-200"
                style={{ background: "linear-gradient(to right, #fc03b0, #047cf9)", color: "#ffffff" }}
              >
                Contattaci ora →
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}