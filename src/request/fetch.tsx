// utils/fetch.tsx

import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'
import { createQueryParams } from './populate'

//////// PAGES
export async function fetchHomePage() {
  const populateHome = [
    'pageIntro',
    'pageIntro.cover',
    'referencesSection',
    'servicesSection.our_services.pageIntro',
    'blogSection.posts.pageIntro',
    'blogSection.posts.author.avatar',
    'projectsSection.projects.pageIntro',
  ]

  const queryParams: RestQueryParams = {
    populate: populateHome,
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const homeData = await fetchAxiosAPI('home', queryParams)
    return homeData?.data
  } catch (error) {
    console.error('Failed to load home data:', error)
    throw error
  }
}

export async function fetchContactPage() {
  const populateContact = ['pageIntro', 'offices']
  const queryParams: RestQueryParams = {
    populate: populateContact,
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const homeData = await fetchAxiosAPI('contact-page', queryParams)
    return homeData?.data
  } catch (error) {
    console.error('Failed to load home data:', error)
    throw error
  }
}

export async function fetchAboutPage() {
  const populateAbout = [
    'pageIntro',
    'cultureSection',
    'cultureSection.values',
    'teamSection',
    'teamSection.members',
    'teamSection.members.avatar',
  ]

  const queryParams: RestQueryParams = {
    populate: populateAbout,
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const aboutData = await fetchAxiosAPI('about-us-page', queryParams)
    return aboutData?.data
  } catch (error) {
    console.error('Failed to load home data:', error)
    throw error
  }
}
export async function fetchBlogPage() {
  const populateBlog = ['pageIntro', 'pageIntro.cover']

  const queryParams: RestQueryParams = {
    populate: populateBlog,
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const blogData = await fetchAxiosAPI('blog-page', queryParams)
    return blogData?.data
  } catch (error) {
    console.error('Failed to load blog page data:', error)
    throw error
  }
}
export async function fetchProjectsPage() {
  const populateProjectsPage = [
    'pageIntro',
    'pageIntro.cover',
    'projectsSection',
    'projectsSection.projects',
    'projectsSection.projects.logo',
    'projectsSection.projects.testimonials',
    'projectsSection.projects.pageIntro.cover',
    'projectsSection.projects.our_services',
    'projectsSection.projects.our_services.pageIntro',
    'projectsSection.projects.our_services.pageIntro.cover',
  ]

  // Query parameters for fetching the projects data
  const queryParams: RestQueryParams = {
    populate: populateProjectsPage,
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const projectsData = await fetchAxiosAPI('home', queryParams)
    return projectsData?.data
  } catch (error) {
    console.error('Failed to load home data:', error)
    throw error
  }
}
export async function fetchServicesPage() {
  const populateService = [
    'pageIntro',
    'servicesSection',
    'servicesSection.our_services',
    'servicesSection.our_services.pageIntro',
  ]

  const defaultQueryParams: RestQueryParams = {
    populate: populateService,
    publicationState: 'preview',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const serviceData = await fetchAxiosAPI('services-page', defaultQueryParams)
    return serviceData.data
  } catch (error) {
    console.error('Failed to load service data:', error)
    return <div>Failed to load data</div>
  }
}

//////// COLLECTIONS
export async function fetchPosts() {
  const populatePosts = ['pageIntro', 'author.avatar', 'pageIntro.cover']

  const queryParams: RestQueryParams = {
    populate: populatePosts,
    sort: 'createdAt:desc',
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const postsData = await fetchAxiosAPI('posts', queryParams)
    return postsData?.data
  } catch (error) {
    console.error('Failed to load posts data:', error)
    throw error
  }
}

export async function fetchPost(id: string) {
  const populatePosts = ['pageIntro', 'author.avatar', 'pageIntro.cover', 'seo.metaTitle', 'seo.metaImage']

  const queryParams: RestQueryParams = {
    populate: populatePosts,

    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const postsData = await fetchAxiosAPI(`/posts/${id}`, queryParams)
    return postsData?.data
  } catch (error) {
    console.error('Failed to load posts data:', error)
    throw error
  }
}

export async function fetchProjects() {
  const populateProjects = ['pageIntro', 'pageIntro.cover', 'logo']

  const queryParams: RestQueryParams = {
    populate: populateProjects,
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const projectsData = await fetchAxiosAPI('projects', queryParams)
    return projectsData?.data
  } catch (error) {
    console.error('Failed to load projects data:', error)
    throw error
  }
}

export async function fetchProject(id: string) {
  const populateProjects = ['pageIntro', 'author.avatar', 'pageIntro.cover', 'seo.metaTitle', 'seo.metaImage']

  const queryParams: RestQueryParams = {
    populate: populateProjects,

    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const projectsData = await fetchAxiosAPI(`/projects/${id}`, queryParams)
    return projectsData?.data
  } catch (error) {
    console.error('Failed to load projects data:', error)
    throw error
  }
}

export async function fetchServices() {
  const populateServices = ['pageIntro', 'seo.metaTitle', 'seo.metaImage']

  const queryParams: RestQueryParams = {
    populate: populateServices,
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

  try {
    const servicesData = await fetchAxiosAPI('our-services', queryParams)
    return servicesData?.data
  } catch (error) {
    console.error('Failed to load services data:', error)
    throw error
  }
}

export async function fetchService(id: string) {
  const populateServices = ['pageIntro']

  const queryParams: RestQueryParams = {
    populate: populateServices,
    publicationState: 'live',
    pagination: {
      page: 1,
      pageSize: 10,
    },
  }

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
