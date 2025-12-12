"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, MailIcon, UserRoundIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  signupFormSchema,
  signupFormSchemaType,
} from "@/app/schemas/auth-schema";
import { ErrorMessage } from "@/app/components/ui/error-message";
import { cn } from "@/app/lib/utils";
import { useAuth } from "../context/auth-context";
import { useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { InputContainer } from "./auth-form";
import toast from "react-hot-toast";
import { Logo } from "@/app/components/logo";

type SignupFormProps = {
  setUserAuthStateToLogin: () => void;
};

export const SignupForm = ({ setUserAuthStateToLogin }: SignupFormProps) => {
  const { loading, signup, error, clearError } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(signupFormSchema),
  });

  useEffect(() => {
    if (!loading) {
      reset();
    }
  }, [loading]);

  const onSubmit = async (data: signupFormSchemaType) => {
    const email = data.email;
    const password = data.password;
    const userName = data.userName;

    const isSuccess = await signup({
      email,
      password,
      userName,
    });
    if (isSuccess) {
      toast.success(`New user Created !\nPlease sign in to your new account.`, {
        duration: 4000,
      });

      setUserAuthStateToLogin();
    }
  };

  const userNameFieldErrors = errors.userName?.message;
  const emailFieldErrors = errors.email?.message;
  const passwordFieldErrors = errors.password?.message;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-1 sm:w-[350px] w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white"
    >
      <header className="my-4">
        <div className="w-full">
          <Logo className="mx-auto mb-6" />
        </div>
        <h1 className="text-gray-900 text-3xl font-medium">Sign up</h1>
        <p className="text-gray-500 text-sm ">Sign up in to continue</p>
      </header>

      <InputContainer loading={loading}>
        <UserRoundIcon size={"18px"} className="text-[#6B7280]" />

        <Input
          type="text"
          placeholder="Name"
          disabled={loading}
          autoComplete="username"
          {...register("userName")}
          className={cn({
            "cursor-not-allowed": loading,
          })}
        />
      </InputContainer>

      <ErrorMessage
        className={cn(
          {
            "opacity-100 visible": userNameFieldErrors,
            "opacity-0 invisible": !userNameFieldErrors,
          },
          "ml-2"
        )}
      >
        {userNameFieldErrors ? userNameFieldErrors : `Error`}
      </ErrorMessage>

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
        {emailFieldErrors ? emailFieldErrors : `Error`}
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
        {passwordFieldErrors ? passwordFieldErrors : `Error`}
      </ErrorMessage>
      {/* need to implement */}
      {/* <div className="mt-4 text-left text-indigo-500">
                    <button className="text-sm" type="reset">Forget password?</button>
                </div> */}
      <button
        type="submit"
        className={cn(
          "mt-2 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity cursor-pointer",
          {
            "cursor-not-allowed": loading,
          }
        )}
      >
        {!loading ? `Sign up` : `loading...`}
      </button>
      <p className="text-gray-500 text-sm mt-3 mb-1">
        Already have an account?
        <button
          type="button"
          className="text-indigo-500 hover:underline cursor-pointer"
          onClick={() => {
            setUserAuthStateToLogin();
            clearError();
          }}
        >
          &nbsp;click here
        </button>
      </p>
      <ErrorMessage
        className={cn(
          {
            "opacity-100 visible": error,
            "opacity-0 invisible": !error,
          },
          "text-center mb-8"
        )}
      >
        <p>Error while submitting form !</p>
        <p>{error}</p>
      </ErrorMessage>
    </form>
  );
};
