"use client";

import { Button } from "@/app/components/ui/button";
import { slugify } from "@/lib/utils";
import { ProductWithCategorySubCategory } from "@/services/product.service";
import { useCartStoreSelectors } from "@/store/use-cart-store";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Link } from "react-transition-progress/next";

type ProductCardProps = {
  product: ProductWithCategorySubCategory;
};

export const ProductCard = ({ product }: ProductCardProps) => {

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const { incProductCount,decProductCount, getProductFromCart } =
    useCartStoreSelectors();

  const productPath = `/products/${slugify(product.targetGroup)}/${slugify(
    product.subCategory.name
  )}/${slugify(product.slug)}`;

  const cartItem = getProductFromCart(product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Link
      href={productPath}
      className="border group border-border bg-input/30 rounded-md md:px-4 px-3 py-2 max-w-74 w-full "
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          src={product.imageUrl ? product.imageUrl : "img url"}
          alt={product.name}
          fill
          className="object-cover group-hover:opacity-75 transition-opacity"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="text-sm">
        <div className="mt-4">
          <span>{product.subCategory.name}</span>
        </div>
        <p className="font-medium text-lg truncate w-full">{product.name}</p>

        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-indigo-500">
            ${product.price.toString()}
          </p>
          <div className="text-indigo-500">
            {!mounted ? (
              <div className="md:w-20 w-16 h-[34px] bg-input animate-pulse rounded" />
            ) : quantity === 0 ? (
              <Button
                className="flex items-center justify-center gap-1  md:w-20 w-16 h-[34px] rounded font-medium"
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
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] rounded select-none border-border border">
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
      </div>
    </Link>
  );
};
