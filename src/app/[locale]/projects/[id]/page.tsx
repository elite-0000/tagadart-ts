import type { Metadata } from 'next'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { Testimonial } from '@/components/elements/Testimonial'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { GrayscaleTransitionImage } from '@/components/ui/GrayscaleTransitionImage'

import { Project } from '@/types/project'
import { fetchProject } from '@/request/fetch'
import { PageIntroSections } from '@/components/sections/PageIntro'
import { getTranslations } from 'next-intl/server'
import { componentResolver } from '@/lib/componentResolver'

export const metadata: Metadata = {
  //TODO: Change by real SEO
  title: 'Projet - Nom du projet',
}
type Props = {
  params: {
    id: string
  }
}

export default async function ViewProjectPage({ params: { id } }: Props) {
  const project: Project = await fetchProject(id)
  if (!project) return null

  // console.log(project, 'project')

  const contentSections = project?.structure

  // console.log(contentSections, 'contentSections')

  const { pageIntro } = project || ''

  const t = await getTranslations('Project')

  return (
    <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <header>
          <PageIntroSections showCover={false} centered={true} {...pageIntro} />

          <FadeIn>
            <div className="mt-24 border-t border-neutral-200 bg-white/50 sm:mt-32 lg:mt-24">
              <Container>
                <div className="mx-auto max-w-5xl">
                  <dl className="-mx-6 grid grid-cols-1 text-sm text-neutral-950 sm:mx-0 sm:grid-cols-3">
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Client</dt>
                      <dd>{project.client}</dd>
                    </div>
                    <div className="border-t border-neutral-200 px-6 py-4 first:border-t-0 sm:border-l sm:border-t-0">
                      <dt className="font-semibold">Année</dt>
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

            {project?.pageIntro?.cover?.url && (
              <div className="max-w-[76rem0 -my-px mx-auto">
                <GrayscaleTransitionImage
                  src={`${project?.pageIntro?.cover?.url}`}
                  quality={90}
                  className="w-full py-6"
                  sizes="(min-width: 1216px) 76rem, 100vw"
                  priority
                  alt={project.pageIntro?.title}
                  width={800}
                  height={600}
                />
              </div>
            )}
          </FadeIn>
        </header>
      </FadeIn>

      <FadeIn key={id} style={{ opacity: 1, transform: 'none' }}>
        <div className="[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
          <div className="mt-6">
            <h2 className="text-xl">{t('content')}</h2>
            <BasicMarkdown content={project.content} />
          </div>
          <div className="mt-6">
            <h2 className="text-xl">{t('expertise')}</h2>
            <BasicMarkdown content={project.expertise} />
          </div>
          {/* TODO: Add Tags list */}

          {/* <div>
            {project.testimonials &&
              project.testimonials.map((testimonial) => (
                <Testimonial key={testimonial.id} author={testimonial.author}>
                  {testimonial.content}
                </Testimonial>
              ))}
          </div> */}
        </div>
      </FadeIn>
      {contentSections?.map((section: any) => componentResolver(section))}
      {project.testimonials && (
        <FadeIn>
          {project.testimonials.map((testimonial) => (
            <Testimonial key={testimonial.id} author={testimonial.author}>
              {testimonial.content}
            </Testimonial>
          ))}
        </FadeIn>
      )}
      {/* <FadeIn>
        <Testimonial
          key={project.testimonials?.[0]?.id}
          author={project.testimonials?.[0]?.author}
        >
          {project.testimonials?.[0]?.content}
        </Testimonial>
      </FadeIn> */}
    </Container>
  )
}
