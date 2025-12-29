"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { MoonIcon, SunMediumIcon } from "lucide-react";
import { useEffect, useState } from "react";

type ToggleThemeProps = {
    className?:ClassValue;
}

export const ToggleTheme = ({className}:ToggleThemeProps) => {
    const defaultClasses = `cursor-pointer text-muted-foreground`;
  const [theme, setTheme] = useState<"light" | "dark">();

  const changeThemeToDark = () => {
    setTheme("dark");
    document.body.classList.add("dark");
  };

  const changeThemeToLight = () => {
    setTheme("light");
    document.body.classList.remove("dark");
  };

  useEffect(() => {
    const isThemeDark = document.body.classList.contains("dark");
    setTheme(isThemeDark ? "dark" : "light");
  }, []);

  return theme === "dark" ? (
    <SunMediumIcon onClick={changeThemeToLight} className={cn(defaultClasses,className)} />
  ) : (
    <MoonIcon onClick={changeThemeToDark}  className={cn(defaultClasses,className)} />
  );
};
