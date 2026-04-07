import PostForm from "@/components/posts/PostForm";
import { getPostById } from "@/lib/posts-store";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ lang: string; postId: string }>;
}) {
  const { lang, postId } = await params;
  const dict = await getDictionary(lang);
  const post = await getPostById(Number(postId));

  if (!post) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {dict.posts.postNotFound}
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        {dict.postForm.editTitle}
      </h1>
      <PostForm
        mode="edit"
        lang={lang}
        dict={dict}
        initialData={{
          id: post.id,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          coverImage: post.coverImage,
        }}
      />
    </div>
  );
}
