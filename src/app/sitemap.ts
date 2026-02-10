import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase'; // Import your supabase client

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://openshore.shop';

  // 1. Get all approved cameras to generate their specific URLs
  const { data: cameras } = await supabase
    .from('cameras')
    .select('id, updated_at')
    .eq('status', 'approved');

  const cameraUrls = cameras?.map((camera) => ({
    url: `${baseUrl}/rent-camera/${camera.id}`,
    lastModified: new Date(camera.updated_at || new Date()),
  })) ?? [];

  // 2. Define your static main pages
  const routes = [
    '',
    '/about',
    '/rent-camera',
    '/contact',
    '/booking', // Assuming you have a booking page
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  // 3. Combine them
  return [...routes, ...cameraUrls];
}