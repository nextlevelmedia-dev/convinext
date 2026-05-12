import { defineField, defineType } from "sanity"

export const pageType = defineType({
  name: "page",
  title: "Pagine",
  type: "document",

  fieldsets: [
    {
      name: "heroSection",
      title: "🚀 Hero Section",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "homeProjectsSection",
      title: "🎠 Home - Sezione Progetti",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: "logoMarqueeSection",
      title: "🏷️ Sezione Loghi Clienti",
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],

  fields: [
    defineField({
      name: "title",
      title: "Titolo pagina",
      type: "string",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),

    defineField({
      name: "hero",
      title: "Hero content",
      type: "object",
      fieldset: "heroSection",
      fields: [
        defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
        defineField({ name: "title", title: "Titolo Hero - prima parte", type: "string" }),
        defineField({ name: "highlightOne", title: "Parola evidenziata 1", type: "string" }),
        defineField({ name: "titleTwo", title: "Titolo Hero - seconda parte", type: "string" }),
        defineField({ name: "highlightTwo", title: "Parola evidenziata 2", type: "string" }),
        defineField({ name: "subtitle", title: "Sottotitolo", type: "text" }),
        defineField({ name: "ctaText", title: "Testo bottone", type: "string" }),
      ],
    }),

    defineField({
      name: "mockupSlides",
      title: "Hero mockup slides",
      description: "Compila questo campo solo per le pagine Siti Web ed Ecommerce.",
      type: "array",
      fieldset: "heroSection",
      hidden: ({ document }) => document?.slug?.current === "home",
      of: [
        {
          type: "object",
          title: "Mockup slide",
          fields: [
            defineField({ name: "imac", title: "Immagine schermo iMac", type: "image", options: { hotspot: true } }),
            defineField({ name: "tablet", title: "Immagine schermo Tablet", type: "image", options: { hotspot: true } }),
            defineField({ name: "mobile", title: "Immagine schermo Mobile", type: "image", options: { hotspot: true } }),
          ],
          preview: {
            select: { media: "imac" },
            prepare({ media }) {
              return { title: "Mockup slide", media }
            },
          },
        },
      ],
    }),

    defineField({
      name: "homeProjects",
      title: "Sezione progetti Home",
      description: "Compila questo campo solo nella pagina Home.",
      type: "object",
      fieldset: "homeProjectsSection",
      hidden: ({ document }) => document?.slug?.current !== "home",
      fields: [
        defineField({ name: "title", title: "Titolo - prima parte", type: "string" }),
        defineField({ name: "highlight", title: "Parola evidenziata", type: "string" }),
        defineField({ name: "titleTwo", title: "Titolo - seconda parte", type: "string" }),
        defineField({ name: "subtitle", title: "Sottotitolo", type: "text" }),
      ],
    }),

    defineField({
      name: "logoMarquee",
      title: "Sezione loghi clienti",
      type: "object",
      fieldset: "logoMarqueeSection",
      hidden: ({ document }) => document?.slug?.current !== "home",
      fields: [
        defineField({
          name: "title",
          title: "Titolo sezione",
          type: "string",
        }),
        defineField({
          name: "subtitle",
          title: "Sottotitolo",
          type: "array",
          of: [
            {
              type: "block",
              styles: [{ title: "Normal", value: "normal" }],
              marks: {
                decorators: [
                  { title: "Bold", value: "strong" },
                  { title: "Italic", value: "em" },
                ],
              },
            },
          ],
        }),
        defineField({
          name: "logosRowOne",
          title: "Loghi riga 1 (va a destra →)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
                defineField({ name: "alt", title: "Nome azienda", type: "string" }),
              ],
              preview: {
                select: { title: "alt", media: "logo" },
              },
            },
          ],
        }),
        defineField({
          name: "logosRowTwo",
          title: "Loghi riga 2 (va a sinistra ←)",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "logo", title: "Logo", type: "image", options: { hotspot: true } }),
                defineField({ name: "alt", title: "Nome azienda", type: "string" }),
              ],
              preview: {
                select: { title: "alt", media: "logo" },
              },
            },
          ],
        }),
      ],
    }),
  ],
})