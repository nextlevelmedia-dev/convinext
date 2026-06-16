import { type SchemaTypeDefinition } from "sanity"
import { pageType } from "./page"
import { projectType } from "./project"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [pageType, projectType],
}