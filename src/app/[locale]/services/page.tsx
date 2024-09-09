import type { Metadata } from 'next'
import ViewServices from './ViewServices'
import Services from './ai/page'

export const metadata: Metadata = {
  title: 'Services',
}

export default function ViewBlogsPage() {
  return <ViewServices />
}
