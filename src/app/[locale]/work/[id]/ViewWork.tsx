'use client'
import { fetchAxiosAPI } from '@/request/request'
import { BaseData } from '@/types/global'
import useSWR from 'swr'

type Props = {
  params: any
}

export const ViewWork = ({ params: { id } }: Props) => {
  const fetcher = (url: string) => {
    console.log('Fetching API URL:', url) // Log the URL here
    return fetchAxiosAPI(url)
  }

  const { data: workData } = useSWR<BaseData>(`/works/${id}`, fetcher)
  const currentId = id
  const { data: allBlogs } = useSWR<BaseData>(`/posts/`, fetcher)

  if (!workData || !workData.data) return null // Added check for blogData.data
  const work = workData.data
  const workContent = work.content

  return <></>
}
