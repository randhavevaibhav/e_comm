import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyJwtToken } from "@/lib/utils";
import { apiGlobalErrorHandler } from "@/lib/api-global-error-handler";

export const GET = apiGlobalErrorHandler(async () => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("session_token")?.value;

  if (!authToken) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  const decodedUserInfo = verifyJwtToken(authToken);

  if (!decodedUserInfo) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  return NextResponse.json(
    {
      isAuthenticated: true,
      user: decodedUserInfo,
    },
    { status: 200 }
  );
});
