export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pt-40 pb-24 text-slate-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:48px_48px] opacity-40" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-slate-200">
            <span className="mr-2 text-brand-start">★★★★★</span>
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              +100 aziende ottimizzate
            </span>
          </div>

          <h1 className="max-w-3xl text-5xl font-black tracking-tight md:text-6xl">
            Trasforma la tua{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              presenza online
            </span>{" "}
            in un sistema che{" "}
            <span className="bg-brand-gradient bg-clip-text text-transparent">
              genera clienti
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-700">
            Hai traffico ma poche vendite? Ottimizziamo la tua presenza digitale con dati reali e UX strategica per aumentare lead e conversioni e rendere la crescita prevedibile in poche settimane.
          </p>

          <div className="mt-10">
            <a className="inline-flex rounded-full bg-brand-gradient px-8 py-4 font-bold text-white shadow-xl shadow-brand-end/20">
              Richiedi un’analisi gratuita
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm font-bold text-slate-800">
            <span>✓ Risultati misurabili</span>
            <span>✓ Test continui</span>
            <span>✓ Crescita reale</span>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-gradient-to-br from-pink-50 via-white to-blue-50 p-8 shadow-2xl shadow-slate-200">
          <div className="mb-8 flex gap-3">
            <span className="h-3 w-3 rounded-full bg-brand-start/30" />
            <span className="h-3 w-3 rounded-full bg-purple-300" />
            <span className="h-3 w-3 rounded-full bg-brand-end/30" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <p className="text-sm text-slate-500">Performance</p>
              <p className="mt-4 bg-brand-gradient bg-clip-text text-5xl font-black text-transparent">
                +42%
              </p>
              <p className="mt-2 text-slate-500">conversioni</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <p className="text-4xl font-black">+120</p>
              <p className="mt-2 text-slate-500">lead/mese</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <p className="text-4xl font-black">2.8x</p>
              <p className="mt-2 text-slate-500">ROAS medio</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <p className="text-4xl font-black">+18%</p>
              <p className="mt-2 text-slate-500">conversion rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}