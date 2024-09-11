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
import { fetchHomePage, fetchPosts } from '@/request/fetch'

export const metadata: Metadata = {
  description:
    'Agence de développement web et mobile en Suisse. Nous créons des applications web et mobiles sur mesure pour les entreprises et les startups.',
}

export default async function Home() {
  let homeData = null
  let postsData = null

  try {
    homeData = await fetchHomePage()
    postsData = await fetchPosts()
  } catch (error) {
    console.error('Failed to load data:', error)
    return <div>Failed to load data</div>
  }

  const { pageIntro, projectsSection, servicesSection, blogSection } =
    homeData || ''

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <PageIntro {...pageIntro} />
        </FadeIn>
      </Container>

      <ProjectsSection projectsSection={projectsSection} />
      <ServicesSection servicesSection={servicesSection} />
      <BlogSection blogSection={blogSection} posts={postsData} />
      <ContactSection />
      {/* <referencesSection /> //TODO : later add client/reference section */}
    </>
  )
}
