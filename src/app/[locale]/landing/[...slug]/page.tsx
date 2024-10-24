import FeaturesSection from '@/components/sections/dynamic/Features/FeaturesSection'
import PostsSection from '@/components/sections/dynamic/Posts/PostsSection'
import ProjectsSection from '@/components/sections/dynamic/Projects/ProjectsSection'
import TestimonialSection from '@/components/sections/dynamic/TestimonialSection'

import { fetchAxiosAPI } from '@/request/request'
import { PageIntro } from '@/types/global'

type Props = {
  params: {
    lang: string
    slug: string
  }
}

async function getPageBySlug(slug: string, lang: string) {
  const path = `/pages`
  const urlParamsObject = {
    filters: { slug },
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
          // 'section.features-section': {
          //   populate: ['sectionIntro'],
          // },
          'section.culture-section': {
            populate: ['sectionIntro', 'values'],
          },
          //TODO: ADD NEW SECTION POPULATE
        },
      },
    },
  }
  return await fetchAxiosAPI(path, urlParamsObject)
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug, params.lang)
  if (page?.data?.length === 0) return null

  type Section = {
    id: number
    __component: string
    [key: string]: any
  }

  const componentResolver = (section: any) => {
    console.log(section, 'section')
    switch (section.__component) {
      case 'section.blog-section':
        return (
          <PostsSection
            key={section.id}
            postsSection={section}
            designType={1}
          />
        )
      case 'section.projects-section':
        return (
          <ProjectsSection
            key={section.id}
            projectsSection={section}
            designType={2}
          />
        )
      case 'section.features-section':
        return (
          <FeaturesSection
            key={section.id}
            featuresSection={section}
            designType={10}
          />
        )
      // case 'section.services-section':
      // case 'section.teams-section':
      // case 'section.culture-section':
      // case 'section.contact-form':
      // case 'section.page-intro':
      // case 'section.reference-section':
      case 'section.testimonials':
        return <TestimonialSection key={section.id} avatar={section.avatar} />
      default:
        return null
    }
  }

  const contentSections = page?.data[0]?.structure
  return (
    <>
      {contentSections?.map((section: Section & PageIntro) =>
        componentResolver(section),
      )}
    </>
  )
  // const contentSections = page.data[0].attributes.contentSections;
  // return contentSections.map((section: any, index: number) => componentResolver(section, index));
}
