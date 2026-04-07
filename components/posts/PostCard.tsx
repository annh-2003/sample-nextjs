import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";

interface PostCardProps {
  id: number;
  title: string;
  excerpt: string;
  date?: string;
  coverImage?: string;
}

export default function PostCard({
  id,
  title,
  excerpt,
  date,
  coverImage,
}: PostCardProps) {
  return (
    <Link
      href={`/posts/${id}`}
      className="group flex gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      {coverImage && (
        <div className="relative h-24 w-36 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover"
            sizes="144px"
          />
        </div>
      )}
      <div className="flex flex-col">
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
      </div>
    </Link>
  );
}
