"use client";

import { capitalize } from "@/lib/utils";
import {  usePathname } from "next/navigation";

export const ProductListHeading = ({ category }: { category: string }) => {
    const pathname = usePathname();
    const pathnameArr = pathname.split("/");
    const dataTestId = pathnameArr[pathnameArr.length-1]+"-page-heading";
  return (
    <h2 className="font-semibold text-2xl my-2" data-test={dataTestId}> {capitalize(category)}</h2>
  );
};
