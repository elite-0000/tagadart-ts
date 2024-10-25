import React from 'react'
import { PageIntro } from '@/types/global'
import BasicMarkdown from '@/components/ui/BasicMarkdown'
import Icon from '@/components/images/Icon'
import { Feature } from '@/types/feature'

interface FeaturesProps {
  featuresSection: { sectionIntro: PageIntro } & { features: Feature[] }
  designType: Number
}

interface RenderContentProps {
  features: Feature[]
  sectionIntro: PageIntro
  designType?: Number
}

const RenderContent: React.FC<RenderContentProps> = ({
  features,
  sectionIntro,
  designType,
}) => {
  switch (designType) {
    default:
      return (
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* <SectionIntro {...sectionIntro} /> */}
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-primary-600">
                {sectionIntro?.eyebrow}
              </h2>
              <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
                {sectionIntro?.title}
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                <BasicMarkdown>{sectionIntro?.content}</BasicMarkdown>
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl"></div>
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map((feature) => {
                return (
                  <div key={feature.name} className="relative pl-16">
                    <dt className="text-base font-semibold leading-7 text-gray-900">
                      <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-600">
                        <Icon
                          className="h-6 w-6 text-white"
                          name={feature.classIcon}
                        />
                      </div>
                      {feature.name}
                    </dt>
                    <dd className="mt-2 text-base leading-7 text-gray-600">
                      <BasicMarkdown>{feature.content}</BasicMarkdown>
                    </dd>
                  </div>
                )
              })}
            </dl>
          </div>
        </div>
      )
  }
}

const FeaturesSection: React.FC<FeaturesProps> = async ({
  featuresSection,
  designType,
}) => {
  console.log(featuresSection, 'featuresSection')

  return (
    <>
      <RenderContent
        features={
          (featuresSection?.features?.length > 0 && featuresSection.features) ||
          []
        }
        sectionIntro={featuresSection.sectionIntro}
        designType={designType}
      />
    </>
  )
}

export default FeaturesSection
