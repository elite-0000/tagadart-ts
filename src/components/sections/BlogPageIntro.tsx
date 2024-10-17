import clsx from 'clsx'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { PageIntro } from '@/types/global'
import BasicMarkdown from '../ui/BasicMarkdown'
import NextCloudinaryImage from '../images/ImageNextCloudinary'
import { Post } from '@/types/post'
import { formatDate } from '@/lib/helper'

export function BlogPageIntroSections({
  eyebrow,
  title,
  content,
  cover,
  post,
  showCover = true,
}: PageIntro & { showCover?: boolean; post: Post }) {
  return (
    <Container className="mt-24 text-center sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid gap-8">
          <div className="col-span-full">
            <h1>
              <span className="block font-display text-base font-semibold text-neutral-950">
                {formatDate(post.publishedAt, 'fr')}
              </span>
              <span className="sr-only"> - </span>
              <span className="mx-auto block max-w-5xl font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
                {title}
              </span>
            </h1>
            <div className="mx-auto mt-6 max-w-3xl text-xl text-neutral-600">
              <BasicMarkdown>{content}</BasicMarkdown>
            </div>
          </div>
          {showCover && cover && (
            <div className="col-span-full mx-auto">
              <NextCloudinaryImage
                src={cover.url}
                alt={cover.alternativeText}
                width={1200}
                height={600}
                className="rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          )}
          <p className="mt-4 text-sm font-semibold text-neutral-950">
            by {post?.author.fullname}, {post?.author.role}
          </p>
        </div>
      </FadeIn>
    </Container>
  )
}
