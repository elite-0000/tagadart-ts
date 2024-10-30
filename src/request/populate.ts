import { RestQueryParams } from '@/types/global'

export const structurePopulate = {
  pageIntro: {
    populate: ['cover'],
  },
  structure: {
    on: {
      'section.blog-section': {
        populate: [
          'sectionIntro',
          'posts',
          'posts.pageIntro',
          'posts.pageIntro.cover',
          'posts.author',
          'posts.author.avatar',
        ],
      },
      'section.projects-section': {
        populate: [
          'sectionIntro',
          'projects',
          'projects.pageIntro',
          'projects.pageIntro.cover',
          'projects.logo',
        ],
      },
      'section.contact-section': {
        populate: [
          'sectionIntro',
          'content',
          'content.offices',
          'content.emails',
          'content.socials',
        ],
      },
      'section.services-section': {
        populate: [
          'sectionIntro',
          'our_services',
          'our_services.pageIntro',
          'our_services.pageIntro.cover',
        ],
      },
      'section.pricing-section': {
        populate: ['sectionIntro', 'cards', 'cards.features'],
      },
      'section.team-section': {
        populate: [
          'sectionIntro',
          'members',
          'members.fullname',
          'members.avatar',
          'members.posts.pageIntro',
        ],
      },
      'section.reference-section': {
        populate: ['sectionIntro', 'clients', 'clients.name', 'clients.logo'],
      },
      'section.culture-section': {
        populate: ['sectionIntro', 'values', 'values.title'],
      },
      'section.cta': {
        populate: ['sectionIntro', 'buttons'],
      },
      'section.page-intro': {
        populate: ['title', 'eyebrow', 'content', 'cover'],
      },
      'section.features-section': {
        populate: ['sectionIntro', 'features'],
      },
      'section.hero-section': {
        populate: ['sectionIntro', 'sectionIntro.cover', 'buttons', 'logo'],
      },
    },
  },
}

// Collection-specific populates using array format for consistency
const collectionPopulates = {
  projects: [
    'pageIntro',
    'pageIntro.cover',
    'testimonials',
    'testimonials.author',
    'testimonials.author.avatar',
    'client',
    'year',
    'service',
    'content',
    'expertise',
    'logo',
  ],
  posts: [
    'pageIntro',
    'pageIntro.cover',
    'author',
    'author.avatar',
    'content',
    'categories',
  ],
  services: ['pageIntro', 'pageIntro.cover', 'content', 'features'],
} as const

// Helper function to create query params
export const createQueryParams = (
  collection: keyof typeof collectionPopulates,
  includeStructure = true,
): RestQueryParams => {
  return {
    populate: {
      //   ...(Array.isArray(collectionPopulates[collection])
      //     ? collectionPopulates[collection].reduce(
      //         (acc, field) => ({
      //           ...acc,
      //           [field]: true,
      //         }),
      //         {},
      //       )
      //     : collectionPopulates[collection]),
      ...(includeStructure ? structurePopulate : {}),
    },
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }
}
