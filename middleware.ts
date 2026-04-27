import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Block bots/scanners probing for Next.js server actions — this app has none.
  // Without this, malformed POST requests crash the renderer with an internal error.
  if (request.headers.has("next-action")) {
    return new NextResponse(null, { status: 400 });
  }

  const { pathname } = request.nextUrl;

  // Let login page and API auth route through
  if (
    pathname === "/admin" ||
    pathname === "/api/admin/auth"
  ) {
    return NextResponse.next();
  }

  // Protect all /admin/* routes
  if (pathname.startsWith("/admin/")) {
    const token = request.cookies.get("admin-session");
    if (!token || token.value !== "authenticated") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|logo\\.png|robots\\.txt|sitemap\\.xml).*)",
  ],
};
