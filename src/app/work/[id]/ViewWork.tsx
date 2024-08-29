'use client'
import React from 'react'
import { FadeIn } from '@/components/FadeIn'
import { formatDate } from '@/lib/formatDate'
import useSWR from 'swr'
import { MDXComponents } from '@/components/MDXComponents'
import { fetchAxiosAPI } from '@/request/request'
import { BaseData } from '@/types/global'
import { MDXRemote } from 'next-mdx-remote'
import ReactMarkdown from 'react-markdown';
import { PageLinks } from '@/components/PageLinks'
import { Border } from '@/components/Border';

type Props = {
  params: any
}

export const ViewWork = ({ params: { id } }: Props) => {
    const fetcher = (url: string) => {
        console.log('Fetching API URL:', url) // Log the URL here
        return fetchAxiosAPI(url)
    }

    const { data: workData } = useSWR<BaseData>(
    `/works/${id}`,
    fetcher,
    )
    const currentId = id;
    const {data: allBlogs} = useSWR<BaseData>(
        `/posts/`,
        fetcher,
    )
    // let moreArticles = allBlogs?.data
    // let moreArticles = Object.values(allBlogs); 
    // .filter(({ id }) => id !== currentId)
    // .slice(0, 2);
  
    // console.log('allblogs: ', allBlogs);

    if (!workData || !workData.data) return null // Added check for blogData.data
    const work = workData.data
    const workContent = work.content; 
    console.log('workContent: ', workContent);

    return (
        <></>
    
  )
}
