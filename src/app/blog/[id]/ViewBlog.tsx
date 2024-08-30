'use client'
import React, { useState, useEffect } from 'react'
import { FadeIn } from '@/components/FadeIn'
import { formatDate } from '@/lib/formatDate'
import useSWR from 'swr'
import { MDXComponents } from '@/components/MDXComponents'
import { fetchAxiosAPI } from '@/request/request'
import { BaseData } from '@/types/global'
import ReactMarkdown from 'react-markdown';
import { PageLinks } from '@/components/PageLinks'
import { Border } from '@/components/Border';
import { MessageMarkdown } from '@/components/message-markdown';

type Props = {
  params: any
}

export const ViewBlog = ({ params: { id } }: Props) => {

    const [data, setData] = useState<any>();
    const [blogList, setBlogList] = useState<any[]>([]);
    const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

    useEffect(() => {
        getData(id);
        getBlogList();
    }, [id])

    const getData = async (blogId: any) => {
        const response = await fetchAxiosAPI(`/posts/${blogId}`);
        setData(response.data);
    }

    const getBlogList = async () => {
        const response = await fetchAxiosAPI(`/posts/`);
        setBlogList(response.data);
    }

    useEffect(() => {
        if(blogList.length > 0 && data) {
            const moreArticles = blogList.filter(item => item.id!== parseInt(id)).slice(0,2);
            setRelatedArticles(moreArticles);
        }
    }, [data, blogList])

    return (
        <article>
            <Border className="pt-16">
                <div className="mt-24 sm:mt-32 lg:mt-40">
                    <FadeIn>
                        <header className="mx-auto flex max-w-5xl flex-col text-center">
                        <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
                            {data?.pageIntro.title}
                        </h1>
                        <time
                            dateTime={data?.pageIntro.eyebrow}
                            className="order-first text-sm text-neutral-950"
                        >
                            {data?.pageIntro.eyebrow}
                        </time>
                        <p className="mt-6 text-sm font-semibold text-neutral-950">
                            by {data?.author.fullname}, {data?.author.role}
                        </p>
                        </header>
                    </FadeIn>
                    <FadeIn key={id} style={{ opacity: 1, transform: 'none' }}>
                        <div className='[&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0 mt-24 sm:mt-32 lg:mt-40 main_content'>
                            <div className="typography">
                                <MessageMarkdown content={data?.content}/>
                            </div>
                        </div>
                    </FadeIn>
                    {relatedArticles.length > 0 && (
                        <PageLinks
                            href='/blog/'
                            className="mt-24 sm:mt-32 lg:mt-40"
                            title="More articles"
                            pages={relatedArticles}
                        />
                    )}
                </div>
            </Border>
        </article>
    
  )
}
