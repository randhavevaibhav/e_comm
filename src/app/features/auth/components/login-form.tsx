"use client";

import { useAuth } from "../context/auth-context";
import { MailIcon } from "lucide-react";
import { LockIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  loginFormSchemaType,
} from "@/app/schemas/auth-schema";
import { ErrorMessage } from "@/app/components/ui/error-message";
import { cn } from "@/app/lib/utils";
import { InputContainer } from "./auth-form";
import { Input } from "@/app/components/ui/input";
import toast from "react-hot-toast";
import { Logo } from "@/app/components/logo";

type LoginFormProps = {
  setUserAuthStateToSignup: () => void;
};

export const LoginForm = ({ setUserAuthStateToSignup }: LoginFormProps) => {
  const { loading, error, login, clearError } = useAuth();

  const onSubmit = async (data: loginFormSchemaType) => {
    const email = data.email;
    const password = data.password;

    const isSuccess = await login({
      email,
      password,
    });

    if (isSuccess) {
      toast.success(`Logged in 😄!`);

      reset();
    }
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const emailFieldErrors = errors.email?.message;
  const passwordFieldErrors = errors.password?.message;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-1 sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
    >
      <header className="my-4">
        <div className="w-full">
          <Logo className="mx-auto mb-6"/>
        </div>

        <h1 className="text-gray-900 text-3xl  font-medium">Login</h1>
        <p className="text-gray-500 text-sm ">Please login in to continue</p>
      </header>

      <InputContainer loading={loading}>
        <MailIcon size={"18px"} className="text-[#6B7280]" />
        <Input
          type="email"
          placeholder="Email id"
          disabled={loading}
          autoComplete="email"
          {...register("email")}
          className={cn({
            "cursor-not-allowed": loading,
          })}
        />
      </InputContainer>

      <ErrorMessage
        className={cn(
          {
            "opacity-100 visible": emailFieldErrors,
            "opacity-0 invisible": !emailFieldErrors,
          },
          "ml-2"
        )}
      >
        {emailFieldErrors ? emailFieldErrors : `Errors`}
      </ErrorMessage>
      <InputContainer loading={loading}>
        <LockIcon size={"18px"} className="text-[#6B7280]" />

        <Input
          type="password"
          placeholder="Password"
          disabled={loading}
          autoComplete="current-password"
          {...register("password")}
          className={cn({
            "cursor-not-allowed": loading,
          })}
        />
      </InputContainer>

      <ErrorMessage
        className={cn(
          {
            "opacity-100 visible": passwordFieldErrors,
            "opacity-0 invisible": !passwordFieldErrors,
          },
          "ml-2"
        )}
      >
        {passwordFieldErrors ? passwordFieldErrors : `Errors`}
      </ErrorMessage>
      {/* need to implement */}
      {/* <div className="mt-4 text-left text-indigo-500">
                    <button className="text-sm" type="reset">Forget password?</button>
                </div> */}
      <button
        type="submit"
        className="w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity cursor-pointer"
      >
        Login
      </button>
      <p className="text-gray-500 text-sm ">
        Don't have an account?
        <button
          type="button"
          className="text-indigo-500 hover:underline cursor-pointer"
          onClick={() => {
            setUserAuthStateToSignup();
            clearError();
          }}
        >
          &nbsp;click here
        </button>
      </p>

      <ErrorMessage
        className={cn(
          {
            "opacity-100 visible": true,
            "opacity-0 invisible": !error,
          },
          "text-center mb-2"
        )}
      >
        <p>Error while submitting form !!</p>
        <p>{error}</p>
      </ErrorMessage>
    </form>
  );
};
