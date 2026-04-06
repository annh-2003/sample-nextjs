import PostForm from "../../../components/PostForm";

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
