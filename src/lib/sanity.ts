import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import { ClientConfig, ClientPerspective } from '@sanity/client';

const config: ClientConfig = {
  projectId: "l96yh15e",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
  perspective: 'published' as ClientPerspective
};

export const client = createClient(config);

export const previewClient = createClient({
  ...config,
  token: process.env.SANITY_API_TOKEN, // Will be undefined in browser, which is fine for public data
  useCdn: false
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  if (!source) {
    throw new Error("Image source is required");
  }
  return builder.image(source);
}

export async function getVideo() {
  try {
    const query = `*[_type == "video" && isActive == true] | order(_createdAt desc) [0] {
      _id,
      title,
      "videoUrl": videoFile.asset->url,
      "videoAsset": videoFile.asset->{
        _id,
        url,
        mimeType
      }
    }`;

    const video = await client.fetch(query);
    if (!video?.videoUrl) {
      throw new Error('No video available');
    }

    return {
      ...video,
      videoUrl: `${video.videoUrl}?dl=`
    };
  } catch (error) {
    console.error('Error fetching video:', error);
    throw error;
  }
}

export async function getDiveInContent() {
  return client.fetch(`
    *[_type == "diveIn" && isVisible == true][0] {
      _id,
      sectionTitle,
      paragraphs[] {
        text,
        order
      },
      isVisible
    }
  `);
}

// Get Hero section data
export async function getHeroContent() {
  return client.fetch(`
    *[_type == "hero" && isVisible == true][0] {
      _id,
      description,
      eventDate {
        startDate,
        endDate
      },
      venue {
        name,
        city,
        state
      },
      "backgroundImage": backgroundImage.asset->url,
      "backgroundImageAlt": backgroundImage.alt,
      registrationButton {
        text,
        url
      },
      isVisible
    }
  `);
}

// speakers grouped by categories
export async function getSpeakersGroupedByCategory() {
  return client.fetch(`
    {
      "categories": *[_type == "speakerCategory" && isVisible == true] | order(displayOrder asc) {
        _id,
        title,
        displayOrder,
        isVisible,
        "speakers": *[_type == "speaker" && references(^._id) && isVisible == true] | order(orderInCategory asc) {
          _id,
          name,
          title,
          company,
          orderInCategory,
          image {
            asset->{
              _id,
              url
            },
            alt
          },
          socialLinks {
            instagram,
            website
          }
        }
      }
    }
  `);
}

// Query to get first 3 keynote speakers
export async function getKeynoteSpeakers() {
  return client.fetch(`
    *[_type == "speakerCategory" && title == "Keynote Speakers" && isVisible == true][0] {
      "speakers": *[_type == "speaker" && references(^._id) && isVisible == true] | order(orderInCategory asc) [0...3] {
        _id,
        name,
        title,
        company,
        image {
          asset->{
            _id,
            url
          },
          alt
        },
        socialLinks {
          instagram,
          website
        }
      }
    }
  `);
}

export async function getConference() {
  return client.fetch(`*[_type == "conference" && isVisible == true] | order(content[].order asc) {
        _id,
        sectionTitle,
      content[] {
        title,
        "imageUrl": image.asset->url,
        "imageAlt": image.alt,
        description,
        order
      },
      isVisible
    }
  `);
}

export async function getRegistrationData() {
  return client.fetch(`*[_type == "registration"][0]{
    sectionTitle,
    sectionSubTitle,
    plans[]{
      title,
      price,
      features[]{
        feature,
        included
      },
      soldOut,
      order
    },
    regLink
  }`);
}

export async function getAgenda() {
  return client.fetch(
    `
    *[_type == "agenda" && !(_id in path("drafts.**"))][0] {
      announcement,
      days[] {
        day,
        "sessions": sessions[] | order(time asc) {
          time,
          "activities": activities[] {
            title,
            "note": coalesce(note, null)
          }
        }
      } | order(day asc)
    }
  `,
    {},
    { cache: "no-store" }
  );
}

export async function getSliderImages() {
  return client.fetch(`
    *[_type == "imageSlider"][0] {
      title,
      slides[] | order(order asc) {
        "imageUrl": image.asset->url,
        "alt": image.alt,
        order
      }
    }
  `);
}

export async function getAllHotels() {
  return client.fetch(`
    *[_type == "hotel"] {
      _id,
      name,
      description,
      image {
        asset->{
        _id,
        url
      }
      },
      price,
      website,
      rating,
      address,
      amenities[] {
        icon,
        amenity
      },
      features
    }
  `);
}

export async function getFooterContent() {
  return client.fetch(`
    *[_type == "footer"][0]{
  logo{
    asset->{url},
    alt
  },
  socialLinks[]{
    platform,
    url,
    icon
  },
  navigationLinks[]{
    title,
    url,
    order
  },
  copyright
}`);
}

export async function getHeaderNavigation() {
  return client.fetch(`
    *[_type == "headerNavigation"][0]{
  logo{
    asset->{url},
    alt
  },
  navigationLinks[]{
    title,
    path,
    toSection,
    order
  },
  navigationButtons[]{
    title,
    url,
    order
  }
}`);
}

export async function getCountdownData() {
  const data = await client.fetch(`
    *[_type == "countdown" && isActive == true][0] {
      eventName,
      eventDate,
      isActive
    }
  `);

  if (data) {
    const date = new Date(data.eventDate);
    // Format to match '2025-05-01T17:00:00-05:00'
    const options: Intl.DateTimeFormatOptions = {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };

    const formattedDate = new Date(
      date.toLocaleString("en-US", options)
    ).toLocaleString("en-US", {
      timeZone: "America/New_York",
      ...options,
    });

    // Update the eventDate in the returned data
    data.eventDate = formattedDate.replace(
      /(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/,
      (_, month, day, year, hour, minute, second) =>
        `${year}-${month}-${day}T${hour}:${minute}:${second}-05:00`
    );
  }

  return data;
}

export async function getSiteSettings() {
  return client.fetch(`
    *[_type == "siteSettings"][0] {
      sections[] {
        sectionId,
        isVisible,
        order
      },
      maintenanceMode
    }
  `);
}

export async function getSponsorPage() {
  return client.fetch(`
    *[_type == "sponsorPage" && isVisible == true][0] {
      title,
      description,
      email {
        buttonTitle,
        to,
        cc,
        subject
      },
      image {
        asset->{
          url
        },
        alt
      },
      bottom,
      isVisible
    }
  `);
}

export async function getRefundPolicy() {
  return client.fetch(`
    *[_type == "refundPolicy" && isVisible == true][0] {
      heading,
      items[] {
        title,
        content,
        order
      },
      isVisible
    }
  `);
}

export async function getPrivacyPolicy() {
  return client.fetch(`
    *[_type == "privacyPolicy" && isVisible == true][0] {
      heading,
      sections[] | order(order asc) {
        title,
        groupByTitle,
        paragraphsBeforeList[],
        list[],
        paragraphsAfterList[] 
      },
      isVisible
    }
  `);
}

export async function getFAQs() {
  console.log('Fetching FAQs from Sanity...');
  const result = await client.fetch(`
    *[_type == "faqs"][0] {
      heading,
      subHeading,
      "questions": questions[].content {
        question,
        answer,
        answerWithLink {
          text,
          link
        },
        answerWithList {
          text,
          list[]
        },
        answerWithListButton {
          text,
          list[],
          buttonText,
          buttonLink
        }
      }
    }
  `);
  console.log('Sanity FAQ result:', result);
  return result;
}

export async function getDiscounts() {
  return client.fetch(`
    *[_type == "discounts" && isVisible == true][0] {
      intro,
      discounts[] | order(order asc) {
        title,
        intro,
        items[] {
          name, 
          code
        }
      },
      isVisible
    }
  `);
}
