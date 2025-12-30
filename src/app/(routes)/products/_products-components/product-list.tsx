import { capitalize, serializePrisma } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { productWithCategorySubCategory } from "@/services/product.service";

type ProductListProps = {
  category: string;
  products: productWithCategorySubCategory[];
};

export const ProductList = ({ category, products }: ProductListProps) => {
  return (
    <div>
      <h2 className="font-semibold text-2xl my-2"> {capitalize(category)}</h2>
      <div className="border grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-x-2 gap-y-4 p-2">
        {products.map((product, idx) => {
          return (
            <ProductCard
              key={`${idx}_${product.id}`}
              product={serializePrisma(product)}
            />
          );
        })}
      </div>
    </div>
  );
};
