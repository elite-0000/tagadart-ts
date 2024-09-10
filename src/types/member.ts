import { MediaItem } from '@/types/global'
import { Post } from './post'
export interface Member {
  fullname: string
  avatar: MediaItem
  link: string
  email: string
  posts: Post[]
  role: string
}
