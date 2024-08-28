import type { Metadata } from 'next'
import ViewWorks from './ViewWorks'

export const metadata: Metadata = {
  title: 'Blogs',
}

export default function ViewWorksPage() {
  return <ViewWorks />
}
