import { getProductsBySubCategory } from "@/services/product.service";

import { ProductList } from "../../_products-components/product-list";

type SubCategoryPageProps = {
  subCategory: string;
};

export const SubCategoryPage = async ({
  subCategory,
}: SubCategoryPageProps) => {
  const deSlugifySubCategory = subCategory.replaceAll("-", " ");
  const products = await getProductsBySubCategory(deSlugifySubCategory);
  return <ProductList category={deSlugifySubCategory} products={products} />;
};
