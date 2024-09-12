import { fetchAxiosAPI } from '@/request/request'
import { type Metadata } from 'next'

import { ContactSection } from '@/components/sections/ContactSection'
import { PageIntro } from '@/components/sections/PageIntro'

import CultureSection from '@/components/sections/Culture'
import TeamSection from '@/components/sections/TeamSection'
import { RestQueryParams } from '@/types/global'

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
    'teamSection.members.avatar',
  ]
  const populateBlog = [
    'pageIntro',
    'blogSection',
    'blogSection.posts',
    'blogSection.posts.pageIntro',
    'blogSection.posts.eyebrow',
    'blogSection.posts.content',
    'blogSection.posts.author',
  ]

  const aboutQueryParams: RestQueryParams = {
    populate: populateAbout,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  const blogQueryParams: RestQueryParams = {
    populate: populateBlog,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  let aboutData, blogData
  try {
    aboutData = await fetchAxiosAPI('about-us-page', aboutQueryParams)
  } catch (error) {
    // Handle the error appropriately here
    console.error('Failed to load about data:', error)
    return <div>Failed to load data</div>
  }

  try {
    blogData = await fetchAxiosAPI('blog-page', blogQueryParams)
  } catch (error) {
    // Handle the error appropriately here
    console.error('Failed to load blog data:', error)
    return <div>Failed to load data</div>
  }

  const { pageIntro, cultureSection, teamSection } = aboutData?.data || {}
  const { blogSection } = blogData?.data
  const { posts } = blogSection
  return (
    <>
      {pageIntro && (
        <PageIntro {...pageIntro}>
          <p>{pageIntro.content}</p>
        </PageIntro>
      )}

      <CultureSection culturecard={cultureSection} />

      <TeamSection teamCard={teamSection} />
      {/* <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        // intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
        pages={posts}
      /> */}

      <ContactSection />
    </>
  )
}
