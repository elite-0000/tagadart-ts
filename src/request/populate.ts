import { RestQueryParams } from '@/types/global'

export const structurePopulate = {
  structure: {
    on: {
      // Generic fields for sections with intro and cover
      'section.page-intro': populateIntroWithCover(),
      'section.blog-section': {
        populate: {
          sectionIntro: true,
          posts: {
            populate: {
              ...populatePageIntroWithCover(),
              author: {
                populate: {
                  avatar: populateImage(), // Only fetch avatar image URL
                },
              },
            },
            pagination: { pageSize: 5 }, // Fetch only 5 posts per request
          },
        },
      },
      'section.text-section': populateTitleAndContent(),
      'section.projects-section': {
        populate: {
          sectionIntro: true,
          projects: {
            populate: {
              ...populatePageIntroWithCover(),
              logo: populateImage(), // Fetch only logo URL
            },
            pagination: { pageSize: 5 }, // Limit the number of projects
          },
        },
      },
      'section.contact-section': {
        populate: {
          sectionIntro: true,
          content: { populate: ['offices', 'emails', 'socials'] },
        },
      },
      'section.services-section': {
        populate: {
          sectionIntro: true,
          our_services: {
            populate: {
              ...populatePageIntroWithCover(),
            },
            pagination: { pageSize: 5 }, // Limit the number of services
          },
        },
      },
      'section.pricing-section': {
        populate: {
          sectionIntro: true,
          cards: {
            populate: { features: true }, // Only fetch features for pricing cards
          },
        },
      },
      'section.team-section': {
        populate: {
          sectionIntro: true,
          members: {
            populate: {
              fullname: true,
              avatar: populateImage(), // Fetch only avatar image URL
              posts: { populate: { pageIntro: true } },
            },
            pagination: { pageSize: 5 }, // Limit the number of team members
          },
        },
      },
      'section.reference-section': {
        populate: {
          sectionIntro: true,
          clients: {
            fields: ['name', 'link'], // Fetch only client name and link
            populate: { logo: populateImage() }, // Fetch only logo URL
            pagination: { pageSize: 10 }, // Limit the number of clients
          },
        },
      },
      'section.culture-section': {
        populate: {
          sectionIntro: true,
          values: { fields: ['title'] }, // Fetch only value titles
        },
      },
      'section.cta': {
        populate: {
          sectionIntro: true,
          buttons: true, // Fetch all buttons
        },
      },
      'section.features-section': {
        populate: {
          sectionIntro: true,
          features: true, // Fetch all features
        },
      },
      'section.testimonials': {
        populate: {
          sectionIntro: true,
          testimonials: {
            populate: {
              ...populatePageIntroWithCover(),
              author: { populate: { avatar: populateImage() } }, // Fetch only avatar URL
              member: {
                populate: {
                  fullname: true,
                  avatar: populateImage(), // Fetch only avatar URL
                },
              },
            },
            pagination: { pageSize: 5 }, // Limit the number of testimonials
          },
        },
      },
      'section.hero-section': {
        populate: {
          sectionIntro: populateHeroIntroWithCover(), // Fetch hero intro with cover image
          buttons: true, // Fetch all buttons
          logo: populateImage(), // Fetch only logo URL
        },
      },
    },
  },
}

// Helper to populate intro with cover
function populateIntroWithCover() {
  return {
    populate: {
      title: true,
      eyebrow: true,
      content: true,
      cover: populateImage(), // Fetch only the URL of the cover image
    },
  }
}

// Helper to populate title and content
function populateTitleAndContent() {
  return {
    populate: {
      title: true,
      content: true,
    },
  }
}

// Helper to populate page intro with cover
function populatePageIntroWithCover() {
  return {
    pageIntro: {
      populate: {
        title: true,
        eyebrow: true,
        content: true,
        cover: populateImage(), // Fetch only the cover image URL
      },
    },
  }
}

// Helper to populate hero intro with cover
function populateHeroIntroWithCover() {
  return {
    populate: {
      title: true,
      eyebrow: true,
      content: true,
      cover: populateImage(), // Fetch only the cover image URL
    },
  }
}

// Helper to fetch image with only URL
function populateImage() {
  return { fields: ['url'] } // Fetch only the URL field for images
}

export const collectionPopulates = {
  projects: {
    pageIntro: {
      populate: ['cover'],
    },
    logo: {
      populate: '*',
    },
    seo: {
      populate: ['metaTitle', 'metaDescription', 'metaImage.url'],
    },
  },
  services: {
    pageIntro: {
      populate: ['cover'],
    },
    seo: {
      populate: ['metaTitle', 'metaDescription', 'metaImage.url'],
    },
  },
  posts: {
    pageIntro: {
      populate: ['cover'],
    },
    author: {
      populate: ['avatar'],
    },
    seo: {
      populate: ['metaTitle', 'metaDescription', 'metaImage.url'],
    },
  },
  pages: {
    seo: {
      populate: {
        fields: ['metaTitle', 'metaDescription'], // Fetch only metaTitle and metaDescription
        metaImage: {
          fields: ['url'], // Fetch only the URL field from metaImage
        },
      },
    },
  },
}

export const defultPopulates = {
  structure: {
    on: {
      'section.hero-section': {
        populate: {
          sectionIntro: {
            populate: {
              cover: {
                fields: ['url'], // Fetch only cover image URL
              },
            },
          },
          buttons: true,
          logo: {
            fields: ['url'], // Fetch only logo URL
          },
        },
      },
      'section.reference-section': {
        populate: {
          sectionIntro: true,
          clients: {
            fields: ['name', 'link'], // Only fetch the client name and link
            populate: {
              logo: {
                fields: ['url'], // Fetch only logo URL
              },
            },
            pagination: {
              pageSize: 10, // Limit the number of clients
            },
          },
        },
      },
      'section.projects-section': {
        populate: {
          sectionIntro: true,
          projects: {
            populate: {
              pageIntro: {
                populate: {
                  cover: {
                    fields: ['url'], // Fetch only cover image URL
                  },
                },
              },
              logo: {
                fields: ['url'], // Fetch logos with only the URL
              },
            },
            pagination: {
              pageSize: 5, // Limit the number of projects per response
            },
          },
        },
      },
      'section.testimonials': {
        populate: {
          sectionIntro: true,
          testimonials: {
            populate: {
              pageIntro: {
                populate: {
                  cover: {
                    fields: ['url'], // Fetch only cover image URL
                  },
                },
              },
              author: {
                populate: {
                  avatar: {
                    fields: ['url'], // Fetch only avatar image URL
                  },
                },
              },
              member: {
                populate: {
                  fullname: true,
                  avatar: {
                    fields: ['url'], // Fetch only avatar image URL
                  },
                },
              },
            },
            pagination: {
              pageSize: 5, // Limit the number of testimonials
            },
          },
        },
      },
      'section.services-section': {
        populate: {
          sectionIntro: true,
          our_services: {
            populate: {
              pageIntro: {
                populate: {
                  cover: {
                    fields: ['url'], // Fetch only cover image URL
                  },
                },
              },
            },
            pagination: {
              pageSize: 5, // Limit the number of services
            },
          },
        },
      },
    },
  },
}

// Helper function to create query params
export const createQueryParams = (
  collection: keyof typeof collectionPopulates,
  includeStructure = true,
): RestQueryParams => {
  return {
    populate: {
      ...(collectionPopulates[collection] || {}),
      ...(includeStructure ? structurePopulate : {}),
    },
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }
}

export const createHomeSeoQueryParams = (
  collection: keyof typeof collectionPopulates,
  includeStructure = true,
): RestQueryParams => {
  console.log('create collection: ', collection)
  return {
    populate: {
      ...(collectionPopulates[collection] || {}),
    },
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }
}

export const createHomeQueryParams = (
  collection: keyof typeof collectionPopulates,
  includeStructure = true,
): RestQueryParams => {
  return {
    populate: {
      ...(includeStructure ? structurePopulate : {}),
    },
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }
}
