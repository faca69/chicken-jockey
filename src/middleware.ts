import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const sessionCookie = getSessionCookie(req);

  const isLoggedIn = !!sessionCookie;
  const isOnAuthRoute = nextUrl.pathname.startsWith("/auth");

  // If user is logged in, prevent access to any /auth route (like sign-in, sign-up, verify)
  if (isLoggedIn && isOnAuthRoute) {
    return NextResponse.redirect(new URL("/jobs", req.url)); // redirect logged-in user to /jobs
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
