import { cn } from "@/app/lib/utils";
import { ClassValue } from "clsx";

type ErrorMessageProps = {
  children: React.ReactNode;
  className?: ClassValue;
};

export const ErrorMessage = ({ children, className }: ErrorMessageProps) => {
  const defaultClasses = `text-red-600 text-sm text-left tracking-wide`;
  return <div className={cn(defaultClasses, className)}>{children}</div>;
};
