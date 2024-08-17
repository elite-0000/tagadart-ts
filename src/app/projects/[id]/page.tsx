import type { Metadata } from 'next'
import { ViewProject } from './ViewProject'

type Props = {
  id: string
  initialData: any
  params: any
}

export const metadata: Metadata = {
  title: 'Projet - Nom du projet',
}

export default function ViewProjectPage({ params }: Props) {
  console.log(params, 'params')
  return <ViewProject params={params} />
}
