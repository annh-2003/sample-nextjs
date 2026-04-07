"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "@/lib/i18n";

const localeNames: Record<string, string> = {
  en: "EN",
  vi: "VI",
};

export default function LanguageSwitcher() {
  const pathname = usePathname();

  function switchLocalePath(newLocale: string) {
    const segments = pathname.split("/");
    if (i18n.locales.includes(segments[1] as typeof i18n.locales[number])) {
      segments[1] = newLocale;
    }
    return segments.join("/");
  }

  // Get current locale from pathname
  const currentLocale = i18n.locales.find((l) =>
    pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  ) ?? i18n.defaultLocale;

  return (
    <div className="flex items-center gap-1">
      {i18n.locales.map((locale) => (
        <Link
          key={locale}
          href={switchLocalePath(locale)}
          className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
            locale === currentLocale
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          }`}
        >
          {localeNames[locale]}
        </Link>
      ))}
    </div>
  );
}
