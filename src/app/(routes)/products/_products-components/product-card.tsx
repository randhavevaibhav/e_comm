"use client";


import { productWithCategorySubCategory } from "@/services/product.service";
import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";



type ProductCardProps={
  product:productWithCategorySubCategory;
}

export const ProductCard = ({product}:ProductCardProps) => {
  const [count, setCount] = useState(0);


  return (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white  max-w-74 w-full">
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <Image
          className="group-hover:scale-105 transition"
          src={product.imageUrl?product.imageUrl:"NA"}
          width={300}
          height={300}
          alt={product.description?product.description:"NA"}
        />
      </div>
      <div className="text-gray-500/60 text-sm">
        <div className="mt-4">
            <span>{}</span>
        <span>&nbsp;{">"}&nbsp;</span>
        <span>{product.subCategory.name}</span>
        </div>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product.name}
        </p>

        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-indigo-500">
            
         ${product.price.toString()}
          </p>
          <div className="text-indigo-500">
            {count === 0 ? (
              <button
                className="flex items-center justify-center gap-1 bg-indigo-100 border border-indigo-300 md:w-20 w-16 h-[34px] rounded text-indigo-600 font-medium"
                onClick={() => setCount(1)}
              >
             <ShoppingBagIcon/>
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-indigo-500/25 rounded select-none">
                <button
                  onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">{count}</span>
                <button
                  onClick={() => setCount((prev) => prev + 1)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
