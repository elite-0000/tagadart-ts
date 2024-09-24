import React from 'react'
import { Container } from '@/components/ui/Container'
import { FadeIn, FadeInStagger } from '@/components/ui/FadeIn'
import NextCloudinaryImage from '../images/ImageNextCloudinary'
import { PageIntro } from '@/types/global'
import { Member } from '@/types/member'

interface TeamCardProps {
  teamSection: PageIntro & { members: Member[] }
}

const TeamSection: React.FC<TeamCardProps> = ({ teamSection }) => {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        <FadeInStagger key={teamSection?.title}>
          <FadeIn />
          <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
            <FadeIn>
              {teamSection && (
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {teamSection?.title}
                </h2>
              )}
            </FadeIn>
            <div className="lg:col-span-3">
              <ul
                role="list"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
              >
                {teamSection?.members &&
                  teamSection.members.map((person) => (
                    <li key={person.fullname}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <NextCloudinaryImage
                            src={`${person.avatar?.url}`}
                            alt={`${person.fullname}`}
                            width={500}
                            height={700}
                            // crop={'crop'}
                            crop={'fill'}
                            // crop={'pad'} //crop fill pad
                            className="grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.fullname}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </FadeInStagger>
      </div>
    </Container>
  )
}

export default TeamSection
