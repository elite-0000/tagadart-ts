/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_API_URL || 'https://tagadart.ch',
  generateRobotsTxt: true,
}
