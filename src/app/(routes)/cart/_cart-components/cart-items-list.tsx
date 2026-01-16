"use client";

import { useCartStoreSelectors } from "@/store/use-cart-store";
import { CartItem } from "./cart-item";
import { serializePrisma } from "@/lib/utils";

export const CartItemList = () => {
  const { cart: productList } = useCartStoreSelectors();
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
