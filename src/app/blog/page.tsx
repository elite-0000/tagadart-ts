import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/Button'
import { ContactSection } from '@/components/sections/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PageIntro } from '@/components/sections/PageIntro'
import { formatDate } from '@/lib/formatDate'
import { loadArticles } from '@/lib/mdx'
import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'
import ArticleCard from '@/components/ArticleCard' // Added import statement

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.',
}

export default async function Blog() {
  let articles = await loadArticles()
  const populateBlog = [
    'pageIntro',
    'blogSection',
    'blogSection.posts',
    'blogSection.posts.pageIntro',
    'blogSection.posts.eyebrow',
    'blogSection.posts.content',
    'blogSection.posts.cta',
    'blogSection.posts.image',
  ]

  const defaultQueryParams: RestQueryParams = {
    populate: populateBlog,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  let blogData;
  try {
    blogData = await fetchAxiosAPI('blog-page', defaultQueryParams);
  } catch (error) {
    // Handle the error appropriately here
    console.error('Failed to load blog data:', error)
    return <div>Failed to load data</div>
  }
  const { pageIntro, blogSection } = blogData?.data;
  console.log('blogSection Data:', blogSection);

  return (
    <>
      <PageIntro {...pageIntro}>
        <p>{pageIntro.content}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {articles && articles.map((article: any) => (
              <ArticleCard article={article} key={article.id}/>
          ))}
        </div>
      </Container>

      <ContactSection />
    </>
  )
}
