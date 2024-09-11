import React from 'react'
import { SectionIntro } from './SectionIntro'
import { Container } from '../ui/Container'
import { FadeIn } from '../ui/FadeIn'
import ReactMarkdown from 'react-markdown'
import { PageIntro } from '@/types/global'
import Icon from '../images/Icon'
import { Service } from '@/types/service'



interface ServicesSectionProps {
  //TODO: Extend pageIntro
  id: number
  title: string
  content: string
  eyebrow: string
  our_services: Service[]
}

interface ServicesProps {
  servicesSection: ServicesSectionProps
}

interface ServiceCardProps {
  service: Service
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div key={service.pageIntro.title} className="flex flex-col">
      <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
        {/* @ts-ignore */}
        {/* {service.classIcon && <Icon name={service.classIcon} />} */}
        <Icon name="brain-circuit" />
        {service.pageIntro.title}
      </dt>
      <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
        <ReactMarkdown>{service.pageIntro.content}</ReactMarkdown>
        <p className="mt-6">
          <a
            href={`/services/${service.id}`}
            className="text-sm font-semibold leading-6 text-indigo-600"
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </p>
      </dd>
    </div>
  )
}

const ServicesSection: React.FC<ServicesProps> = ({ servicesSection }) => {
  const { title, content, eyebrow, our_services } = servicesSection || ''

  return (
    <>
      <SectionIntro
        eyebrow={eyebrow}
        title={title}
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <ReactMarkdown>{content}</ReactMarkdown>
      </SectionIntro>
      <Container className="mt-16">
        <FadeIn className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {our_services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </FadeIn>
      </Container>
    </>
  )
}

export default ServicesSection
