import type { Metadata } from "next";
import PostCard from "@/components/posts/PostCard";
import { getAllPosts } from "@/lib/posts-store";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all blog posts in the Blog Admin dashboard.",
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        All Posts
      </h1>
      <div className="grid gap-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            id={post.id}
            title={post.title}
            excerpt={post.excerpt}
            date={post.date}
            coverImage={post.coverImage}
          />
        ))}
      </div>
    </div>
  );
}
