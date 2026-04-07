"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/posts", label: "All Posts", icon: "+", exact: true },
  { href: "/posts/create", label: "Add Post", icon: "+", exact: false },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-60 flex-col gap-6 border-r border-zinc-200 bg-zinc-50 px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950">
      <p className="px-3 text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        Menu
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
