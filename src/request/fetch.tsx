// utils/fetch.tsx

import { fetchAxiosAPI } from '@/request/request'
import { RestQueryParams } from '@/types/global'

// Fetch home page data
export async function fetchHomePage() {
  const populateHome = [
    'cover',
    'pageIntro',
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

// Fetch blog page data
export async function fetchBlogPage() {
  const populateBlog = [
    'pageIntro',
    'blogSection.posts.pageIntro',
    'blogSection.posts.author.avatar.thumbnail.formats',
  ]

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

// Fetch posts data
export async function fetchPosts() {
  const populatePosts = ['pageIntro', 'author.avatar', 'pageIntro.cover']

  const queryParams: RestQueryParams = {
    populate: populatePosts,
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

// Fetch projects data (for the home page)
export async function fetchProjects() {
  const populateProjects = ['pageIntro']

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
