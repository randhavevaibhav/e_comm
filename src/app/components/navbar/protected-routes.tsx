"use client";

import { Link } from "react-transition-progress/next";
import { PROTECTED_ROUTES } from "./constants";
import { useAuth } from "@/app/(routes)/auth/_auth-contexts/auth-context";

export const ProtectedRoutes = () => {
  const { user } = useAuth();
  if (!user) {
    return null;
  }
  return PROTECTED_ROUTES.map((route,idx) => {
    return (
      <li className="font-medium py-3 lg:hover:border-b lg:hover:border-indigo-500 lg:hover:text-indigo-500 transition-all" key={`${route.href}_${idx}`}>
        <Link href={route.href}>{route.name}</Link>
      </li>
    );
  });
};
