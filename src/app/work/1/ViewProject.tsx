'use client'
import React from 'react'

import useSWR from 'swr'

import { fetchAxiosAPI } from '@/request/request'
import { BaseData, FormValues } from '@/types/global'

type Props = {
  params: any
}

export const ViewProject = ({ params: { id } }: Props) => {
  const { data: projectData } = useSWR<BaseData>(
    `/projects/${id}`,
    (url: string) => fetchAxiosAPI(url),
  )
  if (!projectData) return null

  const actuality = projectData.data

  return (
    <div>
      <h1>Test</h1>
      <h1>{actuality.client}</h1>
    </div>
  )
}
