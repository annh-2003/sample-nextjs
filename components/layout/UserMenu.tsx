"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Link
        href="/login"
        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
      >
        Sign In
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-zinc-600 dark:text-zinc-400">
        {session.user?.name || session.user?.email}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        Sign Out
      </button>
    </div>
  );
}
