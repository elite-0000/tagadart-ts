import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import Image from 'next/image'
import Link from 'next/link'
import { Blockquote } from '@/components/Blockquote'
import { Border } from '@/components/Border'

import { Button } from '@/components/Button'
import { PageIntro } from '@/types/global'

interface WorkProps {
  id: number;
  client: string
  content: string
  year: string
  service: string
  expertise: string
  link: string
  title: string
  logo: {
    url: string
    id: number
  }
  url: string
  summary: string[]
  pageIntro: PageIntro
  testimonials?: {
    eyebrow: string
    title: string
    avatar: any
    content: string
  } []
  our_services: {
    id: number,
    classIcon: string,
    content: string
  } []
}

interface WorkCardProps {
  project: WorkProps
}

const WorkCard: React.FC<WorkCardProps> = ({ project }) => {
  const sentencesArray = project.content.split('\n').filter(line => line.trim() !== '');
  const baseUrl = 'http://127.0.0.1:1337';
  return (
    
    <FadeIn key={project.client}>
        <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
            <article>
                <Border className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
                <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                    <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                    <Image
                        src={project?.logo?.url? `${baseUrl}${project.logo.url}` : ''}
                        alt=""
                        width={50}
                        height={50}
                        className="w-16 h-16 flex-none"
                        unoptimized
                    />
                    <h3 className="mt-6 text-sm font-semibold text-neutral-950 sm:mt-0 lg:mt-8">
                        {project.client}
                    </h3>
                    </div>
                    <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
                    <p className="text-sm tracking-tight text-neutral-950 after:ml-4 after:font-semibold after:text-neutral-300 after:content-['/'] lg:mt-2 lg:after:hidden">
                        {project.service}
                    </p>
                    <p className="text-sm text-neutral-950 lg:mt-2">
                        <time dateTime={project.year}>
                        {/* {formatDate(caseStudy.date)} */}
                        {project.year}
                        </time>
                    </p>
                    </div>
                </div>
                <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
                    <p className="font-display text-4xl font-medium text-neutral-950">
                    <Link href={`/projects/${project.id}`}>{project.title}</Link>
                    </p>
                    <div className="mt-6 space-y-6 text-base text-neutral-600">
                        {/* {sentencesArray.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))} */}
                        {project.pageIntro.content}
                    </div>
                    <div className="mt-8 flex">
                    <Button
                        href={`/projects/${project.id}`}
                        aria-label={`Read case study: ${project.client}`}
                    >
                        Read case study
                    </Button>
                    </div>
                    {
                        project.testimonials?.map((testiminal) => {
                            return (
                                <Blockquote
                                    key={testiminal.eyebrow}
                                    author={{
                                        name: testiminal.eyebrow,
                                        role: testiminal.title,
                                      }}
                                    className="mt-12"
                                >
                                {testiminal.content}
                            </Blockquote>)
                        })
                    }
                </div>
                </Border>
            </article>
        </div>
    </FadeIn>
  )
}

export default WorkCard
