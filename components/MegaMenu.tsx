import Link from "next/link"

const items = [
  {
    title: "E-commerce Shopify",
    href: "/ecommerce",
    image:
      "https://next-level-media.it/wp-content/uploads/2026/04/mockup-imac-hero-next-11.webp",
  },
  {
    title: "Ottimizzazione Conversioni",
    href: "/ottimizzazione-conversioni",
    image:
      "https://next-level-media.it/wp-content/uploads/2026/04/Progetto-senza-titolo-2026-04-27T163434.994.webp",
  },
  {
    title: "Temi Shopify Custom",
    href: "/temi-shopify",
    image:
      "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-imac-hero-next-7.webp",
  },
  {
    title: "Siti Web Performanti",
    href: "/siti-web",
    image:
      "https://staging2.next-level-media.it/wp-content/uploads/2025/12/mockup-imac-hero-next-10.webp",
  },
]

export default function MegaMenu() {
  return (
    <div className="absolute left-1/2 top-full w-screen -translate-x-1/2 border-t border-slate-200 bg-white/95 backdrop-blur-2xl">
      <div className="mx-auto grid max-w-7xl grid-cols-4 gap-5 px-6 py-10">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group rounded-[28px] border border-slate-200/80 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-2xl hover:shadow-slate-200/70"
          >
            <div className="relative mb-5 overflow-hidden rounded-2xl bg-slate-100">
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            </div>

            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-black leading-tight text-slate-900">
                {item.title}
              </h3>

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-950 transition-all duration-300 group-hover:bg-[linear-gradient(90deg,#f81ce5,#00c6ff)] group-hover:text-white group-hover:shadow-lg">
                ↗
              </div>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Scopri la soluzione completa e ottimizzata per la crescita del tuo
              brand.
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}