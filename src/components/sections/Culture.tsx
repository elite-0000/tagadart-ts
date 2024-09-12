import React from 'react'
import { Container } from '@/components/ui/Container'
import { GridList, GridListItem } from '@/components/ui/GridList'
import { SectionIntro } from '@/components/sections/SectionIntro'
import CultureCard from '../elements/CultureCard'
import { Culture, PageIntro } from '@/types/global'

interface CultureCardProps {
  culture: Culture[]
  cultureSection: PageIntro
}

const CultureSection: React.FC<CultureCardProps> = ({
  culture,
  cultureSection,
}) => {
  return (
    <div className="mt-24 rounded-4xl bg-primary-800 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow={cultureSection.eyebrow}
        title={cultureSection.title}
        invert
      >
        <p>{cultureSection.content}</p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          {culture.map((item) => (
            <CultureCard culture={item} />
          ))}
        </GridList>
      </Container>
    </div>
  )
}

export default CultureSection
