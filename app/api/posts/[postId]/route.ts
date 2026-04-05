import { posts } from "@/app/lib/posts-data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const post = posts.find((p) => p.id === Number(postId));

  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  return Response.json(post);
}
