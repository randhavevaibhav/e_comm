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
