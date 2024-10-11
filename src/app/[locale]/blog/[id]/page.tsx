import type { Metadata } from 'next'
import { Border } from '@/components/ui/Border'
import { FadeIn } from '@/components/ui/FadeIn'
import { Post } from '@/types/post'
import { fetchPost } from '@/request/fetch'
import { MessageMarkdown } from '@/components/ui/message-markdown'
import BasicMarkdown from '@/components/ui/BasicMarkdown'

type Props = {
  params: {
    id: string
  }
}

export const metadata: Metadata = {
  title: 'Blog',
}

export default async function ViewPost({ params: { id } }: Props) {
  const post: Post = await fetchPost(id)
  metadata.title = `Blog - ${post?.pageIntro.title}`

  if (!post) return null
  return (
    <article>
      <Border className="pt-16">
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <header className="mx-auto flex max-w-5xl flex-col text-center">
              <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
                {post?.pageIntro.title}
              </h1>
              <time
                dateTime={post?.pageIntro.eyebrow}
                className="order-first text-sm text-neutral-950"
              >
                {post?.pageIntro.eyebrow}
              </time>
              <p className="mt-6 text-sm font-semibold text-neutral-950">
                by {post?.author.fullname}, {post?.author.role}
              </p>
            </header>
          </FadeIn>
          <FadeIn key={id} style={{ opacity: 1, transform: 'none' }}>
            <div className="main_content mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
              <div className="markdown-content">
                {/* {post?.content && <MessageMarkdown content={post.content} />} */}
                {post?.content && <BasicMarkdown>{post.content}</BasicMarkdown>}
              </div>
            </div>
          </FadeIn>
        </div>
      </Border>
    </article>
  )
}
