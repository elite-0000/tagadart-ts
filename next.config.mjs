import createNextIntlPlugin from 'next-intl/plugin'
import { withSitemap } from 'next-sitemap'
import sitemapConfig from './next-sitemap.config.ts'

const withNextIntl = createNextIntlPlugin()

/** @type {import('next').NextConfig} */
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    domains: ['res.cloudinary.com'],
  },
}

export default withNextIntl(withSitemap(sitemapConfig)(nextConfig)) // import rehypeShiki from '@leafac/rehype-shiki'
