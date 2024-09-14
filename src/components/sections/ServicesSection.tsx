import React from 'react'
import { SectionIntro } from './SectionIntro'
import { Container } from '../ui/Container'
import { FadeIn } from '../ui/FadeIn'
import ReactMarkdown from 'react-markdown'
import { PageIntro } from '@/types/global'
import Icon from '../images/Icon'
import { Service } from '@/types/service'
import { ServiceCard } from '../elements/ServiceCard'

interface ServicesProps {
  servicesSection: PageIntro
  services: Service[]
}

const ServicesSection: React.FC<ServicesProps> = ({
  servicesSection,
  services,
}) => {
  return (
    <>
      <SectionIntro {...servicesSection} />
      <Container className="mt-16">
        <FadeIn className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </FadeIn>
      </Container>
    </>
  )
}

export default ServicesSection
