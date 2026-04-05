import { posts } from "@/app/lib/posts-data";

export async function GET() {
  return Response.json(posts);
}
