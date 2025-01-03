import { Payload } from 'payload';
import { Request, Response } from 'express';

export const registerEndpoints = (payload: Payload): void => {
  payload.router.get('/api/content', async (req: Request, res: Response) => {
    try {
      // Get all enabled sections ordered by their order field
      const sections = await payload.find({
        collection: 'sections',
        where: {
          isEnabled: { equals: true },
        },
        sort: 'order',
      });

      // Get speakers for keynotes section
      const speakers = await payload.find({
        collection: 'speakers',
        where: {
          isActive: { equals: true },
        },
      });

      // Get settings
      const settings = await payload.findGlobal({
        slug: 'settings',
      });

      // Transform the data to match your frontend structure
      const transformedSections = sections.docs.map((section: any) => {
        switch (section.type) {
          case 'hero':
            return {
              type: 'hero',
              title: section.content?.title,
              subtitle: section.content?.subtitle,
              backgroundImage: section.content?.backgroundImage?.url,
            };
          case 'keynotes':
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
          case 'news':
            return {
              type: 'news',
              title: section.content?.title,
              items: section.content?.items?.map((item: any) => ({
                title: item.title,
                date: item.date,
                content: item.content,
                image: item.image?.url,
              })),
            };
          // Add other section types as needed
          default:
            return section;
        }
      });

      res.json({
        sections: transformedSections,
        settings: {
          navigation: settings.mainNav,
          footer: settings.footerContent,
          socialLinks: settings.socialLinks,
        },
      });
    } catch (error) {
      console.error('Error fetching content:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
};
