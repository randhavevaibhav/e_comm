import {  serializePrisma } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { ProductWithCategorySubCategory } from "@/services/product.service";
import { ClientOnly } from "@/app/components/client-only";
import { capitalize } from "@/lib/utils";

type ProductListProps = {
  category: string;
  products: ProductWithCategorySubCategory[];
};

export const ProductList = ({ category, products }: ProductListProps) => {
   const dataTestId =category.replaceAll(" ","-")+"-page-heading";
  return (
    <div>
       <h2 className="font-semibold text-2xl my-2" data-test={dataTestId}> {capitalize(category)}</h2>
      <div className="border grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-2 gap-y-4 p-2 md:justify-items-normal justify-items-center">
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
