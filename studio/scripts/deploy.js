const { createClient } = require('@sanity/client')
require('dotenv').config()

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_STUDIO_API_TOKEN
})

async function deploy() {
  try {
    const result = await client.request({
      url: `/projects/${process.env.SANITY_STUDIO_PROJECT_ID}/studios`,
      method: 'POST',
      body: {
        hostname: 'cryoutcon-cms',
        name: 'Cry Out Con Studio'
      }
    })
    console.log('Studio deployed:', result)
  } catch (err) {
    console.error('Deployment failed:', err)
  }
}

deploy()
