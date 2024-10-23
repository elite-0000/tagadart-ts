import React from 'react'

import { Client } from '@/types/client'
import { PageIntro } from '@/types/global'
import { fetchClients } from '@/request/fetch'
import { Border } from '@/components/ui/Border'

import { Container } from '@/components/ui/Container'
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import ReferenceCard1 from './ReferenceCard/ReferenceCard1'

interface ReferenceProps {
  referenceSection: { sectionIntro: PageIntro } & { clients: Client[] }
  designType: Number
}

const renderContent = (clients: Client[], designType?: Number) => {
  switch (designType) {
    case 1:
      return (
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeInStagger faster>
          <Border className="mb-12" as={FadeIn} />
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-8 gap-y-12 pt-12 sm:grid-cols-3 lg:grid-cols-4"
            >
              {clients.map((client: Client) => (
                <li key={client.id} className="group">
                  <ReferenceCard1 key={client.id} client={client} />
                </li>
              ))}
            </ul>
          </FadeInStagger>
        </Container>
      )

    default:
      return (
        <Container className="mt-16">
          <FadeIn>
            {clients.map((client: Client) => (
              <ReferenceCard1 key={client.id} client={client} />
            ))}
          </FadeIn>
        </Container>
      )
  }
}

const ReferenceSection: React.FC<ReferenceProps> = async ({
  referenceSection,
  designType,
}) => {
  let clients: Client[] | null = null
  try {
    clients = await fetchClients()
  } catch (error) {
    console.error('Failed to load services:', error)
  }

  return (
    <>
      <SectionIntro {...referenceSection.sectionIntro} />
      {renderContent(
        referenceSection.clients.length > 0
          ? referenceSection.clients
          : clients || [],
        designType,
      )}
    </>
  )
}

export default ReferenceSection
