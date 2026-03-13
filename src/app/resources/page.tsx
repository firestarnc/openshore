import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata = {
  title: "Creator Resources",
  description: "Photography tips, video guides, and creator insights from Open Shore Studios.",
};

export default async function ResourcesPage() {
  const posts = await getAllPosts();

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mb-12">
        <h1 className="text-4xl font-bold mb-3">Creator Resources</h1>
        <p className="text-gray-600">
          Tips, guides, and insights for creators in Benin City.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/resources/${post.slug}`}
            className="group rounded-xl border border-gray-200 p-6 hover:shadow-lg transition"
          >
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-black">
              {post.title}
            </h2>
            <p className="text-gray-600 text-sm">{post.description}</p>
            <span className="mt-4 inline-block text-sm text-blue-600 group-hover:underline">
              Read more →
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}