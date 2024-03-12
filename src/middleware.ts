import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";

const nonAuthRoutes = ["sign-up", "sign-in"];

export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent,
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const { pathname } = req.nextUrl;

  const isAccessingNonAuthRoutes = nonAuthRoutes.some((prefix) =>
    pathname.startsWith(`/${prefix}`),
  );

  if (!isAuthenticated && isAccessingNonAuthRoutes) {
    return NextResponse.next();
  }

  if (isAuthenticated && isAccessingNonAuthRoutes) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return withAuth(req as NextRequestWithAuth, event);
}

export const config = {
  matcher: ["/((?!api).*)"],
};
