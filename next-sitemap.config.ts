// next-sitemap.config.ts
import { IConfig } from 'next-sitemap'

const config: IConfig = {
  siteUrl: process.env.SITE_URL || 'http://localhost:3000',
  generateRobotsTxt: true, // (optional)
  // ...other options
}

export default config
