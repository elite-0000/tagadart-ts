import React from 'react'

import { Service } from '@/types/service'
import { PageIntro } from '@/types/global'
import { fetchServices } from '@/request/fetch'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import ServiceCard1 from './ServiceCard/ServiceCard1'

interface ServicesProps {
  servicesSection: { sectionIntro: PageIntro } & { our_services: Service[] }
  designType: Number
}

const renderContent = (services: Service[], designType?: Number) => {
  switch (designType) {
    case 1:
      return (
        <Container className="mt-16">
          <FadeIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {services.map((service: Service) => (
                <ServiceCard1 key={service.id} service={service} />
              ))}
            </div>
          </FadeIn>
        </Container>
      )

    default:
      return (
        <Container className="mt-16">
          <FadeIn>
            {services.map((service: Service) => (
              <ServiceCard1 key={service.id} service={service} />
            ))}
          </FadeIn>
        </Container>
      )
  }
}

const ServiceSection: React.FC<ServicesProps> = async ({
  servicesSection,
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
      <SectionIntro {...servicesSection.sectionIntro} />
      {renderContent(
        servicesSection.our_services.length > 0
          ? servicesSection.our_services
          : services || [],
        designType,
      )}
    </>
  )
}

export default ServiceSection
