import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/sections/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoBrightPath from '@/images/clients/bright-path/logo-light.svg'
import logoFamilyFund from '@/images/clients/family-fund/logo-light.svg'
import logoGreenLife from '@/images/clients/green-life/logo-light.svg'
import logoHomeWork from '@/images/clients/home-work/logo-light.svg'
import logoMailSmirk from '@/images/clients/mail-smirk/logo-light.svg'
import logoNorthAdventures from '@/images/clients/north-adventures/logo-light.svg'
import logoPhobiaDark from '@/images/clients/phobia/logo-dark.svg'
import logoPhobiaLight from '@/images/clients/phobia/logo-light.svg'
import logoUnseal from '@/images/clients/unseal/logo-light.svg'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'
import Features from '@/components/Features'

import Posts from '@/components/Posts'
import { fetchAxiosAPI } from '@/request/request'
import { PageIntro } from '@/components/sections/PageIntro'
import { RestQueryParams } from '@/types/global'
import ProjectsSection from '@/components/sections/ProjectsSection'
import BlogSection from '@/components/sections/BlogSection'
import ServicesSection from '@/components/sections/ServicesSection'

export const metadata: Metadata = {
  description:
    'Agence de développement web et mobile en Suisse. Nous créons des applications web et mobiles sur mesure pour les entreprises et les startups.',
}

export default async function Home() {
  const populateHome = [
    'cover',
    'pageIntro',
    'referencesSection',
    'servicesSection',
    'servicesSection.our_services',
    'servicesSection.our_services.pageIntro',
    'blogSection',
    'blogSection.posts',
    'blogSection.posts.pageIntro',
    'blogSection.posts.author',
    'projectsSection',
    'projectsSection.projects',
    'projectsSection.projects.pageIntro',
  ]

  const defaultQueryParams: RestQueryParams = {
    populate: populateHome,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  let homeData
  try {
    homeData = await fetchAxiosAPI('home', defaultQueryParams)
  } catch (error) {
    // Handle the error appropriately here
    console.error('Failed to load home data:', error)
    return <div>Failed to load data</div>
  }
  const {
    pageIntro,
    referencesSection,
    projectsSection,
    servicesSection,
    blogSection,
  } = homeData.data

  console.log(pageIntro, 'pageIntro')

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <PageIntro {...pageIntro} />
        </FadeIn>
      </Container>

      <ProjectsSection projectsSection={projectsSection} />
      <ServicesSection servicesSection={servicesSection} />
      {/* <referencesSection /> //TODO : later add client/reference section */}
      <BlogSection blogSection={blogSection} />
      <ContactSection />
    </>
  )
}
