import * as z from "zod";
import { LOGIN_ERRORS, SIGNUP_ERRORS } from "./auth-schema-constants";

export const loginFormSchema = z.object({
  email: z.email(LOGIN_ERRORS.invalidEmail),
  password: z
    .string()
    .trim()
    .min(1, LOGIN_ERRORS.requiredPassword)
    .min(5, LOGIN_ERRORS.minPassword)
    .max(18, LOGIN_ERRORS.maxPassword),
});

export const signupFormSchema = z.object({
  userName: z
    .string()
    .trim()
    .min(1,SIGNUP_ERRORS.requiredUserName)
    .min(5, SIGNUP_ERRORS.minUserName)
    .max(18,SIGNUP_ERRORS.maxUserName),
  email: z.email(SIGNUP_ERRORS.invalidEmail),
  password: z
    .string()
    .trim()
    .min(1, SIGNUP_ERRORS.requiredPassword)
    .min(5,SIGNUP_ERRORS.minPassword)
    .max(18, SIGNUP_ERRORS.maxPassword),
});

export type loginFormSchemaType = z.infer<typeof loginFormSchema>;
export type signupFormSchemaType = z.infer<typeof signupFormSchema>;
