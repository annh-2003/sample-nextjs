import { getAllPosts, getPostById, createPost } from "@/app/lib/posts-store";

describe("/api/posts - Posts Store", () => {
  describe("getAllPosts", () => {
    it("returns an array of posts", () => {
      const posts = getAllPosts();
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it("each post has the correct structure", () => {
      const posts = getAllPosts();
      posts.forEach((post) => {
        expect(post).toHaveProperty("id");
        expect(post).toHaveProperty("title");
        expect(post).toHaveProperty("excerpt");
        expect(post).toHaveProperty("content");
        expect(post).toHaveProperty("author");
        expect(post).toHaveProperty("date");
        expect(post).toHaveProperty("coverImage");
      });
    });

    it("post fields have correct types", () => {
      const posts = getAllPosts();
      const post = posts[0];
      expect(typeof post.id).toBe("number");
      expect(typeof post.title).toBe("string");
      expect(typeof post.excerpt).toBe("string");
      expect(typeof post.content).toBe("string");
      expect(typeof post.author).toBe("string");
      expect(typeof post.date).toBe("string");
    });
  });

  describe("getPostById", () => {
    it("returns a post when given a valid id", () => {
      const post = getPostById(1);
      expect(post).toBeDefined();
      expect(post?.id).toBe(1);
    });

    it("returns undefined for a non-existent id", () => {
      const post = getPostById(999);
      expect(post).toBeUndefined();
    });
  });

  describe("createPost", () => {
    it("creates a new post with auto-generated fields", () => {
      const newPost = createPost({
        title: "Test New Post",
        excerpt: "Test excerpt",
        content: "Test content",
        coverImage: "/images/test.jpg",
      });

      expect(newPost).toHaveProperty("id");
      expect(newPost.title).toBe("Test New Post");
      expect(newPost.author).toBe("Admin");
      expect(newPost.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });

    it("new post appears in getAllPosts", () => {
      const before = getAllPosts().length;
      createPost({
        title: "Another Post",
        excerpt: "Excerpt",
        content: "Content",
        coverImage: "/images/test.jpg",
      });
      const after = getAllPosts().length;
      expect(after).toBe(before + 1);
    });
  });
});
