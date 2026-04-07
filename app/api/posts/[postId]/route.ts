import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
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
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const token = await getToken({ req: request });
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId } = await params;
  const body = await request.json();
  const updated = updatePost(Number(postId), body);

  if (!updated) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  return Response.json(updated);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ postId: string }> }
) {
  const token = await getToken({ req: request });
  if (!token) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId } = await params;
  const deleted = deletePost(Number(postId));

  if (!deleted) {
    return Response.json({ error: "Post not found" }, { status: 404 });
  }

  return Response.json({ success: true });
}
