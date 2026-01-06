"use client";

import { Button } from "@/app/components/ui/button";
import { slugify } from "@/lib/utils";
import { ProductWithCategorySubCategory } from "@/services/product.service";
import { useCartStoreSelectors } from "@/store/use-cart-store";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Link } from "react-transition-progress/next";

type CartItemProps = {
  product: ProductWithCategorySubCategory;
};

export const CartItem = ({ product }: CartItemProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const {
    incProductCount,
    decProductCount,
    getProductFromCart,
    removeProductFromCart,
  } = useCartStoreSelectors();

  const cartItem = getProductFromCart(product.id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const productPath = `/products/${slugify(product.targetGroup)}/${slugify(
    product.subCategory.name
  )}/${slugify(product.slug)}`;
  return (
    <Link href={productPath}>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 p-2">
        {/* item image,quantity, title, remove option */}
        <div className="flex gap-2">
          <div className="max-w-28 w-full">
            <div className="relative aspect-square  overflow-hidden ">
              <Image
                src={product.imageUrl ? product.imageUrl : "img url"}
                alt={product.name}
                fill
                className="object-cover group-hover:opacity-75 transition-opacity"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            </div>

            <div className="text-indigo-500 w-full h-[34px] mt-2">
              {!mounted ? (
                <div className=" bg-input animate-pulse rounded" />
              ) : quantity === 0 ? (
                <Button
                  className="flex items-center justify-center gap-1  rounded font-medium"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();

                    incProductCount(product);
                  }}
                >
                  <ShoppingBagIcon />
                  Add
                </Button>
              ) : (
                <div className="flex items-center justify-center gap-2  rounded select-none border-border border">
                  {/* remove from cart button */}
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      decProductCount(product.id);
                    }}
                    className="cursor-pointer text-lg px-2 h-full"
                  >
                    -
                  </Button>
                  <span className="w-5 text-center">{quantity}</span>
                  {/* add to cart button */}
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      incProductCount(product);
                    }}
                    className="cursor-pointer text-lg px-2 h-full"
                  >
                    +
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex-1">
            <h3 className="lg:text-xl text-lg font-medium tracking-wide flex-1">
              {product.name}
            </h3>
            <p className="text-base">{product.description}</p>
          </div>
        </div>
        {/* item price */}

        <div
          className={
            "justify-self-end flex lg:flex-col justify-between max-lg:w-full my-2"
          }
        >
          <p className="md:text-xl text-base font-medium text-indigo-500 text-end">
            ${product.price.toString()}
          </p>
          <Button
            className={"bg-red-500 hover:bg-red-500/80 text-base"}
            onClick={(e) => {
              e.preventDefault();
               e.stopPropagation();
              removeProductFromCart(product.id);
            }}
          >
            Remove
          </Button>
        </div>
      </div>
    </Link>
  );
};
