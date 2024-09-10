import BasicMarkdown from '@/components/BasicMarkdown'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GrayscaleTransitionImage } from '@/components/GrayscaleTransitionImage'
import { MessageMarkdown } from '@/components/message-markdown'
import { PageIntro } from '@/components/sections/PageIntro'
import { fetchAxiosAPI } from '@/request/request'
import { BaseData, RestQueryParams } from '@/types/global'
import { ProjectData } from '@/types/project'
import ReactMarkdown from 'react-markdown'

type Props = {
  params: any
}

const populateProject = [
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
  populate: populateProject,
  publicationState: 'preview',
  pagination: {
    page: 1,
    pageSize: 10,
  },
}

export const ViewProject = async ({ params: { id } }: Props) => {
  const projectData: ProjectData = await fetchAxiosAPI(
    `/projects/${id}`,
    defaultQueryParams,
  )

  if (!projectData) return null
  const project = projectData.data

  return (
    <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <header>
          <PageIntro eyebrow="Projet" title={project.pageIntro.title} centered>
            <BasicMarkdown content={project.pageIntro.content} />

            {/* <MessageMarkdown
              content={project.pageIntro.content}
            ></MessageMarkdown> */}
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
                        <time dateTime={project.year}>{project.year}</time>
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
                  src={`${project?.pageIntro?.cover?.url}`}
                  quality={90}
                  className="w-full"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  priority
                  alt={project.pageIntro?.title}
                  width={800}
                  height={600}
                />
              </div>
            </div>
          </FadeIn>
        </header>
      </FadeIn>
      <FadeIn key={id} style={{ opacity: 1, transform: 'none' }}>
        <BasicMarkdown content={project.content} />
        {/* <MessageMarkdown content={project.content}></MessageMarkdown> */}
      </FadeIn>
    </Container>
  )
}
