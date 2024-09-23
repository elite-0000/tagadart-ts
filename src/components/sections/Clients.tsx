import { Border } from '@/components/ui/Border'
import { Container } from '@/components/ui/Container'
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn'
import React from 'react'
import ClientCard from '../elements/ClientCard'

import { Client } from '@/types/client'
import { PageIntro } from '@/types/global'
import { SectionIntro } from './SectionIntro'

interface ClientProps {
  referencesSection: PageIntro
  clients: Client[]
}

const ReferenceSection: React.FC<ClientProps> = ({
  clients,
  referencesSection,
}) => {
  console.log(clients, 'clients')
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <SectionIntro {...referencesSection} />
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <Border className="mb-12" as={FadeIn} />
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map((client) => {
            return (
              <li key={client.id} className="group">
                <ClientCard client={client} />
              </li>
            )
          })}
        </ul>
      </FadeInStagger>
    </Container>
  )
}

export default ReferenceSection
