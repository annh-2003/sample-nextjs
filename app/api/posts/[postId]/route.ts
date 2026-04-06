import {
  getPostById,
  updatePost,
  deletePost,
} from "@/app/lib/posts-store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const post = getPostById(Number(postId));

  if (!post) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  return Response.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const body = await request.json();
  const updated = updatePost(Number(postId), body);

  if (!updated) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  return Response.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ postId: string }> }
) {
  const { postId } = await params;
  const deleted = deletePost(Number(postId));

  if (!deleted) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  return Response.json({ success: true });
}
