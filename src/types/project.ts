import { MediaItem, PageIntro, Service } from './global.d'
import { Testimonial } from './global'
import { Tag } from './tag'
import { Post } from './post'

// Project.ts
export interface Project {
  pageIntro: PageIntro
  logo: MediaItem
  year: string
  client: string
  service: string
  link: string
  content: string
  expertise: string
  tags: Tag[]
  testimonial: Testimonial[]
  our_services: Service[]
  posts: Post[]
}
