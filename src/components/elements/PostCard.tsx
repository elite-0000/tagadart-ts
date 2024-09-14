import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from './Button'
import { Border } from '../ui/Border'
import { formatDate } from '@/lib/formatDate'
import ReactMarkdown from 'react-markdown'
import { PageIntro } from '@/types/global'
import { Post } from '@/types/post'
import NextCloudinaryImage from '../images/ImageNextCloudinary'
import BasicMarkdown from '../ui/BasicMarkdown'

interface PostCardProps {
  post: Post
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { pageIntro, content, id } = post

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
        {/* <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" /> */}
      </div>
      <div>
        <div className="flex items-center gap-x-4 text-xs">
          {/* <time dateTime={post.datetime} className="text-gray-500">
            {post.date}
          </time> */}
          <time className="text-gray-500">16 Janvier 2024</time>
          {/* <a
            href={post.category.href}
            className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
          >
            {post.category.title}
          </a> */}
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <Link href={`/projects/${post.id}`}>
              <span className="absolute inset-0" />
              {post.pageIntro.title}
            </Link>
          </h3>

          <div className="typography">
            <BasicMarkdown content={post.pageIntro.content} />
          </div>
        </div>
        {/* <div className="mt-6 flex border-t border-gray-900/5 pt-6">
          <div className="relative flex items-center gap-x-4">
            <img
              alt=""
              src={post.author.imageUrl}
              className="h-10 w-10 rounded-full bg-gray-50"
            />
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <a href={post.author.href}>
                  <span className="absolute inset-0" />
                  {post.author.name}
                </a>
              </p>
              <p className="text-gray-600">{post.author.role}</p>
            </div>
          </div>
        </div> */}
      </div>
    </article>
    // <article>
    //   <Border className="pt-16">
    //     <div className="relative lg:-mx-4 lg:flex lg:justify-end">
    //       <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
    //         <h2 className="font-display text-2xl font-semibold text-neutral-950">
    //           <Link href={`/blog/${id}`}>{pageIntro?.title}</Link>
    //         </h2>
    //         <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
    //           <dt className="sr-only">Published</dt>
    //           <dd className="absolute left-0 top-0 text-sm text-neutral-950 lg:static">
    //             {/* <time dateTime={date}>{formatDate(date)}</time> */}
    //           </dd>
    //           <dt className="sr-only">Author</dt>
    //           <dd className="mt-6 flex gap-x-4">
    //             <div className="rounded-xl">
    //               {post.pageIntro.cover && (
    //                 <div className="mt-6">
    //                   <NextCloudinaryImage
    //                     src={post.pageIntro.cover.url}
    //                     alt={post.pageIntro.cover.alt}
    //                     width={600}
    //                     height={500}
    //                     className="rounded-md"
    //                     crop="fill"
    //                   />
    //                 </div>
    //               )}
    //               {/* <Image
    //                 src={author.image.src}
    //                 alt={author.image.alt || ''}
    //                 width={48}
    //                 height={48}
    //                 className="h-12 w-12 object-cover grayscale"
    //               /> */}
    //             </div>
    //             {/* <div className="text-sm text-neutral-950">
    //               <div className="font-semibold">{author.name}</div>
    //               <div>{author.role}</div>
    //             </div> */}
    //           </dd>
    //         </dl>
    //         <div className="mt-6 max-w-2xl text-base text-neutral-600">
    //           <ReactMarkdown>{pageIntro.content}</ReactMarkdown>
    //         </div>
    //         {/* <Button
    //           href={href}
    //           aria-label={`Read more: ${title}`}
    //           className="mt-8"
    //         >
    //           Read more
    //         </Button> */}
    //       </div>
    //     </div>
    //   </Border>
    // </article>
  )
}

export default PostCard
