import type { Metadata } from 'next'
import { fetchBlogPage, fetchPosts } from '@/request/fetch'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'

import BlogSection from '@/components/sections/BlogSection'
import { ContactSection } from '@/components/sections/ContactSection'
import { PageIntroSections } from '@/components/sections/PageIntro'

export const metadata: Metadata = {
  title: 'Blogs',
}

export default async function ViewBlogsPage() {
  let blogPage = null
  let posts = null

  try {
    blogPage = await fetchBlogPage()
    posts = await fetchPosts()
  } catch (error) {
    console.error('Failed to load data:', error)
    return <div>Failed to load data</div>
  }

  const { pageIntro, blogSection } = blogPage || ''

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <PageIntroSections {...pageIntro} />
        </FadeIn>
        <BlogSection blogSection={blogSection} posts={posts} />
      </Container>

      <ContactSection />
    </>
  )
}
