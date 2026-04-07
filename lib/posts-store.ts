import { prisma } from "./db";

export type { Post } from "@prisma/client";

export async function getAllPosts() {
  return prisma.post.findMany({ orderBy: { id: "desc" } });
}

export async function getPostById(id: number) {
  return prisma.post.findUnique({ where: { id } });
}

export async function createPost(data: {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
}) {
  return prisma.post.create({
    data: {
      ...data,
      author: "Admin",
      date: new Date().toISOString().split("T")[0],
    },
  });
}

export async function updatePost(
  id: number,
  data: { title?: string; excerpt?: string; content?: string; coverImage?: string }
) {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return null;
  return prisma.post.update({ where: { id }, data });
}

export async function deletePost(id: number) {
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return false;
  await prisma.post.delete({ where: { id } });
  return true;
}
