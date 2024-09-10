import Clients from '@/components/Clients'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { ContactSection } from '@/components/sections/ContactSection'
import { PageIntro } from '@/components/sections/PageIntro'
import WorkCard from '@/components/WorkCard'
import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'

// import { useTranslations } from 'next-intl'

import { getTranslations } from 'next-intl/server'

export default async function ViewWorks() {
  const populateWork = [
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

  const defaultQueryParams: RestQueryParams = {
    populate: populateWork,
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
    // Handle the error appropriately here
    console.error('Failed to load projects data:', error)
    return <div>Failed to load data</div>
  }
  const { pageIntro, projectsSection } = projectData?.data || {}
  const { projects } = projectsSection
  const clientsData = projects[0]?.our_services

  // const t = useTranslations('Project')

  const t = await getTranslations('Project')

  return (
    <>
      <PageIntro {...pageIntro}>
        <p>{pageIntro.content}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="font-display text-2xl font-semibold text-neutral-950">
            {t('title')}
          </h2>
        </FadeIn>
        <div className="space-y-24 lg:space-y-32">
          {projects &&
            projects.map((project: any) => (
              <WorkCard key={project.id} project={project} />
            ))}
        </div>
        <div>
          <Clients clients={clientsData} key={projects[0]?.id} />
        </div>
      </Container>

      <ContactSection />
    </>
  )
}
