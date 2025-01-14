import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'l96yh15e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-05-03'
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};

// Helper function to transform Sanity data to frontend format
const transformSection = async (section: any) => {
  switch (section._type) {
    case 'hero':
      return {
        type: 'hero',
        title: section.title || '',
        subtitle: section.subtitle || '',
        backgroundImage: section.backgroundImage ? urlFor(section.backgroundImage).url() : '',
      };
    case 'keynotes':
      const speakersQuery = `*[_type == "speaker" && featured == true]{
        name,
        title,
        company,
        image,
        bio
      }`;
      const speakers = await client.fetch(speakersQuery);
      return {
        type: 'keynotes',
        speakers: speakers.map((speaker: any) => ({
          name: speaker.name,
          title: speaker.title,
          company: speaker.company,
          image: speaker.image ? urlFor(speaker.image).url() : '',
          bio: speaker.bio,
        })),
      };
    default:
      return section;
  }
};

export const getPageContent = async () => {
  try {
    // Get all enabled sections
    const sectionsQuery = `*[_type == "section" && isEnabled == true] | order(order asc)`;
    const sections = await client.fetch(sectionsQuery);

    // Transform sections to match frontend format
    const transformedSections = await Promise.all(
      sections.map(transformSection)
    );

    return {
      sections: transformedSections,
    };
  } catch (error) {
    console.error('Error fetching page content:', error);
    return {
      sections: [],
    };
  }
};

export const getSettings = async () => {
  try {
    const settingsQuery = `*[_type == "settings"][0]{
      siteName,
      logo,
      navigation[] {
        label,
        link
      },
      footer {
        copyright,
        socialLinks {
          facebook,
          instagram
        },
        links[] {
          label,
          url
        }
      }
    }`;
    const settings = await client.fetch(settingsQuery);
    return {
      ...settings,
      logo: settings.logo ? urlFor(settings.logo).url() : '',
    };
  } catch (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
};
