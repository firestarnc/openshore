import { notFound } from "next/navigation";
import PostClient from "./PostClient";

const slugs = [
  "5-best-locations-for-outdoor-shoots-in-benin-city",
  "why-we-use-sony-for-cinematic-video",
  "essential-tips-for-first-time-clients",
];

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;

  if (!slugs.includes(slug)) {
    notFound();
  }

  return <PostClient slug={slug} />;
}