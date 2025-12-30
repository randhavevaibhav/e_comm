"use client";

import { Button } from "@/app/components/ui/button";
import { slugify } from "@/lib/utils";
import { productWithCategorySubCategory } from "@/services/product.service";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Link } from "react-transition-progress/next";

type ProductCardProps = {
  product: productWithCategorySubCategory;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  const [count, setCount] = useState(0);
  const productPath = `/products/${slugify(product.targetGroup)}/${slugify(
    product.subCategory.name
  )}/${slugify(product.slug)}`;
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
            {count === 0 ? (
              <Button
                className="flex items-center justify-center gap-1  md:w-20 w-16 h-[34px] rounded font-medium"
                onClick={(e) => {
                  e.stopPropagation();
                   e.preventDefault();
                  setCount(1);
                }}
              >
                <ShoppingBagIcon />
                Add
              </Button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] rounded select-none border-border border">
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCount((prev) => Math.max(prev - 1, 0));
                  }}
                  className="cursor-pointer text-lg px-2 h-full"
                >
                  -
                </Button>
                <span className="w-5 text-center">{count}</span>
                <Button
                  variant="ghost"
                  onClick={(e) => {
                     e.preventDefault();
                    e.stopPropagation();
                    setCount((prev) => prev + 1);
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
