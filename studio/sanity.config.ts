import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Cry Out Con',

  projectId: 'l96yh15e',
  dataset: 'production',

  plugins: [
    deskTool({
      defaultDocumentNode: (S) => {
        // Add preview functionality
        return S.document().views([
          S.view.form(),
          S.view
            .component(({ document }) => {
              const { displayed } = document
              const url = new URL('/api/preview', window.location.origin)
              url.searchParams.set('type', displayed._type)
              url.searchParams.set('id', displayed._id)
              
              return (
                <iframe
                  src={url.toString()}
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                />
              )
            })
            .title('Preview')
        ])
      },
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
