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
    const speakers = [
      {
        name: "Pastor Keion Henderson",
        title: "Lead Pastor of Lighthouse Church & Ministries",
        company: "Lighthouse Church & Ministries",
        bio: "Lead Pastor of Lighthouse Church & Ministries",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/pastorkeion/",
          website: "https://keionhenderson.com/about-us/"
        }
      },
      {
        name: "Eric Thomas",
        title: "Pastor",
        company: "",
        bio: "Renowned speaker and pastor",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/etthehiphoppreacher",
          website: "https://ericthomas.com/"
        }
      },
      {
        name: "Pastor John F. Hannah",
        title: "Sr. Pastor, New Life Covenant Church Southeast",
        company: "New Life Covenant Church Southeast",
        bio: "Senior Pastor of New Life Covenant Church Southeast",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/pastorhannah"
        }
      }
    ];

    for (const speaker of speakers) {
      await sanityClient.createOrReplace({
        _id: `speaker-${speaker.name.toLowerCase().replace(/\s+/g, '-')}`,
        _type: 'speaker',
        ...speaker
      });
    }
    console.log('Speakers migrated successfully');

    // 2. Migrate Sections
    console.log('Starting section migration...');
    const sections = [
      {
        _type: 'section',
        type: 'hero',
        isEnabled: true,
        order: 1,
        content: {
          title: 'Welcome to Cry Out Con',
          subtitle: 'A Premier Gaming and Entertainment Convention',
          backgroundImage: '/assets/images/hero-bg.jpg'
        }
      },
      {
        _type: 'section',
        type: 'keynotes',
        isEnabled: true,
        order: 2,
        content: {
          title: 'Keynote Speakers',
          subtitle: 'Learn from Industry Leaders'
        }
      },
      {
        _type: 'section',
        type: 'registration',
        isEnabled: true,
        order: 3,
        content: {
          title: 'Registration',
          subtitle: 'Secure Your Spot'
        }
      },
      {
        _type: 'section',
        type: 'hotels',
        isEnabled: true,
        order: 4,
        content: {
          title: 'Hotels',
          subtitle: 'Where to Stay'
        }
      }
    ];

    for (const section of sections) {
      await sanityClient.createOrReplace({
        _id: `section-${section.type}`,
        ...section
      });
    }
    console.log('Sections migrated successfully');

    // 3. Migrate Settings
    console.log('Starting settings migration...');
    const settings = {
      _type: 'settings',
      _id: 'settings',
      siteName: 'Cry Out Con',
      navigation: [
        { label: 'Home', link: '/' },
        { label: 'Start Your Journey', link: '/#dive-in' },
        { label: 'Video', link: '/#video' },
        { label: 'Registration', link: '/#registration' },
        { label: 'Empowerment Resources', link: '/#exhibitor-info' },
        { label: 'Hotels', link: '/#hotels' },
        { label: 'Featured Content', link: '/#insights' },
        { label: 'News', link: '/#news' },
        { label: 'Partners', link: '/#partners' }
      ],
      footer: {
        copyright: ' 2025 Cry Out Con. All rights reserved.',
        socialLinks: {
          facebook: 'https://www.facebook.com/cryoutexperience',
          instagram: 'https://www.instagram.com/cryoutcon/'
        },
        links: [
          {
            label: 'Contact Us',
            url: 'https://form.jotform.com/243611671514048'
          },
          {
            label: 'Lighthouse Church',
            url: 'https://lhhouston.church/'
          },
          {
            label: 'Refund Policy',
            url: 'https://cryoutexperience.com/refund-policy/'
          },
          {
            label: "FAQ's",
            url: 'https://cryoutexperience.com/faq/'
          },
          {
            label: 'Privacy Policy',
            url: 'https://cryoutexperience.com/privacy-policy/'
          }
        ]
      }
    };

    await sanityClient.createOrReplace(settings);
    console.log('Settings migrated successfully');

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
};

// Run the migration
migrateContent();
