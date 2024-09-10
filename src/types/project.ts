import { MediaItem, PageIntro, PaginationMeta, Service } from './global.d'

import { Tag } from './tag'
import { Post } from './post'
import { Testimonial } from './testimonial'

// Project.ts
export interface Project {
  id: string
  pageIntro: PageIntro
  logo: MediaItem
  year: string
  client: string
  service: string
  link: string
  content: string
  expertise: string
  tags: Tag[]
  testimonials: Testimonial[]
  our_services: Service[]
  posts: Post[]
}

export interface ProjectsData {
  data: Project[]
  meta: PaginationMeta
}

export interface ProjectData {
  data: Project
  meta: PaginationMeta
}
