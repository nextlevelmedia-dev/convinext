import { defineField, defineType } from "sanity"

const INNER_SLUGS = ["ecommerce", "siti-web", "ottimizzazione-conversioni"]
const isInnerPage = (doc: any) => INNER_SLUGS.includes(doc?.slug?.current)
const isHomePage = (doc: any) => doc?.slug?.current === "home"
const isCROPage = (doc: any) => doc?.slug?.current === "ottimizzazione-conversioni"

export const pageType = defineType({
  name: "page",
  title: "Pagine",
  type: "document",

  fieldsets: [
    { name: "heroSection", title: "🚀 Hero Section", options: { collapsible: true, collapsed: false } },
    { name: "impactSection", title: "💥 Sezione Impact (Ecommerce / Siti Web / CRO)", options: { collapsible: true, collapsed: false } },
    { name: "beforeAfterSection", title: "📸 Before / After PDP (solo CRO)", options: { collapsible: true, collapsed: false } },
    { name: "mockupMarqueeSection", title: "🖥️ Mockup Marquee (Ecommerce / Siti Web)", options: { collapsible: true, collapsed: false } },
    { name: "reviewsSection", title: "⭐ Sezione Recensioni", options: { collapsible: true, collapsed: false } },
    { name: "valuePropsSection", title: "🎯 Value Propositions", options: { collapsible: true, collapsed: false } },
    { name: "benefitsSection", title: "✅ Sezione Benefit", options: { collapsible: true, collapsed: false } },
    { name: "processSection", title: "⚙️ Come Lavoriamo (Timeline)", options: { collapsible: true, collapsed: false } },
    { name: "logoMarqueeSection", title: "🏷️ Sezione Loghi Clienti", options: { collapsible: true, collapsed: false } },
    { name: "vantaggioUnicoSection", title: "💡 Vantaggio Unico", options: { collapsible: true, collapsed: false } },
    { name: "homeProjectsSection", title: "🎠 Home - Sezione Progetti", options: { collapsible: true, collapsed: false } },
    { name: "stickyServicesSection", title: "📦 Sezione Servizi (Sticky)", options: { collapsible: true, collapsed: false } },
    { name: "teamCardsSection", title: "👥 Sezione Team/Cards", options: { collapsible: true, collapsed: false } },
    { name: "faqSection", title: "❓ Sezione FAQ", options: { collapsible: true, collapsed: false } },
    { name: "finalRecapSection", title: "🏁 Final Recap", options: { collapsible: true, collapsed: false } },
  ],

  fields: [
    defineField({ name: "title", title: "Titolo pagina", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),

    // ─── HERO ──────────────────────────────────────────────────────────────────
    defineField({
      name: "hero", title: "Hero content", type: "object", fieldset: "heroSection",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Titolo Hero - prima parte", type: "string" }),
        defineField({ name: "highlightOne", title: "Parola evidenziata 1", type: "string" }),
        defineField({ name: "titleTwo", title: "Titolo Hero - seconda parte", type: "string" }),
        defineField({ name: "highlightTwo", title: "Parola evidenziata 2", type: "string" }),
        defineField({ name: "subtitle", title: "Sottotitolo", type: "text" }),
        defineField({ name: "ctaText", title: "Testo bottone", type: "string" }),
        defineField({ name: "lottieFile", title: "Lottie destra Hero — es: Software-Development.json", type: "string", hidden: ({ document }) => (document as any)?.slug?.current !== "chi-siamo" }),
      ],
    }),

    defineField({
      name: "mockupSlides", title: "Hero mockup slides",
      description: "Compila solo per Siti Web ed Ecommerce.",
      type: "array", fieldset: "heroSection",
      hidden: ({ document }) => !["ecommerce", "siti-web"].includes((document as any)?.slug?.current ?? ""),
      of: [{
        type: "object", title: "Mockup slide",
        fields: [
          defineField({ name: "imac", title: "Immagine schermo iMac", type: "image", options: { hotspot: true } }),
          defineField({ name: "tablet", title: "Immagine schermo Tablet", type: "image", options: { hotspot: true } }),
          defineField({ name: "mobile", title: "Immagine schermo Mobile", type: "image", options: { hotspot: true } }),
        ],
        preview: { select: { media: "imac" }, prepare({ media }) { return { title: "Mockup slide", media } } },
      }],
    }),

    // ─── IMPACT SECTION ────────────────────────────────────────────────────────
    defineField({
      name: "impactSection", title: "Sezione Impact", type: "object", fieldset: "impactSection",
      hidden: ({ document }) => !isInnerPage(document),
      fields: [
        defineField({ name: "titleHighlight", title: "Titolo - parte evidenziata (gradient)", type: "string" }),
        defineField({ name: "titleNormal", title: "Titolo - parte normale", type: "string" }),
        defineField({ name: "subtitle", title: "Sottotitolo", type: "text", rows: 3 }),
        defineField({ name: "impactText", title: "Testo impact grande (es: CRO, UX, AOV…)", type: "string" }),
      ],
    }),

    // ─── BEFORE / AFTER (solo CRO) ─────────────────────────────────────────────
    defineField({
  name: "beforeAfter", title: "Before / After PDP", type: "object", fieldset: "beforeAfterSection",
  hidden: ({ document }) => !isCROPage(document),
  fields: [
    defineField({
      name: "pairs", title: "Coppie Before/After", type: "array",
      description: "Aggiungi fino a 2 coppie. Ogni card mostra before e after affiancati.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label card (es: PDP Scarpe)", type: "string" }),
          defineField({ name: "uplift", title: "Badge uplift (es: +42% CVR)", type: "string" }),
          defineField({ name: "beforeImage", title: "Immagine BEFORE", type: "image", options: { hotspot: true } }),
          defineField({ name: "afterImage", title: "Immagine AFTER", type: "image", options: { hotspot: true } }),
        ],
        preview: {
          select: { title: "label", media: "afterImage" },
          prepare({ title, media }) { return { title: title ?? "Coppia Before/After", media } },
        },
      }],
    }),
  ],
}),

    // ─── MOCKUP MARQUEE ────────────────────────────────────────────────────────
    defineField({
      name: "mockupMarquee", title: "Mockup Marquee", type: "object", fieldset: "mockupMarqueeSection",
      hidden: ({ document }) => !["ecommerce", "siti-web"].includes((document as any)?.slug?.current ?? ""),
      fields: [
        defineField({
          name: "rowOne", title: "Riga 1 (va a destra →)", type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "image", title: "Screenshot mockup", type: "image", options: { hotspot: true } }),
            defineField({ name: "alt", title: "Nome progetto", type: "string" }),
          ], preview: { select: { title: "alt", media: "image" } } }],
        }),
        defineField({
          name: "rowTwo", title: "Riga 2 (va a sinistra ←)", type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "image", title: "Screenshot mockup", type: "image", options: { hotspot: true } }),
            defineField({ name: "alt", title: "Nome progetto", type: "string" }),
          ], preview: { select: { title: "alt", media: "image" } } }],
        }),
      ],
    }),

    // ─── REVIEWS ───────────────────────────────────────────────────────────────
    defineField({
      name: "reviews", title: "Sezione Recensioni", type: "object", fieldset: "reviewsSection",
      fields: [
        defineField({ name: "titleHighlight", title: "Titolo - parte evidenziata (gradient)", type: "string" }),
        defineField({ name: "titleNormal", title: "Titolo - parte normale", type: "string" }),
        defineField({
          name: "items", title: "Recensioni", type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "stars", title: "Stelle (1-5)", type: "number" }),
            defineField({ name: "reviewTitle", title: "Titolo recensione", type: "string" }),
            defineField({ name: "reviewText", title: "Testo", type: "text", rows: 4 }),
            defineField({ name: "authorName", title: "Nome autore", type: "string" }),
            defineField({ name: "authorRole", title: "Ruolo / Azienda", type: "string" }),
            defineField({ name: "authorPhoto", title: "Foto autore", type: "image", options: { hotspot: true } }),
            defineField({ name: "companyLogo", title: "Logo azienda", type: "image", options: { hotspot: true } }),
          ], preview: { select: { title: "authorName", subtitle: "reviewTitle", media: "authorPhoto" } } }],
        }),
        defineField({ name: "ctaText", title: "Testo CTA", type: "string" }),
        defineField({ name: "ctaHref", title: "Link CTA (es: /contatti)", type: "string" }),
        defineField({ name: "socialProofText", title: "Testo social proof", type: "string" }),
        defineField({
          name: "socialProofAvatars", title: "Foto avatar social proof (max 4)", type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "photo", title: "Foto", type: "image", options: { hotspot: true } }),
          ], preview: { select: { media: "photo" }, prepare({ media }) { return { title: "Avatar", media } } } }],
        }),
      ],
    }),

    // ─── VALUE PROPS ───────────────────────────────────────────────────────────
    defineField({
      name: "valueProps", title: "Value Propositions", type: "array", fieldset: "valuePropsSection",
      of: [{ type: "object", fields: [
        defineField({ name: "label", title: "Label (es: DREAM OUTCOME)", type: "string" }),
        defineField({ name: "titleHighlight", title: "Titolo - parte evidenziata (gradient)", type: "string" }),
        defineField({ name: "titleNormal", title: "Titolo - parte normale", type: "string" }),
        defineField({ name: "subtitle", title: "Paragrafo", type: "text", rows: 3 }),
        defineField({ name: "ctaText", title: "Testo CTA", type: "string" }),
        defineField({ name: "ctaHref", title: "Link CTA", type: "string" }),
        defineField({
          name: "mediaType", title: "Tipo di media", type: "string",
          options: { list: [
            { title: "Immagine", value: "image" }, { title: "Video", value: "video" },
            { title: "Lottie", value: "lottie" }, { title: "Oggetto 3D (.glb)", value: "3d" },
            { title: "Componente React", value: "component" },
          ], layout: "radio" },
        }),
        defineField({ name: "image", title: "Immagine", type: "image", options: { hotspot: true } }),
        defineField({ name: "videoWebm", title: "Video .webm", type: "file", options: { accept: "video/webm" } }),
        defineField({ name: "videoMp4", title: "Video .mp4", type: "file", options: { accept: "video/mp4" } }),
        defineField({ name: "lottieFile", title: "Nome file Lottie (es: Work-Chat.json)", type: "string" }),
        defineField({ name: "modelUrl", title: "URL modello 3D (.glb)", type: "string" }),
        defineField({ name: "componentKey", title: "Component Key (es: cro-analisi)", type: "string" }),
      ], preview: { select: { title: "titleNormal", subtitle: "label", media: "image" } } }],
    }),

    // ─── BENEFITS ──────────────────────────────────────────────────────────────
    defineField({
      name: "benefits", title: "Sezione Benefit", type: "object", fieldset: "benefitsSection",
      hidden: ({ document }) => !isInnerPage(document),
      fields: [
        defineField({ name: "titleHighlight", title: "Titolo - parte evidenziata (gradient)", type: "string" }),
        defineField({ name: "titleNormal", title: "Titolo - parte normale", type: "string" }),
        defineField({ name: "ctaText", title: "Testo CTA", type: "string" }),
        defineField({ name: "ctaHref", title: "Link CTA (es: /contatti)", type: "string" }),
        defineField({
          name: "items", title: "Card benefit", type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "image", title: "Icona / Immagine", type: "image", options: { hotspot: true } }),
            defineField({ name: "title", title: "Titolo", type: "string" }),
            defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
          ], preview: { select: { title: "title", media: "image" } } }],
        }),
      ],
    }),

    // ─── PROCESS SECTION ───────────────────────────────────────────────────────
    defineField({
      name: "processSection", title: "Come Lavoriamo (Timeline)", type: "object", fieldset: "processSection",
      hidden: ({ document }) => !isInnerPage(document),
      fields: [
        defineField({ name: "titleHighlight", title: "Titolo - parte evidenziata (gradient)", type: "string" }),
        defineField({ name: "titleNormal", title: "Titolo - parte normale", type: "string" }),
        defineField({ name: "subtitle", title: "Sottotitolo", type: "text", rows: 2 }),
        defineField({
          name: "steps", title: "Step", type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "title", title: "Titolo step", type: "string" }),
            defineField({ name: "description", title: "Descrizione", type: "text", rows: 4 }),
          ], preview: { select: { title: "title" } } }],
        }),
      ],
    }),

    // ─── LOGO MARQUEE (solo Home) ──────────────────────────────────────────────
    defineField({
      name: "logoMarquee", title: "Sezione loghi clienti", type: "object", fieldset: "logoMarqueeSection",
      hidden: ({ document }) => !isHomePage(document),
      fields: [
        defineField({
          name: "logosRowOne", title: "Loghi riga 1 (va a destra →)", type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
            defineField({ name: "alt", title: "Nome azienda", type: "string" }),
          ], preview: { select: { title: "alt", media: "logo" } } }],
        }),
        defineField({
          name: "logosRowTwo", title: "Loghi riga 2 (va a sinistra ←)", type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
            defineField({ name: "alt", title: "Nome azienda", type: "string" }),
          ], preview: { select: { title: "alt", media: "logo" } } }],
        }),
      ],
    }),

    // ─── VANTAGGIO UNICO ───────────────────────────────────────────────────────
    defineField({
      name: "vantaggioUnico", title: "Vantaggio Unico", type: "object", fieldset: "vantaggioUnicoSection",
      fields: [
        defineField({ name: "titleOne", title: "Titolo - parte 1 (normale)", type: "string" }),
        defineField({ name: "highlightOne", title: "Titolo - parte 2 (gradient)", type: "string" }),
        defineField({ name: "titleTwo", title: "Titolo - parte 3 (normale)", type: "string" }),
        defineField({ name: "highlightTwo", title: "Titolo - parte 4 (gradient)", type: "string" }),
        defineField({ name: "titleThree", title: "Titolo - parte 5 (normale)", type: "string" }),
        defineField({ name: "subtitle", title: "Sottotitolo / Paragrafo", type: "text", rows: 4 }),
        defineField({ name: "ctaText", title: "Testo CTA", type: "string" }),
        defineField({ name: "ctaHref", title: "Link CTA (es: /contatti)", type: "string" }),
      ],
    }),

    // ─── HOME PROJECTS (solo Home) ─────────────────────────────────────────────
    defineField({
      name: "homeProjects", title: "Sezione progetti Home", type: "object", fieldset: "homeProjectsSection",
      description: "Compila solo nella pagina Home.",
      hidden: ({ document }) => !isHomePage(document),
      fields: [
        defineField({ name: "title", title: "Titolo - prima parte", type: "string" }),
        defineField({ name: "highlight", title: "Parola evidenziata", type: "string" }),
        defineField({ name: "titleTwo", title: "Titolo - seconda parte", type: "string" }),
        defineField({ name: "subtitle", title: "Sottotitolo", type: "text" }),
      ],
    }),

    // ─── STICKY SERVICES (solo Home) ───────────────────────────────────────────
defineField({
  name: "stickyServices", title: "Sezione Servizi Sticky", type: "object", fieldset: "stickyServicesSection",
  hidden: ({ document }) => !isHomePage(document),
  fields: [
    defineField({ name: "titleHighlight", title: "Titolo - parte evidenziata (gradient)", type: "string" }),
    defineField({ name: "titleNormal", title: "Titolo - parte normale", type: "string" }),
    defineField({ name: "subtitle", title: "Sottotitolo", type: "text", rows: 3 }),
    defineField({
      name: "cards", title: "Card servizi", type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", title: "Label (es: Ecommerce Solutions)", type: "string" }),
          defineField({ name: "title", title: "Titolo card", type: "string" }),
          defineField({ name: "text", title: "Testo", type: "text", rows: 3 }),
          defineField({ name: "cta", title: "Testo bottone", type: "string" }),
          defineField({ name: "href", title: "Link bottone", type: "string" }),
          defineField({
            name: "mediaType", title: "Tipo media", type: "string",
            options: {
              list: [
                { title: "Video", value: "video" },
                { title: "Immagine", value: "image" },
                { title: "Lottie", value: "lottie" },
              ],
              layout: "radio",
            },
          }),
          defineField({ name: "videoWebm", title: "Video .webm (URL)", type: "url" }),
          defineField({ name: "videoMp4", title: "Video .mp4 (URL)", type: "url" }),
          defineField({ name: "image", title: "Immagine", type: "image", options: { hotspot: true } }),
          defineField({ name: "lottieFile", title: "Nome file Lottie (es: Stats-Going-Up.json)", type: "string" }),
        ],
        preview: {
          select: { title: "title", subtitle: "label", media: "image" },
          prepare({ title, subtitle, media }: any) { return { title, subtitle, media } },
        },
      }],
    }),
  ],
}),

    // ─── TEAM CARDS (solo Home) ────────────────────────────────────────────────
    defineField({
      name: "teamCards", title: "Sezione Team Cards", type: "object", fieldset: "teamCardsSection",
      hidden: ({ document }) => !isHomePage(document),
      fields: [
        defineField({ name: "titleHighlight", title: "Titolo - parte evidenziata", type: "string" }),
        defineField({ name: "titleNormal", title: "Titolo - parte normale", type: "string" }),
        defineField({
          name: "subtitle", title: "Sottotitolo", type: "array",
          of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }], marks: { decorators: [{ title: "Bold", value: "strong" }, { title: "Italic", value: "em" }] } }],
        }),
        defineField({
          name: "cards", title: "Card", type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "title", title: "Titolo card", type: "string" }),
            defineField({ name: "description", title: "Descrizione", type: "text" }),
            defineField({ name: "lottieFile", title: "Nome file Lottie (es: Work-Chat.json)", type: "string" }),
          ], preview: { select: { title: "title" } } }],
        }),
      ],
    }),

    // ─── FAQ ───────────────────────────────────────────────────────────────────
    defineField({
      name: "faqSection", title: "Sezione FAQ", type: "object", fieldset: "faqSection",
      hidden: ({ document }) => !isInnerPage(document),
      fields: [
        defineField({ name: "titleHighlight", title: "Titolo - parte evidenziata (gradient)", type: "string" }),
        defineField({ name: "titleNormal", title: "Titolo - parte normale", type: "string" }),
        defineField({
          name: "items", title: "Domande e risposte", type: "array",
          of: [{ type: "object", fields: [
            defineField({ name: "question", title: "Domanda", type: "string" }),
            defineField({ name: "answer", title: "Risposta", type: "text", rows: 4 }),
          ], preview: { select: { title: "question" } } }],
        }),
      ],
    }),

    // ─── FINAL RECAP ───────────────────────────────────────────────────────────
    defineField({
      name: "finalRecap", title: "Final Recap", type: "object", fieldset: "finalRecapSection",
      hidden: ({ document }) => !isInnerPage(document),
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow (es: SOCIAL PROOF #1)", type: "string" }),
        defineField({ name: "titleHighlight", title: "Titolo - parte evidenziata (gradient)", type: "string" }),
        defineField({ name: "titleNormal", title: "Titolo - parte normale", type: "string" }),
        defineField({ name: "subtitle", title: "Paragrafo", type: "text", rows: 3 }),
        defineField({ name: "bulletPoints", title: "Punti elenco", type: "array", of: [{ type: "string" }] }),
        defineField({ name: "ctaText", title: "Testo CTA principale", type: "string" }),
        defineField({ name: "ctaHref", title: "Link CTA principale", type: "string" }),
        defineField({ name: "ctaSubText", title: "Testo sotto CTA (es: SENZA IMPEGNO)", type: "string" }),
        defineField({
          name: "mediaType", title: "Tipo di media (destra)", type: "string",
          options: { list: [{ title: "Immagine", value: "image" }, { title: "Video", value: "video" }, { title: "Lottie", value: "lottie" }], layout: "radio" },
        }),
        defineField({ name: "image", title: "Immagine", type: "image", options: { hotspot: true } }),
        defineField({ name: "videoWebm", title: "Video .webm (URL)", type: "url" }),
        defineField({ name: "videoMp4", title: "Video .mp4 (URL)", type: "url" }),
        defineField({ name: "lottieFile", title: "Nome file Lottie (es: Work-Chat.json)", type: "string" }),
      ],
    }),
  ],
})