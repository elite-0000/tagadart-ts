import type { Metadata } from 'next'

import { PageIntro } from '@/types/global'
import { Container } from '@/components/ui/Container'
import { generateSlugPageMetadata } from '@/lib/seo'
import { componentResolver } from '@/lib/componentResolver'
import {
  fetchHomePageBySlug,
  fetchPageBySlug,
  fetchHomeSEOPageBySlug,
} from '@/request/fetch'

type Props = {
  params: {
    lang: string
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await fetchHomeSEOPageBySlug(params.slug, params.lang)
  return generateSlugPageMetadata({ page })
}

export default async function PageRoute({ params }: Props) {
  const page = await fetchHomePageBySlug(params.slug, params.lang)
  if (!page || !page.data || page.data.length === 0) return null

  type Section = {
    id: number
    __component: string
    [key: string]: any
  }

  const contentSections = page?.data[0]?.structure
  return (
    <Container>
      {contentSections?.map((section: Section & PageIntro) =>
        componentResolver({ section, designType: section.designType }),
      )}
    </Container>
  )
}
