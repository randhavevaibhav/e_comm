import { ClassValue } from "clsx";
import { Link } from "react-transition-progress/next";
import { FeatherIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: ClassValue;
  size?: number;
};

export const Logo = ({ className, size = 40 }: LogoProps) => {
  const defaultClasses = `inline-block p-3`;
  return (
    <Link href={"/"} className={cn(defaultClasses, className)}>
      <FeatherIcon size={size} />
    </Link>
  );
};
