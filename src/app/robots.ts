import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*', // Allow ALL robots (Google, Bing, etc.)
      allow: '/',     // Allow them to visit everything
      disallow: '/admin/', // STOP them from trying to visit your Admin page
    },
    sitemap: 'https://openshore.shop/sitemap.xml',
  };
}