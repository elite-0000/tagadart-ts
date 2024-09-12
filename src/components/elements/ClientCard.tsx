import { Client } from '@/types/client'
import React from 'react'
import { FadeIn } from '../ui/FadeIn'
import { Border } from '../ui/Border'
import { Cloud } from 'lucide-react'
import NextCloudinaryImage from '../images/ImageNextCloudinary'

interface ClientCardProps {
  client: Client
}

const ClientCard: React.FC<ClientCardProps> = ({ client }) => {
  return (
    <li key={client.name} className="group">
      <FadeIn className="overflow-hidden">
        <Border className="pt-12 group-[&:nth-child(-n+2)]:-mt-px sm:group-[&:nth-child(3)]:-mt-px lg:group-[&:nth-child(4)]:-mt-px">
          {client?.logo && (
            <NextCloudinaryImage
              width={500}
              height={500}
              alt={client?.logo?.alt}
              src={`${client?.logo?.url}`}
            />
          )}
        </Border>
      </FadeIn>
      <div className="text-center">
        <h2 className="text-xl font-bold">{client.name}</h2>
        {/* <p>{client.description}</p> */}
      </div>
    </li>
  )
}

export default ClientCard
