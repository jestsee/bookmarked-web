import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

const nonAuthRoutes = ["sign-up", "api/auth/signin"];

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent,
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;

  // landing page can be accessed by everyone
  if (pathname === "/") return NextResponse.next();

  const isAccessingNonAuthRoutes = nonAuthRoutes.some((prefix) =>
    pathname.startsWith(`/${prefix}`),
  );

  if (!isAuthenticated && isAccessingNonAuthRoutes) {
    return NextResponse.next();
  }

  if (isAuthenticated && isAccessingNonAuthRoutes) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return withAuth(req as NextRequestWithAuth, event);
}

export const config = {
  matcher: ["/((?!docs).*)"],
};
