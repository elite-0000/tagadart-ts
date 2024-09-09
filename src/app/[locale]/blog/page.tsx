import type { Metadata } from 'next'
import ViewBlogs from './ViewBlogs'

export const metadata: Metadata = {
  title: 'Blogs',
}

export default function ViewBlogsPage() {
  return <ViewBlogs />
}
