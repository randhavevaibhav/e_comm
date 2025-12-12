"use client";

import {  protectedRoutes } from "@/app/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: {
    id: string;
  } | null;
  signup: ({
    email,
    password,
    userName,
  }: {
    email: string;
    password: string;
    userName: string;
  }) => Promise<boolean>;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: (id: string) => Promise<boolean>;
  clearError: () => void;
  loading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{
    id: string;
  } | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const validateSession = async () => {
      setLoading(true);
      const response = await fetch("/api/validate-session");

      //re-direct user to home page if session is invalid and 
      //is trying to access protected routes
      if (!response.ok&&protectedRoutes.includes(pathname)) {
          router.push("/");
          return;
      }
      const { user } = await response.json();
      setUser(user);
      setLoading(false);
    };
   
      validateSession();

  }, []);

  const clearError = () => {
    setError(null);
  };

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // This is crucial
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const { message } = await response.json();
      setError(message);
      setLoading(false);
      return false;
    }

    const { user } = await response.json();
    setUser(user);
    setError(null);
    router.push("/");
    setLoading(false);
    return true;
  };

  const logout = async (id: string) => {
    setLoading(true);
    const response = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // This is crucial
      },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      const { message } = await response.json();
      setError(message);
      setLoading(false);
      return false;
    }

    setUser(null);
    setError(null);
    router.push("/auth");
    setLoading(false);
    return true;
  };

  const signup = async ({
    email,
    userName,
    password,
  }: {
    email: string;
    userName: string;
    password: string;
  }) => {
    setLoading(true);
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // This is crucial
      },
      body: JSON.stringify({
        email,
        userName,
        password,
      }),
    });
    if (!response.ok) {
      const { message } = await response.json();
      setError(message);
      setLoading(false);
      return false;
    }

    setUser(null);
    setError(null);
    router.push("/auth");
    setLoading(false);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, logout, signup, clearError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error(`Please use auth context inside auth context provider`);
  }

  return contextValue;
};
