import Image from "next/image";
import Link from "next/link";
import { getPostById } from "../../../lib/posts-store";

export const dynamic = "force-dynamic";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = getPostById(Number(postId));

  if (!post) {
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
