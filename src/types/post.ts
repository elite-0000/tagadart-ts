import { PageIntro } from './global'
import { Member } from './member'

export interface Post {
  id: string
  pageIntro: PageIntro
  author: Member
  content: string
}
