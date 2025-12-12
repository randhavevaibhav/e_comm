import { cn } from "@/app/lib/utils";
import { ClassValue } from "clsx";
import { ComponentPropsWithRef, forwardRef } from "react";

type VariantType = "outline"|"default"|"ghost"


type ButtonProps = ComponentPropsWithRef<"button"> & {
  children: React.ReactNode;
  className?: ClassValue;
  variant?: VariantType;
};

const getVariantClasses = (variant:VariantType = "default") => {
  const variants = {
    outline: "bg-inherit text-inherit border rounded-md",
    default: "bg-indigo-500 hover:bg-indigo-600",
    ghost:"bg-inherit text-inherit"
  };

  return variants[variant];
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, className, variant,...rest } = props;
    const defaultClassName = `cursor-pointer px-8 py-2 transition text-white rounded-full`;
    return (
      <button
        ref={ref}
        {...rest}
        className={cn(defaultClassName,getVariantClasses(variant), className)}
      >
        {children}
      </button>
    );
  }
);
