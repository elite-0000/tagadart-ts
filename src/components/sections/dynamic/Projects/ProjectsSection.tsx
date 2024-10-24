import React from 'react'

import { Project } from '@/types/project'
import { PageIntro } from '@/types/global'
import { fetchProjects } from '@/request/fetch'

import { Container } from '@/components/ui/Container'
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import ProjectCard1 from './ProjectCard/ProjectCard1'

interface ProjectsProps {
  projectsSection: { sectionIntro: PageIntro } & { projects: Project[] }
  designType: Number
}

interface RenderContentProps {
  projects: Project[]
  sectionIntro: PageIntro
  designType?: Number
}

const RenderContent: React.FC<RenderContentProps> = ({
  projects,
  sectionIntro,
  designType,
}) => {
  switch (designType) {
    default:
      return (
        <Container className="mt-16">
          <SectionIntro {...sectionIntro} />
          <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {projects.map((project: Project) => (
              <ProjectCard1 key={project.id} project={project} />
            ))}
          </FadeInStagger>
        </Container>
      )
  }
}

const ProjectsSection: React.FC<ProjectsProps> = async ({
  projectsSection,
  designType,
}) => {
  let projects: Project[] | null = null

  try {
    projects = await fetchProjects()
  } catch (error) {
    console.error('Failed to load projects:', error)
  }

  return (
    <>
      <RenderContent
        projects={
          projectsSection.projects.length > 0
            ? projectsSection.projects
            : projects || []
        }
        sectionIntro={projectsSection.sectionIntro}
        designType={designType}
      />
    </>
  )
}

export default ProjectsSection
