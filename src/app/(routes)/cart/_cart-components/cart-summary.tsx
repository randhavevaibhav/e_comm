"use client";
import { Button } from "@/app/components/ui/button";
import { useCartStoreSelectors } from "@/store/use-cart-store";
import Decimal from "decimal.js";
import { useEffect, useState } from "react";

export const CartSummary = () => {
  const [mounted, setMounted] = useState(false);
  const { totalPrice } = useCartStoreSelectors();

  const decimalTotalPrice = new Decimal(totalPrice)
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="w-full border rounded-md bg-input/30 shadow p-2 max-lg:mb-2 flex flex-col gap-2 items-center">
      <h2 className="lg:text-2xl text-xl font-medium tracking-wide ">Order Summary</h2>
      <h3 className="text-lg font-medium">
        Total:&nbsp;{mounted &&decimalTotalPrice? <span>${decimalTotalPrice.toNumber()}</span> : <span>--</span>}
      </h3>
     
        <Button size="lg" className={`block w-full`}>
        Checkout
      </Button>
     
    </div>
  );
};
