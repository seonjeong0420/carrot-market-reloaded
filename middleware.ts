import { NextRequest } from "next/server";
import getSession from "./lib/session";
export async function middleware(request: NextRequest) {
  // console.log(request.url);

  const session = await getSession();
  console.log(request.cookies.getAll(), session);

  if (request.nextUrl.pathname === "/profile") {
    // return Response.json({
    //   error: "You are not allowed here!",
    // });
    return Response.redirect(new URL("/", request.url));
  }
}
