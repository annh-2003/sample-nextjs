import { Post } from "../../../../lib/posts-data";
import PostForm from "../../../../components/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const res = await fetch(`http://localhost:3000/api/posts/${postId}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Post not found
        </h1>
      </div>
    );
  }

  const post: Post = await res.json();

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        Edit Post
      </h1>
      <PostForm
        mode="edit"
        initialData={{
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
        }}
      />
    </div>
  );
}
