import React from 'react'

import { Team } from '@/types/team'
import { PageIntro } from '@/types/global'
import { fetchServices } from '@/request/fetch'

import { Container } from '@/components/ui/Container'
import { FadeIn } from '@/components/ui/FadeIn'
import { SectionIntro } from '../../SectionIntro'
import TeamCard1 from './TeamsCard/TeamCard1'
import { Member } from '@/types/member'

interface TeamsProps {
  teamsSection: { sectionIntro: PageIntro } & { members: Member[] }
  designType: Number
}

const renderContent = (members: Member[], designType?: Number) => {
  switch (designType) {
    case 1:
      return (
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <div className="space-y-24">
            <FadeIn>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {members.map((member: Member) => (
                  <TeamCard1 key={member.id} member={member} />
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      )

    default:
      return (
        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <div className="space-y-24">
            <FadeIn>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {members.map((member: Member) => (
                  <TeamCard1 key={member.id} member={member} />
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      )
  }
}

const TeamSection: React.FC<TeamsProps> = async ({
  teamsSection,
  designType,
}) => {
  // let teams: Team[] | null = null
  try {
    // teams = await fetchTeams()
  } catch (error) {
    console.error('Failed to load team:', error)
  }

  return (
    <>
      <SectionIntro {...teamsSection.sectionIntro} />
      {renderContent(
        teamsSection.members.length > 0
          ? teamsSection.members
          : [],
        designType,
      )}
    </>
  )
}

export default TeamSection
