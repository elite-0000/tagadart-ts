import { ContactSection } from '@/components/sections/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { MDXComponents } from '@/components/MDXComponents'
import { PageLinks } from '@/components/PageLinks'
import { formatDate } from '@/lib/formatDate'
import Fetcher from '@/components/Fetcher'
import { type Article, type MDXEntry, loadArticles } from '@/lib/mdx'
import useSWR from 'swr'
import { fetchAxiosAPI } from '@/request/request'
import { BaseData } from '@/types/global'
import { RestQueryParams } from '@/types/global'

export default async function BlogArticleWrapper({
  article,
  children,
}: {
  article: MDXEntry<Article>
  children: React.ReactNode
}) {
  const populateBlog = [
    'pageIntro',
    'blogSection',
    'blogSection.posts',
    'blogSection.posts.pageIntro',
    'blogSection.posts.eyebrow',
    'blogSection.posts.content',
    'blogSection.posts.author',
  ]
  const defaultQueryParams: RestQueryParams = {
    populate: populateBlog,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  let blogData;
  try {
    blogData = await fetchAxiosAPI('blog-page', defaultQueryParams)
  } catch (error) {
    // Handle the error appropriately here
    console.error('Failed to load blog data:', error)
    return <div>Failed to load data</div>
  }
  // let moreArticles = blogData
  //   .filter(({ metadata }) => metadata !== article)
  //   .slice(0, 2)
  // let allArticles = await loadArticles()
  // let moreArticles = allArticles
  //   .filter(({ metadata }) => {
  //     // console.log("metaData: ", metadata);
  //     return metadata.id !== article.id
  //   })
  //   .slice(0, 2)

  return (
    <>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <header className="mx-auto flex max-w-5xl flex-col text-center">
            <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-6xl">
              {article.title}
            </h1>
            <time
              dateTime={article.date}
              className="order-first text-sm text-neutral-950"
            >
              {formatDate(article.date)}
            </time>
            <p className="mt-6 text-sm font-semibold text-neutral-950">
              by {article.author.name}, {article.author.role}
            </p>
          </header>
        </FadeIn>

        <FadeIn>
          <MDXComponents.wrapper className="mt-24 sm:mt-32 lg:mt-40">
            {children}
          </MDXComponents.wrapper>
        </FadeIn>
      </Container>

      {/* {moreArticles.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More articles"
          pages={moreArticles}
        />
      )} */}

      <ContactSection />
    </>
  )
}
