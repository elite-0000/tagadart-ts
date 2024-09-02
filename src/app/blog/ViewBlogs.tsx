import { type Metadata } from 'next'

import ArticleCard from '@/components/ArticleCard'; // Added import statement
import { Container } from '@/components/Container'
import { ContactSection } from '@/components/sections/ContactSection'
import { PageIntro } from '@/components/sections/PageIntro'
import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Stay up-to-date with the latest industry news as our marketing teams finds new ways to re-purpose old CSS tricks articles.',
}

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
    blogData = await fetchAxiosAPI('blog-page', defaultQueryParams)
  } catch (error) {
    // Handle the error appropriately here
    console.error('Failed to load blog data:', error)
    return <div>Failed to load data</div>
  }
 
  const { pageIntro, blogSection } = blogData?.data
  const {posts} = blogSection;

  return (
    <>
      <PageIntro {...pageIntro}>
        <p>{pageIntro.content}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {posts && posts.map((post: any) => (
              <ArticleCard article={post} key={post.id}/>
          ))}
        </div>
      </Container>

      <ContactSection />
    </>
  )
}
