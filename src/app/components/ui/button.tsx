import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { ComponentPropsWithRef, forwardRef } from "react";

type VariantType = "outline"|"default"|"ghost"


type ButtonProps = ComponentPropsWithRef<"button"> & {
  children: React.ReactNode;
  className?: ClassValue;
  variant?: VariantType;
  size?:"sm"|"md"|"lg"|"xl"
};

const getVariantClasses = (variant:VariantType = "default") => {
  const variants = {
    outline: "bg-inherit text-inherit border rounded-md",
    default: "bg-indigo-500 hover:bg-indigo-600 hover:opacity-90 transition-opacity",
    ghost:"bg-inherit text-inherit"
  };

  return variants[variant];
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children,disabled, className, variant,size="md",...rest } = props;
    const sizeClass = {
      "sm":"h-5",
      "md":"h-8",
      "lg":"h-10",
      "xl":"h-12"
    }
    const defaultClassName = `cursor-pointer px-8 transition text-white rounded-full ${sizeClass[size]}`;
    return (
      <button
        ref={ref}
        {...rest}
        disabled={disabled}
        className={cn(defaultClassName,getVariantClasses(variant), className,{
          "cursor-not-allowed":disabled
        })}
      >
        {children}
      </button>
    );
  }
);
