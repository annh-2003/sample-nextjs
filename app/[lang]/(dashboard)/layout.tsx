import Sidebar from "@/components/layout/Sidebar";
import { PostsProvider } from "@/components/posts/PostsContext";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <PostsProvider>
      <div className="flex flex-row min-h-screen">
        <Sidebar lang={lang} dict={dict} />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </PostsProvider>
  );
}
