import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

// This tells Next.js to check for new cameras every hour
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://openshorestudios.com'; // <--- Confirmed new domain

  // 1. Get all your Approved Cameras from the Database
  let cameraRoutes: MetadataRoute.Sitemap = [];
  
  try {
    const { data: cameras } = await supabase
      .from('cameras')
      .select('id, updated_at')
      .eq('status', 'approved');

    if (cameras) {
      cameraRoutes = cameras.map((camera) => ({
        url: `${baseUrl}/rent-camera/${camera.id}`,
        lastModified: new Date(camera.updated_at || new Date()),
        changeFrequency: 'weekly',
        priority: 0.6, // Specific cameras get slightly lower priority than the main page
      }));
    }
  } catch (error) {
    console.error('Sitemap Error:', error);
  }

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
  return [...staticRoutes, ...cameraRoutes];
}