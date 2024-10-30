import { RestQueryParams } from '@/types/global'

// utils/populates.ts
export const structurePopulate = {
  structure: {
    populate: {
      on: {
        'section.blog-section': {
          populate: {
            sectionIntro: {
              populate: ['cover'],
            },
            posts: {
              populate: {
                pageIntro: {
                  populate: ['cover'],
                },
                author: {
                  populate: ['avatar'],
                },
              },
            },
          },
        },
        'section.projects-section': {
          populate: {
            sectionIntro: {
              populate: ['cover'],
            },
            projects: {
              populate: {
                pageIntro: {
                  populate: ['cover'],
                },
                logo: true,
              },
            },
          },
        },
        'section.contact-section': {
          populate: {
            sectionIntro: {
              populate: ['cover'],
            },
            content: {
              populate: ['offices', 'emails', 'socials'],
            },
          },
        },
        'section.services-section': {
          populate: {
            sectionIntro: {
              populate: ['cover'],
            },
            our_services: {
              populate: {
                pageIntro: {
                  populate: ['cover'],
                },
              },
            },
          },
        },
        'section.pricing-section': {
          populate: {
            sectionIntro: {
              populate: ['cover'],
            },
            cards: {
              populate: ['features'],
            },
          },
        },
        'section.team-section': {
          populate: {
            sectionIntro: {
              populate: ['cover'],
            },
            members: {
              populate: {
                fullname: true,
                avatar: true,
                posts: {
                  populate: {
                    pageIntro: true,
                  },
                },
              },
            },
          },
        },
        'section.reference-section': {
          populate: {
            sectionIntro: {
              populate: ['cover'],
            },
            clients: {
              populate: ['name', 'logo'],
            },
          },
        },
        'section.culture-section': {
          populate: {
            sectionIntro: {
              populate: ['cover'],
            },
            values: {
              populate: ['title'],
            },
          },
        },
        'section.cta': {
          populate: {
            sectionIntro: {
              populate: ['cover'],
            },
            buttons: true,
          },
        },
        'section.features-section': {
          populate: {
            sectionIntro: {
              populate: ['cover'],
            },
            features: true,
          },
        },
        'section.hero-section': {
          populate: {
            sectionIntro: {
              populate: ['cover'],
            },
            buttons: true,
            logo: true,
          },
        },
      },
    },
  },
}

// Collection-specific populates
const collectionPopulates = {
  projects: {
    pageIntro: {
      populate: ['cover'],
    },
    testimonials: {
      populate: {
        author: {
          populate: ['avatar'],
        },
      },
    },
    client: true,
    year: true,
    service: true,
    content: true,
    expertise: true,
    logo: true,
  },
  posts: {
    pageIntro: {
      populate: ['cover'],
    },
    author: {
      populate: ['avatar'],
    },
    content: true,
    categories: true,
  },
  services: {
    pageIntro: {
      populate: ['cover'],
    },
    content: true,
    features: true,
  },
} as const

// Helper function to create query params
export const createQueryParams = (
  collection: keyof typeof collectionPopulates,
  includeStructure = true,
): RestQueryParams => {
  return {
    populate: {
      ...collectionPopulates[collection],
      ...(includeStructure ? structurePopulate : {}),
    },
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }
}
