import type { Locale } from "./i18n";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  vi: () => import("./dictionaries/vi.json").then((m) => m.default),
};

export async function getDictionary(locale: string) {
  const key = locale as Locale;
  return dictionaries[key in dictionaries ? key : "en"]();
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;
