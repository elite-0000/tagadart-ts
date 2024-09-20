import React from 'react'
import { Container } from '@/components/ui/Container'
import { GridList, GridListItem } from '@/components/ui/GridList'
import { SectionIntro } from '@/components/sections/SectionIntro'
import CultureCard from '../elements/CultureCard'
import { Culture, PageIntro } from '@/types/global'

interface CultureCardProps {
  cultureSection: PageIntro & { values: Culture[] }
}

const CultureSection: React.FC<CultureCardProps> = ({ cultureSection }) => {
  console.log(cultureSection, 'cultureSection')
  return (
    <div className="mt-24 rounded-4xl bg-primary-800 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro {...cultureSection} invert noMarginTop />
      <Container className="mt-16">
        <GridList>
          {cultureSection?.values?.map((item) => (
            <CultureCard key={item.id} culture={item} />
          ))}
        </GridList>
      </Container>
    </div>
  )
}

export default CultureSection
