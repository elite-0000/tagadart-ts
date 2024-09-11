import { type Metadata } from 'next'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { ContactSection } from '@/components/sections/ContactSection'

import BlogSection from '@/components/sections/BlogSection'
import { PageIntro } from '@/components/sections/PageIntro'
import ProjectsSection from '@/components/sections/ProjectsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import { fetchHomePage, fetchPosts, fetchProjects } from '@/request/fetch'

export const metadata: Metadata = {
  description:
    'Agence de développement web et mobile en Suisse. Nous créons des applications web et mobiles sur mesure pour les entreprises et les startups.',
}

export default async function Home() {
  let homeData = null
  let posts = null
  let projects = null

  try {
    homeData = await fetchHomePage()
    posts = await fetchPosts()
    projects = await fetchProjects()
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

      <ProjectsSection projectsSection={projectsSection} projects={projects} />
      <ServicesSection servicesSection={servicesSection} />
      <BlogSection blogSection={blogSection} posts={posts} />
      <ContactSection />
      {/* <referencesSection /> //TODO : later add client/reference section */}
    </>
  )
}
