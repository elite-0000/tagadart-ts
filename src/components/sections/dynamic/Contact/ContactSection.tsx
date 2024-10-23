import React from 'react'

import { Service } from '@/types/service'
import { PageIntro } from '@/types/global'
import { fetchServices } from '@/request/fetch'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import { Button } from '@/components/elements/Button'

interface ContactProps {
  contactSection: { sectionIntro: PageIntro }
  designType: Number
}

const renderContent = (contact: Service[], designType?: Number) => {
  switch (designType) {
    case 1:
      return (
        <Container className="mt-16">
          <FadeIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {/* {services.map((service: Service) => (
                <ServiceCard1 key={service.id} contact={contact} />
              ))} */}
            </div>
          </FadeIn>
        </Container>
      )

    default:
      return (
        <Container className="mt-16">
          <FadeIn>
            {/* {services.map((service: Service) => (
              <ServiceCard1 key={service.id} service={service} />
            ))} */}
          </FadeIn>
        </Container>
      )
  }
}

const ContactSection: React.FC<ContactProps> = async ({
  contactSection,
  designType,
}) => {
  let services: Service[] | null = null
  try {
    services = await fetchServices()
  } catch (error) {
    console.error('Failed to load services:', error)
  }

  return (
    <>
      <SectionIntro {...contactSection.sectionIntro} />
    </>
  )
}

export default ContactSection
