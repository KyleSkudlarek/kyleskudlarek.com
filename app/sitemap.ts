import type { MetadataRoute } from 'next'

// Required for metadata routes under `output: export`.
export const dynamic = 'force-static'

// Emitted as /sitemap.xml at build time. Add new routes here as pages ship.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://kyleskudlarek.com'
  const routes = ['', '/about', '/projects']
  return routes.map((route) => ({
    url: `${base}${route}/`,
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
