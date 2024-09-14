import React from 'react'
import { SectionIntro } from './SectionIntro'
import { Container } from '../ui/Container'
import { FadeIn } from '../ui/FadeIn'

import PostCard from '../elements/PostCard'
import { Post } from '@/types/post'
import { PageIntro } from '@/types/global'

interface BlogProps {
  blogSection: PageIntro
  posts: Post[]
}

const BlogSection: React.FC<BlogProps> = ({ blogSection, posts }) => {
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
