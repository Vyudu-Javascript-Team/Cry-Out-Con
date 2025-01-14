import { createClient } from '@sanity/client';
import payload from 'payload';
import dotenv from 'dotenv';

dotenv.config();

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'l96yh15e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN, // You'll need to add this to your .env file
  useCdn: false,
  apiVersion: '2023-05-03'
});

const migrateContent = async () => {
  try {
    // 1. Migrate Speakers
    const speakers = await payload.find({ collection: 'speakers' });
    for (const speaker of speakers.docs) {
      await sanityClient.createOrReplace({
        _type: 'speaker',
        name: speaker.name,
        title: speaker.title,
        company: speaker.company,
        bio: speaker.bio,
        featured: speaker.featured || false,
        // You'll need to handle image upload separately
        // For now, we'll skip the image field
      });
    }
    console.log('Speakers migrated successfully');

    // 2. Migrate Sections
    const sections = await payload.find({ collection: 'sections' });
    for (const section of sections.docs) {
      await sanityClient.createOrReplace({
        _type: 'section',
        type: section.type,
        isEnabled: section.isEnabled,
        order: section.order,
        content: section.content,
        // Handle specific section types and their content
      });
    }
    console.log('Sections migrated successfully');

    // 3. Migrate Settings
    const settings = await payload.findGlobal({ slug: 'settings' });
    if (settings) {
      await sanityClient.createOrReplace({
        _type: 'settings',
        siteName: settings.siteName,
        navigation: settings.navigation,
        footer: {
          copyright: settings.footer?.copyright,
          socialLinks: settings.footer?.socialLinks,
          links: settings.footer?.links,
        },
      });
    }
    console.log('Settings migrated successfully');

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

// Run the migration
migrateContent();
