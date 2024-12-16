import createNextIntlPlugin from 'next-intl/plugin'
import withBundleAnalyzer from '@next/bundle-analyzer'
import TerserPlugin from 'terser-webpack-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

const withNextIntl = createNextIntlPlugin()

const withBundleAnalyzerConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better performance and debugging
  reactStrictMode: true,

  // Specify page extensions
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],

  // Image optimization configuration
  images: {
    domains: ['res.cloudinary.com'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Enable compression
  compress: true,

  // Modern experimental features for optimization
  experimental: {
    // Enable modern optimization features
    optimizeCss: true, // Enable CSS optimization
    legacyBrowsers: false, // Disable support for legacy browsers
    browsersListForSwc: true, // Enable SWC compilation with browserslist
    // Modern code optimization
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    // Optimize fonts
    optimizeFonts: true,
    // Enable scroll restoration
    scrollRestoration: true,
  },

  // Webpack configuration for production optimization
  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      // Enable tree shaking
      config.optimization.usedExports = true

      // Optimize chunks
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        minChunks: 1,
        maxAsyncRequests: 30,
        maxInitialRequests: 30,
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]/,
            priority: 20,
          },
          // Common chunk
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          // Styles chunk
          styles: {
            name: 'styles',
            test: /\.(css|scss)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      }

      // Configure minimizer
      config.optimization.minimizer = [
        // JavaScript minification
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
              drop_debugger: true,
              pure_funcs: [
                'console.log',
                'console.info',
                'console.debug',
                'console.warn',
              ],
            },
            mangle: true,
            format: {
              comments: false,
            },
          },
          extractComments: false,
        }),

        // CSS minification
        new CssMinimizerPlugin({
          minimizerOptions: {
            preset: [
              'default',
              {
                discardComments: { removeAll: true },
                minifyFontValues: { removeQuotes: false },
              },
            ],
          },
        }),
      ]

      // Enable module concatenation
      config.optimization.concatenateModules = true

      // Enable deterministic chunk ids
      config.optimization.chunkIds = 'deterministic'

      // Enable module ids hashing
      config.optimization.moduleIds = 'deterministic'
    }

    return config
  },

  // Headers configuration for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        // Cache static files
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default withBundleAnalyzerConfig(withNextIntl(nextConfig))
