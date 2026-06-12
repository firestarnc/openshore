import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://openshorestudios.com';

  /*
  -----------------------------
  BLOG / RESOURCES ROUTES
  -----------------------------
  */

  const resourceRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/resources`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/5-best-locations-for-outdoor-shoots-in-benin-city`,
      lastModified: new Date("2026-03-01"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/why-we-use-sony-for-cinematic-video`,
      lastModified: new Date("2026-03-05"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resources/essential-tips-for-first-time-clients`,
      lastModified: new Date("2026-03-10"),
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];
  // 2. Define your Main Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1, // Homepage is King
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/rent-camera`, // Main Rental Page
      lastModified: new Date(),
      changeFrequency: 'weekly', // Inventory changes often
      priority: 0.9,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];

  // 3. Combine them
  return [...staticRoutes, ...resourceRoutes];
}