'use client'
import { Border } from '@/components/Border'
import { FadeIn } from '@/components/FadeIn'
import { fetchAxiosAPI } from '@/request/request'
import { BaseData } from '@/types/global'
import ReactMarkdown from 'react-markdown'
import useSWR from 'swr'

type Props = {
  params: any
}

export const ViewService = ({ params: { id } }: Props) => {
  const fetcher = (url: string) => {
    return fetchAxiosAPI(url)
  }

  const { data: serviceData } = useSWR<BaseData>(`/services/${id}`, fetcher)
  const currentId = id
  const { data: allServices } = useSWR<BaseData>(`/services/`, fetcher)

  if (!serviceData || !serviceData.data) return null // Added check for blogData.data
  const service = serviceData.data
  const serviceContent = service.content

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
              <p className="mt-6 text-sm font-semibold text-neutral-950">
                by {service.author.fullname}, {service.author.role}
              </p>
            </header>
          </FadeIn>
          <FadeIn key={id} style={{ opacity: 1, transform: 'none' }}>
            <div className="main_content mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
              <div className="typography">
                <ReactMarkdown>{/* {service} */}</ReactMarkdown>
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
