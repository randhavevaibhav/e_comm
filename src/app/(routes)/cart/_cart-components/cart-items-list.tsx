"use client";

import { useCartStoreSelectors } from "@/store/use-cart-store";
import { CartItem } from "./cart-item";
import { serializePrisma } from "@/lib/utils";
import { Link } from "react-transition-progress/next";

export const CartItemList = () => {
  const { cart: productList } = useCartStoreSelectors();

  if (productList.length <= 0) {
    return (
      <div>
        <p className="text-base">
          No products added ! Please add products to cart &nbsp;
          <Link href={"/products"} className="text-blue-500 underline">
            here
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul className="flex flex-col gap-4">
        {productList.map((product, idx) => {
          return (
            <li
              className="border rounded-md shadow bg-input/30"
              key={`${product.id}_${idx}_${product.slug}`}
            >
              <CartItem product={serializePrisma(product)} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
