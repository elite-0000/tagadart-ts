import type { Metadata } from 'next'

import { ContactSection } from '@/components/sections/ContactSection'
import { Container } from '@/components/ui/Container'

import { fetchServices, fetchServicesPage } from '@/request/fetch'
import { ServiceCard } from '@/components/elements/ServiceCard'
import { PageIntroSections } from '@/components/sections/PageIntro'
export const metadata: Metadata = {
  title: 'Services',
}

export default async function ViewServicesPages() {
  let servicesPageData = null
  let services = null

  try {
    servicesPageData = await fetchServicesPage()
    services = await fetchServices()
  } catch (error) {
    console.error('Failed to load data:', error)
    return <div>Failed to load data</div>
  }

  const { pageIntro, projectsSection } = servicesPageData || ''
  // const t = await getTranslations('Project')

  return (
    <>
      <PageIntroSections {...pageIntro}>
        <p>{pageIntro.content}</p>
      </PageIntroSections>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          {services &&
            services.map((service: any) => (
              <ServiceCard service={service} key={service.id} />
            ))}
        </div>
      </Container>

      <ContactSection />
    </>
  )
}
