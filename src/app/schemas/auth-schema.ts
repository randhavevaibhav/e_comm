import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.email("Please enter valid email."),
  password: z
   .string("Password is required.")
    .min(5, "Password must have 5 characters.")
    .max(18, "Password can not exceed 18 characters."),
});

export const signupFormSchema = z.object({
  userName: z
    .string("User name is required.")
    .min(5, "User name must have 5 characters.")
    .max(18, "User name can not exceed 18 characters."),
  email: z.email("Please enter valid email."),
  password: z
   .string("Password is required.")
    .min(5, "Password must have 5 characters.")
    .max(18, "Password can not exceed 18 characters."),
});


export type loginFormSchemaType = z.infer<typeof loginFormSchema>
export type signupFormSchemaType = z.infer<typeof signupFormSchema>

