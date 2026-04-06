"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePostsContext } from "../context/PostsContext";

interface PostFormProps {
  initialData?: {
    id?: number;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
  };
  mode: "create" | "edit";
}

export default function PostForm({ initialData, mode }: PostFormProps) {
  const router = useRouter();
  const { setNotification } = usePostsContext();
  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    excerpt: initialData?.excerpt ?? "",
    content: initialData?.content ?? "",
    coverImage: initialData?.coverImage ?? "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const url =
        mode === "create"
          ? "/api/posts"
          : `/api/posts/${initialData?.id}`;
      const method = mode === "create" ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setNotification({
        type: "success",
        message: mode === "create" ? "Post created!" : "Post updated!",
      });
      router.push("/posts");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          required
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder="Enter post title"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="excerpt" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Excerpt
        </label>
        <input
          id="excerpt"
          name="excerpt"
          type="text"
          value={formData.excerpt}
          onChange={handleChange}
          required
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder="Short description"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          required
          rows={8}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder="Write your post content..."
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="coverImage" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Cover Image URL
        </label>
        <input
          id="coverImage"
          name="coverImage"
          type="text"
          value={formData.coverImage}
          onChange={handleChange}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder="/images/cover.jpg"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "create"
              ? "Create Post"
              : "Update Post"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
