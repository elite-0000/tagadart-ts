import { RestQueryParams } from '@/types/global'

export const structurePopulate = {
  structure: {
    on: {
      'section.blog-section': {
        populate: [
          'sectionIntro',
          'posts.pageIntro.cover',
          'posts.author.avatar',
        ],
      },
      'section.text-section': {
        populate: '*',
      },
      'section.projects-section': {
        populate: [
          'sectionIntro',
          'projects.pageIntro.cover',
          'projects.logo',
        ],
      },
      'section.contact-section': {
        populate: [
          'sectionIntro',
          'content.offices',
          'content.emails',
          'content.socials',
        ],
      },
      'section.services-section': {
        populate: [
          'sectionIntro',
          'our_services.pageIntro.cover',
        ],
      },
      'section.pricing-section': {
        populate: ['sectionIntro', 'cards', 'cards.features'],
      },
      'section.team-section': {
        populate: [
          'sectionIntro',
          'members.fullname',
          'members.avatar',
          'members.posts.pageIntro',
        ],
      },
      'section.reference-section': {
        populate: ['sectionIntro', 'clients.name', 'clients.logo'],
      },
      'section.culture-section': {
        populate: ['sectionIntro', 'values.title'],
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
      'section.testimonials': {
        populate: [
          'sectionIntro',
          'testimonials.pageIntro.cover',
          'testimonials.author.avatar',
          'testimonials.member.fullname',
          'testimonials.member.avatar',
        ],
      },
      'section.hero-section': {
        populate: ['sectionIntro.cover', 'buttons', 'logo'],
      },
    },
  },
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
    },
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }
}
