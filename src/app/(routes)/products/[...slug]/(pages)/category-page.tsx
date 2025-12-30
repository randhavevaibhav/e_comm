import { getProductsByCategory } from "@/services/product.service";
import { ProductList } from "../../_products-components/product-list";

type CategoryPageProps = {
  category: string;
};

export const CategoryPage = async ({ category }: CategoryPageProps) => {
  const products = await getProductsByCategory(category);

  return <ProductList category={category} products={products} />;
};
