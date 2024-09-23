import { type Metadata } from 'next'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { ContactSection } from '@/components/sections/ContactSection'

import BlogSection from '@/components/sections/BlogSection'

import ProjectsSection from '@/components/sections/ProjectsSection'
import ServicesSection from '@/components/sections/ServicesSection'
import {
  fetchClients,
  fetchHomePage,
  fetchPosts,
  fetchProjects,
  fetchServices,
} from '@/request/fetch'
import { PageIntroSections } from '@/components/sections/PageIntro'
import ReferenceSection from '@/components/sections/Clients'

export const metadata: Metadata = {
  description:
    'Agence de développement web et mobile en Suisse. Nous créons des applications web et mobiles sur mesure pour les entreprises et les startups.',
}

export default async function Home() {
  let homeData = null
  let posts = null
  let projects = null
  let services = null
  let clients = null

  try {
    homeData = await fetchHomePage()
    posts = await fetchPosts()
    projects = await fetchProjects()
    services = await fetchServices()
    clients = await fetchClients()
  } catch (error) {
    console.error('Failed to load data:', error)
    return <div>Failed to load data</div>
  }

  const {
    pageIntro,
    projectsSection,
    servicesSection,
    referencesSection,
    blogSection,
  } = homeData || ''

  return (
    <>
      {/* <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <PageIntro {...pageIntro} />
        </FadeIn>
      </Container> */}

      <PageIntroSections {...pageIntro} />
      <ProjectsSection projectsSection={projectsSection} projects={projects} />
      <ServicesSection servicesSection={servicesSection} services={services} />
      <BlogSection blogSection={blogSection} posts={posts} />
      <ReferenceSection
        clients={clients}
        referencesSection={referencesSection}
      />
      <ContactSection />
      {/* <referencesSection /> //TODO : later add client/reference section */}
    </>
  )
}
