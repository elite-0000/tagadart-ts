import React from 'react'

import { Post } from '@/types/post'
import { SectionIntro } from '../../SectionIntro'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { fetchPosts } from '@/request/fetch'
import PostCard1 from './PostCard/PostCard1'
import PostCard2 from './PostCard/PostCard2'
import { PageIntro } from '@/types/global'

interface BlogProps {
  postsSection: { sectionIntro: PageIntro } & { posts: Post[] }
  designType: Number
}

const renderContent = (posts: Post[], designType?: Number) => {
  switch (designType) {
    case 1:
      return (
        <Container className="mt-16">
          <FadeIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {posts.map((post: Post) => (
                <PostCard1 key={post.id} post={post} />
              ))}
            </div>
          </FadeIn>
        </Container>
      )

    default:
      return (
        <Container className="mt-16">
          <FadeIn>
            {posts.map((post: Post) => (
              <PostCard2 key={post.id} post={post} />
            ))}
          </FadeIn>
        </Container>
      )
  }
}

const PostsSection: React.FC<BlogProps> = async ({
  postsSection,
  designType,
}) => {
  let posts: Post[] | null = null

  try {
    posts = await fetchPosts()
  } catch (error) {
    console.error('Failed to load posts:', error)
  }

  return (
    <>
      <SectionIntro {...postsSection.sectionIntro} />
      {renderContent(
        postsSection.posts.length > 0 ? postsSection.posts : posts || [],
        designType,
      )}
    </>
  )
}

export default PostsSection
