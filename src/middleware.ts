import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED  = ["/admin", "/vendor", "/customer", "/checkout", "/onboarding", "/track"];
const AUTH_ONLY  = ["/login","/signup"];
const DASH: Record<string,string> = { ADMIN: "/admin", VENDOR: "/vendor", CUSTOMER: "/customer" };

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const raw = req.cookies.get("uh-auth")?.value;

  let isAuth = false;
  let role   = "";

  if (raw) {
    try {
      const decoded = decodeURIComponent(raw);
      const state   = JSON.parse(decoded)?.state;
      isAuth = !!state?.token;
      role   = state?.user?.role ?? "";
    } catch { /* bad cookie */ }
  }

  const needsAuth = PROTECTED.some(p => pathname.startsWith(p));
  const isAuthRoute = AUTH_ONLY.some(p => pathname.startsWith(p));

  if (needsAuth && !isAuth) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && isAuth) {
    const dest = DASH[role] ?? "/dashboard/customer";
    return NextResponse.redirect(new URL(dest, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/vendor/:path*",
    "/customer/:path*",
    "/checkout/:path*",
    "/onboarding/:path*",
    "/track/:path*",
    "/login",
    "/signup",
  ],
};
