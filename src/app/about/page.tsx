import { type Metadata } from 'next'
import Image from 'next/image'
import { fetchAxiosAPI } from '@/request/request'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/sections/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/sections/PageIntro'

import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import imageAngelaFisher from '@/images/team/angela-fisher.jpg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpg'
import imageBlakeReid from '@/images/team/blake-reid.jpg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageDriesVincent from '@/images/team/dries-vincent.jpg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'
import imageJeffreyWebb from '@/images/team/jeffrey-webb.jpg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpg'
import imageLeonardKrasner from '@/images/team/leonard-krasner.jpg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageMichaelFoster from '@/images/team/michael-foster.jpg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpg'
import { loadArticles } from '@/lib/mdx'
import { RestQueryParams } from '@/types/global'
import Culture from '@/components/Culture'
import Team from '@/components/Team'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

export default async function About() {
  const populateAbout = [
    'pageIntro',
    'cultureSection',
    'cultureSection.values',
    'teamSection',
    'teamSection.members',
  ]

  const defaultQueryParams: RestQueryParams = {
    populate: populateAbout,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }
  
  let aboutData;
  try {
    aboutData = await fetchAxiosAPI('about-us-page', defaultQueryParams)
  } catch (error) {
    // Handle the error appropriately here
    console.error('Failed to load about data:', error)
    return <div>Failed to load data</div>
  }
  const { pageIntro, cultureSection, teamSection } = aboutData?.data

  return (
    <>
      <PageIntro {...pageIntro}>
        <p>{pageIntro.content}</p>
      </PageIntro>

      <Culture culturecard={cultureSection} />

      <Team teamCard={teamSection} />
      {/* <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        // intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
        pages={blogArticles}
      /> */}

      <ContactSection />
    </>
  )
}
