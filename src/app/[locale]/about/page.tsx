import { fetchAxiosAPI } from '@/request/request'
import { type Metadata } from 'next'

import { ContactSection } from '@/components/sections/ContactSection'
import { PageIntroSections } from '@/components/sections/PageIntro'

import TeamSection from '@/components/sections/TeamSection'
import { RestQueryParams } from '@/types/global'
import CultureSection from '@/components/sections/Culture'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

export default async function About() {
  let aboutData = null

  const populateAbout = [
    'pageIntro',
    'cultureSection',
    'cultureSection.values',
    'teamSection',
    'teamSection.members',
    'teamSection.members.avatar',
  ]

  const aboutQueryParams: RestQueryParams = {
    populate: populateAbout,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    aboutData = await fetchAxiosAPI('about-us-page', aboutQueryParams)
  } catch (error) {
    // Handle the error appropriately here
    console.error('Failed to load about data:', error)
    return <div>Failed to load data</div>
  }

  const { pageIntro, cultureSection, teamSection } = aboutData?.data || {}

  return (
    <>
      {pageIntro && <PageIntroSections {...pageIntro}></PageIntroSections>}

      <div className="container mx-auto px-4">
        <CultureSection cultureSection={cultureSection} />
      </div>

      <TeamSection teamSection={teamSection} />
      <ContactSection />
    </>
  )
}
