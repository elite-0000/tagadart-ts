import React from 'react'
import { Container } from '@/components/Container'
import { GridList, GridListItem } from '@/components/GridList'
import { SectionIntro } from '@/components/SectionIntro'

interface CultureProps {
  title: string
  eyebrow: string
  content: string
  values: {
    title: string
    content: string
  }[]
}

interface CultureCardProps {
  culturecard: CultureProps
}

const Culture: React.FC<CultureCardProps> = ({ culturecard }) => {
  return (
    <div className="mt-24 rounded-4xl bg-primary-800 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow={culturecard.eyebrow}
        title={culturecard.title}
        invert
      >
        <p>{culturecard.content}</p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          {culturecard.values.map((item, index) => (
            <GridListItem key={index} title={item.title} invert>
              {item.content}
            </GridListItem>
          ))}
        </GridList>
      </Container>
    </div>
  )
}

export default Culture
