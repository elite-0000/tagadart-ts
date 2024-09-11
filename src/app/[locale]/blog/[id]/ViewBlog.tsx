'use client'
import { Border } from '@/components/Border'
import { FadeIn } from '@/components/ui/FadeIn'
import { MessageMarkdown } from '@/components/ui/message-markdown'
import { PageLinks } from '@/components/PageLinks'
import { fetchAxiosAPI } from '@/request/request'
import { useEffect, useState } from 'react'

type Props = {
  params: any
}

export const ViewBlog = ({ params: { id } }: Props) => {
  const [data, setData] = useState<any>()
  const [blogList, setBlogList] = useState<any[]>([])
  const [relatedArticles, setRelatedArticles] = useState<any[]>([])

  useEffect(() => {
    getData(id)
    getBlogList()
  }, [id])

  const getData = async (blogId: any) => {
    const response = await fetchAxiosAPI(`/posts/${blogId}`)
    if (response?.data) {
      setData(response.data)
    }
  }

  const getBlogList = async () => {
    const response = await fetchAxiosAPI(`/posts/`)
    if (response?.data) {
      setBlogList(response.data)
    }
  }

  useEffect(() => {
    if (blogList.length > 0 && data) {
      const moreArticles = blogList
        .filter((item) => item.id !== parseInt(id))
        .slice(0, 2)
      setRelatedArticles(moreArticles)
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
            <div className="main_content mt-24 sm:mt-32 lg:mt-40 [&>*]:mx-auto [&>*]:max-w-3xl [&>:first-child]:!mt-0 [&>:last-child]:!mb-0">
              <div className="typography">
                {data?.content && <MessageMarkdown content={data.content} />}
              </div>
            </div>
          </FadeIn>
          {relatedArticles.length > 0 && (
            <PageLinks
              href="/blog/"
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
