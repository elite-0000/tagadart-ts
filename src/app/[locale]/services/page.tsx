import type { Metadata } from 'next'

import { ContactSection } from '@/components/sections/ContactSection'

import { fetchServices, fetchServicesPage } from '@/request/fetch'
import { PageIntroSections } from '@/components/sections/PageIntro'
import ServicesSection from '@/components/sections/ServicesSection'
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

  const { pageIntro, servicesSection } = servicesPageData || ''
  // const t = await getTranslations('Project')

  return (
    <>
      <PageIntroSections {...pageIntro} />
      <ServicesSection servicesSection={servicesSection} services={services} />
      <ContactSection />
    </>
  )
}
