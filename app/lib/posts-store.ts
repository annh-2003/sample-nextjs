import { Post, posts as initialPosts } from "./posts-data";

// Use globalThis to persist store across hot reloads in development
// In production, this persists for the lifetime of the server process
// In a real app, this would be a database
const globalStore = globalThis as unknown as { __postsStore?: Post[] };

if (!globalStore.__postsStore) {
  globalStore.__postsStore = [...initialPosts];
}

const store = globalStore.__postsStore;

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
