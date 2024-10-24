import React from 'react'

import { PageIntro } from '@/types/global'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import { Button } from '@/components/elements/Button'
import { getTranslations } from 'next-intl/server'
import { PageIntroSections } from '../../PageIntro'

interface PageIntroProps {
  pageIntroSection: PageIntro
  designType: Number
}

const PageIntroSection: React.FC<PageIntroProps> = async ({
  pageIntroSection,
  designType,
}) => {
  try {
    // contacts = await fetchContactPage()
  } catch (error) {
    console.error('Failed to load services:', error)
  }

  return (
    <>
      <PageIntroSections {...pageIntroSection} />
    </>
  )
}

export default PageIntroSection
