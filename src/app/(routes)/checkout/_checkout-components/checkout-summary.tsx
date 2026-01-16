"use client";

import { useCartStoreSelectors } from "@/store/use-cart-store";
import Decimal from "decimal.js";
import { useEffect, useState } from "react";
import { Link } from "react-transition-progress/next";

export const CheckoutSummary = () => {
  const [mounted, setIsMounted] = useState(false);
  const { totalPrice } = useCartStoreSelectors();
  const decimalTotalPrice = new Decimal(totalPrice);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="w-full border rounded-md bg-input/30 shadow p-2 max-lg:mb-2 flex flex-col gap-2 items-center">
      <h2 className="lg:text-2xl text-xl font-medium tracking-wide ">
        Order Summary
      </h2>
      <h3 className="text-lg font-medium">
        Total:&nbsp;
        {mounted && decimalTotalPrice ? (
          <span
            data-test={"total-price"}
            data-value={decimalTotalPrice.toNumber()}
          >
            ${decimalTotalPrice.toNumber()}
          </span>
        ) : (
          <span>--</span>
        )}
      </h3>
      <p>Want to edit cart click <Link href={`/cart`} className="underline text-blue-500">here</Link></p>
    </div>
  );
};
