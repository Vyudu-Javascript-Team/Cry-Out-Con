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

const generateSafeId = (str) => {
  return str.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

const migrateContent = async () => {
  try {
    // 1. Migrate Speakers
    console.log('Starting speaker migration...');
    const speakers = [
      // Keynote Speakers
      {
        name: "Pastor Keion Henderson",
        title: "Lead Pastor of Lighthouse Church & Ministries",
        company: "Lighthouse Church & Ministries",
        bio: "Lead Pastor of Lighthouse Church & Ministries",
        category: "keynote",
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
        category: "keynote",
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
        category: "keynote",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/pastorhannah"
        }
      },
      {
        name: "LaTrice Ryan",
        title: "Evangelist",
        company: "",
        bio: "Evangelist and Ministry Leader",
        category: "keynote",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/latriceryan",
          website: "https://latrice-ryan-ministries-82cd.mykajabi.com/KSI22"
        }
      },
      {
        name: "Pastor Samuel Rodriguez",
        title: "Lead Pastor of New Season, President of National Hispanic Christian Leadership Conference",
        company: "New Season",
        bio: "Lead Pastor and President of NHCLC",
        category: "keynote",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/pastorsamuelrodriguez"
        }
      },
      // Thought Leaders
      {
        name: "Shaunie Henderson",
        title: "First Lady of Lighthouse Church & Ministries",
        company: "Lighthouse Church & Ministries",
        bio: "First Lady of Lighthouse Church & Ministries",
        category: "thought-leader",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/iamshaunie/"
        }
      },
      {
        name: "Stephan Speaks",
        title: "Certified Dating and Relationship Coach, Author/Speaker",
        company: "",
        bio: "Certified Dating and Relationship Coach",
        category: "thought-leader",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/stephanspeaks/"
        }
      },
      {
        name: "Bishop Seion Roberts, Sr",
        title: "Chief of Ministries, Lighthouse Church & Ministries",
        company: "Lighthouse Church & Ministries",
        bio: "Chief of Ministries",
        category: "thought-leader",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/bishopsieon/"
        }
      },
      {
        name: "Vincent A. Casey Sr",
        title: "Relationship Mediator",
        company: "",
        bio: "Relationship Mediator",
        category: "thought-leader",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/notyouraverageminister"
        }
      },
      // Workshop Leaders
      {
        name: "Alicia Dugar Stephenson",
        title: "Lead Teacher Trainer",
        company: "",
        bio: "ERYT Lead Teacher Trainer",
        category: "workshop",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/afroyogaqueen"
        }
      },
      {
        name: "Jordan G. Welch",
        title: "Artist",
        company: "",
        bio: "Artist and Creative",
        category: "workshop",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/jordan.g.welch"
        }
      },
      {
        name: "Lacey Tezino",
        title: "Founder & CEO of Passport Journeys",
        company: "Passport Journeys",
        bio: "Founder & CEO",
        category: "workshop",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/Lacey.tezino"
        }
      },
      {
        name: "RC Blakes",
        title: "Pastor",
        company: "",
        bio: "Pastor and Spiritual Leader",
        category: "workshop",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/rcblakes"
        }
      },
      {
        name: "Dr. Shana D. Lewis",
        title: "Mental Health Expert/Exec Wellness Coach",
        company: "",
        bio: "Mental Health Expert and Executive Wellness Coach",
        category: "workshop",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/iamdrshana"
        }
      },
      // Artists
      {
        name: "Le'Andria Johnson",
        title: "Grammy Award Winner/Singer",
        company: "",
        bio: "Grammy Award-Winning Singer",
        category: "artist",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/leandriaj/"
        }
      },
      {
        name: "Houston Mass Choir",
        title: "Choir",
        company: "",
        bio: "Gospel Choir",
        category: "artist",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/houstonmasschoir"
        }
      },
      {
        name: "Todd Dulaney",
        title: "Artist",
        company: "",
        bio: "Gospel Artist",
        category: "artist",
        featured: true,
        socialLinks: {
          instagram: "https://www.instagram.com/todddulaney1"
        }
      }
    ];

    for (const speaker of speakers) {
      await sanityClient.createOrReplace({
        _id: `speaker-${generateSafeId(speaker.name)}`,
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
        type: 'thought-leaders',
        isEnabled: true,
        order: 3,
        content: {
          title: 'Thought Leaders',
          subtitle: 'Gain Insights from Experts'
        }
      },
      {
        _type: 'section',
        type: 'workshop-leaders',
        isEnabled: true,
        order: 4,
        content: {
          title: 'Workshop Leaders',
          subtitle: 'Interactive Learning Sessions'
        }
      },
      {
        _type: 'section',
        type: 'artists',
        isEnabled: true,
        order: 5,
        content: {
          title: 'Featured Artists',
          subtitle: 'Experience Amazing Performances'
        }
      },
      {
        _type: 'section',
        type: 'registration',
        isEnabled: true,
        order: 6,
        content: {
          title: 'Registration',
          subtitle: 'Secure Your Spot'
        }
      },
      {
        _type: 'section',
        type: 'hotels',
        isEnabled: true,
        order: 7,
        content: {
          title: 'Hotels',
          subtitle: 'Where to Stay'
        }
      }
    ];

    for (const section of sections) {
      await sanityClient.createOrReplace({
        _id: `section-${generateSafeId(section.type)}`,
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
