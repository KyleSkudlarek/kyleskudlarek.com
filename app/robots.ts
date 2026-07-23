import type { MetadataRoute } from 'next'

// Required for metadata routes under `output: export`.
export const dynamic = 'force-static'

// Emitted as /robots.txt at build time (works with static export).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://kyleskudlarek.com/sitemap.xml',
  }
}
