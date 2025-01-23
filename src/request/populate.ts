// Import the necessary types
import { RestQueryParams } from '@/types/global';

// Define reusable constants for populate structures
const coverPopulate = {
  cover: {
    fields: ['url'], // Fetch only the cover image URL
  },
};

const avatarPopulate = {
  avatar: {
    fields: ['url'], // Fetch only the avatar image URL
  },
};

const authorPopulate = {
  author: {
    populate: avatarPopulate, // Attach avatar populate to author
  },
};

const pageIntroPopulate = {
  pageIntro: {
    populate: coverPopulate, // Attach cover populate to pageIntro
  },
};

// Define structured populate for sections
export const structurePopulate: Record<string, any> = {
  structure: {
    on: {
      // Page Intro Section
      'section.page-intro': {
        populate: {
          title: true,
          eyebrow: true,
          content: true,
          ...coverPopulate, // Use reusable cover populate
        },
      },

      // Blog Section (with pagination for posts)
      'section.blog-section': {
        populate: {
          sectionIntro: true,
          posts: {
            populate: {
              ...pageIntroPopulate, // Attach pageIntro populate
              ...authorPopulate, // Attach author populate
            },
            pagination: {
              pageSize: 5, // Fetch only 5 posts at a time
            },
          },
        },
      },

      // Text Section (fetch everything since it uses simpler content)
      'section.text-section': {
        populate: {
          title: true,
          content: true,
        },
      },

      // Projects Section
      'section.projects-section': {
        populate: {
          sectionIntro: true,
          projects: {
            populate: {
              ...pageIntroPopulate, // Attach pageIntro populate
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

      // Other sections (similar optimizations as above)
      'section.contact-section': {
        populate: {
          sectionIntro: true,
          content: {
            populate: ['offices', 'emails', 'socials'],
          },
        },
      },

      'section.services-section': {
        populate: {
          sectionIntro: true,
          our_services: {
            populate: {
              ...pageIntroPopulate,
            },
            pagination: {
              pageSize: 5, // Limit the number of services
            },
          },
        },
      },

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

      'section.team-section': {
        populate: {
          sectionIntro: true,
          members: {
            populate: {
              fullname: true,
              ...avatarPopulate, // Attach avatar populate
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

      'section.culture-section': {
        populate: {
          sectionIntro: true,
          values: {
            fields: ['title'], // Only fetch titles of values
          },
        },
      },

      'section.cta': {
        populate: {
          sectionIntro: true,
          buttons: true,
        },
      },

      'section.features-section': {
        populate: {
          sectionIntro: true,
          features: true,
        },
      },

      'section.testimonials': {
        populate: {
          sectionIntro: true,
          testimonials: {
            populate: {
              ...pageIntroPopulate,
              ...authorPopulate,
              member: {
                populate: {
                  fullname: true,
                  ...avatarPopulate, // Attach avatar populate for members
                },
              },
            },
            pagination: {
              pageSize: 5, // Limit the number of testimonials
            },
          },
        },
      },

      'section.hero-section': {
        populate: {
          sectionIntro: {
            populate: {
              ...coverPopulate,
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

// Collection populates (for specific collections like projects, services, etc.)
export const collectionPopulates: Record<string, any> = {
  projects: {
    pageIntro: {
      populate: coverPopulate,
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
      populate: coverPopulate,
    },
    seo: {
      populate: ['metaTitle', 'metaDescription', 'metaImage.url'],
    },
  },
  posts: {
    pageIntro: {
      populate: coverPopulate,
    },
    ...authorPopulate,
    seo: {
      populate: ['metaTitle', 'metaDescription', 'metaImage.url'],
    },
  },
  pages: {
    seo: {
      populate: ['metaTitle', 'metaDescription', 'metaImage.url'],
    },
  },
};

// Helper function to create query params dynamically
export const createQueryParams = (
  collection: keyof typeof collectionPopulates,
  includeStructure = true,
  specificSections: string[] = []
): RestQueryParams => {
  const structureSections = specificSections.length
    ? specificSections.reduce((acc, section) => {
        if (structurePopulate.structure.on[section]) {
          acc[section] = structurePopulate.structure.on[section];
        }
        return acc;
      }, {} as Record<string, any>)
    : structurePopulate.structure.on;

  return {
    populate: {
      ...(collectionPopulates[collection] || {}),
      ...(includeStructure ? structureSections : {}),
    },
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  };
};

// Example Usage
const queryParams = createQueryParams('posts', true, [
  'section.blog-section',
  'section.hero-section',
]);
console.log(queryParams);