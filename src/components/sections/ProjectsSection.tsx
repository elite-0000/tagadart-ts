import React from 'react'
import { SectionIntro } from '../SectionIntro'
import { Container } from '../Container'
import { FadeIn, FadeInStagger } from '../FadeIn'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

interface Project {
  id: number
  year: string
  client: string
  service: string
  expertise: string
  link: string | null
  content: string
  pageIntro: any
}

interface ProjectsSectionProps {
  id: number
  title: string
  content: string
  eyebrow: string

  projects: Array<Project>
}

interface ProjectsProps {
  projectsSection: ProjectsSectionProps
}

const ProjectsSection: React.FC<ProjectsProps> = ({ projectsSection }) => {
  const { projects, title, content, eyebrow } = projectsSection || ''
  //   const { title, content, eyebrow } = pageIntro

  return (
    <>
      <SectionIntro
        eyebrow={eyebrow}
        title={title}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>{content}</p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {projects &&
            projects.map((project) => (
              <FadeIn key={project.id} className="flex">
                <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                  <h3>
                    {/* TODO: Add logo if available */}
                    <Link href={`/projects/${project.id}`}>
                      <span className="absolute inset-0 rounded-3xl" />
                      {project.client}
                    </Link>
                  </h3>
                  <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                    <time dateTime={project.year} className="font-semibold">
                      {project.year}
                    </time>
                    <span className="text-neutral-300" aria-hidden="true">
                      /
                    </span>
                    <span>{project.service}</span>
                  </p>
                  <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                    {project.pageIntro.title}
                  </p>
                  <div className="mt-4 text-base text-neutral-600">
                    <ReactMarkdown>{project.pageIntro.content}</ReactMarkdown>
                  </div>
                </article>
              </FadeIn>
            ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

export default ProjectsSection
