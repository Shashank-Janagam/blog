import { NextResponse,NextRequest } from "next/server";
import {getToken} from "next-auth/jwt";
import { isPageStatic } from "next/dist/build/utils";

export async function middleware(request: NextRequest) {


  const token= await getToken({req:request,secret:process.env.NEXTAUTH_SECRET});

  const path=request.nextUrl.pathname;

  const protectedRoutes=["/admin","/admin/new-post"];

  const isProtected=protectedRoutes.some((route)=>path.startsWith(route));

  if (isProtected && !token){
    return NextResponse.redirect(new URL("/login",request.url));

  }

  return NextResponse.next();

}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
