import type { Metadata } from 'next'
import ViewServices from './ViewServices'

export const metadata: Metadata = {
  title: 'Services',
}

export default function ViewBlogsPage() {
  return <ViewServices />
}
