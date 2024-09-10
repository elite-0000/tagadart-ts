import { MediaItem } from './global'
import { Member } from './member'

export interface Testimonial {
  title: string
  cover: MediaItem
  content: string
  //TODO: Replace by pageIntro
  author: Member
}
