import Image from "next/image"

interface PDPPair {
  beforeImage?: { asset: { url: string } }
  afterImage?: { asset: { url: string } }
  label?: string
  uplift?: string
}

interface BeforeAfterPDPProps {
  pairs?: PDPPair[]
}

function PDPCard({ pair }: { pair: PDPPair }) {
  return (
    <div className="review-card rounded-2xl p-4 flex flex-col gap-3">

      {/* Label card */}
      {pair.label && (
        <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "#94a3b8" }}>
          {pair.label}
        </p>
      )}

      {/* Before + After affiancate */}
      <div className="grid grid-cols-2 gap-2">

        {/* BEFORE */}
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute top-2 left-2 z-10">
            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase"
              style={{ background: "rgba(15,23,42,0.75)", backdropFilter: "blur(8px)", color: "#ffffff" }}>
              Before
            </span>
          </div>
          {pair.beforeImage?.asset?.url ? (
            <Image
              src={pair.beforeImage.asset.url}
              alt="PDP Before"
              width={400}
              height={800}
              className="w-full object-cover object-top"
              style={{ maxHeight: "420px" }}
            />
          ) : (
            <div className="w-full bg-slate-100 rounded-xl flex items-center justify-center" style={{ height: "420px" }}>
              <p className="text-slate-400 text-xs text-center px-2">Carica BEFORE in Sanity</p>
            </div>
          )}
        </div>

        {/* AFTER */}
        <div className="relative overflow-hidden rounded-xl"
          style={{ boxShadow: "0 0 0 1px rgba(252,3,176,0.12), 0 4px 20px rgba(252,3,176,0.08)" }}>
          <div className="absolute top-2 left-2 z-10">
            <span className="rounded-full px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase text-white"
              style={{ background: "linear-gradient(to right, #fc03b0, #047cf9)" }}>
              After
            </span>
          </div>
          {pair.uplift && (
            <div className="absolute top-2 right-2 z-10">
              <span className="rounded-full px-2 py-1 text-[10px] font-bold text-white"
                style={{ background: "rgba(34,197,94,0.85)", backdropFilter: "blur(8px)" }}>
                {pair.uplift}
              </span>
            </div>
          )}
          {pair.afterImage?.asset?.url ? (
            <Image
              src={pair.afterImage.asset.url}
              alt="PDP After"
              width={400}
              height={800}
              className="w-full object-cover object-top"
              style={{ maxHeight: "420px" }}
            />
          ) : (
            <div className="w-full bg-slate-50 rounded-xl flex items-center justify-center" style={{ height: "420px" }}>
              <p className="text-slate-400 text-xs text-center px-2">Carica AFTER in Sanity</p>
            </div>
          )}
        </div>

      </div>

      {/* Label sotto */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-400 shrink-0" />
          <p className="text-xs font-medium" style={{ color: "#94a3b8" }}>Non ottimizzata</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full shrink-0" style={{ background: "linear-gradient(to right, #fc03b0, #047cf9)" }} />
          <p className="text-xs font-medium" style={{ color: "#94a3b8" }}>Ottimizzata</p>
        </div>
      </div>

    </div>
  )
}

export default function BeforeAfterPDP({ pairs }: BeforeAfterPDPProps) {
  if (!pairs?.length) return null

  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pairs.map((pair, i) => (
            <PDPCard key={i} pair={pair} />
          ))}
        </div>
      </div>
    </section>
  )
}