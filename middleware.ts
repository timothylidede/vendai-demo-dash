// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  // 1) Read the cookie named "demo_access"
  const demoCookie = req.cookies.get("demo_access")?.value

  // 2) If it's not exactly "valid", redirect to the main site
  if (demoCookie !== "valid") {
    return NextResponse.redirect("https://vendai.digital")
  }

  // 3) Otherwise let the request continue
  return NextResponse.next()
}

// 4) Apply this middleware to every route in the app:
export const config = {
  matcher: "/:path*", // run on all paths (you can tweak to exclude /_next, etc.)
}
