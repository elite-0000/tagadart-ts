import { componentResolver } from '@/lib/componentResolver'
import { fetchAxiosAPI } from '@/request/request'
import { PageIntro } from '@/types/global'

type Props = {
  params: {
    lang: string
    slug: string
  }
}

async function getPageBySlug(slug: string, lang: string) {
  const querySlug = slug === undefined ? 'home' : slug
  const path = `/pages`
  const urlParamsObject = {
    filters: {
      slug: {
        $eq: querySlug,
      },
    },
    locale: lang,
    populate: {
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
            populate: [
              'sectionIntro',
              'clients',
              'clients.name',
              'clients.logo',
            ],
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
    },
  }
  return await fetchAxiosAPI(path, urlParamsObject)
}

export default async function PageRoute({ params }: Props) {
  console.log(params, 'params')
  return null

  const page = await getPageBySlug(params.slug, params.lang)
  console.log(page, 'page')
  if (!page || !page.data || page.data.length === 0) return null

  type Section = {
    id: number
    __component: string
    [key: string]: any
  }

  const contentSections = page?.data[0]?.structure

  return (
    <>
      {contentSections?.map((section: Section & PageIntro) =>
        componentResolver(section),
      )}
    </>
  )
}
