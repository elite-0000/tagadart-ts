import { Member } from './member'

export type BaseItem = {
  id: number
  publishedAt: Date
}

export interface BasesData {
  data: BaseItem[]
  meta: PaginationMeta
}

export interface BaseData {
  data: BaseItem
  meta: PaginationMeta
}

export interface Data {
  data: any
  meta: PaginationMeta
}

//****** IMAGE ******\\
export interface MediaItem {
  id: string
  url: string
  provider_metadata?: any
  width?: number
  height?: number
  alternativeText: string
}

//****** REQUEST ******\\
export interface RestQueryParams extends Partial<PaginationMeta> {
  fields?: string | string[]
  filters?: object
  sort?: string
  locale?: string
  populate?: string | object
  locale?: string | string[]
  publicationState?: 'live' | 'preview'
  cover?: MediaItem
}

export interface PaginationMeta {
  pagination: {
    page: number
    pageSize: number
    pageCount?: number
    total?: number
  }
}

//****** SECTIONS ******\\

export interface PageIntro {
  title: string
  eyebrow: string
  content: any
  image?: string
  cover: MediaItem
}

export interface Culture {
  id: string
  title: string
  content: string
}

// Office.ts
export interface Office {
  name: string
  children: React.ReactNode
  invert: boolean
  phone?: string
}

// CTA.ts
export interface CTA {}

// // AboutUs.ts
// export interface AboutUs {
//   title: string
//   eyebrow: string
//   description: string
//   image: string
//   culture: Culture
//   team: Member[]
// }

// // Contact.ts
// export interface Contact {
//   title: string
//   eyebrow: string
//   description: string
//   image: string
//   offices: Office[]
//   newsletter: boolean
//   form: Form
// }

export interface Buttons {
  id: string
  link: string
  text: string
  type: string
}
