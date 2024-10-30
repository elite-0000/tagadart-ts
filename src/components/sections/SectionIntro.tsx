import clsx from 'clsx'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '../ui/BasicMarkdown'
import { PageIntro } from '@/types/global'

export function SectionIntro({
  title,
  eyebrow,
  content,
  smaller = false,
  invert = false,
  centered = false,
  noMarginTop = false,
  ...props
}: PageIntro & {
  centered?: boolean
  showCover?: boolean
  noMarginTop?: boolean
  smaller?: boolean
  invert?: boolean
}) {
  return (
    <div
      {...props}
      className={clsx(
        !noMarginTop && 'mt-24 sm:mt-32',
        centered && 'text-center',
        'my-16',
      )}
    >
      <FadeIn>
        <h2>
          {eyebrow && (
            <>
              <span
                className={clsx(
                  'mb-6 block font-display text-base font-semibold',
                  invert ? 'text-primary-50' : 'text-neutral-950',
                )}
              >
                {eyebrow}
              </span>
              <span className="sr-only"> - </span>
            </>
          )}
          <span
            className={clsx(
              'block font-display tracking-tight [text-wrap:balance]',
              smaller
                ? 'text-2xl font-semibold'
                : 'text-4xl font-medium sm:text-5xl',
              invert ? 'text-primary-50' : 'text-neutral-950',
            )}
          >
            {title}
          </span>
        </h2>
        {content && (
          <div
            className={clsx(
              'mt-6 max-w-3xl text-xl',
              invert ? 'text-primary-200' : 'text-neutral-600',
              centered && 'mx-auto',
            )}
          >
            <BasicMarkdown>{content}</BasicMarkdown>
          </div>
        )}
      </FadeIn>
    </div>
  )
}
