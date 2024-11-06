import {  SeoData } from '@/types/global'
import { Metadata } from 'next'



interface GenerateMetadataOptions {
  data: SeoData | null
  type: 'project' | 'service' | 'blog'
  id: string
  appendSiteName?: boolean
  siteName?: string
}

export function generatePageMetadata({
  data,
  type,
  id,
  appendSiteName = true,
  siteName = 'Tagadart'
}: GenerateMetadataOptions): Metadata {
  if (!data) {
    return {
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} not found`
    }
  }

  const title = appendSiteName 
    ? `${data?.pageIntro?.title} - ${siteName}`
    : data?.pageIntro?.title

  const basePath = {
    project: 'projects',
    service: 'services',
    blog: 'blog'
  }[type]

  return {
    title,
    description: data?.seo?.metaDescription,
    openGraph: {
      title: data?.pageIntro?.title,
      description: data?.pageIntro?.content,
      images: data?.pageIntro?.cover?.url 
        ? [{
            url: data?.pageIntro?.cover.url,
            width: 800,
            height: 600,
            alt: data.pageIntro.title,
          }]
        : [],
    },
    alternates: {
      canonical: `/${basePath}/${id}`,
    //   languages: {
    //     'en': `/en/${basePath}/${id}`,
    //     'fr': `/fr/${basePath}/${id}`,
    //   },
    }
  }
}