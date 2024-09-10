import { CTA, PageIntro } from './global'
import { Project } from './project'

export interface Service {
  pageIntro: PageIntro
  classIcon: string
  content: string //TODO: Discuss the utility
  cta: CTA[] //TODO: Discuss the utility
  projects: Project[]
}
