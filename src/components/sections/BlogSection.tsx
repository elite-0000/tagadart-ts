import React from 'react'
import { SectionIntro } from './SectionIntro'
import { Container } from '../ui/Container'
import { FadeIn } from '../ui/FadeIn'
import ReactMarkdown from 'react-markdown'
import PostCard from '../elements/PostCard'
import { Post } from '@/types/post'
import { PageIntro } from '@/types/global'

interface BlogProps {
  blogSection: PageIntro
  posts: Post[]
}

const BlogSection: React.FC<BlogProps> = ({ blogSection, posts }) => {
  const { title, content, eyebrow } = blogSection || ''

  return (
    <>
      <SectionIntro
        eyebrow={eyebrow}
        title={title}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </SectionIntro>
      <Container className="mt-16">
        <FadeIn>
          {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
        </FadeIn>
      </Container>
    </>
  )
}

export default BlogSection
