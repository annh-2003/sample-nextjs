import Link from "next/link";

interface PostCardProps {
  id: number;
  title: string;
  excerpt: string;
}

export default function PostCard({ id, title, excerpt }: PostCardProps) {
  return (
    <Link
      href={`/posts/${id}`}
      className="block rounded-lg border border-zinc-200 p-5 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
    >
      <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {title}
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{excerpt}</p>
    </Link>
  );
}
