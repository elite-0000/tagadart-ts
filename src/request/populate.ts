import { RestQueryParams } from '@/types/global'

export const structurePopulate = {
  structure: {
    on: {
      // Page Intro Section
      'section.page-intro': {
        populate: {
          title: true,
          eyebrow: true,
          content: true,
          cover: {
            fields: ['url'], // Fetch only the URL of the cover image
          },
        },
      },

      // Blog Section (with pagination for posts)
      'section.blog-section': {
        populate: {
          sectionIntro: true,
          posts: {
            populate: {
              pageIntro: {
                populate: {
                  cover: {
                    fields: ['url'], // Only fetch the cover image URL
                  },
                },
              },
              author: {
                populate: {
                  avatar: {
                    fields: ['url'], // Only fetch the avatar URL
                  },
                },
              },
            },
            pagination: {
              pageSize: 5, // Fetch only 5 posts at a time (adjust as needed)
            },
          },
        },
      },

      // Text Section (fetch everything since it uses simpler content)
      'section.text-section': {
        populate: '*',
      },

      // Projects Section
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

      // Contact Section
      'section.contact-section': {
        populate: {
          sectionIntro: true,
          content: {
            populate: ['offices', 'emails', 'socials'],
          },
        },
      },

      // Services Section
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

      // Pricing Section
      'section.pricing-section': {
        populate: {
          sectionIntro: true,
          cards: {
            populate: {
              features: true, // Fetch features for pricing cards
            },
          },
        },
      },

      // Team Section
      'section.team-section': {
        populate: {
          sectionIntro: true,
          members: {
            populate: {
              fullname: true,
              avatar: {
                fields: ['url'], // Fetch only avatar image URL
              },
              posts: {
                populate: {
                  pageIntro: true,
                },
              },
            },
            pagination: {
              pageSize: 5, // Limit the number of team members
            },
          },
        },
      },

      // Reference Section (Clients)
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

      // Culture Section
      'section.culture-section': {
        populate: {
          sectionIntro: true,
          values: {
            fields: ['title'], // Only fetch titles of values
          },
        },
      },

      // CTA Section
      'section.cta': {
        populate: {
          sectionIntro: true,
          buttons: true,
        },
      },

      // Features Section
      'section.features-section': {
        populate: {
          sectionIntro: true,
          features: true,
        },
      },

      // Testimonials Section
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

      // Hero Section
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
    },
  },
};

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
      populate: ['metaTitle', 'metaDescription', 'metaImage.url'],
    },
  },
}

// Helper function to create query params
export const createQueryParams = (
  collection: keyof typeof collectionPopulates,
  includeStructure = true,
): RestQueryParams => {
  console.log("structurePopulate_return: ", structurePopulate);
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
