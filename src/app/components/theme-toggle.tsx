"use client";

import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { MoonIcon, SunMediumIcon } from "lucide-react";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { IconWrapper } from "./ui/icon-wrapper";
import { ClientOnly } from "./client-only";
import { useThemeStoreSelectors } from "@/store/use-theme-store";

type ToggleThemeProps = {
  className?: ClassValue;
};

export const ToggleTheme = ({ className }: ToggleThemeProps) => {
  const defaultClasses = `cursor-pointer text-muted-foreground  px-1 py-0`;
  const { currentTheme, getLocalTheme, changeThemeToDark, changeThemeToLight } =
    useThemeStoreSelectors();
  const localTheme = getLocalTheme();

  useEffect(() => {
    const isThemeDark = localTheme === "dark";
    if (isThemeDark) {
      changeThemeToDark();
    } else {
      changeThemeToLight();
    }
  }, []);

  return currentTheme === "dark" ? (
    <ClientOnly>
      <Button
        variant="ghost"
        onClick={changeThemeToLight}
        className={cn(defaultClasses, className)}
        data-test={"toggle-theme-btn"}
      >
        <IconWrapper icon={SunMediumIcon} />
      </Button>
    </ClientOnly>
  ) : (
    <ClientOnly>
      <Button
        variant="ghost"
        onClick={changeThemeToDark}
        className={cn(defaultClasses, className)}
         data-test={"toggle-theme-btn"}
      >
        <IconWrapper icon={MoonIcon} />
      </Button>
    </ClientOnly>
  );
};
