const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: 'l96yh15e',
  dataset: 'production',
  useCdn: false,
  token: 'sksGAigfxFFnG0wpMkde0PeOOClu5Q3EjLfGZMvuEIUuBOCJxei9VzRJFG4KbxgP7rUxh2hH2EACDH1NOHYtGdmEwsBWiWahtOwr6kNi9GOiWWys99jJYxs57vBiuwlKQenlQkyestSiiF5A916Fh1EVyzyluBJXEpFKEJ7VC5l1GPWkI4V7'
})

async function deploy() {
  try {
    const result = await client.request({
      url: '/projects/l96yh15e/studios',
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
