import type { Metadata } from 'next'
import { ViewProjects } from './ViewProjects'

type Props = {
  id: string
  initialData: any
  params: any
}

export const metadata: Metadata = {
  title: 'Projets',
}

export default function ViewProjectsPage({ params }: Props) {
  return <ViewProjects />
}
