"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, MailIcon, UserRoundIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  signupFormSchema,
  signupFormSchemaType,
} from "@/app/(routes)/auth/schema/index";
import { ErrorMessage } from "@/app/components/ui/error-message";
import { cn } from "@/lib/utils";
import { useAuth } from "../_auth-contexts/auth-context";
import { ReactNode, useEffect } from "react";
import { Input } from "@/app/components/ui/input";
import { FormError } from "./auth-form";
import { InputContainer } from "@/app/components/ui/input-container";
import toast from "react-hot-toast";
import { Logo } from "@/app/components/logo";
import { Button } from "@/app/components/ui/button";

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



  const renderField = ({
    name,
    placeholder,
    testId,
    icon = "",
  }: {
    name: keyof signupFormSchemaType;
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
      className="space-y-1 sm:w-[350px] w-full text-center border dark:bg-input/30 border-input shadow rounded-2xl px-8 "
    >
      <header className="mt-2 mb-4" data-test={`signup-header`}>
        <Logo className={`w-fit mx-auto`} />

        <h1 className=" text-3xl font-medium">Sign up</h1>
        <p className="text-muted-foreground my-1">Please Sign up to continue</p>
      </header>

      {renderField({
        name: "userName",
        placeholder: "Name",
        icon: <UserRoundIcon size={"18px"} className="text-[#6B7280]" />,
        testId: "user-name-input",
      })}
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
        className="mt-2 w-full"
        size="lg"
        data-test={`signup-btn`}
      >
        {!loading ? `Sign up` : `loading...`}
      </Button>
      <p className="text-muted-foreground text-sm mt-3 mb-1">
        Already have an account?
        <button
          type="button"
          className="text-indigo-500 hover:underline cursor-pointer"
          onClick={() => {
            setUserAuthStateToLogin();
            clearError();
          }}
          data-test={`login-form-btn`}
        >
          &nbsp;click here
        </button>
      </p>
      <FormError error={error} />
    </form>
  );
};
