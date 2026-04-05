"use client";

import { useState, useEffect } from "react";

export default function Greeting() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-lg text-zinc-700 dark:text-zinc-300">
        {greeting ? `${greeting}! Ready to manage your blog?` : "Loading..."}
      </p>
    </div>
  );
}
