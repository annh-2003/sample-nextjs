import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPostById } from "@/lib/posts-store";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; postId: string }>;
}): Promise<Metadata> {
  const { postId } = await params;
  const post = await getPostById(Number(postId));

  if (!post) {
    return { title: "Post not found" };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ lang: string; postId: string }>;
}) {
  const { lang, postId } = await params;
  const dict = await getDictionary(lang);
  const post = await getPostById(Number(postId));

  if (!post) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {dict.posts.postNotFound}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {dict.posts.postNotFoundDesc}
        </p>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.date,
    image: post.coverImage,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
        <span>{dict.posts.by} {post.author}</span>
        <span>{post.date}</span>
        <Link
          href={`/${lang}/posts/${post.id}/edit`}
          className="rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700"
        >
          {dict.posts.edit}
        </Link>
      </div>
      <p className="leading-7 text-zinc-700 dark:text-zinc-300">
        {post.content}
      </p>
    </article>
  );
}
