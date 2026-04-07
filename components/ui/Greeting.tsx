"use client";

import { useState, useEffect } from "react";

interface GreetingProps {
  lang?: string;
}

const greetings = {
  en: {
    morning: "Good morning",
    afternoon: "Good afternoon",
    evening: "Good evening",
    message: "Ready to manage your blog?",
  },
  vi: {
    morning: "Chào buổi sáng",
    afternoon: "Chào buổi chiều",
    evening: "Chào buổi tối",
    message: "Sẵn sàng quản lý blog của bạn?",
  },
};

export default function Greeting({ lang = "en" }: GreetingProps) {
  const [greeting, setGreeting] = useState("");
  const t = greetings[lang as keyof typeof greetings] ?? greetings.en;

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting(t.morning);
    } else if (hour < 18) {
      setGreeting(t.afternoon);
    } else {
      setGreeting(t.evening);
    }
  }, [t]);

  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900">
      <p className="text-lg text-zinc-700 dark:text-zinc-300">
        {greeting ? `${greeting}! ${t.message}` : "..."}
      </p>
    </div>
  );
}
