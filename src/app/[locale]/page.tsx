import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { ContactSection } from '@/components/sections/ContactSection'

import BlogSection from '@/components/sections/BlogSection'
import { PageIntro } from '@/components/sections/PageIntro'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'

export const metadata: Metadata = {
  description:
    'Agence de développement web et mobile en Suisse. Nous créons des applications web et mobiles sur mesure pour les entreprises et les startups.',
}

export default async function Home() {
  const populateHome = [
    'cover',
    'pageIntro',
    'referencesSection',
    'servicesSection',
    'servicesSection.our_services',
    'servicesSection.our_services.pageIntro',
    'blogSection',
    'blogSection.posts',
    'blogSection.posts.pageIntro',
    'blogSection.posts.author',
    'projectsSection',
    'projectsSection.projects',
    'projectsSection.projects.pageIntro',
  ]

  const defaultQueryParams: RestQueryParams = {
    populate: populateHome,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  let homeData
  try {
    homeData = await fetchAxiosAPI('home', defaultQueryParams)
  } catch (error) {
    // Handle the error appropriately here
    console.error('Failed to load home data:', error)
    return <div>Failed to load data</div>
  }
  const {
    pageIntro,
    referencesSection,
    projectsSection,
    servicesSection,
    blogSection,
  } = homeData?.data || ''

  return (
    <>
      {/* <h1>Empt</h1> */}
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <PageIntro {...pageIntro} />
        </FadeIn>
      </Container>

      <ProjectsSection projectsSection={projectsSection} />
      <ServicesSection servicesSection={servicesSection} />
      <BlogSection blogSection={blogSection} />
      <ContactSection />
      {/* <referencesSection /> //TODO : later add client/reference section */}
    </>
  )
}
