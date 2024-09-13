import type { Metadata } from 'next'

import { Service } from '@/types/service'
import { fetchService } from '@/request/fetch'
import { Border } from '@/components/ui/Border'
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { getTranslations } from 'next-intl/server'
import { PageIntroSections } from '@/components/sections/PageIntro'

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
  const { pageIntro } = service || ''

  const t = await getTranslations('Service')

  return (
    <article>
      <Border className="pt-16">
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn key={id}>
            <header className="mx-auto flex max-w-5xl flex-col text-center">
              <PageIntroSections
                showCover={false}
                centered={true}
                {...pageIntro}
              />
            </header>
          </FadeIn>
          <FadeIn key={id} style={{ opacity: 1, transform: 'none' }}>
            <div className="main_content mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
              <div>
                <h2 className="text-xl">{t('content')}</h2>
                <BasicMarkdown>{service.content}</BasicMarkdown>
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
