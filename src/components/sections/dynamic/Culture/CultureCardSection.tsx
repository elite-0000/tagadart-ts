import React from 'react'

import { Culture } from '@/types/global'
import { PageIntro } from '@/types/global'
import { fetchServices } from '@/request/fetch'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import CultureCard1 from './CultureCard/CultureCard1'

interface CulturesProps {
  culturesSection: { sectionIntro: PageIntro } & { values: Culture[] }
  designType: Number
}

const renderContent = (cultures: Culture[], designType?: Number) => {
  switch (designType) {
    case 1:
      return (
        <Container className="mt-16">
          <FadeIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {cultures.map((culture: Culture) => (
                <CultureCard1 key={culture.id} culture={culture} />
              ))}
            </div>
          </FadeIn>
        </Container>
      )

    default:
      return (
        <Container className="mt-16">
          <FadeIn>
            {cultures.map((culture: Culture) => (
              <CultureCard1 key={culture.id} culture={culture} />
            ))}
          </FadeIn>
        </Container>
      )
  }
}

const CultureSection: React.FC<CulturesProps> = async ({
  culturesSection,
  designType,
}) => {
  // let cultures: Culture[] | null = null
  try {
    // cultures = await fetchCultures()
  } catch (error) {
    console.error('Failed to load services:', error)
  }

  return (
    <>
      <SectionIntro {...culturesSection.sectionIntro} />
      {renderContent(
        culturesSection.values.length > 0
          ? culturesSection.values
          : [],
        designType,
      )}
    </>
  )
}

export default CultureSection
