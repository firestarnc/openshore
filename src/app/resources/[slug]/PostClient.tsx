"use client";

import dynamic from "next/dynamic";

const posts = {
  "5-best-locations-for-outdoor-shoots-in-benin-city": dynamic(
    () => import("../../../content/blog/5-best-locations-for-outdoor-shoots-in-benin-city.mdx"),
    { ssr: false, loading: () => <p>Loading…</p> }
  ),
  "why-we-use-sony-for-cinematic-video": dynamic(
    () => import("../../../content/blog/why-we-use-sony-for-cinematic-video.mdx"),
    { ssr: false, loading: () => <p>Loading…</p> }
  ),
  "essential-tips-for-first-time-clients": dynamic(
    () => import("../../../content/blog/essential-tips-for-first-time-clients.mdx"),
    { ssr: false, loading: () => <p>Loading…</p> }
  ),
};

type Props = { slug: string };

export default function PostClient({ slug }: Props) {
  const Post = posts[slug as keyof typeof posts];
  if (!Post) return <p>Post not found.</p>;

  return (
    <main className="prose mx-auto py-16">
      <Post />
    </main>
  );
}