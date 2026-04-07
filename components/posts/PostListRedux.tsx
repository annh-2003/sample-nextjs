"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPosts, deletePost } from "@/store/postsSlice";
import Link from "next/link";

interface PostListReduxProps {
  lang?: string;
}

export default function PostListRedux({ lang = "en" }: PostListReduxProps) {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  function handleDelete(id: number) {
    if (confirm(lang === "vi" ? "Bạn có chắc muốn xóa?" : "Are you sure you want to delete?")) {
      dispatch(deletePost(id));
    }
  }

  if (status === "loading") {
    return <p className="text-zinc-500">Loading...</p>;
  }

  if (status === "failed") {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="grid gap-3">
      {items.map((post) => (
        <div
          key={post.id}
          className="flex items-center justify-between rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
        >
          <div>
            <Link
              href={`/${lang}/posts/${post.id}`}
              className="font-medium text-zinc-900 hover:text-blue-600 dark:text-zinc-50"
            >
              {post.title}
            </Link>
            <p className="text-sm text-zinc-500">{post.date}</p>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/${lang}/posts/${post.id}/edit`}
              className="rounded px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950"
            >
              {lang === "vi" ? "Sửa" : "Edit"}
            </Link>
            <button
              onClick={() => handleDelete(post.id)}
              className="rounded px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            >
              {lang === "vi" ? "Xóa" : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
