import { NextResponse } from "next/server";
import * as bcrypt from "bcrypt";
import { createUser, findUser } from "@/services/user.service";
import { apiGlobalErrorHandler } from "@/lib/api-global-error-handler";
import { signupFormSchema } from "@/app/zod-schemas/auth-schema";
import { withRateLimit } from "@/lib/rate-limiter";

export const POST = apiGlobalErrorHandler(
  withRateLimit(async (request) => {
    const body = await request.json();

    const validateData = signupFormSchema.parse(body);

    const { email, userName, password } = validateData;

    const isUserExist = await findUser({
      email,
    });

    if (isUserExist) {
      return new NextResponse(
        JSON.stringify({
          message: `User with mail ${email} already exist.`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const user = await createUser({
      email,
      passwordHash,
      userName,
    });

    return new NextResponse(
      JSON.stringify({
        message: "created new user !",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  })
);
