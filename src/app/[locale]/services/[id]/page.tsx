import type { Metadata } from 'next'

import { Service } from '@/types/service'
import { fetchService } from '@/request/fetch'
import { Border } from '@/components/ui/Border'
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '@/components/ui/BasicMarkdown'

export const metadata: Metadata = {
  title: 'Service - Service Title',
}

type Props = {
  params: {
    id: string
  }
}

export default async function ViewServicePage({ params: { id } }: Props) {
  const service: Service = await fetchService(id)

  if (!service) return null

  return (
    <article>
      <Border className="pt-16">
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn key={id}>
            <header className="mx-auto flex max-w-5xl flex-col text-center">
              <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
                {service.pageIntro.title}
              </h1>
              <time
                dateTime={service.pageIntro.eyebrow}
                className="order-first text-sm text-neutral-950"
              >
                {service.pageIntro.eyebrow}
              </time>
              {/* <p className="mt-6 text-sm font-semibold text-neutral-950">
                by {service.author.fullname}, {service.author.role}
              </p> */}
            </header>
          </FadeIn>
          <FadeIn key={id} style={{ opacity: 1, transform: 'none' }}>
            <div className="main_content mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
              <div className="typography">
                <BasicMarkdown>{/* {service} */}</BasicMarkdown>
              </div>
            </div>
          </FadeIn>
          {/* {moreArticles.length > 0 && (
                        <PageLinks
                        className="mt-24 sm:mt-32 lg:mt-40"
                        title="More articles"
                        pages={moreArticles}
                        />
                    )} */}
        </div>
      </Border>
    </article>
  )
}
