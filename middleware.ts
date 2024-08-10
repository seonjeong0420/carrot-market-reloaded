import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";
export async function middleware(request: NextRequest) {
  const session = await getSession();
  const pathname = request.nextUrl.pathname;
  console.log(request.cookies.getAll(), session);

  if (pathname === "/") {
    const response = NextResponse.next();
    response.cookies.set("middlewrae-cookie", "hello");
    return response;
  }

  if (pathname === "/profile") {
    // return Response.json({
    //   error: "You are not allowed here!",
    // });
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/", "/profile", "/create-account", "/user/:path*"],
};
