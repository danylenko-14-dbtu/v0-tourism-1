// sanity.config.ts
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/structure'
import { projectId, dataset } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'ДБТУ Туризм',
  projectId,
  dataset,
  plugins: [
    structureTool({ structure }),
    visionTool(),
  ],
  schema
})