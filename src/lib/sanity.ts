import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'i96yh15e',
  dataset: 'production',
  apiVersion: '2024-01-13',
  useCdn: true
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper function to fetch all sections
export async function getAllSections() {
  return client.fetch(`
    *[_type == "section"] | order(order asc) {
      _id,
      type,
      isEnabled,
      order,
      content
    }
  `)
}

// Helper function to fetch all speakers
export async function getAllSpeakers() {
  return client.fetch(`
    *[_type == "speaker"] {
      _id,
      name,
      title,
      company,
      bio,
      featured,
      "image": image.asset->url,
      socialLinks
    }
  `)
}

// Helper function to fetch site settings
export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "settings"][0] {
      siteName,
      "logo": logo.asset->url,
      navigation,
      footer
    }
  `)
}
