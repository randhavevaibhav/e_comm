"use client";

import { ClassValue } from "clsx";
import { Link } from "react-transition-progress/next";
import { FeatherIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMobile } from "@/hooks/useMobile";
import { ClientOnly } from "./client-only";

type LogoProps = {
  className?: ClassValue;
  size?: number;
};

export const Logo = ({ className, size }: LogoProps) => {
  const defaultClasses = `inline-block p-3`;
  const isMobile = useMobile();
  const defaultSize = size ? size : isMobile ? 30 : 40;
  return (
    <ClientOnly>
      <Link href={"/"} className={cn(defaultClasses, className)}>
        <FeatherIcon size={defaultSize} />
      </Link>
    </ClientOnly>
  );
};
