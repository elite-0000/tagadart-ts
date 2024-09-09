import type { Metadata } from 'next'
import { ViewBlog } from './ViewBlog'

export const metadata: Metadata = {
  title: 'Blog - Article Title',
}

export default function ViewBlogPage({ params }: { params: any }) {
  return <ViewBlog params={params} />
}
