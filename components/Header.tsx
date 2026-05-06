export default function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <a className="text-3xl font-black tracking-tight">
          <span className="bg-brand-gradient bg-clip-text text-transparent">
            NEXT
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
          <a href="#">Soluzioni e Servizi</a>
          <a href="#">Temi Shopify</a>
          <a href="#">Progetti</a>
          <a href="#">Chi Siamo</a>
          <a href="#">Blog</a>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a className="font-bold text-slate-950" href="#">
            Contattaci
          </a>

          <a
            className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient text-white shadow-lg"
            href="#"
          >
            ↗
          </a>
        </div>

        <button className="md:hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-bold">
          Menu
        </button>
      </div>
    </header>
  )
}