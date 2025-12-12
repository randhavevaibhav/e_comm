"use client";

import { useState } from "react";
import { LoginForm } from "./login-form";
import { SignupForm } from "./signup-form";
import { cn } from "@/app/lib/utils";



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
        "flex items-center  w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2 ",
        {
          "bg-gray-200": loading,
        }
      )}
    >
      {children}
    </div>
  );
};
