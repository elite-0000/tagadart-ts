import React from 'react'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { ButtonProps, MediaItem, PageIntro } from '@/types/global'
import NextCloudinaryImage from '@/components/images/ImageNextCloudinary'
import Link from 'next/link'
import { ChevronRightIcon } from 'lucide-react'
import { Section } from '@/components/ui/Section'

interface HeroProps {
  designType?: Number
  heroSection: {
    sectionIntro: PageIntro
    logo?: MediaItem
    buttons?: ButtonProps[]
    badge_text?: string
    version_text?: string
    embedVideo?: string
  }
}

const RenderContent: React.FC<HeroProps> = ({
  heroSection,

  designType,
}) => {
  const embedVideo = heroSection.embedVideo;
  console.log("embedVideo: " + embedVideo);
  switch (designType) {
    case 1: 
      return (
        <div className="bg-white">
          <div className="relative isolate px-6 pt-14 lg:px-8">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
              />
            </div>
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
              <div className="text-center">
                <h2 className="text-base font-semibold leading-7 text-primary-600">
                      {heroSection?.sectionIntro.eyebrow}
                </h2>
                <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                  {heroSection?.sectionIntro.title}
                </p>
                <div className="mt-6 text-lg leading-8 text-gray-600">
                  <BasicMarkdown>
                    {heroSection?.sectionIntro.content}
                  </BasicMarkdown>
                </div>
              </div>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                {heroSection?.buttons && heroSection.buttons.length > 0 && (
                  <div className="mt-10 flex items-center gap-x-6">
                    {heroSection.buttons.map((button) => (
                      <Link
                        key={button.id}
                        href={button.link}
                        className={`${
                          button.type === 'primary'
                            ? 'rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                            : 'text-sm font-semibold leading-6 text-gray-900'
                        }`}
                      >
                        {button.text}
                        {button.type === 'secondary' && (
                          <span aria-hidden="true">→</span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                {heroSection?.sectionIntro?.cover && (
                  <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                      <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        {(() => {
                          const fileType = heroSection.sectionIntro.cover?.provider_metadata?.resource_type;
                          const url = heroSection.sectionIntro.cover.url;

                          if (fileType === 'image') {
                            return (
                              <Image
                                src={url}
                                alt={heroSection.sectionIntro.cover.alternativeText || 'Cover Image'}
                                width={heroSection.sectionIntro.cover.width}
                                height={heroSection.sectionIntro.cover.height}
                                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                              />
                            );
                          } else if (embedVideo !== undefined && embedVideo) {
                              let embedUrl;
                              if (embedVideo.includes('youtube.com/embed')) {
                                embedUrl = embedVideo;
                              }
                              else if (embedVideo.includes('youtube.com') || embedVideo.includes('youtu.be')) {
                                const videoId = embedVideo.includes('youtube.com')
                                  ? new URL(embedVideo).searchParams.get('v')
                                  : embedVideo.split('/').pop();
                                embedUrl = `https://www.youtube.com/embed/${videoId}`;
                              }

                              return (
                                <iframe
                                  width="700"
                                  height="600"
                                  src={embedUrl}
                                  title={heroSection.sectionIntro.cover.alternativeText || 'YouTube Video'}
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="w-full rounded-md shadow-2xl ring-1 ring-gray-900/10"
                                ></iframe>
                              );
                          } else if (fileType === 'video') {
                              return (
                                <video width="700" height="600" controls preload="none" >
                                  <source src={url} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            >
              <div
                style={{
                  clipPath:
                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                }}
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              />
            </div>
          </div>
        </div>
      )
    default:
      return (
        <div className="relative isolate overflow-hidden bg-white">
          <svg
            aria-hidden="true"
            className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
          >
            <defs>
              <pattern
                x="50%"
                y={-1}
                id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
                width={200}
                height={200}
                patternUnits="userSpaceOnUse"
              >
                <path d="M.5 200V.5H200" fill="none" />
              </pattern>
            </defs>
            <rect
              fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
              width="100%"
              height="100%"
              strokeWidth={0}
            />
          </svg>
          <Container>
            <FadeIn>
              <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-shrink-0 lg:pt-8">
                  {heroSection?.logo && (
                    <NextCloudinaryImage
                      src={heroSection.logo.url}
                      alt={heroSection.logo.alternativeText}
                      width={124}
                      height={48}
                      className="my-8"
                    />
                  )}
                  {(heroSection.badge_text || heroSection.version_text) && (
                    <div className="mt-24 sm:mt-32 lg:mt-16">
                      <div className="inline-flex space-x-6">
                        {heroSection.badge_text && (
                          <span className="rounded-full bg-primary-600/10 px-3 py-1 text-sm font-semibold leading-6 text-primary-600 ring-1 ring-inset ring-primary-600/10">
                            {heroSection.badge_text}
                          </span>
                        )}
                        {heroSection.version_text && (
                          <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                            <span>{heroSection.version_text}</span>
                            <ChevronRightIcon
                              className="h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  <div className="mx-auto max-w-2xl lg:text-left">
                    <h2 className="text-base font-semibold leading-7 text-primary-600">
                      {heroSection?.sectionIntro.eyebrow}
                    </h2>
                    <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                      {heroSection?.sectionIntro.title}
                    </p>
                    <div className="mt-6 text-lg leading-8 text-gray-600">
                      <BasicMarkdown>
                        {heroSection?.sectionIntro.content}
                      </BasicMarkdown>
                    </div>
                  </div>
                  {heroSection?.buttons && heroSection.buttons.length > 0 && (
                    <div className="mt-10 flex items-center gap-x-6">
                      {heroSection.buttons.map((button) => (
                        <Link
                          key={button.id}
                          href={button.link}
                          className={`${
                            button.type === 'primary'
                              ? 'rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600'
                              : 'text-sm font-semibold leading-6 text-gray-900'
                          }`}
                        >
                          {button.text}
                          {button.type === 'secondary' && (
                            <span aria-hidden="true">→</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                {heroSection?.sectionIntro?.cover && (
                  <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                    <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                      <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        {(() => {
                          const fileType = heroSection.sectionIntro.cover?.provider_metadata?.resource_type;
                          const url = heroSection.sectionIntro.cover.url;

                          if (fileType === 'image') {
                            return (
                              <Image
                                src={url}
                                alt={heroSection.sectionIntro.cover.alternativeText || 'Cover Image'}
                                width={heroSection.sectionIntro.cover.width}
                                height={heroSection.sectionIntro.cover.height}
                                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
                              />
                            );
                          } else if (embedVideo !== undefined && embedVideo) {
                            let embedUrl;
                            if (embedVideo.includes('youtube.com/embed')) {
                              embedUrl = embedVideo;
                            }
                            else if (embedVideo.includes('youtube.com') || embedVideo.includes('youtu.be')) {
                              const videoId = embedVideo.includes('youtube.com')
                                ? new URL(embedVideo).searchParams.get('v')
                                : embedVideo.split('/').pop();
                              embedUrl = `https://www.youtube.com/embed/${videoId}`;
                            }

                            return (
                              <iframe
                                width="700"
                                height="600"
                                src={embedUrl}
                                title={heroSection.sectionIntro.cover.alternativeText || 'YouTube Video'}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full rounded-md shadow-2xl ring-1 ring-gray-900/10"
                              ></iframe>
                            );
                          } else if (fileType === 'video') {
                              return (
                                <video width="700" height="600" controls preload="none" >
                                  <source src={url} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
                              );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </FadeIn>
          </Container>
        </div>
      )
  }
}

const HeroSection: React.FC<HeroProps> = ({ heroSection, designType }) => {
  return (
    <Section>
      <RenderContent heroSection={heroSection} designType={designType} />
    </Section>
  )
}

export default HeroSection
