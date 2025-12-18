import { NextResponse, type NextRequest } from "next/server";
import { authRoutes, protectedRoutes, verifyJwtToken } from "./lib/utils";

//add protected routes later ...

const authMiddleware = async (request: NextRequest) => {
  const token = request.cookies.get("session_token");
  const tokenValue = token ? token.value : null;

  const isRequestingProtectedRoutes = protectedRoutes.includes(
    request.nextUrl.pathname
  );
  const isRequestingAuthRoutes = authRoutes.includes(request.nextUrl.pathname);

  if (!tokenValue && isRequestingProtectedRoutes) {
    const authURL = request.nextUrl.clone();
    authURL.pathname = "/auth";
    return NextResponse.redirect(authURL);
  }

  const decodedUserInfo = verifyJwtToken(tokenValue);

  if (isRequestingAuthRoutes && decodedUserInfo) {
    const HomeURL = request.nextUrl.clone();
    HomeURL.pathname = "/";

    return NextResponse.redirect(HomeURL);
  }
};

export async function proxy(request: NextRequest) {
  const authMiddlewareResponse = authMiddleware(request);
  if (authMiddlewareResponse) return authMiddlewareResponse;

  return NextResponse.next({
    request,
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
