"use client";

import { useAuth } from "../_auth-contexts/auth-context";
import { MailIcon } from "lucide-react";
import { LockIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  type loginFormSchemaType,
} from "@/app/(routes)/auth/schema/index";
import { ErrorMessage } from "@/app/components/ui/error-message";
import { cn } from "@/lib/utils";
import { FormError } from "./auth-form";
import { InputContainer } from "@/app/components/ui/input-container";
import { Input } from "@/app/components/ui/input";
import toast from "react-hot-toast";
import { Logo } from "@/app/components/logo";
import { ReactNode, useEffect } from "react";
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

  const renderField = ({
    name,
    placeholder,
    testId,
    icon = "",
  }: {
    name: keyof loginFormSchemaType;
    placeholder: string;
    testId: string;
    icon?: ReactNode;
  }) => {
    const error = errors[name]?.message as string | undefined;
    return (
      <>
        <InputContainer loading={loading}>
          {icon}
          <Input
            placeholder={placeholder}
            {...register(name)}
            className={cn({
              "cursor-not-allowed": loading,
            })}
            
            data-test={testId}
            disabled={loading}
            type={name==="password"?"password":"text"}
          />
        </InputContainer>
        <ErrorMessage
          className={cn(
            "ml-2",
            error
              ? "opacity-100 visible"
              : "opacity-0 invisible pointer-events-none",
          )}
          data-test={`${testId}-error`}
        >
          {error || "Error"}
        </ErrorMessage>
      </>
    );
  };


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

      {renderField({
        name: "email",
        placeholder: "Email id",
        icon: <MailIcon size={"18px"} className="text-[#6B7280]" />,
        testId: "email-input",
      })}

      {renderField({
        name: "password",
        placeholder: "Password",
        icon: <LockIcon size={"18px"} className="text-[#6B7280]" />,
        testId: "password-input",
      })}

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
