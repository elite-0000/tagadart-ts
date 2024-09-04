import React from 'react';
import { Container } from '@/components/Container';
import { FadeIn, FadeInStagger } from '@/components/FadeIn';
import Image from 'next/image';

interface TeamProps {
  title: string
  content: string  
  eyebrow: string
  members: {
    fullname: string;
    email: string;
    role: string;
    avatar: {
        url: string
    };
    }[];
};

interface TeamCardProps {
    teamCard: TeamProps
}

const Team: React.FC<TeamCardProps> = ({ teamCard }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
          <FadeInStagger key={teamCard.title}>
            <FadeIn />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {teamCard.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {teamCard.members.map((person) => (
                    <li key={person.fullname}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            src={`${apiUrl}${person.avatar?.url}`}
                            width={50}
                            height={50}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
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
  );
};

export default Team;
