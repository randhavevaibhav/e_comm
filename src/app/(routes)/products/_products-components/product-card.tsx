"use client";

import { ShoppingBagIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type ProductType = {
  name: string;
  category:string;
  subCategory:string;
  description: string;
  price: number;
  imageUrl: string;
  stock:number;
};

export const ProductCard = () => {
  const [count, setCount] = useState(0);
  const product:ProductType = {
    name: "Grey Fleece Jogger",
    category: "Kids",
    subCategory:"Kids pants",
    description:"Comfortable grey fleece joggers for active kids.",
    price: 100,
   stock:200,
    imageUrl:
      "https://media.istockphoto.com/id/943394014/photo/stylish-sneakers-and-funny-happy-socks.webp?a=1&b=1&s=612x612&w=0&k=20&c=8rnfRN3S30fRYhYKB6kD8qB3f8q0yukvpfIoFzmAb4Q=",
  };

  return (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white  max-w-74 w-full">
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <Image
          className="group-hover:scale-105 transition"
          src={product.imageUrl}
          width={300}
          height={300}
          alt={product.description}
        />
      </div>
      <div className="text-gray-500/60 text-sm">
        <div className="mt-4">
            <span>{product.category}</span>
        <span>&nbsp;{">"}&nbsp;</span>
        <span>{product.subCategory}</span>
        </div>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {product.name}
        </p>

        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-indigo-500">
            ${product.price}{" "}
         
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
