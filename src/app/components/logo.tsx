import { ClassValue } from "clsx";
import Image from "next/image";
import { Link } from "react-transition-progress/next";
import { cn } from "../lib/utils";

type LogoProps ={
    className?:ClassValue
}

export const Logo = ({className}:LogoProps) => {
    const defaultClasses = `bg-black`
  return (
    <Link href={"/"}>
      <Image
        src={`/vercel.svg`}
        alt="logo"
        width={50}
        height={50}
        className={
            cn(defaultClasses,className)
        }
      />
    </Link>
  );
};
