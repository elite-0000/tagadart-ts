import React from 'react'
import Link from 'next/link'

import { Post } from '@/types/post'
import NextCloudinaryImage from '../images/ImageNextCloudinary'
import BasicMarkdown from '../ui/BasicMarkdown'
import { formatDate, truncateWithEllipses } from '@/lib/helper'

interface PostCardProps {
  post: Post
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article
      key={post.id}
      className="relative isolate mb-24 flex flex-col gap-8 lg:flex-row"
    >
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0">
        <NextCloudinaryImage
          src={post.pageIntro.cover.url}
          alt={post.pageIntro.cover.alt}
          width={1000}
          height={1000}
          // crop={'fill'}
          className="absolute inset-0 rounded-2xl object-cover"
        />
      </div>
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          <time className="text-gray-500">
            {formatDate(post.publishedAt, 'fr')}
          </time>
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={`/projects/${post.id}`}>
              <span className="absolute inset-0" />
              {post.pageIntro.title}
            </Link>
          </h3>

          <div className="typography">
            <BasicMarkdown>
              {truncateWithEllipses(post.pageIntro.content, 150)}
            </BasicMarkdown>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard
