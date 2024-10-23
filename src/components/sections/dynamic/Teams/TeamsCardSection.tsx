import React from 'react'

import { Team } from '@/types/team'
import { PageIntro } from '@/types/global'
import { fetchServices } from '@/request/fetch'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import TeamCard1 from './TeamsCard/TeamCard1'

interface TeamsProps {
  teamsSection: { sectionIntro: PageIntro } & { teams: Team[] }
  designType: Number
}

const renderContent = (teams: Team[], designType?: Number) => {
  switch (designType) {
    case 1:
      return (
        <Container className="mt-16">
          <FadeIn>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {teams.map((service: Team) => (
                <TeamCard1 key={service.id} team={service} />
              ))}
            </div>
          </FadeIn>
        </Container>
      )

    default:
      return (
        <Container className="mt-16">
          <FadeIn>
            {teams.map((service: Team) => (
              <TeamCard1 key={service.id} team={service} />
            ))}
          </FadeIn>
        </Container>
      )
  }
}

const ServiceSection: React.FC<TeamsProps> = async ({
  teamsSection,
  designType,
}) => {
  let services: Team[] | null = null
  try {
    services = await fetchServices()
  } catch (error) {
    console.error('Failed to load services:', error)
  }

  return (
    <>
      <SectionIntro {...teamsSection.sectionIntro} />
      {renderContent(
        teamsSection.teams.length > 0
          ? teamsSection.teams
          : services || [],
        designType,
      )}
    </>
  )
}

export default ServiceSection
