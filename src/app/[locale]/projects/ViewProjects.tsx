import Clients from '@/components/sections/Clients'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import ProjectCard from '@/components/ProjectCard'
import { ContactSection } from '@/components/sections/ContactSection'
import { PageIntro } from '@/components/sections/PageIntro'
import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'
import { getTranslations } from 'next-intl/server'

/*
API Data Structure:
- pageIntro
  ...
- projectsSection

*/

export default async function ViewProjects() {
  // Define the data structure to populate
  const populateProjectsPage = [
    'pageIntro',
    'pageIntro.cover',
    'projectsSection',
    'projectsSection.projects',
    'projectsSection.projects.logo',
    'projectsSection.projects.testimonials',
    'projectsSection.projects.pageIntro.cover',
    'projectsSection.projects.our_services',
    'projectsSection.projects.our_services.pageIntro',
    'projectsSection.projects.our_services.pageIntro.cover',
  ]

  // Query parameters for fetching the projects data
  const defaultQueryParams: RestQueryParams = {
    populate: populateProjectsPage,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  let projectData
  try {
    projectData = await fetchAxiosAPI('projects-page', defaultQueryParams)
  } catch (error) {
    console.error('Failed to load projects data:', error)
    return <div>Failed to load data</div>
  }

  // Extract necessary data from the API response
  const { pageIntro, projectsSection } = projectData?.data || {}
  const { projects } = projectsSection
  const clientsData = projects[0]?.our_services

  // Fetch translations for the 'Project' namespace
  const t = await getTranslations('Project')

  return (
    <>
      {/* Page Introduction */}
      <PageIntro {...pageIntro}>
        <p>{pageIntro.content}</p>
      </PageIntro>

      {/* Projects Section */}
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="font-display text-2xl font-semibold text-neutral-950">
            {t('title')}
          </h2>
        </FadeIn>
        <div className="space-y-24 lg:space-y-32">
          {projects &&
            projects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </div>

        {/* Clients Section */}
        <div>
          <Clients clients={clientsData} key={projects[0]?.id} />
        </div>
      </Container>

      {/* Contact Section */}
      <ContactSection />
    </>
  )
}
