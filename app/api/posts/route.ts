import { getAllPosts, createPost } from "@/app/lib/posts-store";

export async function GET() {
  return Response.json(getAllPosts());
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, excerpt, content, coverImage } = body;

  if (!title || !excerpt || !content) {
    return Response.json(
      { error: "Title, excerpt, and content are required" },
      { status: 400 }
    );
  }

  const post = createPost({
    title,
    excerpt,
    content,
    coverImage: coverImage || "/images/nextjs-intro.jpg",
  });

  return Response.json(post, { status: 201 });
}
