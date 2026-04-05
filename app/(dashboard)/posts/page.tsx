import PostCard from "../../components/PostCard";
import { Post } from "../../lib/posts-data";

export default async function PostsPage() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
  const posts: Post[] = await res.json();

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
          />
        ))}
      </div>
    </div>
  );
}
