import clsx from 'clsx'
import Image from 'next/image' // Assuming you're using Next.js, for optimized image handling
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '../ui/BasicMarkdown'
import { MediaItem, PageIntro } from '@/types/global'
import NextCloudinaryImage from '../images/ImageNextCloudinary'

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
  pagination?: boolean
  centered?: boolean
  showCover?: boolean
  smaller?: boolean
  invert?: boolean
}) {
  const MediaRenderer = ({
    media,
    embedVideo,
  }: {
    media?: MediaItem
    embedVideo?: string
  }) => {
    if (embedVideo) {
      const getYouTubeEmbedUrl = (url: string) => {
        if (url.includes('youtube.com/embed')) return url
        const videoId = url.includes('youtube.com')
          ? new URL(url).searchParams.get('v')
          : url.split('/').pop()
        return `https://www.youtube.com/embed/${videoId}`
      }

      return (
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <iframe
            width="100%"
            height="100%"
            src={getYouTubeEmbedUrl(embedVideo)}
            title="YouTube Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full rounded-lg shadow-lg"
          />
        </div>
      )
    }

    if (!media?.url) return null

    const {
      url,
      width = 1200,
      height = 675,
      alternativeText = '',
      provider_metadata,
    } = media
    const fileType = provider_metadata?.resource_type

    if (fileType === 'video') {
      return (
        <div className="aspect-video w-full overflow-hidden rounded-lg">
          <video
            controls
            preload="none"
            className="h-full w-full rounded-lg shadow-lg"
          >
            <source src={url} type="video/mp4" />
            Your browser does not support video playback.
          </video>
        </div>
      )
    }

    return (
      <NextCloudinaryImage
        src={url}
        alt={alternativeText}
        width={width}
        height={height}
        className="w-full rounded-lg shadow-lg"
        crop="fit"
        gravity="center"
        quality="auto"
        fetchFormat="auto"
        showSkeleton
      />
    )
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
        {(cover || embedVideo) && (
          <div className="mt-8">
            <MediaRenderer media={cover ?? undefined} embedVideo={embedVideo} />
          </div>
        )}
      </FadeIn>
    </div>
  )
}
