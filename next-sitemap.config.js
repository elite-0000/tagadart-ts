/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://tagadart.ch',
  generateRobotsTxt: true, // (optional)
  exclude: ['/server-sitemap.xml'], // Exclude server-side sitemap from static generation
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://tagadart.ch/server-sitemap.xml', // Add your server-side sitemap here
    ],
  },
}
