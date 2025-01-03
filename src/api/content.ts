import payload from 'payload';

// Helper function to transform CMS data to frontend format
const transformSection = async (section: any) => {
  switch (section.type) {
    case 'hero':
      return {
        type: 'hero',
        title: section.content?.title || '',
        subtitle: section.content?.subtitle || '',
        backgroundImage: section.content?.backgroundImage?.url || '',
      };
    case 'keynotes':
      const speakers = await payload.find({
        collection: 'speakers',
        where: {
          featured: { equals: true },
        },
      });
      return {
        type: 'keynotes',
        speakers: speakers.docs.map((speaker: any) => ({
          name: speaker.name,
          title: speaker.title,
          company: speaker.company,
          image: speaker.image?.url,
          bio: speaker.bio,
        })),
      };
    // Add other section transformers as needed
    default:
      return section;
  }
};

export const getPageContent = async () => {
  try {
    // Get all enabled sections
    const sections = await payload.find({
      collection: 'sections',
      where: {
        isEnabled: { equals: true },
      },
      sort: 'order',
    });

    // Transform sections to match frontend format
    const transformedSections = await Promise.all(
      sections.docs.map(transformSection)
    );

    // Get global settings
    const settings = await payload.findGlobal({
      slug: 'settings',
    });

    return {
      sections: transformedSections,
      settings,
    };
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};
