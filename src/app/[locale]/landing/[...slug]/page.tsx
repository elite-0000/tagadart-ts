import BlogSection from '@/components/sections/dynamic/BlogSection'
import { fetchAxiosAPI } from '@/request/request'
import { PageIntro } from '@/types/global'

type Props = {
  params: {
    lang: string
    slug: string
  }
}

async function getPageBySlug(slug: string, lang: string) {
  //   const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN
  //   const options = { headers: { Authorization: `Bearer ${token}` } }

  const path = `/pages`
  const urlParamsObject = {
    filters: { slug },
    locale: lang,
    populate: 'structure',
  }
  return await fetchAxiosAPI(path, urlParamsObject)
}

export default async function PageRoute({ params }: Props) {
  const page = await getPageBySlug(params.slug, params.lang)
  if (page?.data?.length === 0) return null

  type Section = {
    id: number
    __component: string
    [key: string]: any
  }

  //TODO: Change to sectionIntro
  const componentResolver = (section: Section & PageIntro) => {
    switch (section.__component) {
      case 'section.blog-section':
        return <BlogSection key={section.id} blogSection={section} />
      default:
        return null
    }
  }

  const contentSections = page.data[0].structure
  return (
    <>
      {contentSections.map((section: Section & PageIntro) =>
        componentResolver(section),
      )}
    </>
  )
  // const contentSections = page.data[0].attributes.contentSections;
  // return contentSections.map((section: any, index: number) => componentResolver(section, index));
}
