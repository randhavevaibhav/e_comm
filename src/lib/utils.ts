import jwt from "jsonwebtoken";
import clsx, {ClassValue} from "clsx"
import {twMerge} from "tailwind-merge";
import { User } from "../../generated/prisma/browser";
export const verifyJwtToken = (authToken: string|null) => {
  try {
    if(!authToken)
    {
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
  return twMerge(clsx(inputs))
}

export const sleep = (delay=3000)=>{

  return new Promise((res,_)=>{
    setTimeout(()=>{
      res(`delayed by ${delay}s`)
    },delay)
  })

}

export const protectedRoutes = [""] ;

export const authRoutes = ["/auth"] ;