"use client";

import { createPostAction, updatePostAction } from "@/lib/actions";
import type { Dictionary } from "@/lib/dictionary";

interface PostFormActionProps {
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

export default function PostFormAction({
  initialData,
  mode,
  lang = "en",
  dict,
}: PostFormActionProps) {
  const t = dict?.postForm;
  const action = mode === "create" ? createPostAction : updatePostAction;

  return (
    <form action={action} className="flex max-w-2xl flex-col gap-5">
      {/* Hidden fields */}
      <input type="hidden" name="lang" value={lang} />
      {mode === "edit" && initialData?.id && (
        <input type="hidden" name="id" value={initialData.id} />
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="title" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t?.titleLabel ?? "Title"}
        </label>
        <input
          id="title" name="title" type="text" required
          defaultValue={initialData?.title ?? ""}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder={t?.titlePlaceholder ?? "Enter post title"}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="excerpt" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t?.excerptLabel ?? "Excerpt"}
        </label>
        <input
          id="excerpt" name="excerpt" type="text" required
          defaultValue={initialData?.excerpt ?? ""}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder={t?.excerptPlaceholder ?? "Short description"}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="content" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t?.contentLabel ?? "Content"}
        </label>
        <textarea
          id="content" name="content" required rows={8}
          defaultValue={initialData?.content ?? ""}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder={t?.contentPlaceholder ?? "Write your post content..."}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="coverImage" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {t?.coverImageLabel ?? "Cover Image URL"}
        </label>
        <input
          id="coverImage" name="coverImage" type="text"
          defaultValue={initialData?.coverImage ?? ""}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          placeholder={t?.coverImagePlaceholder ?? "/images/cover.jpg"}
        />
      </div>

      <button
        type="submit"
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        {mode === "create"
          ? (t?.createButton ?? "Create Post")
          : (t?.updateButton ?? "Update Post")}
      </button>
    </form>
  );
}
