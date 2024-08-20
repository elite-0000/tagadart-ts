import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import Image from 'next/image'
import Link from 'next/link'
import { Blockquote } from '@/components/Blockquote'

import { Button } from '@/components/Button'
import { PageIntro } from '@/types/global'

interface ProjectProps {
  client: string
  logo: string
  service: string
  date: string
  href: string
  title: string
  summary: string[]
  PageIntro: PageIntro
  testimonial?: {
    author: string
    content: string
  }
}

interface ProjectCardProps {
  project: ProjectProps
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  console.log(project, 'project')
  return (
    <FadeIn key={project.client}>
      <article>
        <div className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
          <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
            <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
              {project?.logo && (
                <Image
                  src={project?.logo}
                  alt=""
                  className="h-16 w-16 flex-none"
                  unoptimized
                />
              )}
              <h3 className="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                {project?.client}
              </h3>
            </div>
            <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
              <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                {project?.service}
              </p>
              <p className="text-sm text-neutral-950 lg:mt-2">
                <time dateTime={project?.date}>
                  {/* {formatDate(project.date)} */}
                  {project?.date}
                </time>
              </p>
            </div>
          </div>
          <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
            {/* <p className="font-display text-4xl font-medium text-neutral-950">
              <Link href={project.href}>{project.PageIntro?.title}</Link>
            </p> */}
            {/* <div className="mt-6 space-y-6 text-base text-neutral-600">
              {project.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div> */}
            <div className="mt-8 flex">
              <Button
                href={project.href}
                aria-label={`Read case study: ${project.client}`}
              >
                Read case study
              </Button>
            </div>
            {/* {project.testimonial && (
              <Blockquote
                author={project.testimonial.author}
                className="mt-12"
              >
                {project.testimonial.content}
              </Blockquote>
            )} */}
          </div>
        </div>
      </article>
    </FadeIn>
  )
}

export default ProjectCard
