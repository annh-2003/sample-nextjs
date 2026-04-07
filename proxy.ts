import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "@/lib/i18n";

function getLocale(request: NextRequest): string {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  const languages = new Negotiator({ headers }).languages();
  return match(languages, [...i18n.locales], i18n.defaultLocale);
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip locale redirect for API routes and static files
  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname has a locale prefix
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Redirect to locale-prefixed URL if missing
  if (!pathnameHasLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(
      new URL(`/${locale}${pathname}`, request.url)
    );
  }

  // Extract locale and the rest of the path
  const segments = pathname.split("/");
  const locale = segments[1]; // e.g. "en" or "vi"
  const restPath = "/" + segments.slice(2).join("/"); // e.g. "/posts/1"

  // Auth checks on locale-prefixed paths
  let token = null;
  try {
    token = await getToken({ req: request });
  } catch {
    // Token decode failed
  }

  // Redirect logged-in users away from auth pages
  if (
    (restPath === "/login" || restPath === "/register") &&
    token
  ) {
    return NextResponse.redirect(new URL(`/${locale}/posts`, request.url));
  }

  // Protect dashboard routes
  if (restPath.startsWith("/posts") && !token) {
    const loginUrl = new URL(`/${locale}/login`, request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
