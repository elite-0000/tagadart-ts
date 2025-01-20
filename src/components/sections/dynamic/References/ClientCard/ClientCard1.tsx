import React from 'react'

import { Client } from '@/types/client'
import { getTranslations } from 'next-intl/server'

import NextCloudinaryImage from '@/components/images/ImageNextCloudinary'
import { FadeIn } from '@/components/ui/FadeIn'

interface ReferenceCardProps {
  client: Client
}

const ClientCard1: React.FC<ReferenceCardProps> = async ({ client }) => {
  const t = await getTranslations('Reference')
  return (
    <FadeIn className="overflow-hidden">
      {client?.logo && (
        <NextCloudinaryImage
          width={160}
          height={80}
          alt={client?.logo?.alternativeText}
          src={`${client?.logo?.url}`}
          crop="fit"
        />
      )}
    </FadeIn>
  )
}

export default ClientCard1
