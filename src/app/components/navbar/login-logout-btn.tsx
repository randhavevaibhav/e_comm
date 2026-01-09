"use client";

import { useAuth } from "@/app/(routes)/auth/_auth-contexts/auth-context";
import { ClassValue } from "clsx";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Link } from "react-transition-progress/next";
import { cn } from "@/lib/utils";
export const LoginLogoutBtn = ({ className }: { className?: ClassValue }) => {
  const { user, logout } = useAuth();

  const isAuthenticated = user ? true : false;

  const handleLogout = async () => {
    if (user) {
      const isSuccess = await logout(user?.id);
      if (isSuccess) {
        toast.success(`Logged out ! 😢`);
      }
    }
    return false;
  };

  return isAuthenticated ? (
    <Button
      onClick={handleLogout}
      size="lg"
      className={cn("text-center", className)}
    >
      Logout
    </Button>
  ) : (
    <Link
      href="/auth"
      className={cn(
        "text-center cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full",
        className
      )}
      data-test={"login-signup-link"}
    >
      Login&nbsp;/&nbsp;Signup
    </Link>
  );
};
