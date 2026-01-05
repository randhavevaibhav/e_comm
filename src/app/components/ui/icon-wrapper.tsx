"use client";

import { useMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { LucideIcon } from "lucide-react";

export const IconWrapper = ({
  icon: LucideIcon,
  className,
  ...props
}: {
  icon: LucideIcon;
  className?: ClassValue;
}) => {
  const isMobile = useMobile();

  const defaultClasses = "text-foreground";
  const defaultSize = isMobile ? 20 : 25;

  return (
    <LucideIcon
      size={defaultSize}
      className={cn(defaultClasses, className)}
      {...props}
    />
  );
};
