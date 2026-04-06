import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex h-14 items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-bold text-zinc-900 dark:text-zinc-50"
        >
          Blog Admin
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/posts"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Posts
          </Link>
          <span className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
        </nav>
      </div>
    </header>
  );
}
