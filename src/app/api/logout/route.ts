import { apiGlobalErrorHandler } from "@/app/lib/api-global-error-handler";
import { cookies } from "next/headers";
import {  NextResponse } from "next/server";

export const POST = apiGlobalErrorHandler(async (request) => {
  const body = await request.json();
  const { id } = body;

  if (!id) {
    return new NextResponse(
      JSON.stringify({
        message: "invalid user",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const cookieStore = await cookies();
  cookieStore.delete("session_token");

  return new NextResponse(
    JSON.stringify({
      message: "user logged out !",
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
});
