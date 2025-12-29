"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { cn } from "@/lib/utils";
import { ErrorMessage } from "@/app/components/ui/error-message";

export const AuthForm = () => {
  const [userAuthState, setUserAuthState] = useState<"login" | "signup">(
    "login"
  );

  const setUserAuthStateToLogin = () => {
    setUserAuthState("login");
  };

  const setUserAuthStateToSignup = () => {
    setUserAuthState("signup");
  };

  return (
    <>
      {userAuthState === "login" ? (
        <LoginForm setUserAuthStateToSignup={setUserAuthStateToSignup} />
      ) : (
        <SignupForm setUserAuthStateToLogin={setUserAuthStateToLogin} />
      )}
    </>
  );
};

export const InputContainer = ({
  children,
  loading = false,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) => {
  return (
    <div
      className={cn(
        "flex items-center  w-full border border-input h-12 rounded-full overflow-hidden pl-4 gap-2 has-focus:ring-2 has-focus:ring-indigo-500 transition ",
        {
          "bg-gray-200": loading,
        }
      )}
    >
      {children}
    </div>
  );
};

export const FormError = ({ error }: { error: string|null }) => {
  return (
    <ErrorMessage
      className={cn(
        {
          "opacity-100 visible": error,
          "opacity-0 invisible": !error,
        },
        "text-center mb-2"
      )}
      data-test={`submit-form-error`}
    >
      <p>Error while submitting form !!</p>
      <p>{error}</p>
    </ErrorMessage>
  );
};
