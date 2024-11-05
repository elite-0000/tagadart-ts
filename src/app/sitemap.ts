// app/sitemap.ts
import { MetadataRoute } from 'next';
import {
    fetchClients,
    fetchHomePage,
    fetchPosts,
    fetchProjects,
    fetchServices,
  } from '@/request/fetch'
  
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Define static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
  ];

  // Fetch dynamic data from Strapi
  const [posts] = await Promise.all([fetchPosts()]);

  // Define dynamic routes for pages
//   const pageRoutes = pages.map((page) => ({
//     url: `${baseUrl}/${page.attributes.locale}/${page.attributes.slug}`,
//     lastModified: new Date(page.attributes.updatedAt),
//     changeFrequency: 'weekly' as const,
//     priority: 0.7,
//   }));

  // Define dynamic routes for blog posts
  const postRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/posts/${post.attributes.slug}`,
    lastModified: new Date(post.attributes.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Return combined sitemap routes
  return [...staticRoutes, ...postRoutes];
}