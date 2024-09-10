import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import Image from 'next/image'
import React from 'react'

interface ClientProps {
  clients: {
    classIcon: string
    title: string
    link: string
    pageIntro: {
      id: number
      title: string
      eyebrow: string
      cover: {
        name: string
        url: string
      }
    }
  }[]
}

const Features: React.FC<ClientProps> = ({ clients }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-neutral-950">
          Vous êtes en bonne compagnies
        </h2>
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <Border as={FadeIn} />
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map((value) => {
            console.log(value, 'value')
            return (
              <li key={value.title} className="group">
                <FadeIn className="overflow-hidden">
                  <Border className="pt-12 group-[&:nth-child(-n+2)]:-mt-px sm:group-[&:nth-child(3)]:-mt-px lg:group-[&:nth-child(4)]:-mt-px">
                    {value?.pageIntro?.cover && (
                      <Image
                        style={{
                          width: '100%',
                          height: 'auto',
                        }}
                        width={500}
                        height={500}
                        alt={value?.pageIntro?.cover?.name}
                        src={`${apiUrl}/${value?.pageIntro?.cover?.url}`}
                      />
                    )}
                  </Border>
                </FadeIn>
              </li>
            )
          })}
        </ul>
      </FadeInStagger>
    </Container>
  )
}

export default Features
