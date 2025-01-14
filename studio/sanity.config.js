import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Cry Out Con',
  projectId: 'l96yh15e',
  dataset: 'production',
  basePath: '/studio',
  hostname: 'cryoutcon-cms.sanity.studio',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  useCdn: false,
})
