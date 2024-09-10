import type { Metadata } from 'next'
import ViewProjects from './ViewProjects'

export const metadata: Metadata = {
  title: 'Projets',
}

export default function ViewProjectsPage() {
  return <ViewProjects />
}
