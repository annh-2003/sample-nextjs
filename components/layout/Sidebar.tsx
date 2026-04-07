"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary } from "@/lib/dictionary";

interface SidebarProps {
  lang: string;
  dict: Dictionary;
}

export default function Sidebar({ lang, dict }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: `/${lang}/posts`, label: dict.sidebar.allPosts, exact: true },
    { href: `/${lang}/posts/create`, label: dict.sidebar.addPost, exact: false },
  ];

  return (
    <aside className="flex w-60 flex-col gap-6 border-r border-zinc-200 bg-zinc-50 px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        {dict.common.menu}
      </p>
      <nav className="flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-600 hover:bg-zinc-200/70 dark:text-zinc-400 dark:hover:bg-zinc-800"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
