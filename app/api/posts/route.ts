import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import { getAllPosts, createPost } from "@/lib/posts-store";

export async function GET() {
  return Response.json(await getAllPosts());
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, excerpt, content, coverImage } = body;

  if (!title || !excerpt || !content) {
    return Response.json(
      { error: "Title, excerpt, and content are required" },
      { status: 400 }
    );
  }

  const post = await createPost({
    title,
    excerpt,
    content,
    coverImage: coverImage || "/images/nextjs-intro.jpg",
  });

  return Response.json(post, { status: 201 });
}
