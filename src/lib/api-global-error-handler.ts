import { NextRequest, NextResponse } from "next/server";
import { RateLimiterRes } from "rate-limiter-flexible";
import { ZodError, z } from "zod";

// Handler function type
type ApiHandlerFunction<T> = (
  req: NextRequest
) => Promise<NextResponse<T | { message: string; errors?: any }>>;

export const apiGlobalErrorHandler = <T>(handler: ApiHandlerFunction<T>) => {
  return async (req: NextRequest) => {
    try {
      // Execute the actual logic you pass in
      return await handler(req);
    } catch (error) {
      if (error instanceof RateLimiterRes) {
        const secondsToWait = Math.round(error.msBeforeNext / 1000);
        return NextResponse.json(
          { message: `Too many requests retry after ${Math.round(secondsToWait/60)} m`,},
          {
            status: 429,
            headers: { "Retry-After": String(secondsToWait) },
          }
        );
      }

      // Centralized Zod Error Handling
      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            message: "Validation failed",
            errors: z.treeifyError(error),
          },
          { status: 400 }
        );
      }

      // Centralized Internal Server Error Handling
      console.error("API Error:", error);
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
};
