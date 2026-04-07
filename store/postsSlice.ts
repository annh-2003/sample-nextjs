import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
}

interface PostsState {
  items: Post[];
  currentPost: Post | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PostsState = {
  items: [],
  currentPost: null,
  status: "idle",
  error: null,
};

// 13.2 Async Thunks
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const res = await fetch("/api/posts");
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json() as Promise<Post[]>;
});

export const fetchPostById = createAsyncThunk(
  "posts/fetchPostById",
  async (id: number) => {
    const res = await fetch(`/api/posts/${id}`);
    if (!res.ok) throw new Error("Post not found");
    return res.json() as Promise<Post>;
  }
);

export const createPost = createAsyncThunk(
  "posts/createPost",
  async (data: { title: string; excerpt: string; content: string; coverImage: string }) => {
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create post");
    }
    return res.json() as Promise<Post>;
  }
);

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ id, data }: { id: number; data: Partial<Post> }) => {
    const res = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update post");
    }
    return res.json() as Promise<Post>;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id: number) => {
    const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete post");
    return id;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    clearCurrentPost(state) {
      state.currentPost = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchPosts
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      })
      // fetchPostById
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      // createPost
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      // updatePost
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.items[index] = action.payload;
        if (state.currentPost?.id === action.payload.id) {
          state.currentPost = action.payload;
        }
      })
      // deletePost
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      });
  },
});

export const { clearCurrentPost, clearError } = postsSlice.actions;
export default postsSlice.reducer;
