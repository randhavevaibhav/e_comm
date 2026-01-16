"use client";

import { useEffect, useState } from "react";


type ClientOnlyProps={
    children:React.ReactNode;
    fallback?:React.ReactNode;
}
export const ClientOnly = ({children,fallback=null}:ClientOnlyProps)=>{


    const [isMounted,setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    });

    if(!isMounted) return fallback;

    return (<>
    {children}
    </>)

}