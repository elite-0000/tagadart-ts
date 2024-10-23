import React from 'react'
import Icon from '@/components/images/Icon'

import { Culture } from '@/types/global'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { truncateWithEllipses } from '@/lib/helper'
import NextCloudinaryImage from '@/components/images/ImageNextCloudinary'
import BasicMarkdown from '@/components/ui/BasicMarkdown'

interface CultureCardProps {
    culture: Culture
}

const CultureCard1: React.FC<CultureCardProps> = async ({ culture }) => {
  const t = await getTranslations('Culture')

  return (
    <></>
  )
}

export default CultureCard1
