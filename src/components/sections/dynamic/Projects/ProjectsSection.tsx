import React from 'react'

import { Project } from '@/types/project'
import { PageIntro } from '@/types/global'
import { fetchProjects } from '@/request/fetch'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import ProjectCard1 from './ProjectCard/ProjectCard1'

interface ProjectsProps {
  projectsSection: { sectionIntro: PageIntro } & { projects: Project[] }
  designType: Number
}

const renderContent = (projects: Project[], designType?: Number) => {
  switch (designType) {
    // case 1:
    //   return (
    //     <Container className="mt-16">
    //       <FadeIn>
    //         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    //           {projects.map((project: Project) => (
    //             <ProjectCard1 key={project.id} project={project} />
    //           ))}
    //         </div>
    //       </FadeIn>
    //     </Container>
    //   )

    default:
      return (
        <Container className="mt-16">
          <FadeIn>
            {projects.map((project: Project) => (
              <ProjectCard1 key={project.id} project={project} />
            ))}
          </FadeIn>
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
      <SectionIntro {...projectsSection.sectionIntro} />
      {renderContent(
        projectsSection.projects.length > 0
          ? projectsSection.projects
          : projects || [],
        designType,
      )}
    </>
  )
}

export default ProjectsSection
