import React from 'react'

import { Post } from '@/types/post'
import { PageIntro } from '@/types/global'
import { SectionIntro } from '../SectionIntro'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import PostCard from '@/components/elements/PostCard'
import { fetchPosts } from '@/request/fetch'

interface BlogProps {
  blogSection: PageIntro
}

const BlogSection: React.FC<BlogProps> = async ({ blogSection }) => {
  let posts: Post[] | null = null

  try {
    posts = await fetchPosts()
  } catch (error) {
    console.error('Failed to load posts:', error)
  }
  return (
    <>
      <SectionIntro {...blogSection} />
      <Container className="mt-16">
        <FadeIn>
          {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
        </FadeIn>
      </Container>
    </>
  )
}

export default BlogSection
