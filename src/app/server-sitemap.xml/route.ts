import { getServerSideSitemap, ISitemapField } from 'next-sitemap';

export async function GET(request: Request) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tagadart.ch';

  const dynamicPages = [
    { url: `${baseUrl}/blogs`, lastmod: new Date().toISOString() },
    { url: `${baseUrl}/projects`, lastmod: new Date().toISOString() },
    { url: `${baseUrl}/landing`, lastmod: new Date().toISOString() },
    { url: `${baseUrl}/contact`, lastmod: new Date().toISOString() },
    { url: `${baseUrl}/posts`, lastmod: new Date().toISOString() },
    { url: `${baseUrl}/services`, lastmod: new Date().toISOString() },
    { url: `${baseUrl}/teams`, lastmod: new Date().toISOString() },
  ];

  const fields: ISitemapField[] = dynamicPages.map(page => ({
    loc: page.url,
    lastmod: page.lastmod,
    changefreq: 'daily', // Ensure this is a valid enum value
    priority: 0.7,
  }));

  return getServerSideSitemap(fields);
}