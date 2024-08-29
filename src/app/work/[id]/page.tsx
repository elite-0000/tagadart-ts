import type { Metadata } from 'next'
import { ViewWork } from './ViewWork'

export const metadata: Metadata = {
  title: 'Blog - Article Title',
}

export default function ViewWorkPage({ params }: { params: any }) {
  return <ViewWork params={params} />
}
