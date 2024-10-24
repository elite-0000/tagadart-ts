import React from 'react'

import { Post } from '@/types/post'
import { SectionIntro } from '../../SectionIntro'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { fetchPosts } from '@/request/fetch'
import PostCard1 from '../Posts/PostCard/PostCard1'
import PostCard2 from '../Posts/PostCard/PostCard2'
import { PageIntro } from '@/types/global'
import FeaturesSection1 from './FeaturesSection/FeaturesSection1'
import { CloudFog } from 'lucide-react'

interface BlogProps {
  featuresSection: any
  // featuresSection: { sectionIntro: PageIntro } & { posts: Post[] }
  designType: Number
}

const renderContent = ({
  posts,
  featuresSection,
  designType,
}: {
  posts?: Post[]
  featuresSection: any
  designType: Number
}) => {
  switch (designType) {
    // case 1:
    //   return (
    //     <Container className="mt-16">
    //       <FadeIn>
    //         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    //           {posts.map((post: Post) => (
    //             <PostCard1 key={post.id} post={post} />
    //           ))}
    //         </div>
    //       </FadeIn>
    //     </Container>
    //   )

    default:
      return <FeaturesSection1 {...featuresSection} />
  }
}

const FeaturesSection: React.FC<BlogProps> = async ({
  featuresSection,
  designType,
}) => {
  let posts: Post[] | null = null

  try {
    posts = await fetchPosts()
  } catch (error) {
    console.error('Failed to load posts:', error)
  }

  console.log(featuresSection, 'featuresSection')

  return (
    <>
      {/* <SectionIntro {...featuresSection.sectionIntro} /> */}
      {renderContent({
        // posts:
        //   featuresSection.posts.length > 0
        //     ? featuresSection.posts
        //     : posts || [],
        featuresSection,
        designType,
      })}
    </>
  )
}

export default FeaturesSection
