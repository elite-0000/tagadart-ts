// app/[locale]/blog/[id]/page.tsx
import type { Metadata } from 'next'
import { Border } from '@/components/ui/Border'
import { FadeIn } from '@/components/ui/FadeIn'
import { Post } from '@/types/post'
import { fetchPost } from '@/request/fetch'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { BlogPageIntroSections } from '@/components/sections/BlogPageIntro'
import { notFound } from 'next/navigation'
import { componentResolver } from '@/lib/componentResolver'

type Props = {
  params: {
    id: string
    locale: string
  }
}

async function getPost(id: string) {
  const post = await fetchPost(id)
  if (!post) return null
  return post
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.id)

  if (!post) {
    return { title: 'Post not found' }
  }

  return {
    title: `${post.pageIntro.title} - Blog - Tagadart`,
    description: post.pageIntro.content,
    openGraph: {
      title: post.pageIntro.title,
      description: post.pageIntro.content,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: post.pageIntro?.cover?.url
        ? [
            {
              url: post.pageIntro.cover.url,
              width: 800,
              height: 600,
              alt: post.pageIntro.title,
            },
          ]
        : [],
    },
  }
}

export default async function ViewPost({ params: { id } }: Props) {
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  const contentSections = post?.structure

  return (
    <article>
      <Border className="pt-16">
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <header className="mx-auto flex max-w-5xl flex-col text-center">
              <BlogPageIntroSections
                post={post}
                showCover={true}
                {...post.pageIntro}
              />
            </header>
          </FadeIn>
          <FadeIn
            className="[&>*]:mx-auto [&>*]:max-w-5xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0"
            key={id}
            style={{ opacity: 1, transform: 'none' }}
          >
            <div>
              {contentSections?.map((section: any) =>
                componentResolver({ section, designType: 1 }),
              )}
            </div>
          </FadeIn>
          {/* <FadeIn className="main_content mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
            <div className="markdown-content">
              {post.content && <BasicMarkdown>{post.content}</BasicMarkdown>}
            </div>
          </FadeIn> */}
        </div>
      </Border>
    </article>
  )
}
