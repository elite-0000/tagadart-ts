import React from 'react'
import Icon from '@/components/images/Icon'

import { Team } from '@/types/team'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { truncateWithEllipses } from '@/lib/helper'
import NextCloudinaryImage from '@/components/images/ImageNextCloudinary'
import BasicMarkdown from '@/components/ui/BasicMarkdown'

interface TeamCardProps {
  team: Team
}

const TeamCard1: React.FC<TeamCardProps> = async ({ team }) => {
  const t = await getTranslations('Team')

  return (
    <div key={team.id} className="flex flex-col">
      <dt className="items-top flex min-h-20 gap-x-3 text-xl font-bold leading-7 text-gray-900">
        <div className="text-primary-600">
          <Icon
            size={48}
            /* @ts-ignore */
            name={team.classIcon as IconProps}
          />
        </div>
        {team.pageIntro.title}
      </dt>
      <dd className="mt-1 flex flex-auto flex-col text-lg leading-6 text-gray-600">
        <BasicMarkdown>
          {truncateWithEllipses(team.pageIntro.content, 150)}
        </BasicMarkdown>
        {/* <BasicMarkdown>{team.pageIntro.content}</BasicMarkdown> */}

        <Link
          href={`/teams/${team.id}`}
          className="mt-4 text-sm font-semibold leading-6 text-primary-600"
        >
          {t('view_more')} <span aria-hidden="true">→</span>
        </Link>
      </dd>
    </div>
  )
}

export default TeamCard1
