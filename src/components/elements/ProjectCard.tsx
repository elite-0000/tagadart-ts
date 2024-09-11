import React from 'react'
import { FadeIn } from '@/components/ui/FadeIn'
import Image from 'next/image'
import Link from 'next/link'
import { Blockquote } from '@/components/Blockquote'

import { Button } from '@/components/elements/Button'
import { PageIntro } from '@/types/global'
import { Project } from '@/types/project'
import ReactMarkdown from 'react-markdown'
import { getTranslations } from 'next-intl/server'

interface ProjectCardProps {
  project: Project
}

const ProjectCard: React.FC<ProjectCardProps> = async ({ project }) => {
  const t = await getTranslations('Project')

  return (
    <FadeIn key={project.client}>
      <article>
        <div className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
          <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
            <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
              {project?.logo && (
                <Image
                  src={`${project?.logo?.url}`}
                  alt={project?.client}
                  key={project?.id}
                  width={250}
                  height={50}
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
                <time dateTime={project?.year}>
                  {/* {formatDate(project.date)} */}
                  {project?.year}
                </time>
              </p>
            </div>
          </div>
          <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
            <p className="font-display text-4xl font-medium text-neutral-950">
              {/* <Link href={project.href}></Link> */}
              {project.pageIntro?.title}
            </p>
            <div className="mt-6 space-y-6 text-base text-neutral-600">
              <ReactMarkdown>{project.pageIntro?.content}</ReactMarkdown>
              {/* {project.summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))} */}
            </div>
            <div className="mt-8 flex">
              <Button
                // href={project.link}
                href={`projects/${project.id}`}
                aria-label={`Read case study: ${project.client}`}
              >
                {t('view_more')}
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
