import clsx from 'clsx'
import Image from 'next/image' // Assuming you're using Next.js, for optimized image handling
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
  pagination = false,
  cover,
  embedVideo,
  ...props
}: PageIntro & {
  embedVideo?: string
  pagination?: boolean
  centered?: boolean
  showCover?: boolean
  smaller?: boolean
  invert?: boolean
}) {
  const renderMedia = () => {
    const fileType = cover?.provider_metadata?.resource_type
    const url = cover?.url

    if (fileType === 'image' && url) {
      return (
        <Image
          src={url}
          alt={cover.alternativeText || 'Cover Image'}
          width={cover.width}
          height={cover.height}
          className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
        />
      )
    } else if (embedVideo) {
      let embedUrl
      if (embedVideo.includes('youtube.com/embed')) {
        embedUrl = embedVideo
      } else if (
        embedVideo.includes('youtube.com') ||
        embedVideo.includes('youtu.be')
      ) {
        const videoId = embedVideo.includes('youtube.com')
          ? new URL(embedVideo).searchParams.get('v')
          : embedVideo.split('/').pop()
        embedUrl = `https://www.youtube.com/embed/${videoId}`
      }
      return (
        <iframe
          width="700"
          height="600"
          src={embedUrl}
          title={cover?.alternativeText || 'YouTube Video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full rounded-md shadow-2xl ring-1 ring-gray-900/10"
        ></iframe>
      )
    } else if (fileType === 'video') {
      return (
        <video width="700" height="600" controls preload="none">
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )
    }
    return null
  }

  return (
    <div
      {...props}
      className={clsx(centered && 'text-center', 'mb-8', 'pt-10')}
    >
      <FadeIn>
        <h2>
          {eyebrow && (
            <>
              <span
                className={clsx(
                  'block font-display text-base font-semibold',
                  invert ? 'text-primary-50' : 'text-primary-400',
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
        {renderMedia()}
      </FadeIn>
    </div>
  )
}
