"use client"

import { useState } from "react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    messaggio: "",
    servizio: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    await new Promise((r) => setTimeout(r, 1000))
    setStatus("success")
  }

  return (
    <section className="py-24 px-6 rounded-b-3xl" style={{ backgroundColor: "#fff" }}>
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl overflow-hidden" style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#ffffff" }}>
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ minHeight: "600px" }}>

            {/* LEFT — form */}
            <div className="p-10" style={{ borderRight: "1px solid rgba(0,0,0,0.08)" }}>

              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "12px" }}>
                Contattaci
              </p>
              <h2 className="text-3xl font-black tracking-tight text-slate-950 mb-2" style={{ lineHeight: 1.2 }}>
                Parliamo del tuo progetto
              </h2>
              <p className="text-base mb-8" style={{ color: "rgba(0,0,0,0.5)", lineHeight: 1.6 }}>
                Rispondiamo entro 24 ore. Nessun impegno.
              </p>

              {status === "success" ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-4">
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "linear-gradient(135deg, #fc03b0, #047cf9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 12l4 4 10-10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-black text-slate-950">Messaggio inviato!</h3>
                  <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "15px" }}>Ti ricontatteremo entro 24 ore.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Nome</label>
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                        placeholder="Mario"
                        className="w-full"
                        style={{ height: "42px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.12)", padding: "0 14px", fontSize: "14px", outline: "none", background: "#fafafa" }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Cognome</label>
                      <input
                        type="text"
                        name="cognome"
                        value={formData.cognome}
                        onChange={handleChange}
                        required
                        placeholder="Rossi"
                        className="w-full"
                        style={{ height: "42px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.12)", padding: "0 14px", fontSize: "14px", outline: "none", background: "#fafafa" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="mario@azienda.it"
                      className="w-full"
                      style={{ height: "42px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.12)", padding: "0 14px", fontSize: "14px", outline: "none", background: "#fafafa" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      Telefono <span style={{ color: "rgba(0,0,0,0.35)", fontWeight: 400 }}>(opzionale)</span>
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="+39 333 000 0000"
                      className="w-full"
                      style={{ height: "42px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.12)", padding: "0 14px", fontSize: "14px", outline: "none", background: "#fafafa" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Servizio di interesse</label>
                    <select
                      name="servizio"
                      value={formData.servizio}
                      onChange={handleChange}
                      className="w-full"
                      style={{ height: "42px", borderRadius: "10px", border: "1px solid rgba(0,0,0,0.12)", padding: "0 14px", fontSize: "14px", outline: "none", background: "#fafafa", appearance: "none" }}
                    >
                      <option value="">Seleziona un servizio</option>
                      <option value="sito-web">Sito Web</option>
                      <option value="ecommerce">Ecommerce</option>
                      <option value="landing-page">Landing Page</option>
                      <option value="seo">SEO</option>
                      <option value="adv">Advertising</option>
                      <option value="altro">Altro</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Di cosa hai bisogno?</label>
                    <textarea
                      name="messaggio"
                      value={formData.messaggio}
                      onChange={handleChange}
                      required
                      placeholder="Descrivi brevemente il tuo progetto..."
                      rows={4}
                      className="w-full"
                      style={{ borderRadius: "10px", border: "1px solid rgba(0,0,0,0.12)", padding: "12px 14px", fontSize: "14px", outline: "none", background: "#fafafa", resize: "none", lineHeight: 1.6 }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    style={{ height: "48px", borderRadius: "999px", background: "linear-gradient(to right, #fc03b0, #047cf9)", border: "none", color: "white", fontWeight: 700, fontSize: "15px", cursor: status === "loading" ? "not-allowed" : "pointer", opacity: status === "loading" ? 0.7 : 1, transition: "opacity 0.2s" }}
                  >
                    {status === "loading" ? "Invio in corso..." : "Invia richiesta"}
                  </button>

                  <p style={{ fontSize: "11px", color: "rgba(0,0,0,0.35)", textAlign: "center", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Senza impegno — risposta entro 24 ore
                  </p>

                </form>
              )}
            </div>

            {/* RIGHT — info */}
            <div className="p-10 flex flex-col justify-between" style={{ background: "#f8f8f8" }}>

              <div>
                <p className="text-base font-bold text-slate-950 mb-6">Cosa succede dopo l'invio</p>
                <div className="flex flex-col gap-6">
                  {[
                    { n: "01", color: "#fc03b0", title: "Analizziamo la tua richiesta", desc: "Valutiamo il progetto e prepariamo le domande giuste per capire i tuoi obiettivi." },
                    { n: "02", color: "#6a4ff7", title: "Ti ricontattiamo entro 24 ore", desc: "Una call veloce per capire nel dettaglio cosa ti serve e come possiamo aiutarti." },
                    { n: "03", color: "#047cf9", title: "Preventivo su misura", desc: "Nessuna soluzione standard. Solo quello che ti serve, con tempi e costi chiari." },
                  ].map((step) => (
                    <div key={step.n} className="flex gap-4 items-start">
                      <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: step.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "white" }}>{step.n}</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-950 mb-1" style={{ fontSize: "14px" }}>{step.title}</p>
                        <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.5)", lineHeight: 1.6 }}>{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-10" style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "24px" }}>
                {[
                  { icon: "M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z", text: "info@next-level-media.it" },
                  { icon: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z", text: "Milano, Italia" },
                  { icon: "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2Zm0 5v5l4 2", text: "Lun – Ven, 9:00 – 18:00" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, color: "rgba(0,0,0,0.4)" }}>
                      <path d={item.icon} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: "13px", color: "rgba(0,0,0,0.55)" }}>{item.text}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}