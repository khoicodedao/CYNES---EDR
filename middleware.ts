import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import API_URL from "./helpers/api-url";
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === API_URL.PAGES.LOGIN || path === API_URL.PAGES.SIGNUP;
  // path === "/verifyemail";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    return NextResponse.redirect(
      new URL(API_URL.PAGES.DASHBOARD, request.nextUrl)
    );
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL(API_URL.PAGES.LOGIN, request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/login",
    "/signup",
    "/",
    "/agents",
    // "/events",
    // "/alerts",

    "/tasks",
    "/control-directly",
    "/list-command",
  ],
};
