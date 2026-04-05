const posts: Record<string, { title: string; content: string; author: string; date: string }> = {
  "1": {
    title: "Getting Started with Next.js",
    content:
      "Next.js is a React framework that enables server-side rendering and static site generation. With the App Router, you can build modern web applications using file-based routing, layouts, and React Server Components.",
    author: "Admin",
    date: "2026-04-01",
  },
  "2": {
    title: "Understanding Server Components",
    content:
      "React Server Components allow you to render components on the server, reducing the amount of JavaScript sent to the client. They are the default in Next.js App Router and are great for data fetching and static content.",
    author: "Admin",
    date: "2026-04-02",
  },
  "3": {
    title: "Routing in the App Router",
    content:
      "The App Router uses a file-system based routing approach. Folders define route segments, and special files like page.tsx and layout.tsx define the UI for each segment. Route groups, dynamic routes, and catch-all routes provide flexible URL patterns.",
    author: "Admin",
    date: "2026-04-03",
  },
};

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = posts[postId];

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
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        {post.title}
      </h1>
      <div className="mb-6 flex gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        <span>By {post.author}</span>
        <span>{post.date}</span>
      </div>
      <p className="leading-7 text-zinc-700 dark:text-zinc-300">
        {post.content}
      </p>
    </article>
  );
}
