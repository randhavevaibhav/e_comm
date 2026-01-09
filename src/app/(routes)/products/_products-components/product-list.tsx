import {  serializePrisma } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { ProductWithCategorySubCategory } from "@/services/product.service";
import { ClientOnly } from "@/app/components/client-only";
import { ProductListHeading } from "./product-list-heading";

type ProductListProps = {
  category: string;
  products: ProductWithCategorySubCategory[];
};

export const ProductList = ({ category, products }: ProductListProps) => {
  return (
    <div>
      <ProductListHeading category={category}/>
      <div className="border grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-2 gap-y-4 p-2">
        {products.map((product, idx) => {
          return (
            <ClientOnly  key={`${idx}_${product.id}`}>
              <ProductCard
               
                product={serializePrisma(product)}
              />
            </ClientOnly>
          );
        })}
      </div>
    </div>
  );
};
