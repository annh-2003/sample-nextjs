import Link from "next/link";
import Badge from "./Badge";

interface PostCardProps {
  id: number;
  title: string;
  excerpt: string;
  date?: string;
}

export default function PostCard({ id, title, excerpt, date }: PostCardProps) {
  return (
    <Link
      href={`/posts/${id}`}
      className="group block rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <h2 className="mb-1.5 text-lg font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
        {title}
      </h2>
      <div className="mb-2 flex items-center gap-2">
        {date && (
          <p className="text-xs text-zinc-400 dark:text-zinc-500">{date}</p>
        )}
        <Badge label="Published" variant="success" />
      </div>
      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {excerpt}
      </p>
    </Link>
  );
}
