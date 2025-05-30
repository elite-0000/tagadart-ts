// utils/fetch.tsx

import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'
import {
  createHomeQueryParams,
  createHomeSeoQueryParams,
  createQueryParams,
} from './populate'

//////// PAGES
export async function fetchPageBySlug(slug: string, lang: string) {
  const querySlug = slug === undefined ? 'home' : slug
  const path = '/pages'

  const queryParams = {
    ...createQueryParams('pages'),
    filters: {
      slug: {
        $eq: querySlug,
      },
    },
    locale: lang,
  }

  try {
    const pageData = await fetchAxiosAPI(path, queryParams)
    return pageData // Return the full response, not just data
  } catch (error) {
    console.error('Failed to load page data:', error)
    throw error
  }
}
// fetch home page
export async function fetchHomePageBySlug(slug: string, lang: string) {
  const querySlug = slug === undefined ? 'home' : slug
  const path = '/pages'

  const queryParams = {
    ...createHomeQueryParams('pages'),
    filters: {
      slug: {
        $eq: querySlug,
      },
    },
    locale: lang,
  }

  try {
    const startTime = Date.now()
    const pageData = await fetchAxiosAPI(path, queryParams)
    const endTime = Date.now()
    console.log('duration: ', endTime - startTime)
    return pageData // Return the full response, not just data
  } catch (error) {
    console.error('Failed to load page data:', error)
    throw error
  }
}
// fetch ceo
export async function fetchHomeSEOPageBySlug(slug: string, lang: string) {
  const querySlug = slug === undefined ? 'home' : slug
  const path = '/pages'

  const queryParams = {
    ...createHomeSeoQueryParams('pages'),
    filters: {
      slug: {
        $eq: querySlug,
      },
    },
    locale: lang,
  }

  try {
    const startTime = Date.now()
    const pageData = await fetchAxiosAPI(path, queryParams)
    const endTime = Date.now()
    console.log('duration: ', endTime - startTime)
    return pageData // Return the full response, not just data
  } catch (error) {
    console.error('Failed to load page data:', error)
    throw error
  }
}
//////// COLLECTIONS
export async function fetchPosts() {
  const queryParams = createQueryParams('posts')

  try {
    const postsData = await fetchAxiosAPI('posts', queryParams)
    return postsData?.data
  } catch (error) {
    console.error('Failed to load posts data:', error)
    throw error
  }
}
export async function fetchHome() {
  const queryParams = createHomeQueryParams('pages')

  try {
    const postsData = await fetchAxiosAPI('pages', queryParams)
    return postsData?.data
  } catch (error) {
    console.error('Failed to load posts data:', error)
    throw error
  }
}

export async function fetchPost(slug: string) {
  const queryParams = createQueryParams('posts')

  try {
    const postData = await fetchAxiosAPI(`/posts/${slug}`, queryParams)
    return postData?.data
  } catch (error) {
    console.error('Failed to load post:', error)
    throw error
  }
}

export async function fetchProjects() {
  const queryParams = createQueryParams('projects')

  try {
    const projectsData = await fetchAxiosAPI('projects', queryParams)
    return projectsData?.data
  } catch (error) {
    console.error('Failed to load projects data:', error)
    throw error
  }
}

export async function fetchProject(slug: string) {
  const queryParams = createQueryParams('projects')
  try {
    const projectsData = await fetchAxiosAPI(`/projects/${slug}`, queryParams)
    return projectsData?.data
  } catch (error) {
    console.error('Failed to load projects data:', error)
    throw error
  }
}

export async function fetchServices() {
  const queryParams = createQueryParams('services')

  try {
    const servicesData = await fetchAxiosAPI('our-services', queryParams)
    return servicesData?.data
  } catch (error) {
    console.error('Failed to load services data:', error)
    throw error
  }
}

export async function fetchService(slug: string) {
  const queryParams = createQueryParams('services')

  try {
    const serviceData = await fetchAxiosAPI(
      `/our-services/${slug}`,
      queryParams,
    )

    return serviceData?.data
  } catch (error) {
    console.error('Failed to load service:', error)
    throw error
  }
}

export async function fetchClients() {
  const populateClients = ['logo']

  const queryParams: RestQueryParams = {
    populate: populateClients,
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const clientsData = await fetchAxiosAPI('clients', queryParams)
    return clientsData?.data
  } catch (error) {
    console.error('Failed to load services data:', error)
    throw error
  }
}

export async function fetchClient(id: string) {
  const populateClients = ['logo']

  const queryParams: RestQueryParams = {
    populate: populateClients,
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const clientsData = await fetchAxiosAPI(`clients/${id}`, queryParams)
    return clientsData?.data
  } catch (error) {
    console.error('Failed to load services data:', error)
    throw error
  }
}
