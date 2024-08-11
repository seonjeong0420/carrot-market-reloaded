// 인증된 사용자만 접근할 수 있도록 미들웨어 만들기

import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
  [key: string]: boolean;
}

/** 배열이 아닌 Object를 사용하는 이유?
 * Object 내에서 뭔가를 포함하고 있는지 검색하는 것이 Array 내에서 뭔가를 포함하고 있나 검색하는 것 보다 약간 더 빠르기 때문
 */
const publicOnlyUrls: Routes = {
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.id) {
    if (!exists) {
      return Response.redirect(new URL("/", request.url));
    }
  } else {
    if (exists) {
      return Response.redirect(new URL("/home", request.url));
    }
  }

  /**
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
  } */
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico ).*)"],
  // matcher: ["/", "/profile", "/create-account", "/user/:path*"],
};
