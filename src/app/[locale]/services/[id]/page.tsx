import type { Metadata } from 'next'
import { ViewService } from './ViewService'

export const metadata: Metadata = {
  title: 'Service - Service Title',
}

export default function ViewBlogPage({ params }: { params: any }) {
  return <ViewService params={params} />
}
