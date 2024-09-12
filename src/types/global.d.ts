import { Member } from './member'

export type LocationType = {
  longitude: number
  latitude: number
  address: string
}

export type BaseItem = {
  id: number
  title: string
  client: string
  description?: string
  contentRTE?: string
  content: any
  startDate?: Date
  service?: string
  endDate?: Date
  publishedAt: Date
  unPublishedAt?: Date
  publishedDate?: Date
  unPublishedDate?: Date
  author?: any
  avatar?: any
  year?: string
  status?: string
  contact?: any
  pageIntro: {
    title: string
    eyebrow: string
    content: string
    cover: any
  }
  cover?: any // Add cover field here
}

export interface BasesData {
  data: BaseItem[]
  meta: PaginationMeta
}

export interface BaseData {
  data: BaseItem
  meta: PaginationMeta
}

export type ItemType = {
  value: ValueType
  label: I18n.Scope
}

export type ValueType = string | number | boolean

//****** IMAGE ******\\
export interface MediaItem {
  id: string
  url: string
  provider_metadata?: any
  width?: number
  height?: number
  alt: string
  // Define the properties of MediaItem here
  // ...
}

//****** FORM ******\\
export type FieldValidation = {
  type: string
  required?: boolean
  minLength?: number
  min?: number
  maxLenght?: number
  format?: string
}

//****** REQUEST ******\\
export interface RestQueryParams {
  fields?: string | string[]
  filters?: object
  pagination?: {
    page?: number
    pageSize?: number
  }
  sort?: string
  populate: string | object
  locale?: string | string[]
  publicationState?: 'live' | 'preview'
  cover?: any //TODO: Replace by MediaItem from Pelop2.0
}

//General
export interface PaginationMeta {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export interface Data {
  data: any
  meta: PaginationMeta
}

export interface PageIntro {
  title: string
  eyebrow: string
  content: any
  image: string
  cover: {
    id: number
    url: string
  }
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

// // Form.ts
// export interface Form {

// }

// // CTA.ts
// export interface CTA {

// }

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
