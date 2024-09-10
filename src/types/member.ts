import { MediaItem } from '@/types/global'
import { Post } from './post'
export interface Member {
  fullname: string
  title: string
  avatar: MediaItem
  link: string
  email: string
  posts: Post[]
  role: string
}
