import Image from "next/image";

import { ProductStatus } from "./product-status";
import { OrderedProduct } from "../_types/types";

export const MyOrderListItem = ({ product }: { product: OrderedProduct }) => {
  return (
    <li className=" flex gap-2 border border-input bg-input/30 py-2 px-4 rounded-md">
      <div className="max-w-28 w-full">
        <div className="relative aspect-square  overflow-hidden ">
          <Image
            src={product.image ? product.image : "img url"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </div>
      <div className="flex flex-col justify-between">
        <p className="font-semibold text-xl">{product.name}</p>
        <p
          className="md:text-xl text-base font-medium text-indigo-500"
          data-test={"item-price"}
          data-value={product.price.toString()}
        >
          ${product.price.toString()}
        </p>
        <div className="flex gap-2">
          <p>
            <span className="font-semibold">Quantity:</span>&nbsp;
            {product.qty}
          </p>
          <ProductStatus status={product.status} />
        </div>
      </div>
    </li>
  );
};
