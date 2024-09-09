'use client'
import Link from 'next/link'

import Fetcher from '@/components/Fetcher'
import ProjectCard from '@/components/ProjectCard'

export const ViewProjects = () => {
  return (
    <>
      <Fetcher url="/projects">
        {({ data: projects }) => {
          return (
            <div className="my-3 flex items-center justify-center px-4">
              {/* //TS: Change type any to the actual type */}
              {projects &&
                projects?.data.map((project: any) => (
                  <ProjectCard key={project.id} project={project} />
                  // <div
                  //   key={project.id}
                  //   className="flex items-center justify-between border-b border-gray-300 py-2"
                  // >
                  //   <Link href={`/projects/${project.id}`}>
                  //     <div>{project.name}</div>
                  //     <div>{project.client}</div>
                  //   </Link>
                  // </div>
                ))}
            </div>
          )
        }}
      </Fetcher>
    </>
  )
}
