"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createPost as dbCreatePost,
  updatePost as dbUpdatePost,
  deletePost as dbDeletePost,
} from "@/lib/posts-store";

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function createPostAction(formData: FormData) {
  await requireAuth();

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const coverImage = (formData.get("coverImage") as string) || "/images/nextjs-intro.jpg";
  const lang = (formData.get("lang") as string) || "en";

  if (!title || !excerpt || !content) {
    throw new Error("Title, excerpt, and content are required");
  }

  await dbCreatePost({ title, excerpt, content, coverImage });

  revalidatePath(`/${lang}/posts`);
  redirect(`/${lang}/posts`);
}

export async function updatePostAction(formData: FormData) {
  await requireAuth();

  const id = Number(formData.get("id"));
  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const coverImage = formData.get("coverImage") as string;
  const lang = (formData.get("lang") as string) || "en";

  const updated = await dbUpdatePost(id, { title, excerpt, content, coverImage });
  if (!updated) throw new Error("Post not found");

  revalidatePath(`/${lang}/posts`);
  revalidatePath(`/${lang}/posts/${id}`);
  redirect(`/${lang}/posts/${id}`);
}

export async function deletePostAction(formData: FormData) {
  await requireAuth();

  const id = Number(formData.get("id"));
  const lang = (formData.get("lang") as string) || "en";

  const deleted = await dbDeletePost(id);
  if (!deleted) throw new Error("Post not found");

  revalidatePath(`/${lang}/posts`);
  redirect(`/${lang}/posts`);
}
