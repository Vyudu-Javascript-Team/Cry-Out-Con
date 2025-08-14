import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'l96yh15e',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03'
});

const migrateContent = async () => {
  try {
    // 1. Migrate Speakers
    console.log('Starting speaker migration...');
    const speakersData = [
      {
        _type: 'speaker',
        name: 'John Doe',
        title: 'CEO',
        company: 'Example Corp',
        bio: 'Example bio',
        featured: true,
      },
      // Add more sample speakers here
    ];

    for (const speaker of speakersData) {
      await sanityClient.createOrReplace({
        _id: `speaker-${speaker.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...speaker
      });
    }
    console.log('Speakers migrated successfully');

    // 2. Migrate Sections
    console.log('Starting section migration...');
    const sectionsData = [
      {
        _type: 'section',
        type: 'hero',
        isEnabled: true,
        order: 1,
        content: {
          title: 'Welcome to Cry Out Con',
          subtitle: 'A Premier Gaming and Entertainment Convention'
        }
      },
      // Add more sample sections here
    ];

    for (const section of sectionsData) {
      await sanityClient.createOrReplace({
        _id: `section-${section.type}-${section.order}`,
        ...section
      });
    }
    console.log('Sections migrated successfully');

    // 3. Migrate Settings
    console.log('Starting settings migration...');
    const settingsData = {
      _type: 'settings',
      _id: 'settings',
      siteName: 'Cry Out Con',
      navigation: [
        { label: 'Home', link: '/' },
        { label: 'About', link: '/about' }
      ],
      footer: {
        copyright: ' 2026 Cry Out Con',
        socialLinks: {
          facebook: 'https://facebook.com/cryoutcon',
          instagram: 'https://instagram.com/cryoutcon'
        }
      }
    };

    await sanityClient.createOrReplace(settingsData);
    console.log('Settings migrated successfully');

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

// Run the migration
migrateContent();
