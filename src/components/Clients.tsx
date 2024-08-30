import React from 'react';
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import Image from 'next/image';

interface ClientProps {
    clients: { 
        title: string; 
        link: string 
        avatar: {
            formats: {
            thumbnail: {
                url: string
            }
            }
        };
  } [];
} 

const Features: React.FC<ClientProps> = ({ clients }) => {
    const baseUrl = 'http://127.0.0.1:1337';
    console.log("clients: ", clients);
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
            {clients.map((value) => (
                <li key={value.title} className="group">
                <FadeIn className="overflow-hidden">
                    <Border className="pt-12 group-[&:nth-child(-n+2)]:-mt-px sm:group-[&:nth-child(3)]:-mt-px lg:group-[&:nth-child(4)]:-mt-px">
                    <Image 
                        src={value.avatar?.formats?.thumbnail?.url ? `${baseUrl}${value.avatar.formats.thumbnail.url}` : ""}
                        width={50}
                        height={50}
                        alt=""
                    />
                    </Border>
                </FadeIn>
                </li>
            ))}
            </ul>
        </FadeInStagger>
        </Container>
    )
}

export default Features;
