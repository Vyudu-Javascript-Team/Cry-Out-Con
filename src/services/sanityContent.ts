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

// Helper function to transform speaker data
const transformSpeaker = (speaker: any) => ({
  name: speaker.name,
  title: speaker.title,
  company: speaker.company || '',
  image: speaker.image ? urlFor(speaker.image).url() : '',
  bio: speaker.bio,
  instagram: speaker.socialLinks?.instagram || '',
  website: speaker.socialLinks?.website || '',
});

// Helper function to transform Sanity data to frontend format
const transformSection = async (section: any) => {
  const { type, content } = section;
  
  switch (type) {
    case 'hero':
      return {
        type: 'hero',
        title: content.title || '',
        subtitle: content.subtitle || '',
        backgroundImage: content.backgroundImage ? urlFor(content.backgroundImage).url() : '',
      };

    case 'keynotes': {
      const speakers = await client.fetch(
        `*[_type == "speaker" && category == "keynote"] | order(name asc)`
      );
      return {
        type: 'keynotes',
        title: content.title || 'Keynote Speakers',
        subtitle: content.subtitle || '',
        speakers: speakers.map(transformSpeaker),
      };
    }

    case 'thought-leaders': {
      const speakers = await client.fetch(
        `*[_type == "speaker" && category == "thought-leader"] | order(name asc)`
      );
      return {
        type: 'thought-leaders',
        title: content.title || 'Thought Leaders',
        subtitle: content.subtitle || '',
        speakers: speakers.map(transformSpeaker),
      };
    }

    case 'workshop-leaders': {
      const speakers = await client.fetch(
        `*[_type == "speaker" && category == "workshop"] | order(name asc)`
      );
      return {
        type: 'workshop-leaders',
        title: content.title || 'Workshop Leaders',
        subtitle: content.subtitle || '',
        speakers: speakers.map(transformSpeaker),
      };
    }

    case 'artists': {
      const speakers = await client.fetch(
        `*[_type == "speaker" && category == "artist"] | order(name asc)`
      );
      return {
        type: 'artists',
        title: content.title || 'Featured Artists',
        subtitle: content.subtitle || '',
        speakers: speakers.map(transformSpeaker),
      };
    }

    case 'registration':
      return {
        type: 'registration',
        title: content.title || 'Registration',
        subtitle: content.subtitle || '',
      };

    case 'hotels':
      return {
        type: 'hotels',
        title: content.title || 'Hotels',
        subtitle: content.subtitle || '',
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

export const getSpeakers = async (category?: string) => {
  try {
    const query = category 
      ? `*[_type == "speaker" && category == $category] | order(name asc)`
      : `*[_type == "speaker"] | order(category asc, name asc)`;
    
    const speakers = await client.fetch(query, { category });
    return speakers.map(transformSpeaker);
  } catch (error) {
    console.error('Error fetching speakers:', error);
    return [];
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
