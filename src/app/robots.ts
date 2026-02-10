import { MetadataRoute } from 'next'

// Add this line to force it to be static
export const dynamic = 'force-static'

// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/',
    },
    sitemap: 'https://openshorestudios.com/sitemap.xml', // <--- UPDATED HERE
  }
}