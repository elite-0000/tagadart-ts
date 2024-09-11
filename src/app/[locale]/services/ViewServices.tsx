import Image from 'next/image'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Button } from '@/components/elements/Button'
import { ContactSection } from '@/components/sections/ContactSection'
import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { PageIntro } from '@/components/sections/PageIntro'
import { formatDate } from '@/lib/formatDate'
import { loadArticles } from '@/lib/mdx'
import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'
import ArticleCard from '@/components/elements/ArticleCard'
import ReactMarkdown from 'react-markdown' // Ensure this is imported
import Icon from '@/components/images/Icon'

interface ServiceCardProps {
  service: {
    id: string
    pageIntro: {
      title: string
      content: string
    }
  }
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div key={service.id} className="flex flex-col">
      <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
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

export default async function ViewBlog() {
  const populateService = [
    'pageIntro',
    'servicesSection',
    'servicesSection.our_services',
    'servicesSection.our_services.pageIntro',
  ]

  const defaultQueryParams: RestQueryParams = {
    populate: populateService,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  let serviceData
  try {
    serviceData = await fetchAxiosAPI('services-page', defaultQueryParams)
  } catch (error) {
    console.error('Failed to load service data:', error)
    return <div>Failed to load data</div>
  }

  const { pageIntro, servicesSection } = serviceData?.data || {}
  const { our_services } = servicesSection

  return (
    <>
      <PageIntro {...pageIntro}>
        <p>{pageIntro.content}</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {our_services &&
            our_services.map((service: any) => (
              <ServiceCard service={service} key={service.id} />
            ))}
        </div>
      </Container>

      <ContactSection />
    </>
  )
}
