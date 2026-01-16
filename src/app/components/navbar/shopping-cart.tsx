"use client";

import { ShoppingBagIcon } from "lucide-react";
import { IconWrapper } from "../ui/icon-wrapper";
import { useCartStoreSelectors } from "@/store/use-cart-store";
import { Link } from "react-transition-progress/next";

export const ShoppingCart = () => {
  const { totalItems } = useCartStoreSelectors();

  return (
    <Link
      className="relative py-0 px-2"
      href={`/cart`}
      data-test={"cart-page-link"}
    >
      <IconWrapper icon={ShoppingBagIcon} />

      <span
        className="absolute -top-1 text-center -right-1 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full"
        data-test={"total-cart-items"}
        data-value={totalItems}
      >
        {totalItems}
      </span>
    </Link>
  );
};
