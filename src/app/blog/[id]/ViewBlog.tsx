'use client'
import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { formatDate } from '@/lib/formatDate'

import useSWR from 'swr'

import { fetchAxiosAPI } from '@/request/request'
import { BaseData } from '@/types/global'

type Props = {
  params: any
}

export const ViewBlog = ({ params: { id } }: Props) => {
    const fetcher = (url: string) => {
        console.log('Fetching API URL:', url) // Log the URL here
        return fetchAxiosAPI(url)
    }

    const { data: blogData } = useSWR<BaseData>(
    `/posts/${id}`,
    fetcher,
    )
    console.log("blogdata: ", blogData?.data);
  if (!blogData || !blogData.data) return null // Added check for blogData.data
  const blog = blogData.data

  return (
    <div className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <header className="mx-auto flex max-w-5xl flex-col text-center">
          <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
            {blog.pageIntro.title}
          </h1>
          <time
            dateTime={blog.pageIntro.eyebrow}
            className="order-first text-sm text-neutral-950"
          >
            {blog.pageIntro.eyebrow}
          </time>
          <p className="mt-6 text-sm font-semibold text-neutral-950">
            by {blog.author.fullname}, {blog.author.role}
          </p>
        </header>
      </FadeIn>
    </div>
  )
}
