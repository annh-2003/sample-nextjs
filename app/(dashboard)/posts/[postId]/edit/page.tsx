import PostForm from "@/components/posts/PostForm";
import { getPostById } from "@/lib/posts-store";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const post = await getPostById(Number(postId));

  if (!post) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Post not found
        </h1>
      </div>
    );
  }

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
