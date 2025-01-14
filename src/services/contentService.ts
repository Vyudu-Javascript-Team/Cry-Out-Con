import { client, urlFor } from '../lib/sanity'

// Helper function to transform CMS data to frontend format
const transformSection = async (section: any) => {
  switch (section.type) {
    case 'hero':
      return {
        type: 'hero',
        title: section.content?.title || '',
        subtitle: section.content?.subtitle || '',
        backgroundImage: section.content?.backgroundImage ? urlFor(section.content.backgroundImage).url() : '',
      }
    case 'keynotes':
      const speakers = await client.fetch(`
        *[_type == "speaker" && featured == true] {
          name,
          title,
          company,
          "image": image.asset->url,
          bio
        }
      `)
      return {
        type: 'keynotes',
        speakers: speakers.map((speaker: any) => ({
          name: speaker.name,
          title: speaker.title,
          company: speaker.company,
          image: speaker.image,
          bio: speaker.bio,
        })),
      }
    default:
      return section
  }
}

export const getPageContent = async () => {
  try {
    // Get all enabled sections
    const sections = await client.fetch(`
      *[_type == "section" && isEnabled == true] | order(order asc) {
        _id,
        type,
        content
      }
    `)

    // Transform sections to match frontend format
    const transformedSections = await Promise.all(
      sections.map(transformSection)
    )

    return {
      sections: transformedSections,
    }
  } catch (error) {
    console.error('Error fetching page content:', error)
    return {
      sections: [],
    }
  }
}

export const getSiteSettings = async () => {
  try {
    const settings = await client.fetch(`
      *[_type == "settings"][0] {
        siteName,
        "logo": logo.asset->url,
        navigation,
        footer
      }
    `)
    return settings
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}
