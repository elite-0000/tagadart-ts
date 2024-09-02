import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/sections/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/sections/PageIntro'
import { formatDate } from '@/lib/formatDate'
import { loadArticles } from '@/lib/mdx'
import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'
import WorkCard from '@/components/WorkCard'
import Clients from '@/components/Clients'

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

  let projectData;
  try {
    projectData = await fetchAxiosAPI('projects-page', defaultQueryParams)
  } catch (error) {
    // Handle the error appropriately here
    console.error('Failed to load projects data:', error)
    return <div>Failed to load data</div>
  }
  const { pageIntro, projectsSection } = projectData?.data
  const { projects } = projectsSection;
  return (
    <>
      <PageIntro {...pageIntro}>
        <p>{pageIntro.content}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <h2 className="font-display text-2xl font-semibold text-neutral-950">
            Nos projets
          </h2>
        </FadeIn>
        <div className="space-y-24 lg:space-y-32">
          {projects && projects.map((project: any) => (
            <WorkCard key={project.id} project={project} />
          ))}
        </div>
        <div>
          {
            projects && projects.map((project: any) => {
              const { our_services } = project;
              return <Clients clients={our_services} key={project.id}>
              </Clients>
            })}
        </div>
      </Container>

      <ContactSection />
    </>
  )
}
