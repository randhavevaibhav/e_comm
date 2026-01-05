"use client";

import { ShoppingBagIcon } from "lucide-react";
import { Button } from "../ui/button";
import { IconWrapper } from "../ui/icon-wrapper";
import { useCartStoreSelectors } from "@/store/use-cart-store";

export const ShoppingCart = () => {
  const { totalItems, totalPrice } = useCartStoreSelectors();

  return (
    <Button className="relative py-0 px-2" variant="ghost">
      <IconWrapper icon={ShoppingBagIcon} />

      <span className="absolute -top-1 -right-1 text-xs text-white bg-indigo-500 w-[18px] h-[18px] rounded-full">
        {totalItems}
      </span>
    </Button>
  );
};
