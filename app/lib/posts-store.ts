import { Post, posts as initialPosts } from "./posts-data";

// In-memory mutable store (resets on server restart)
// In a real app, this would be a database
const store: Post[] = [...initialPosts];

export function getAllPosts(): Post[] {
  return store;
}

export function getPostById(id: number): Post | undefined {
  return store.find((p) => p.id === id);
}

export function createPost(data: Omit<Post, "id" | "author" | "date">): Post {
  const newPost: Post = {
    id: store.length > 0 ? Math.max(...store.map((p) => p.id)) + 1 : 1,
    author: "Admin",
    date: new Date().toISOString().split("T")[0],
    ...data,
  };
  store.push(newPost);
  return newPost;
}

export function updatePost(
  id: number,
  data: Partial<Omit<Post, "id" | "author" | "date">>
): Post | null {
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return null;
  store[index] = { ...store[index], ...data };
  return store[index];
}

export function deletePost(id: number): boolean {
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
}
