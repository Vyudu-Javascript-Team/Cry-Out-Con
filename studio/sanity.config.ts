import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

const allowedOrigins = ['http://127.0.0.1:52654']

export default defineConfig({
  name: 'default',
  title: 'Cry Out Con',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'l96yh15e',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  basePath: '/studio',
  hostname: 'cryoutcon-cms.sanity.studio',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  cors: {
    allowOrigins: allowedOrigins,
    allowCredentials: true
  },

  // Basic security headers that won't break functionality
  api: {
    protocol: 'https'
  }
})
