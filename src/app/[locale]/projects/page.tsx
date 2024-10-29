import type { Metadata } from 'next'
import Clients from '@/components/sections/Clients'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { ContactFooter } from '@/components/sections/ContactFooter'

import { getTranslations } from 'next-intl/server'
import { fetchProjects, fetchProjectsPage } from '@/request/fetch'
import ProjectsSection from '@/components/sections/ProjectsSection'
import { PageIntroSections } from '@/components/sections/PageIntro'

export const metadata: Metadata = {
  title: 'Projets - Agence de développement web et mobile en Suisse',
}

export default async function ViewProjectsPage() {
  let projectsPageData = null
  let projects = null

  try {
    projectsPageData = await fetchProjectsPage()
    projects = await fetchProjects()
  } catch (error) {
    console.error('Failed to load data:', error)
    return <div>Failed to load data</div>
  }

  const { pageIntro, projectsSection } = projectsPageData || ''
  const t = await getTranslations('Project')

  return (
    <>
      {/* <PageIntroSections {...pageIntro} /> */}

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          <ProjectsSection
            projectsSection={projectsSection}
            projects={projects}
          />
        </div>

        {/* Clients Section */}
        {/* <div>
          <Clients clients={clientsData} key={projects[0]?.id} />
        </div> */}
      </Container>

      <ContactFooter />
    </>
  )
}
