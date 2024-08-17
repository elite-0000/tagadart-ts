'use client'
import Link from 'next/link'

import Fetcher from '@/components/Fetcher'

export const ViewProjects = () => {
  return (
    <>
      <Fetcher url="/projects">
        {({ data: projects, mutate, totalPages, goToPage, currentPage }) => {
          console.log(projects, 'projects')
          return (
            //TODO: Create a component for this
            <div className="my-3 px-4"></div>
          )
        }}
      </Fetcher>
    </>
  )
}
