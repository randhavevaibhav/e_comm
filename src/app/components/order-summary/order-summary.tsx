"use client";
import { useCartStoreSelectors } from "@/store/use-cart-store";
import Decimal from "decimal.js";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Link } from "react-transition-progress/next";

export const OrderSummary = () => {
  const [mounted, setMounted] = useState(false);
  const { totalPrice } = useCartStoreSelectors();
  const pathname = usePathname();
  const isCheckoutPage = pathname.includes("/checkout") ? true : false;

  const decimalTotalPrice = new Decimal(totalPrice);
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="w-full border rounded-md dark:bg-input/30 shadow p-2 max-lg:mb-2 flex flex-col gap-2 items-center">
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

      {!isCheckoutPage ? (
        <Link
          href={"/checkout"}
          className={`text-center cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full w-full`}
        >
          Checkout
        </Link>
      ) : null}
      {isCheckoutPage ? (
        <p>
          Want to edit cart click{" "}
          <Link href={`/cart`} className="underline text-blue-500">
            here
          </Link>
        </p>
      ) : null}
    </div>
  );
};
