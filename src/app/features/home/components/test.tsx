"use client";

import { useAuth } from "@/app/features/auth/context/auth-context";

export const Test = () => {
  const { user } = useAuth();

  return <div>Hello {`user with id ` + user?.id}</div>;
};
