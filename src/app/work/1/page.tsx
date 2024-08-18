import type { Metadata } from 'next'
import { ViewProject } from './ViewProject'

export const metadata: Metadata = {
  title: 'Projet - Nom du projet',
}

export default function EditActualityPage({ params }: { params: any }) {
  return <ViewProject params={params} />
}
