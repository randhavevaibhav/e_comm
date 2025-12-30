import { getProductBySlug } from "@/services/product.service";

import { serializePrisma } from "@/lib/utils";
import { ProductCard } from "../../_products-components/product-card";

type ProductPageProps = {
  slug: string;
};

const ProductPage = async ({ slug }: ProductPageProps) => {
   
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>No product Found !</div>;
  }

  return (
    <div className="grid lg:grid-cols-[500px_auto] grid-cols-1">
     
      <ProductCard product={serializePrisma(product)} />
      <h2 className="text-2xl font-medium"> Product page</h2>
    </div>
  );
};

export default ProductPage;
