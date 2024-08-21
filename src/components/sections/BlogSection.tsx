import React from 'react'
import { SectionIntro } from '../SectionIntro'
import { Container } from '../Container'
import { FadeIn } from '../FadeIn'
import ReactMarkdown from 'react-markdown'
import PostCard from '../PostCard'

interface BlogSectionProps {
  id: number
  title: string
  content: string
  eyebrow: string
  posts: Array<any> //TS: Change to Post type
}

interface BlogProps {
  blogSection: BlogSectionProps
}

const BlogSection: React.FC<BlogProps> = ({ blogSection }) => {
  const { title, content, eyebrow, posts } = blogSection || ''

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
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </FadeIn>
      </Container>
    </>
  )
}

export default BlogSection
