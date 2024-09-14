import { Border } from '@/components/ui/Border'
import { Container } from '@/components/ui/Container'
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn'
import React from 'react'
import ClientCard from '../elements/ClientCard'

import { Client } from '@/types/client'

interface ClientProps {
  // projectsSection: PageIntro
  clients: Client[]
}

const ClientsSection: React.FC<ClientProps> = ({ clients }) => {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        {/* <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Vous êtes en bonne compagnies
        </h2> */}
        {/* <PageIntro {...pageIntro} /> */}
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <Border as={FadeIn} />
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

export default ClientsSection
