import { MediaItem } from './user'

type ImageUpload = { uri: string } | string | null | any

export type LocationType = {
  longitude: number
  latitude: number
  address: string
}

export const baseSchema = object({
  title: string().required(),
  content: string(),
  contentRtM: string(),
  startDate: date(),
  endDate: date(),
})

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
export const imageItemSchema = object({
  public_id: string(),
  url: string(),
})

// export type ImageItem = InferType<typeof imageItemSchema>;

export interface MediaItem {
  id?: string
  url?: URL
  provider_metadata?: any
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

//TEMP quick ts

//PageIntro.ts
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

// Reference.ts
export interface Reference {
  title: string
  logo: string[]
}

// Blog.ts
export interface Blog {
  title: string
  subtitle: string
  project: Project[]
}

// Services.ts
export interface Services {
  title: string
  subtitle: string
  project: Project[]
}

// ProjectCard.ts
export interface ProjectCard {
  title: string
  subtitle: string
  project: Project[]
}

// Testimonials.ts
export interface Testimonials {
  text: string
  author: string
}

// Service.ts
export interface Service {
  title: string
  eyebrow: string
  description: string
  image: string
  icon: string
  relatedProjects: Project[]
  cta: CTA
}

// Project.ts
export interface Project {
  title: string
  eyebrow: string
  description: string
  image: string
  year: string
  client: string
  service: string
  technologies: string[]
  testimonial: Testimonial
  expertise: string
  moreProjects: Project[]
  cta: CTA
  link: string
}

// BlogPost.ts
export interface BlogPost {
  title: string
  eyebrow: string
  description: string
  image: string
  date: string
  author: Author
}

// Author.ts
export interface Author {
  avatar: string
  fullname: string
}

// AboutUs.ts
export interface AboutUs {
  title: string
  eyebrow: string
  description: string
  image: string
  culture: Culture
  team: Team[]
}

// Culture.ts
export interface Culture {
  title: string
  subtitle: string
  rte: string[]
}

// Team.ts
export interface Team {
  photo: string
  fullname: string
}

// Contact.ts
export interface Contact {
  title: string
  eyebrow: string
  description: string
  image: string
  offices: Office[]
  newsletter: boolean
  form: Form
}

// Office.ts
export interface Office {
  title: string
  address: string
  email: string
  phone: string
}

// Form.ts
export interface Form {
  // Define form fields here
}

// CTA.ts
export interface CTA {
  // Define CTA fields here
}

// Testimonial.ts
export interface Testimonial {
  // Define Testimonial fields here
}
