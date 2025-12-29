"use client";

import { useAuth } from "../_auth-contexts/auth-context";
import { MailIcon } from "lucide-react";
import { LockIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  loginFormSchemaType,
} from "@/app/zod-schemas/auth-schema";
import { ErrorMessage } from "@/app/components/ui/error-message";
import { cn } from "@/lib/utils";
import { FormError, InputContainer } from "./auth-form";
import { Input } from "@/app/components/ui/input";
import toast from "react-hot-toast";
import { Logo } from "@/app/components/logo";
import { useEffect } from "react";
import { Button } from "@/app/components/ui/button";

type LoginFormProps = {
  setUserAuthStateToSignup: () => void;
};

export const LoginForm = ({ setUserAuthStateToSignup }: LoginFormProps) => {
  const { loading, error, login, clearError } = useAuth();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  useEffect(() => {
    //clear form if we get error from server
    if (error) {
      reset();
    }
  }, [error]);

  const onSubmit = async (data: loginFormSchemaType) => {
    //clear any errors from previous login attempt
    clearError();
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

  const emailFieldErrors = errors.email?.message;
  const passwordFieldErrors = errors.password?.message;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-1 sm:w-[350px] w-full text-center border dark:bg-input/30 border-input shadow rounded-2xl px-8"
    >
      <header className="mt-2 mb-4" data-test={`login-header`}>
        <Logo className={`w-fit mx-auto`} />

        <h1 className="text-3xl  font-medium">Login</h1>
        <p className="text-muted-foreground my-1">
          Please login in to continue
        </p>
      </header>

      <InputContainer loading={loading}>
        <MailIcon size={"18px"} className="text-[#6B7280]" />
        <Input
          placeholder="Email id"
          disabled={loading}
          autoComplete="email"
          {...register("email")}
          className={cn({
            "cursor-not-allowed": loading,
          })}
          data-test={`email-input`}
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
        data-test={`email-input-error`}
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
          data-test={`password-input`}
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
        data-test={`password-input-error`}
      >
        {passwordFieldErrors ? passwordFieldErrors : `Errors`}
      </ErrorMessage>
      {/* need to implement */}
      {/* <div className="mt-4 text-left text-indigo-500">
                    <button className="text-sm" type="reset">Forget password?</button>
                </div> */}
      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className={`w-full`}
        data-test={`login-btn`}
      >
        Login
      </Button>
      <p className="text-muted-foreground my-1 text-sm">
        Don't have an account?
        <button
          type="button"
          className="text-indigo-500 hover:underline cursor-pointer"
          onClick={() => {
            setUserAuthStateToSignup();
            clearError();
          }}
          data-test={`signup-form-btn`}
        >
          &nbsp;click here
        </button>
      </p>

      <FormError error={error} />
    </form>
  );
};
