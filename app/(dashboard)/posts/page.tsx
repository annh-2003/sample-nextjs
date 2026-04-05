import PostCard from "../../components/PostCard";

const posts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    excerpt:
      "Learn the basics of Next.js App Router and build your first application.",
  },
  {
    id: 2,
    title: "Understanding Server Components",
    excerpt:
      "Dive deep into React Server Components and how they work in Next.js.",
  },
  {
    id: 3,
    title: "Routing in the App Router",
    excerpt: "Explore file-based routing, dynamic routes, and route groups.",
  },
];

export default function PostsPage() {
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
