import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
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
import { PageIntro } from '@/components/PageIntro'
import { RestQueryParams } from '@/types/global'
import Projects from '@/components/ProjectsSection'
import BlogSection from '@/components/BlogSection'

const clients = [
  //TODO: Add EPFL, Daille, and other clients
  ['Phobia', logoPhobiaLight],
  ['Family Fund', logoFamilyFund],
  ['Unseal', logoUnseal],
  ['Mail Smirk', logoMailSmirk],
  ['Home Work', logoHomeWork],
  ['Green Life', logoGreenLife],
  ['Bright Path', logoBrightPath],
  ['North Adventures', logoNorthAdventures],
]

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-primary-gradient py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-primary-950 sm:text-left">
            Nous avons déjà collaboré avec des cliens fabuleux
          </h2>
          <div className="h-px flex-auto bg-primary-950" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image src={logo} alt={client} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro title="Nos projets" className="mt-24 sm:mt-32 lg:mt-40">
        <p>
          Des solutions digitales adaptées, consciencieuses et efficaces pour
          vos besoins de demain.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      // className="h-8"
                      // width={160}
                      height={32}
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>Case study</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="Des sites durables pour un avenir responsable !"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          L’importance de concevoir et de gérer des plateformes en ligne qui
          respectent les principes de durabilité et de responsabilité
          environnementale
        </p>
      </SectionIntro>
      <Features />
    </>
  )
}

function Blog() {
  return (
    <>
      <SectionIntro
        eyebrow="Blog"
        title="Nos articles pour se tenir au courant des nouveautés digitales !"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        {/* <p>
          L’importance de concevoir et de gérer des plateformes en ligne qui
          respectent les principes de durabilité et de responsabilité
          environnementale
        </p> */}
      </SectionIntro>
      <Posts />
    </>
  )
}

export const metadata: Metadata = {
  description:
    'We are a development studio working at the intersection of design and technology.',
}

export default async function Home() {
  const populateHome = [
    'cover',
    'referencesSection',
    'servicesSection',
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

  console.log(blogSection, 'blogSection')

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <PageIntro {...pageIntro} />
        </FadeIn>
      </Container>

      <Projects projectsSection={projectsSection} />
      {/* <Clients /> */}
      <BlogSection blogSection={blogSection} />

      <ContactSection />
    </>
  )
}
