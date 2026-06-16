import { defineField, defineType } from "sanity"

export const projectType = defineType({
  name: "project",
  title: "Progetti",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Nome progetto", type: "string" }),
    defineField({ name: "description", title: "Tipo lavoro (es: SITO WEB – CUSTOM DEVELOPMENT)", type: "string" }),
    defineField({ name: "image", title: "Foto progetto", type: "image", options: { hotspot: true } }),
    defineField({ name: "href", title: "Link progetto (URL esterno)", type: "url" }),
    defineField({ name: "order", title: "Ordine (numero)", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "image" },
  },
  orderings: [
    { title: "Ordine manuale", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
})