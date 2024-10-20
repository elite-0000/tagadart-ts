import React from 'react'

import { Post } from '@/types/post'
import { PageIntro } from '@/types/global'
import { SectionIntro } from '../SectionIntro'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import PostCard from '@/components/elements/PostCard'
import { fetchPosts } from '@/request/fetch'
import { AnyTxtRecord } from 'dns'

interface BlogProps {
  // blogSection: PageIntro
  blogSection: any
}

const BlogSection: React.FC<BlogProps> = async ({ blogSection }) => {
  let posts: Post[] | null = null

  console.log(blogSection.posts, 'blogSection posts')

  try {
    posts = await fetchPosts()
  } catch (error) {
    console.error('Failed to load posts:', error)
  }
  return (
    <>
      <SectionIntro {...blogSection.sectionIntro} />
      <Container className="mt-16">
        <FadeIn>
          {blogSection?.posts &&
            blogSection?.posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          {/* {posts && posts.map((post) => <PostCard key={post.id} post={post} />)} */}
        </FadeIn>
      </Container>
    </>
  )
}

export default BlogSection
