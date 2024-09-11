import Link from 'next/link'
import clsx from 'clsx'

import { Border } from '@/components/ui/Border'
import { Container } from '@/components/ui/Container'
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn'
import { GridPattern } from '@/components/ui/GridPattern'
import { SectionIntro } from '@/components/sections/SectionIntro'
import { formatDate } from '@/lib/formatDate'

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 6" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 3 18 .5v2H0v1h18v2L24 3Z"
      />
    </svg>
  )
}

interface Page {
  href: string
  title: string
  content: string
  id: number
  pageIntro: {
    title: string
    content: string
    eyebrow: string
  }
}

function PageLink({ page, href }: { page: Page; href: string }) {
  return (
    <article key={`${page.href}${page.id}`}>
      <Border
        position="left"
        className="relative flex flex-col items-start pl-8"
      >
        <h3 className="mt-6 text-base font-semibold text-neutral-950">
          {page.pageIntro.title}
        </h3>
        <time
          dateTime={page.pageIntro.eyebrow}
          className="order-first text-sm text-neutral-600"
        >
          {/* {formatDate(page.date)} */}
          {page.pageIntro.eyebrow}
        </time>
        <p className="mt-2.5 text-base text-neutral-600">
          {page.pageIntro.content}
        </p>
        <Link
          href={`${href}${page.id}`}
          className="mt-6 flex gap-x-3 text-base font-semibold text-neutral-950 transition hover:text-neutral-700"
          aria-label={`Read more: ${page.pageIntro.title}`}
        >
          Read more
          <ArrowIcon className="w-6 flex-none fill-current" />
          <span className="absolute inset-0" />
        </Link>
      </Border>
    </article>
  )
}

export function PageLinks({
  title,
  pages,
  intro,
  href,
  className,
}: {
  title: string
  href: string
  pages: Array<Page>
  intro?: string
  className?: string
}) {
  return (
    <div className={clsx('relative pt-24 sm:pt-32 lg:pt-40', className)}>
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro title={title} smaller>
        {intro && <p>{intro}</p>}
      </SectionIntro>

      <Container className={intro ? 'mt-24' : 'mt-16'}>
        <FadeInStagger className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          {pages.map((page) => (
            <FadeIn key={`${page.href}${page.id}`}>
              <PageLink page={page} href={href} />
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  )
}
