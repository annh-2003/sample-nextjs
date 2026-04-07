import type { Metadata } from "next";
import PostForm from "@/components/posts/PostForm";

export const metadata: Metadata = {
  title: "Create New Post",
  description: "Create a new blog post.",
};

export default function CreatePostPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        Create New Post
      </h1>
      <PostForm mode="create" />
    </div>
  );
}
