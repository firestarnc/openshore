import fs from "fs/promises";
import path from "path";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
};

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

function extractMeta(source: string): Omit<BlogPost, "slug"> {
  const title = source.match(/title:\s*"([^"]+)"/)?.[1] ?? "Untitled";
  const description =
    source.match(/description:\s*"([^"]+)"/)?.[1] ?? "No description";
  const date = source.match(/date:\s*"([^"]+)"/)?.[1] ?? "1970-01-01";

  return { title, description, date };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  const files = await fs.readdir(BLOG_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    mdxFiles.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(BLOG_DIR, file);
      const source = await fs.readFile(fullPath, "utf8");
      const meta = extractMeta(source);

      return { slug, ...meta };
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}