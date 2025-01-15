const { createClient } = require('@sanity/client')
require('dotenv').config()

// Validate required environment variables
const requiredEnvVars = [
  'SANITY_STUDIO_API_TOKEN',
  'SANITY_STUDIO_PROJECT_ID',
  'SANITY_STUDIO_DATASET'
]

// Validate all required environment variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    console.error(`Error: ${envVar} is required but not set`)
    process.exit(1)
  }
}

// Validate API token format (basic check)
if (!process.env.SANITY_STUDIO_API_TOKEN.startsWith('sk')) {
  console.error('Error: Invalid API token format. Token should start with "sk"')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: false,
  token: process.env.SANITY_STUDIO_API_TOKEN,
  apiVersion: '2023-05-03' // Explicitly set API version for stability
})

async function deploy() {
  try {
    console.log('Starting deployment...')
    
    // Test connection before proceeding
    await client.fetch('*[_type == "settings"][0]')
    .catch(err => {
      throw new Error(`Failed to connect to Sanity: ${err.message}`)
    })

    console.log('Connection to Sanity successful')
    
    const result = await client.request({
      url: `/projects/${process.env.SANITY_STUDIO_PROJECT_ID}/studios`,
      method: 'POST',
      body: {
        hostname: 'cryoutcon-cms',
        name: 'Cry Out Con Studio'
      }
    })
    console.log('Studio deployed:', result)
    
  } catch (error) {
    console.error('Deployment failed:', error.message)
    process.exit(1)
  }
}

deploy()
