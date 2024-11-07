import type { Metadata } from 'next'

import { PageIntro } from '@/types/global'
import { Container } from '@/components/ui/Container'
import { generateSlugPageMetadata } from '@/lib/seo'
import { componentResolver } from '@/lib/componentResolver'
import { fetchPageBySlug } from '@/request/fetch'

type Props = {
  params: {
    lang: string
    slug: string
  }
}

// async function getPageBySlug(slug: string, lang: string) {
//   const querySlug = slug === undefined ? 'home' : slug
//   const path = `/pages`
//   const urlParamsObject = {
//     filters: {
//       slug: {
//         $eq: querySlug,
//       },
//     },
//     locale: lang,
//     populate: {
//       seo: {
//         populate: ['metaTitle', 'metaDescription', 'metaImage.url'],
//       },
//       structure: {
//         on: {
//           'section.blog-section': {
//             populate: [
//               'sectionIntro',
//               'posts',
//               'posts.pageIntro',
//               'posts.pageIntro.cover',
//               'posts.author',
//               'posts.author.avatar',
//               'pagination',
//               'pagination.value',
//             ],
//           },
//           'section.projects-section': {
//             populate: [
//               'sectionIntro',
//               'projects',
//               'projects.pageIntro',
//               'projects.pageIntro.cover',
//               'projects.logo',
//               'pagination',
//               'pagination.value',
//             ],
//           },
//           'section.contact-section': {
//             populate: [
//               'sectionIntro',
//               'content',
//               'content.offices',
//               'content.emails',
//               'content.socials',
//             ],
//           },

//           'section.services-section': {
//             populate: [
//               'sectionIntro',
//               'our_services',
//               'our_services.pageIntro',
//               'our_services.pageIntro.cover',
//             ],
//           },
//           'section.pricing-section': {
//             populate: ['sectionIntro', 'cards', 'cards.features'],
//           },
//           'section.team-section': {
//             populate: [
//               'sectionIntro',
//               'members',
//               'members.fullname',
//               'members.avatar',
//               'members.posts.pageIntro',
//             ],
//           },
//           'section.reference-section': {
//             populate: [
//               'sectionIntro',
//               'clients',
//               'clients.name',
//               'clients.logo',
//             ],
//           },
//           'section.culture-section': {
//             populate: ['sectionIntro', 'values', 'values.title'],
//           },
//           'section.cta': {
//             populate: ['sectionIntro', 'buttons'],
//           },

//           'section.page-intro': {
//             populate: ['title', 'eyebrow', 'content', 'cover'],
//           },
//           'section.features-section': {
//             populate: ['sectionIntro', 'features'],
//           },
//           'section.hero-section': {
//             populate: ['sectionIntro', 'sectionIntro.cover', 'buttons', 'logo'],
//           },
//         },
//       },
//     },
//   }
//   return await fetchAxiosAPI(path, urlParamsObject)
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await fetchPageBySlug(params.slug, params.lang)

  return generateSlugPageMetadata({ page })
}

export default async function PageRoute({ params }: Props) {
  const page = await fetchPageBySlug(params.slug, params.lang)

  if (!page || !page.data || page.data.length === 0) return null

  type Section = {
    id: number
    __component: string
    [key: string]: any
  }

  const contentSections = page?.data[0]?.structure
  return (
    <Container>
      {contentSections?.map((section: Section & PageIntro) =>
        componentResolver({ section, designType: 100 }),
      )}
    </Container>
  )
}
