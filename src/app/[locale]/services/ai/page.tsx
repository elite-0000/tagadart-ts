import { type Metadata } from 'next'

import { ContactSection } from '@/components/sections/ContactSection'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { GridList, GridListItem } from '@/components/ui/GridList'
import { GridPattern } from '@/components/ui/GridPattern'
import { List, ListItem } from '@/components/ui/List'
import { PageIntro } from '@/components/sections/PageIntro'
import { SectionIntro } from '@/components/sections/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'
import FeatureDetail from '@/components/FeatureDetail'

function Section({
  title,
  image,
  children,
}: {
  title: string
  image: React.ComponentPropsWithoutRef<typeof StylizedImage>
  children: React.ReactNode
}) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'Our Services',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
}

export default function Services() {
  return (
    <>
      {/* <PageIntro
        eyebrow="Nos services"
        title="Des sites durables pour un avenir responsable !"
      >
        <p>
          L’importance de concevoir et de gérer des plateformes en ligne qui
          respectent les principes de durabilité et de responsabilité
          environnementale
        </p>
      </PageIntro> */}

      <FeatureDetail />

      <ContactSection />
    </>
  )
}
