'use client'
import React from 'react'
import { ContactSection } from '@/components/sections/ContactSection'
import { Container } from '@/components/Container'
import useSWR from 'swr'
import { fetchAxiosAPI } from '@/request/request'
import { BaseData } from '@/types/global'
import { PageIntro } from '@/components/sections/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { MessageMarkdown } from '@/components/message-markdown';
import { RestQueryParams } from '@/types/global'

type Props = {
  params: any
}

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

export const ViewProject = ({ params: { id } }: Props) => {
  const { data: projectData } = useSWR<BaseData>(
    `/projects/${id}`,
    (url: string) => fetchAxiosAPI(url, defaultQueryParams),
  )
  const baseUrl = 'http://127.0.0.1:1337';
  if (!projectData) return null
  const project = projectData.data
  console.log("project>>>>>>> ", project.pageIntro.cover);

  return (
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <header>
            <PageIntro eyebrow="Projet" title={project.pageIntro.title} centered>
              <p>{project.pageIntro.content}</p>
            </PageIntro>

            <FadeIn>
              <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-40">
                <Container>
                  <div className="mx-auto max-w-5xl">
                    <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                      <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                        <dt className="font-semibold">Client</dt>
                        <dd>{project.client}</dd>
                      </div>
                      <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                        <dt className="font-semibold">Year</dt>
                        <dd>
                          <time dateTime={project.year}>
                            {project.year}
                          </time>
                        </dd>
                      </div>
                      <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                        <dt className="font-semibold">Service</dt>
                        <dd>{project.service}</dd>
                      </div>
                    </dl>
                  </div>
                </Container>
              </div>

              <div className="border-y border-neutral-200 bg-neutral-100">
                <div className="-my-px mx-auto max-w-[76rem] bg-neutral-200">
                  <GrayscaleTransitionImage
                    src={`${baseUrl}${project?.pageIntro?.cover?.url}`}
                    quality={90}
                    className="w-full"
                    sizes="(min-width: 1216px) 76rem, 100vw"
                    priority
                    alt="Description of the image" // Optional alt text
                    width={800}  // Replace with the actual width of your image
                    height={600}
                  />
                </div>
              </div>
            </FadeIn>
          </header>
        </FadeIn>
        <FadeIn key={id} style={{ opacity: 1, transform: 'none' }}>
          <MessageMarkdown content={project.content}/>
        </FadeIn>
      </Container>
  )
}
