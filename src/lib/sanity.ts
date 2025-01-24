import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: 'l96yh15e',
  dataset: 'production',
  apiVersion: '2021-10-21'
})


const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  if (!source) {
    throw new Error('Image source is required');
  }
  return builder.image(source)
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
  `)
}


// If you need to get all categories
export async function getAllSpeakerCategories() {
  return client.fetch(`
    *[_type == "speakerCategory" && isVisible == true] {
      _id,
      title,
      slug,
      description,
      displayOrder,
      "speakerCount": count(*[_type == "speaker" && references(^._id) && isVisible == true])
    } | order(displayOrder asc)
  `)
}

// If you need speakers grouped by categories
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
  `)
}


// Function to get all speakers with categories
export async function getAllSpeakers() {
  return client.fetch(`
    *[_type == "speaker" && isVisible == true] {
      _id,
      name,
      title,
      company,
      "category": category->{
        _id,
        title,
        slug,
        description,
        displayOrder
      },
      bio,
      featured,
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
    } | order(category->displayOrder asc, orderInCategory asc)
  `)
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
  `)
}



export async function getConference() {
  return client.fetch(`*[_type == "conference"] | order(order asc) {
        _id,
        title,
        description,
        image {
          asset->{
            url
          },
          alt
        },
        order
      }`)
}

export async function getAgenda() {
  return client.fetch(`
    *[_type == "agenda"][0] {
      announcement,
      days[] {
        day,
        sessions[] {
          time,
          activities[] {
            title,
            note
          }
        }
      }
    }
  `);
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
  `)
}
