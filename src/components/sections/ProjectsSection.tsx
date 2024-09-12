import React from 'react'
import { SectionIntro } from './SectionIntro'
import { Container } from '../ui/Container'
import { FadeIn, FadeInStagger } from '../ui/FadeIn'
import { Project } from '@/types/project'
import { PageIntro } from '@/types/global'
import ProjectCard from '../elements/ProjectCard'

interface ProjectsProps {
  projectsSection: PageIntro
  projects: Project[]
}

const ProjectsSection: React.FC<ProjectsProps> = ({
  projectsSection,
  projects,
}) => {
  // const { title, content, eyebrow } = projectsSection || ''

  return (
    <>
      {/* <SectionIntro
        eyebrow={eyebrow}
        title={title}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{content}</p>
      </SectionIntro> */}
      <SectionIntro centered={true} {...projectsSection} />
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {projects &&
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

export default ProjectsSection
