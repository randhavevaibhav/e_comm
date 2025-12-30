import jwt from "jsonwebtoken";
import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { User } from "@/generated/client";
export const verifyJwtToken = (authToken: string | null) => {
  try {
    if (!authToken) {
      return null;
    }
    const decodedUserInfo = jwt.verify(authToken, process.env.JWT_SECRET);
    return decodedUserInfo as User;
  } catch (error) {
    console.log(`JWT verification failed !! `, error);
    return null;
  }
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (delay = 3000) => {
  return new Promise((res, _) => {
    setTimeout(() => {
      res(`delayed by ${delay}s`);
    }, delay);
  });
};

export const capitalize =(str:string)=>{
return str[0]?.toUpperCase()+str.slice(1)
}

export function serializePrisma<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}

export const protectedRoutes = [""];

export const authRoutes = ["/auth"];

 export const slugify = (text:string) => 
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
