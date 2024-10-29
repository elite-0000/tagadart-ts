import React from 'react'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import { ButtonProps, PageIntro } from '@/types/global'
import Link from 'next/link'

interface CTAProps {
  designType?: Number
  ctaSection: {
    sectionIntro: PageIntro
    buttons?: ButtonProps[]
  }
}

const RenderContent: React.FC<CTAProps> = ({ ctaSection, designType }) => {
  switch (designType) {
    default:
      return (
        <div className="bg-white">
          <Container>
            <FadeIn>
              <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="text-base font-semibold leading-7 text-primary-600">
                    {ctaSection.sectionIntro.eyebrow}
                  </h2>
                  <p className="mt-2 text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    {ctaSection.sectionIntro.title}
                  </p>
                  <div className="mx-auto mt-6 max-w-xl text-pretty text-lg/8 text-gray-600">
                    <BasicMarkdown>
                      {ctaSection.sectionIntro.content}
                    </BasicMarkdown>
                  </div>
                  {ctaSection.buttons && ctaSection.buttons.length > 0 && (
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      {ctaSection.buttons.map((button) => (
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
              </div>
            </FadeIn>
          </Container>
        </div>
      )
  }
}

const CTASection: React.FC<CTAProps> = ({ ctaSection, designType }) => {
  return <RenderContent ctaSection={ctaSection} designType={designType} />
}

export default CTASection
