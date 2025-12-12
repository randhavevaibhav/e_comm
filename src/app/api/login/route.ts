import { cookies } from "next/headers";
import {  NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { findUser } from "@/services/user.service";
import bcrypt from "bcrypt";
import { apiGlobalErrorHandler } from "@/app/lib/api-global-error-handler";
import {loginFormSchema} from "@/app/schemas/auth-schema"

export const POST = apiGlobalErrorHandler(async(request)=>{
    const body = await request.json();

    //fields sanitization is handle by zod schema if anything goes wrong 
    //zod Error is thrown which is handle by apiGlobalErrorHandler
    const validateData = loginFormSchema.parse(body);

    const { email, password } = validateData;

    const user = await findUser({
      email,
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({
          message: `User with mail id ${email} does not exist.`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const passwordHashFromDB = user.passwordHash;

    const isMatch = await bcrypt.compare(password, passwordHashFromDB);

    if (!isMatch) {
      return new NextResponse(
        JSON.stringify({
          message: "invalid password",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get the cookies instance
    const cookieStore = await cookies();
    // create a JSON Web token

    const newToken = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: `50m`,
    });

    // 2. Set the cookie
    // The set() function takes the cookie name (key), value, and optional options (like expiration or httpOnly)
    cookieStore.set("session_token", newToken, {
      httpOnly: true, // Makes the cookie inaccessible via client-side JavaScript (more secure)
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      maxAge: 600, // Cookie expires in 1 day (in seconds)
      path: "/", // The path where the cookie is valid
      sameSite: "strict", // Helps mitigate CSRF attacks
    });

    return new NextResponse(
      JSON.stringify({
        user,
        message: "user logged in !!",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  
});
