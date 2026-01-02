"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { MoonIcon, SunMediumIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useMobile } from "@/hooks/useMobile";


type ToggleThemeProps = {
  className?: ClassValue;
};

export const ToggleTheme = ({ className }: ToggleThemeProps) => {
  const defaultClasses = `cursor-pointer text-muted-foreground  px-1 py-0`;
  const [theme, setTheme] = useState<"light" | "dark">();
  const isMobile = useMobile();

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
    <Button
      variant="ghost"
      onClick={changeThemeToLight}
      className={cn(defaultClasses, className)}
    >
      <SunMediumIcon className="text-foreground" size={isMobile ? 20 : 25} />
    </Button>
  ) : (
    <Button
      variant="ghost"
      onClick={changeThemeToDark}
      className={cn(defaultClasses, className)}
    >
      <MoonIcon className="text-foreground" size={isMobile ? 20 : 25} />
    </Button>
  );
};
