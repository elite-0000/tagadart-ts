import {  SeoData } from '@/types/global'
import { Metadata } from 'next'



interface GenerateMetadataOptions {
  data: SeoData | null
  type: 'project' | 'service' | 'blog'
  id: string
  siteName?: string
}

export function generatePageMetadata({
  data,
  type,
  id,
  siteName = 'Tagadart'
}: GenerateMetadataOptions): Metadata {
  if (!data) {
    return {
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} not found`
    }
  }

  const title = data?.seo?.metaTitle 
    ? `${data?.seo?.metaTitle} - ${siteName}`
        : `${data?.pageIntro?.title} - ${siteName}`
    // : data?.pageIntro?.title

  const basePath = {
    project: 'projects',
    service: 'services',
    blog: 'blog'
  }[type]

  return {
    title,
    description: data?.seo?.metaDescription || data?.pageIntro?.content,
    openGraph: {
      title: title,
      description: data?.seo?.metaDescription || data?.pageIntro?.content,
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