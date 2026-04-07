import Sidebar from "@/components/layout/Sidebar";
import { PostsProvider } from "@/components/posts/PostsContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PostsProvider>
      <div className="flex flex-row min-h-screen">
        <Sidebar />
        <main className="flex-1 p-8">{children}</main>
      </div>
    </PostsProvider>
  );
}
