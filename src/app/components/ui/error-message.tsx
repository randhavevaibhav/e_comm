import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";

type ErrorMessageProps = {
  children: React.ReactNode;
  className?: ClassValue;
};

export const ErrorMessage = ({ children, className ,...rest}: ErrorMessageProps) => {
  const defaultClasses = `text-red-600 text-sm text-left tracking-wide`;
  return <div className={cn(defaultClasses, className)} {...rest}>{children}</div>;
};
