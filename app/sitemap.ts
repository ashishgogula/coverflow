import type { MetadataRoute } from 'next'

const SITE_URL = 'https://coverflow.ashishgogula.in'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date('2026-06-02'),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/docs`,
      lastModified: new Date('2026-06-02'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/changelog`,
      lastModified: new Date('2026-06-02'),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}
