// utils/fetch.tsx

import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'
import { createQueryParams } from './populate'

//////// PAGES

//////// COLLECTIONS
export async function fetchPosts() {
  // const populatePosts = ['pageIntro', 'author.avatar', 'pageIntro.cover']

  // const queryParams: RestQueryParams = {
  //   populate: populatePosts,
  //   sort: 'createdAt:desc',
  //   publicationState: 'live',
  //   pagination: {
  //     page: 1,
  //     pageSize: 10,
  //   },
  // }

  const queryParams = createQueryParams('posts')

  try {
    const postsData = await fetchAxiosAPI('posts', queryParams)
    return postsData?.data
  } catch (error) {
    console.error('Failed to load posts data:', error)
    throw error
  }
}

export async function fetchPost(id: string) {
  // const populatePosts = [
  //   'pageIntro',
  //   'author.avatar',
  //   'pageIntro.cover',
  //   'seo.metaTitle',
  //   'seo.metaImage',
  // ]

  // const queryParams: RestQueryParams = {
  //   populate: populatePosts,

  //   publicationState: 'live',
  //   pagination: {
  //     page: 1,
  //     pageSize: 10,
  //   },
  // }
  const queryParams = createQueryParams('posts')

  try {
    const postsData = await fetchAxiosAPI(`/posts/${id}`, queryParams)
    return postsData?.data
  } catch (error) {
    console.error('Failed to load posts data:', error)
    throw error
  }
}

export async function fetchProjects() {
  // const populateProjects = ['pageIntro', 'pageIntro.cover', 'logo']

  // const queryParams: RestQueryParams = {
  //   populate: populateProjects,
  //   publicationState: 'live',
  //   pagination: {
  //     page: 1,
  //     pageSize: 10,
  //   },
  // }

  const queryParams = createQueryParams('projects')

  try {
    const projectsData = await fetchAxiosAPI('projects', queryParams)
    return projectsData?.data
  } catch (error) {
    console.error('Failed to load projects data:', error)
    throw error
  }
}

export async function fetchProject(id: string) {
  // const populateProjects = [
  //   'pageIntro',
  //   'author.avatar',
  //   'pageIntro.cover',
  //   'seo.metaTitle',
  //   'seo.metaImage',
  // ]

  // const queryParams: RestQueryParams = {
  //   populate: populateProjects,

  //   publicationState: 'live',
  //   pagination: {
  //     page: 1,
  //     pageSize: 10,
  //   },
  // }

  const queryParams = createQueryParams('projects')

  try {
    const projectsData = await fetchAxiosAPI(`/projects/${id}`, queryParams)
    return projectsData?.data
  } catch (error) {
    console.error('Failed to load projects data:', error)
    throw error
  }
}

export async function fetchServices() {
  // const populateServices = ['pageIntro', 'seo.metaTitle', 'seo.metaImage']

  // const queryParams: RestQueryParams = {
  //   populate: populateServices,
  //   publicationState: 'live',
  //   pagination: {
  //     page: 1,
  //     pageSize: 10,
  //   },
  // }

  const queryParams = createQueryParams('services')

  try {
    const servicesData = await fetchAxiosAPI('our-services', queryParams)
    return servicesData?.data
  } catch (error) {
    console.error('Failed to load services data:', error)
    throw error
  }
}

export async function fetchService(id: string) {
  // const populateServices = ['pageIntro']

  // const queryParams: RestQueryParams = {
  //   populate: populateServices,
  //   publicationState: 'live',
  //   pagination: {
  //     page: 1,
  //     pageSize: 10,
  //   },
  // }

  const queryParams = createQueryParams('services')

  try {
    const servicesData = await fetchAxiosAPI(`our-services/${id}`, queryParams)
    return servicesData?.data
  } catch (error) {
    console.error('Failed to load services data:', error)
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
