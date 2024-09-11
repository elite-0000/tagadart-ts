import { type Metadata } from 'next'

import ArticleCard from '@/components/ArticleCard' // Added import statement
import { Container } from '@/components/Container'
import { ContactSection } from '@/components/sections/ContactSection'
import { PageIntro } from '@/components/sections/PageIntro'
import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'
import BlogSection from '@/components/sections/BlogSection'
import { FadeIn } from '@/components/FadeIn'

export default async function ViewBlog() {
  const populateBlog = [
    'pageIntro',
    'blogSection',
    'blogSection.posts',
    'blogSection.posts.pageIntro',
    'blogSection.posts.eyebrow',
    'blogSection.posts.content',
    'blogSection.posts.author',
    'blogSection.posts.author.avatar',
    'blogSection.posts.author.avatar.thumbnail.formats',
  ]

  const pageBlogQueryParams: RestQueryParams = {
    populate: populateBlog,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  let blogData
  try {
    blogData = await fetchAxiosAPI('blog-page', pageBlogQueryParams)
  } catch (error) {
    console.error('Failed to load blog data:', error)
    return <div>Failed to load data</div>
  }

  const { pageIntro, blogSection } = blogData?.data || {}

  const populatePosts = [
    'pageIntro',
    'author',
    'author.avatar',
    'pageIntro.cover',
  ]

  const postsQueryParams: RestQueryParams = {
    populate: populatePosts,
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  let postsData
  try {
    postsData = await fetchAxiosAPI('posts', postsQueryParams)
  } catch (error) {
    console.error('Failed to load blog data:', error)
    return <div>Failed to load data</div>
  }

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <PageIntro {...pageIntro} />
        </FadeIn>
        <BlogSection blogSection={blogSection} posts={postsData.data} />
      </Container>

      <ContactSection />
    </>
  )
}
