import { CTA, PageIntro } from './global'
import { Member } from './member'

export interface Team {
  id: string
  pageIntro: PageIntro
  classIcon: string
  content: string //TODO: Discuss the utility
  cta: CTA[] //TODO: Discuss the utility
  teams: Member[]
}
