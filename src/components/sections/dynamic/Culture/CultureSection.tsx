import React from 'react'

import { Culture } from '@/types/global'
import { PageIntro } from '@/types/global'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import CultureCard1 from './CultureCard/CultureCard1'
import { GridList } from '@/components/ui/GridList'
import { Section } from '@/components/ui/Section'

interface CulturesProps {
  culturesSection: { sectionIntro: PageIntro } & { values: Culture[] }
  designType: Number
}

interface RenderContentProps {
  cultures: Culture[]
  sectionIntro: PageIntro
  designType?: Number
}

const RenderContent: React.FC<RenderContentProps> = ({
  cultures,
  sectionIntro,
  designType,
}) => {
  switch (designType) {
    case 1:
      return (
        <Container>
          <SectionIntro {...sectionIntro} />
          <GridList>
            {cultures.map((culture: Culture) => (
              <CultureCard1 key={culture.id} culture={culture} />
            ))}
          </GridList>
        </Container>
      )

    default:
      return (
        <Container>
          <SectionIntro {...sectionIntro} />
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
  return (
    <Section className="rounded-4xl bg-primary-800">
      <RenderContent
        cultures={
          culturesSection.values.length > 0 ? culturesSection.values : []
        }
        sectionIntro={culturesSection.sectionIntro}
        designType={designType}
      />
    </Section>
  )
}

export default CultureSection
