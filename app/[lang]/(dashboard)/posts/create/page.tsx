import type { Metadata } from "next";
import PostForm from "@/components/posts/PostForm";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Create New Post",
  description: "Create a new blog post.",
};

export default async function CreatePostPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        {dict.postForm.createTitle}
      </h1>
      <PostForm mode="create" lang={lang} dict={dict} />
    </div>
  );
}
