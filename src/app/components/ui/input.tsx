import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ComponentPropsWithRef, forwardRef } from "react";

type InputProps = ComponentPropsWithRef<"input"> & {
  className?: ClassValue;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const defaultClasses = `border-none outline-none ring-0 h-full`;
  const { className, ...rest } = props;

  return (
    <input ref={ref} className={cn(defaultClasses, className)} {...rest} />
  );
});
