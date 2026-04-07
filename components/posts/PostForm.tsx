"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Dictionary } from "@/lib/dictionary";
import { useAppDispatch } from "@/store/hooks";
import { createPost as createPostThunk, updatePost as updatePostThunk } from "@/store/postsSlice";

interface PostFormProps {
  initialData?: {
    id?: number;
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
  };
  mode: "create" | "edit";
  lang?: string;
  dict?: Dictionary;
}

export default function PostForm({ initialData, mode, lang = "en", dict }: PostFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const t = dict?.postForm;
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      if (mode === "create") {
        await dispatch(createPostThunk(formData)).unwrap();
      } else {
        await dispatch(
          updatePostThunk({ id: initialData!.id!, data: formData })
        ).unwrap();
      }

      router.push(`/${lang}/posts`);
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
          {t?.titleLabel ?? "Title"}
        </label>
        <input
          id="title" name="title" type="text" value={formData.title} onChange={handleChange} required
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder={t?.titlePlaceholder ?? "Enter post title"}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="excerpt" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t?.excerptLabel ?? "Excerpt"}
        </label>
        <input
          id="excerpt" name="excerpt" type="text" value={formData.excerpt} onChange={handleChange} required
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder={t?.excerptPlaceholder ?? "Short description"}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t?.contentLabel ?? "Content"}
        </label>
        <textarea
          id="content" name="content" value={formData.content} onChange={handleChange} required rows={8}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder={t?.contentPlaceholder ?? "Write your post content..."}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="coverImage" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t?.coverImageLabel ?? "Cover Image URL"}
        </label>
        <input
          id="coverImage" name="coverImage" type="text" value={formData.coverImage} onChange={handleChange}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder={t?.coverImagePlaceholder ?? "/images/cover.jpg"}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit" disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? (t?.saving ?? "Saving...")
            : mode === "create"
              ? (t?.createButton ?? "Create Post")
              : (t?.updateButton ?? "Update Post")}
        </button>
        <button
          type="button" onClick={() => router.back()}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          {dict?.common.cancel ?? "Cancel"}
        </button>
      </div>
    </form>
  );
}
