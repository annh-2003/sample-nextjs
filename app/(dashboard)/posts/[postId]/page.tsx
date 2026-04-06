import Image from "next/image";
import Link from "next/link";
import { Post, posts as allPosts } from "../../../lib/posts-data";

// 3.4 Static Generation: pre-render all known post detail pages at build time
export function generateStaticParams() {
  return allPosts.map((post) => ({
    postId: String(post.id),
  }));
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  // 5.3 Caching strategies:
  // - cache: "no-store"          → always fetch fresh data (SSR)
  // - cache: "force-cache"       → cache indefinitely (default static)
  // - next: { revalidate: 60 }   → ISR: revalidate every 60 seconds
  const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Post not found
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          The post you are looking for does not exist.
        </p>
      </div>
    );
  }

  const post: Post = await res.json();

  return (
    <article>
      <div className="relative mb-6 h-64 w-full overflow-hidden rounded-xl">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 800px"
          priority
        />
      </div>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        {post.title}
      </h1>
      <div className="mb-6 flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        <span>By {post.author}</span>
        <span>{post.date}</span>
        <Link
          href={`/posts/${post.id}/edit`}
          className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
        >
          Edit
        </Link>
      </div>
      <p className="leading-7 text-zinc-700 dark:text-zinc-300">
        {post.content}
      </p>
    </article>
  );
}
